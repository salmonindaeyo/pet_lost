import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'
import { useRouter } from 'next/navigation'
import { Loading } from 'src/presentation/components/loading'
import { ArrowRightSquare } from 'lucide-react'
import { InputText } from 'primereact/inputtext'
import { CreatePet } from 'src/presentation/components/create_pet'
import { Filter } from 'src/presentation/components/filter'
import { PetItem } from 'src/presentation/components/pet_item'
import { usePetLostNotFound } from 'src/data/api/pet.hook'

export const LostPetPage = () => {
  const petLostSer = usePetLostNotFound()
  return (
    <Observer>
      {() => (
        <div className="w-full text-center flex flex-col items-center ">
          <Filter title="LOST_PET" />
          <div className="w-full max-w-[1200px] h-full flex p-4 flex-wrap gap-4">
            {petLostSer?.data?.length !== 0 && <CreatePet data={null} type={'LOST_PET'} fetchPetList={petLostSer} />}
            {petLostSer.isLoading ? (
              <Loading />
            ) : petLostSer.data.length === 0 ? ( // ตรวจสอบว่าไม่มีข้อมูลสัตว์เลี้ยงที่หาย
              <div className="text-lg w-full text-gray-600   text-center mt-[200px]">ไม่มีสัตว์เลี้ยงที่หายตอนนี้</div>
            ) : (
              petLostSer.data.map((item) => (
                <div key={item.id}>
                  <PetItem petdata={item} />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Observer>
  )
}
