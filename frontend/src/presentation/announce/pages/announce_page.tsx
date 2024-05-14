import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'
import { setCookie, getCookie, deleteCookie } from 'src/core/utils/cookie'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useMyPet } from 'src/data/api/pet.hook'
import { Loading } from 'src/core/components/Loading'
import { PetItem } from '../components/pet_item'

export const AnnouncePage = () => {
  const [userFromLocalStorage, setUserFromLocalStorage] = useState(null)

  useEffect(() => {
    const user = typeof window !== 'undefined' ? localStorage.getItem('userpetalert') : null
    setUserFromLocalStorage(user ? JSON.parse(user) : null)
  }, [])

  useEffect(() => {
    if (userFromLocalStorage) {
      myPetSer.refetch()
    }
  }, [userFromLocalStorage])

  const myPetSer = useMyPet(userFromLocalStorage?.user.id, {
    queryKey: ['user_id', userFromLocalStorage?.user.id],
    enabled: Boolean(userFromLocalStorage),
  })

  return (
    <Observer>
      {() => (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <div className="w-full bg-[#3A2950] text-white py-[18px] px-4 text-[20px]"> ประกาศของฉัน </div>
          {myPetSer.isLoading ? (
            <Loading />
          ) : myPetSer?.data?.length === 0 ? (
            <div className="mt-[200px] text-[20px]">no announce</div>
          ) : (
            <div className="w-full flex justify-center ">
              <div className="flex  flex-wrap gap-4 mt-4 w-[1150px]">
                {myPetSer?.data?.map((item) => (
                  <PetItem refetch={myPetSer} data={item} key={item.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Observer>
  )
}
