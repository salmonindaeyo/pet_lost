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
export const LostPetPage = () => {
  const [userDetailData, setUserDetailData] = useState({
    name: '',
    phone: '',
    email: '',
  })

  return (
    <Observer>
      {() => (
        <div className="w-full">
          <Filter title="สัตว์เลี้ยงหาย" />
          <div className="w-full h-full flex p-4 flex-wrap gap-4">
            <CreatePet type={'LOST_PET'} />
            <PetItem />
          </div>
        </div>
      )}
    </Observer>
  )
}
