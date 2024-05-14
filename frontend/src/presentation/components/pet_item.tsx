import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { Observer } from 'mobx-react-lite'
import { MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const PetItem = ({ petdata }) => {
  const router: any = useRouter()
  return (
    <Observer>
      {() => (
        <div
          onClick={() => {
            router.push({
              pathname: '/detail',
              query: { detail: JSON.stringify(petdata) },
            })
          }}
          className="hover:scale-110 cursor-pointer transition-all h-[250px] w-[250px] rounded-2xl bg-[#FFFBEC] drop-shadow-lg"
        >
          <img className="rounded-t-2xl w-[250px] h-[140px] object-cover" src={petdata.image} />
          <div className="w-full flex flex-col px-2 gap-1 py-2">
            <div className="flex font-bold text-[18px] gap-2">
              <span>{petdata.name}</span>
              <span>{petdata.species}</span>
            </div>
            <div>
              <span className="text-[25px] ml-0.5 mr-1"> ⚥ </span>{' '}
              <span className="text-[14px]">เพศ : {petdata.gender === 'Female' ? 'ชาย' : 'หญิง'} </span>
            </div>
            <div className="text-[14px] flex gap-2.5 items-center">
              <MapPin size={20} color="#383838" />
              {petdata.province_name + ' ' + petdata.amphure_name}
            </div>
          </div>
        </div>
      )}
    </Observer>
  )
}
