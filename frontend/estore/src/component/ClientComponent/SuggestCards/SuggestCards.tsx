import React from 'react'
import SwiperComp from '../Swiper.tsx/Swiper'
import Cards from '../Cards/Cards'

const suggestedItems = [
  { id: 1, title: 'Product 1', image: '/images/product-1.jpg', price: '$29.99' },
  { id: 2, title: 'Product 2', image: '/images/product-2.jpg', price: '$39.99' },
  { id: 3, title: 'Product 3', image: '/images/product-3.jpg', price: '$49.99' },
  { id: 4, title: 'Product 4', image: '/images/product-4.jpg', price: '$59.99' },
  { id: 5, title: 'Product 5', image: '/images/product-5.jpg', price: '$69.99' },
]

export default function SuggestCards() {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10   rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">You May Also Like</h2>
      <SwiperComp pagination={true} perView={1} perViewLg={3} perViewMd={3}>
        {suggestedItems.map((item) => (
          <div key={item.id} className="p-4">
            <Cards />
          </div>
        ))}
      </SwiperComp>
    </div>
  )
}