import React from 'react'
import Hero from '../../components/common/homepage/Hero'
import Popular from '../../components/common/homepage/Popular'
import HowItWorks from '../../components/common/homepage/HowItWorks'
import Pricing from '../../components/common/homepage/Pricing'
import Explore from '../../components/common/section/Explore'

const Landing = () => {
  return (
    <>
    <Hero/>
    <Popular/>
    <HowItWorks/>
    <Pricing/>
    <Explore/>
    </>
  )
}

export default Landing