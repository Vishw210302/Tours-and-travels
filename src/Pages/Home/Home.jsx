import React from 'react'
import RippleEffect from '../RippleEffects/RippleEffect'
import TourTheme from '../TourTheme/TourTheme'
import Airlinesname from './components/Airlinesname'
import Destinations from './components/Destinations'
import DomesticFamousPackages from './components/DomesticFamousPackages'
import Herosection from './components/Herosection'
import Testimonials from './components/Testimonials'
import YoutubeVideos from './components/YoutubeVideos'

const Home = () => {
  return (
    <>
      <Herosection />
      <Airlinesname />
      <Destinations />
      <DomesticFamousPackages />
      {/* <YoutubeVideos /> */}
      <Testimonials />
      <TourTheme />
      {/* <RippleEffect /> */}
    </>
  )
}

export default Home