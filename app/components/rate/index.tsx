'use client'

import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function Rate() {
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)
  }

  return (
    <Rating
      onClick={handleRating}
    />
  )
}
