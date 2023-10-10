import React from 'react'
import Featured from './home/Featured'
import NewProducts from './home/NewProducts'
import ContactUs from './ContactUs'
import Gallery from './home/Gallery'
import GetStarted from './home/GetStarted'

const Home = ({FeaturedProduct,products,logged}) => {
  return (
    <div>
        <Featured product={FeaturedProduct} logged={logged}/>
        <NewProducts products={products}/>
        <Gallery/>
        <GetStarted/>
        <ContactUs/>
    </div>
  )
}

export default Home
