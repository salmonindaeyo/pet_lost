import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { Observer } from 'mobx-react-lite'
import { Eraser, MapPin, Search, SquarePen } from 'lucide-react'
import { Clue } from './clue'
import { DeletePet } from './delete_pet'
import { CreatePet } from 'src/presentation/components/create_pet'
export const PetItem = ({ data, refetch }) => {
  useEffect(() => {}, [])

  return (
    <Observer>
      {() => (
        <div className="flex w-[550px] rounded-2xl bg-[#FFFBEC] justify-between">
          <img src={data.image} className="w-[200px] h-full object-cover rounded-l-2xl " />
          <div className="p-[28px] w-full flex flex-col gap-2">
            <div className="text-white bg-[#3A2950] w-fit px-4 py-2 rounded-3xl">ตามหาเจ้าของ</div>
            <div className="text-[20px] font-bold">{data.name + ' ' + data.species}</div>
            <div>
              <span className="text-[25px] ml-0.5 mr-1"> ⚥ </span>{' '}
              <span className="text-[14px]">เพศ : {data.gender === 'Female' ? 'ชาย' : 'หญิง'} </span>
            </div>
            <div className="text-[14px] flex gap-2.5 items-center">
              <MapPin size={20} color="#383838" />
              {data.province_name + ' ' + data.amphure_name}
            </div>
          </div>
          <div className="bg-[#E3462C] w-[200px] items-center text-white rounded-r-2xl justify-between  flex flex-col">
            <CreatePet data={data} type="EDIT" fetchPetList={refetch} />
            <Clue id={data.id} />
            <DeletePet refetch={refetch} id={data.id} />
          </div>
        </div>
      )}
    </Observer>
  )
}
