import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { Observer } from 'mobx-react-lite'

export const Filter = ({ title }) => {
  useEffect(() => {}, [])

  return (
    <Observer>
      {() => (
        <div className="w-full h-[70px] flex items-center px-4 bg-[#3A2950]">
          <div className="text-white text-[20px]">{title === 'LOST_PET' ? 'สัตว์เลี้ยงหาย' : 'ตามหาเจ้าของ'}</div>
        </div>
      )}
    </Observer>
  )
}
