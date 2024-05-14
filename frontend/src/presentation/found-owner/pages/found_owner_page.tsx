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
import { usePetLookOwnerNotFound } from 'src/data/api/pet.hook'

export const FoundOwnerPage = () => {
  const petLookOwnerSer = usePetLookOwnerNotFound()
  return (
    <Observer>
      {() => (
        <div className="w-full flex flex-col items-center ">
          <Filter title="LOOK_FOR_OWNER" />
          <div className="w-full max-w-[1200px] h-full flex p-4 flex-wrap gap-4">
            {petLookOwnerSer?.data?.length !== 0 && <CreatePet data={null} type={'LOOK_FOR_OWNER'} fetchPetList={petLookOwnerSer} />}
            {petLookOwnerSer.isLoading ? (
              <Loading />
            ) : petLookOwnerSer.data.length === 0 ? ( // เพิ่มการตรวจสอบว่าไม่มีข้อมูลสัตว์เลี้ยงที่หาย
              <div className="text-lg w-full text-center text-gray-600 mt-[200px]">ไม่พบสัตว์เลี้ยงหายตอนนี้</div>
            ) : (
              petLookOwnerSer.data.map((item) => (
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
