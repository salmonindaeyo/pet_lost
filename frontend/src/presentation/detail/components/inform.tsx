import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { Dialog } from 'primereact/dialog'
import { storage } from 'src/core/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useAddInform } from 'src/data/api/inform.hook'
import { BadgeCheck } from 'lucide-react'

export const Inform = ({ data }) => {
  useEffect(() => {}, [])
  const [visible, setVisible] = useState(false)
  const [visibleSuccess, setVisibleSuccess] = useState(false)

  const [images, setImages] = useState([])
  const [detail, setDetail] = useState('')
  const informSer = useAddInform()
  const [imageShow, setImageShow] = useState()
  useEffect(() => {
    uploadFiles()
  }, [images])

  function validate() {
    if (!detail) {
      return false
    }

    if (!imageShow) {
      return false
    }

    return true
  }
  const uploadFiles = async () => {
    let urlList = []
    const day = new Date()
    let imageList = []
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `/pet/${images[i].name}${day}`)

      const result = await uploadBytes(imageRef, images[i])

      const downloadURL = await getDownloadURL(imageRef)

      imageList.push(downloadURL)
    }
    setImageShow(imageList[0])
  }

  function submit() {
    if (validate) {
      const storedUserDetail = JSON.parse(localStorage.getItem('userpetalert'))
      console.log(storedUserDetail)
      informSer.mutate(
        {
          message: detail,
          pets_id: data.id,
          users_id: storedUserDetail.user.id,
          image: imageShow,
        },
        {
          onSuccess: (response) => {
            console.log(response)
            setVisible(false)
            setVisibleSuccess(true)
            setImages([])
            setDetail('')
          },
        }
      )
    }
  }
  return (
    <Observer>
      {() => (
        <div>
          <div
            onClick={() => setVisible(true)}
            className="h-[40px] px-4 rounded-xl flex items-center py-2 drop-shadow-md text-white text-center  hover:bg-[#df523c] cursor-pointer bg-[#EB6E5A]"
          >
            {data.type === 'LOST_PET' ? 'แจ้งข้อมูล' : 'นี่คือสัตว์เลี้ยงของฉัน'}
          </div>

          <Dialog
            visible={visible}
            onHide={() => setVisible(false)}
            style={{ width: '25vw', padding: '0px' }}
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            content={({ hide }) => (
              <div>
                <div className="w-full bg-[#E3462C] py-3 rounded-t-lg text-white text-[20px] text-center">แจ้งเบาะแส</div>
                <div className="bg-white flex flex-col gap-3 rounded-b-lg p-4">
                  <div>
                    <span>รายละเอียด * </span>{' '}
                    <span className="text-[12px] text-[#767676]">โปรดระบุ ลักษณะสัตว์ สถานที่พบหรือหาย ช่องทางการติดต่อ ฯลฯ </span>
                  </div>
                  <textarea
                    maxLength={500}
                    value={detail}
                    onChange={(e) => {
                      setDetail(e.target.value)
                    }}
                    className=" rounded-md bg-gray-200 h-[100px] w-full"
                  />
                  <div className="">รูปภาพสัตว์เลี้ยงที่พบ หรือ ตามหา * </div>
                  <label
                    style={{ zoom: 0.5 }}
                    htmlFor="dropzone-file"
                    className="relative flex flex-col justify-center items-center w-full h-13  rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:border bg-white dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <img src={imageShow} className="w-[300px] object-contain " />
                    <div className="flex flex-col justify-center items-center pt-6 pb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">upload file</span>
                      </p>
                    </div>
                    <input
                      type="file"
                      id="dropzone-file"
                      className="hidden"
                      onChange={(event) => {
                        const files = Array.from(event.target.files)
                        setImages(files)
                      }}
                    />
                  </label>
                  <div className="flex justify-center">
                    <div
                      onClick={() => submit()}
                      className={'px-4 py-1.5 rounded-xl text-white cursor-pointer ' + (validate() ? ' bg-[#E3462C] ' : ' bg-gray-400')}
                    >
                      ยืนยัน
                    </div>
                    <div onClick={() => setVisible(false)} className="bg-gray-400 px-4 py-1.5 rounded-xl text-white cursor-pointer ml-2">
                      ยกเลิก
                    </div>
                  </div>
                </div>
              </div>
            )}
          ></Dialog>

          <Dialog
            visible={visibleSuccess}
            onHide={() => setVisibleSuccess(false)}
            style={{ width: '25vw', padding: '0px' }}
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            content={({ hide }) => (
              <div>
                <div className="bg-white flex flex-col gap-3 rounded-lg p-4">
                  <div className="flex flex-col items-center  justify-center">
                    <BadgeCheck size={88} color="#1a9e00" />
                    <div className="text-[25px] font-bold">แจ้งเบาะแสสำเร็จ</div>
                    <div onClick={() => setVisibleSuccess(false)} className={'mt-4 px-4 py-1.5 rounded-xl text-white cursor-pointer bg-[#E3462C]'}>
                      ยืนยัน
                    </div>
                  </div>
                </div>
              </div>
            )}
          ></Dialog>
        </div>
      )}
    </Observer>
  )
}
