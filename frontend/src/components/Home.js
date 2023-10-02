import React from 'react'
import Featured from './home/Featured'
import NewProducts from './home/NewProducts'

const Home = ({FeaturedProduct,products}) => {
  return (
    <div>
        <Featured product={FeaturedProduct}/>
        <NewProducts products={products}/>
    </div>
  )
}

export default Home
