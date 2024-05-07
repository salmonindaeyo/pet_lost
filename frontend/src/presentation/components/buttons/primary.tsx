import React from 'react'

interface ButtonProps {
  title: string
  onClick?: () => void
}

export const Primary = ({ title, onClick }: ButtonProps) => {
  //---------------------
  //   RENDER
  //---------------------
  return (
    <div onClick={onClick} className="flex items-center justify-center h-10 text-white rounded-md cursor-pointer bg-slate-500">
      <p className="text-base">{title}</p>
    </div>
  )
}
