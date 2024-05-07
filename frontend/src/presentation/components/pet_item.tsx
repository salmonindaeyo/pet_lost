import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { Observer } from 'mobx-react-lite'
import { MapPin } from 'lucide-react'

export const PetItem = () => {
  return (
    <Observer>
      {() => (
        <div className="hover:scale-110 cursor-pointer transition-all h-[250px] w-[250px] rounded-2xl bg-[#FFFBEC] drop-shadow-lg">
          <img
            className="rounded-t-2xl w-[250px] object-cover"
            src="https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg"
          />
          <div className="w-full flex flex-col px-4 gap-1 py-2">
            <div className="flex font-bold text-[18px] gap-2">
              <span>แมว</span>
              <span>พันไทย</span>
            </div>
            <div>
              <span className="text-[25px] ml-0.5 mr-1"> ⚥ </span> เพศ : หญิง
            </div>
            <div className="flex gap-2.5 items-center">
              <MapPin size={20} color="#383838" />
              ทุ่งครุ กรุงเทพมหานคร
            </div>
          </div>
        </div>
      )}
    </Observer>
  )
}
