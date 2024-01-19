import React from 'react'
import Hero from './Hero'

import { ProductList } from '../../features/product/ProductList'

const Homepage = () => {
  return (
    <div>
      <Hero />
      <ProductList/>
      
    </div>
  )
}

export default Homepage
