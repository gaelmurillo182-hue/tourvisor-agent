import Hero from '../sections/Hero'
import Program from '../sections/Program'
import Story from '../sections/Story'
import Invite from '../sections/Invite'
import Location from '../sections/Location'
import DressCode from '../sections/DressCode'
import Wishes from '../sections/Wishes'
import Rsvp from '../sections/Rsvp'
import Footer from '../sections/Footer'

export default function MainPage() {
  return (
    <main>
      <Hero />
      <Program />
      <Story />
      <Invite />
      <Location />
      <DressCode />
      <Wishes />
      <Rsvp />
      <Footer />
    </main>
  )
}
