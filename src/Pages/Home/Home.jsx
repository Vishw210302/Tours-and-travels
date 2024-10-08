import React from 'react'
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
      <YoutubeVideos />
      <Testimonials />
    </>
  )
}

export default Home