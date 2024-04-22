import React from 'react'

export const CarouselItem = ({title, imageUrl}) => {
  return (
    <div className="rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 m-3">
        <img src={imageUrl} alt="Item image" className="w-40 h-60" />
    </div>
  )
}
