import React from 'react'
const BackButton = () => (
  <button type='button' className='back-arrow inline' onClick={() => window.history.back()}>
    <img src='/img/right-arrow.svg' alt='zpět' />
  </button>
)
export default BackButton
