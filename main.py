import os
import time
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

TOURVISOR_LOGIN = os.environ.get("TOURVISOR_LOGIN")
TOURVISOR_PASSWORD = os.environ.get("TOURVISOR_PASSWORD")

TV_BASE = "https://tourvisor.ru/xml"

# ─── Справочники Tourvisor ───────────────────────────────────────────────────

DEPARTURES = {
    "москва": 1, "санкт-петербург": 2, "спб": 2, "екатеринбург": 3,
    "новосибирск": 4, "самара": 5, "уфа": 6, "казань": 7, "краснодар": 8,
    "ростов": 9, "пермь": 10, "нижний новгород": 11, "воронеж": 12,
    "тюмень": 32, "сочи": 34, "минск": 41,
}

COUNTRIES = {
    "турция": 8, "египет": 4, "таиланд": 18, "греция": 6, "кипр": 11,
    "ОАЭ": 15, "оаэ": 15, "эмираты": 15, "тунис": 16, "мальдивы": 25,
    "куба": 26, "мексика": 31, "израиль": 7, "италия": 9, "испания": 5,
    "черногория": 33, "марокко": 14, "вьетнам": 13, "бали": 39,
    "индия": 23, "шри-ланка": 24, "китай": 20, "япония": 21,
}

MEALS = {
    "без питания": "bb", "bb": "bb", "завтрак": "bb",
    "завтрак и ужин": "hb", "hb": "hb",
    "полный пансион": "fb", "fb": "fb",
    "всё включено": "al", "all inclusive": "al", "ai": "al", "al": "al",
    "ультра всё включено": "uai", "uai": "uai",
}

# ─── Вспомогательные функции ─────────────────────────────────────────────────

def tv_get(endpoint, params):
    """GET-запрос к Tourvisor API."""
    params.update({"login": TOURVISOR_LOGIN, "password": TOURVISOR_PASSWORD, "format": "json"})
    r = requests.get(f"{TV_BASE}/{endpoint}", params=params, timeout=15)
    r.raise_for_status()
    return r.json()

def resolve_id(mapping, value, field_name):
    """Ищет ID в справочнике, возвращает ошибку если не нашёл."""
    key = value.strip().lower()
    if key in mapping:
        return mapping[key], None
    return None, f"Не нашёл «{value}» в списке {field_name}. Доступные варианты: {', '.join(mapping.keys())}"

def wait_for_results(request_id, max_wait=60):
    """Ждёт завершения поиска Tourvisor (асинхронный)."""
    deadline = time.time() + max_wait
    while time.time() < deadline:
        data = tv_get("result.php", {"requestid": request_id})
        status = data.get("data", {}).get("status", "")
        if status == "ok":
            return data
        if status == "error":
            return None
        time.sleep(3)
    return None

def format_tours(result_data, limit=3):
    """Форматирует топ-N туров в читаемый текст для агента."""
    try:
        tours = result_data["data"]["result"]["hotel"]
        if isinstance(tours, dict):
            tours = [tours]
    except (KeyError, TypeError):
        return []

    output = []
    for i, t in enumerate(tours[:limit], 1):
        name    = t.get("hotelname", "—")
        stars   = t.get("hotelstars", "")
        region  = t.get("regionname", "")
        price   = t.get("price", "—")
        nights  = t.get("nights", "—")
        meal    = t.get("mealname", "—")
        depart  = t.get("flydate", "—")
        op      = t.get("operatorname", "—")
        rating  = t.get("hotelrating", "")
        link    = t.get("tourlink", "")

        stars_str = f"{'★' * int(stars)}" if str(stars).isdigit() else stars
        rating_str = f" | Рейтинг: {rating}" if rating else ""

        text = (
            f"🏨 {i}. {name} {stars_str} — {region}\n"
            f"   💰 Цена: {int(price):,} ₽ | ✈️ Вылет: {depart} | 🌙 {nights} ночей\n"
            f"   🍽 Питание: {meal} | Оператор: {op}{rating_str}\n"
            f"   🔗 {link}"
        )
        output.append(text)

    return output

# ─── Эндпоинты ───────────────────────────────────────────────────────────────

@app.route("/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/search", methods=["POST"])
def search():
    """
    Принимает ТЗ клиента от n8n / агента и возвращает подобранные туры.

    Тело запроса (JSON):
    {
        "departure":  "Москва",
        "country":    "Турция",
        "datefrom":   "01.07.2025",   // дата вылета ОТ
        "dateto":     "31.07.2025",   // дата вылета ДО
        "nightsfrom": 7,
        "nightsto":   10,
        "adults":     2,
        "children":   0,
        "stars":      4,              // минимальные звёзды (необязательно)
        "meal":       "все включено", // тип питания (необязательно)
        "budget":     150000          // максимальный бюджет в руб (необязательно)
    }
    """
    body = request.get_json(force=True, silent=True) or {}

    # --- Город вылета ---
    dep_id, err = resolve_id(DEPARTURES, body.get("departure", ""), "городов вылета")
    if err:
        return jsonify({"error": err}), 400

    # --- Страна ---
    cnt_id, err = resolve_id(COUNTRIES, body.get("country", ""), "стран")
    if err:
        return jsonify({"error": err}), 400

    # --- Питание (необязательно) ---
    meal_code = None
    if body.get("meal"):
        meal_code = MEALS.get(body["meal"].strip().lower())

    # --- Параметры запроса ---
    params = {
        "departure":  dep_id,
        "country":    cnt_id,
        "datefrom":   body.get("datefrom", ""),
        "dateto":     body.get("dateto", ""),
        "nightsfrom": body.get("nightsfrom", 7),
        "nightsto":   body.get("nightsto", 14),
        "adults":     body.get("adults", 2),
        "child":      body.get("children", 0),
        "stars":      body.get("stars", 3),
        "rating":     1,   # сортировка по рейтингу
    }
    if meal_code:
        params["meal"] = meal_code
    if body.get("budget"):
        params["priceto"] = body["budget"]

    # --- Запуск поиска ---
    try:
        init = tv_get("search.php", params)
    except Exception as e:
        return jsonify({"error": f"Ошибка запуска поиска: {e}"}), 500

    request_id = init.get("data", {}).get("requestid")
    if not request_id:
        return jsonify({"error": "Tourvisor не вернул requestid", "raw": init}), 500

    # --- Ожидание результатов ---
    result = wait_for_results(request_id)
    if not result:
        return jsonify({"error": "Поиск не завершился за 60 секунд или вернул ошибку"}), 504

    # --- Форматирование ---
    tours = format_tours(result, limit=3)
    if not tours:
        return jsonify({
            "found": 0,
            "message": "По вашим параметрам туры не найдены. Попробуйте расширить даты или изменить фильтры.",
            "tours": []
        })

    return jsonify({
        "found": len(tours),
        "request_id": request_id,
        "tours": tours,
        "summary": "\n\n".join(tours)
    })


@app.route("/countries", methods=["GET"])
def list_countries():
    """Возвращает список доступных стран."""
    return jsonify({"countries": list(COUNTRIES.keys())})


@app.route("/departures", methods=["GET"])
def list_departures():
    """Возвращает список городов вылета."""
    return jsonify({"departures": list(DEPARTURES.keys())})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
