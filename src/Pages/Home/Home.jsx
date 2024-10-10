import React from 'react'
import Airlinesname from './components/Airlinesname'
import Destinations from './components/Destinations'
import DomesticFamousPackages from './components/DomesticFamousPackages'
import Herosection from './components/Herosection'
import Testimonials from './components/Testimonials'
import YoutubeVideos from './components/YoutubeVideos'
import RippleEffect from '../RippleEffects/RippleEffect'

const Home = () => {
  return (
    <>
      <Herosection />
      <Airlinesname />
      <Destinations />
      <DomesticFamousPackages />
      <YoutubeVideos />
      <Testimonials />
      <RippleEffect />
    </>
  )
}

export default Home