import React from 'react'

const HighlightText = ({ text }) => {
  return (
    <span className='font-bold text-transparent bg-clip-text gradient_color'>
      {" "}
      {text}
    </span>
  )
}

export default HighlightText
