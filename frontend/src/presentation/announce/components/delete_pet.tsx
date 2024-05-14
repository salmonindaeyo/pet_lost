import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Observer } from 'mobx-react-lite'
import { useDeletePet, useMyPet } from 'src/data/api/pet.hook'
import { Eraser } from 'lucide-react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
export const DeletePet = ({ id, refetch }) => {
  const useDeletePetSer = useDeletePet(id)
  const [visible, setVisible] = useState(false)

  function deletePet() {
    useDeletePetSer.mutateAsync({}, { onSuccess: () => success() })
  }

  function success() {
    refetch.refetch()
    setVisible(false)
  }
  const footerContent = (
    <div className="flex gap-4 justify-center">
      <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text bg-gray-100 p-2 px-3 rounded-lg" />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => deletePet()}
        className="p-button-text text-white bg-[#E3462C] p-2 px-3 rounded-lg"
        autoFocus
      />
    </div>
  )
  return (
    <Observer>
      {() => (
        <div className="w-full">
          <div
            onClick={() => setVisible(true)}
            className="flex text-[14px] w-full cursor-pointer hover:bg-[#b4351e] rounded-b-2xl pb-2 flex-col gap-1 items-center"
          >
            <Eraser color="#ffffff" />
            ลบประกาศ
          </div>

          <Dialog visible={visible} style={{ width: '25vw' }} onHide={() => setVisible(false)} footer={footerContent}>
            <div className="w-full text-center text-[24px]">คุณกำลังจะลบประกาศ</div>
          </Dialog>
        </div>
      )}
    </Observer>
  )
}
