import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'

export const Header = () => {
  useEffect(() => {}, [])

  //---------------------
  //   RENDER
  //---------------------
  return (
    <div>
      <img src={'/logo_with_text.svg'} />
      <div className="mt-[21px] flex flex-col gap-[8px] text-center">
        <div className="text-[20px] text-[#E30000] font-bold"> ลงทะเบียนรับประกัน </div>
        <div className="text-[10px] text-[#696969]"> กรุณาใส่ข้อมูลให้ครบถ้วนเพื่อควาถูกต้องของข้อมูล </div>
      </div>
    </div>
  )
}
