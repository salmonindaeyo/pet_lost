import React from 'react'

export const Input = ({ placeholder, onChange, value }) => {
  //---------------------
  //   RENDER
  //---------------------
  return <input placeholder={placeholder} onChange={onChange} value={value} className="w-full h-10 p-1 border rounded-md outline-none" />
}
