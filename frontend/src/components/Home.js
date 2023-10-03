import React from 'react'
import Featured from './home/Featured'
import NewProducts from './home/NewProducts'
import ContactUs from './ContactUs'

const Home = ({FeaturedProduct,products}) => {
  return (
    <div>
        <Featured product={FeaturedProduct}/>
        <NewProducts products={products}/>
        <ContactUs/>
    </div>
  )
}

export default Home
