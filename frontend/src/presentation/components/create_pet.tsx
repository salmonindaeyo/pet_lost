import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Plus, SquarePen } from 'lucide-react'
import { Calendar } from 'primereact/calendar'
import { useProvince, useAmphure, useTambons } from 'src/data/api/province.hook'
import { useAddPet, useUpdatePet } from 'src/data/api/pet.hook'
import { Dropdown } from 'primereact/dropdown'
import { storage } from 'src/core/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const CreatePet = ({ type, fetchPetList, data }) => {
  const [visible, setVisible] = useState(false)
  const [province, setProvince] = useState(null)
  const [amphure, setAmphure] = useState(null)
  const [tambon, setTambon] = useState(null)
  const [imageListShow, setImageListShow] = useState([])
  const [images, setImages] = useState([])
  const gender = [
    { name: 'ชาย', value: 'Male' },
    { name: 'หญิง', value: 'Female' },
  ]

  const addpetSer = useAddPet()
  const editpetSer = useUpdatePet(data?.id)

  useEffect(() => {
    if (data) {
      let initData = data
      initData.lost_date = new Date(data.lost_date)
      setPetDetail(initData)
      setProvince(initData.province_name)
      setAmphure(initData.amphure_name)
      setTambon(initData.tambon_name)
    }
  }, [visible])

  const [petDetail, setPetDetail] = useState({
    name: '',
    lost_date: new Date(),
    gender: { name: '', value: '' },
    color: '',
    age: '',
    reward: '',
    address: '',
    description: '',
    image: '',
    species: '',
  })
  useEffect(() => {
    console.log(petDetail)
  }, [petDetail])
  const provinceSer = useProvince()
  const amphuresSer = useAmphure(
    {
      id: province?.id,
    },
    {
      queryKey: ['amphure', province?.id],
      enabled: false,
    }
  )

  const tambonsSer = useTambons(
    {
      id: amphure?.id,
    },
    {
      queryKey: ['amphure', province?.id],
      enabled: false,
    }
  )

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }
  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    )
  }

  const footerContent = (
    <div>
      <div
        className={
          ' rounded-2xl py-2 drop-shadow-md text-white text-center ' +
          (validateData() ? ' hover:bg-[#df523c] cursor-pointer bg-[#EB6E5A] ' : ' bg-gray-300 cursor-not-allowed ')
        }
        onClick={() => submit()}
      >
        ยืนยัน
      </div>
    </div>
  )

  useEffect(() => {
    if (province) {
      amphuresSer.refetch()
    }
  }, [province])

  useEffect(() => {
    if (amphure) {
      tambonsSer.refetch()
    }
  }, [amphure])

  useEffect(() => {
    uploadFiles()
  }, [images])
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
    setPetDetail({
      ...petDetail,
      image: imageList[0],
    })
  }

  function submit() {
    const storedUserDetail = JSON.parse(localStorage.getItem('userpetalert'))
    const dataFetch = {
      name: petDetail.name,
      image: petDetail.image,
      status: 'LOST',
      species: petDetail.species,
      color: petDetail.color,
      age: petDetail.age,
      description: petDetail.description,
      reward: petDetail.reward,
      gender: petDetail.gender,
      type: type === 'EDIT' ? data.type : type,
      petCategory_id: 1,
      users_id: storedUserDetail.user.id,
      provinces_id: province.id || data.province_id,
      amphures_id: amphure.id || data.amphure_id,
      tambons_id: tambon.id || data.tambon_id,
      address: petDetail.address,
      lost_date: petDetail.lost_date,
      areas_id: data.areas_id,
    }
    if (validateData()) {
      if (type === 'EDIT') {
        editpetSer.mutate(dataFetch, {
          onSuccess: (response) => {
            reset()
          },
        })
      } else {
        addpetSer.mutate(dataFetch, {
          onSuccess: (response) => {
            reset()
          },
        })
      }
    }
  }

  function reset() {
    fetchPetList.refetch()
    setPetDetail({
      name: '',
      lost_date: new Date(),
      gender: { name: '', value: '' },
      color: '',
      age: '',
      reward: '',
      address: '',
      description: '',
      image: '',
      species: '',
    })
    setProvince(null)
    setAmphure(null)
    setTambon(null)
    setVisible(false)
  }

  function validateData() {
    if (!province || !amphure || !tambon) {
      return false
    }
    if (!petDetail.image) {
      return false
    }
    for (const key in petDetail) {
      if (petDetail.hasOwnProperty(key) && petDetail[key] === '') {
        return false
      }
    }

    return true
  }

  return (
    <Observer>
      {() => (
        <div className={type === 'EDIT' && 'w-full'}>
          {type === 'EDIT' ? (
            <div
              onClick={() => setVisible(true)}
              className="hover:bg-[#b4351e] cursor-pointer rounded-t-2xl pt-2 w-full flex text-[14px] flex-col gap-1 items-center"
            >
              <SquarePen color="#ffffff" />
              แก้ไขข้อมูล
            </div>
          ) : (
            <div
              className="bg-[#EB6E5A] hover:scale-110 transition-all cursor-pointer flex items-center flex-col justify-center h-[250px] w-[250px] rounded-2xl text-white"
              onClick={() => setVisible(true)}
            >
              <Plus size={102} color="#ffffff" /> ฉันต้องการประกาศ
            </div>
          )}

          <Dialog style={{ width: '700px' }} header="ประกาศตามหาสัตว์หาย" visible={visible} onHide={() => setVisible(false)} footer={footerContent}>
            <div className="flex flex-col gap-4">
              <div className="flex">
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">ชื่อสัตว์เลี้ยง</div>
                  <input
                    value={petDetail.name}
                    onChange={(e) => {
                      setPetDetail({
                        ...petDetail,
                        name: e.target.value,
                      })
                    }}
                    type="text"
                    className="border bg-white w-[200px] rounded-md"
                  />
                </div>
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">วันที่หาย</div>
                  <Calendar
                    inputClassName="custom-placeholder"
                    placeholder=""
                    className="border  w-[200px] font-light py-1 px-2 rounded-md"
                    id="buttondisplay"
                    value={petDetail.lost_date}
                    onChange={(e) => {
                      setPetDetail({
                        ...petDetail,
                        lost_date: e.target.value,
                      })
                    }}
                    showIcon
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">เพศ</div>
                  <Dropdown
                    value={petDetail.gender}
                    onChange={(e) => {
                      setPetDetail({
                        ...petDetail,
                        gender: e.target.value,
                      })
                    }}
                    options={gender}
                    optionLabel="name"
                    placeholder=""
                    className="w-[200px] focus:ring-0 outline-none border rounded-md"
                    style={{ boxShadow: 'none' }}
                  />
                </div>
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">สี</div>
                  <input
                    value={petDetail.color}
                    onChange={(e) => {
                      setPetDetail({
                        ...petDetail,
                        color: e.target.value,
                      })
                    }}
                    type="text"
                    className="py-1 w-[200px] border bg-white rounded-md"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">อายุ</div>
                  <input
                    value={petDetail.age}
                    onChange={(e) => {
                      setPetDetail({
                        ...petDetail,
                        age: e.target.value,
                      })
                    }}
                    type="number"
                    className="py-1 w-[200px] border bg-white rounded-md"
                  />
                </div>
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">รางวัล</div>
                  <input
                    value={petDetail.reward}
                    maxLength={250}
                    onChange={(e) => {
                      setPetDetail({
                        ...petDetail,
                        reward: e.target.value,
                      })
                    }}
                    type="text"
                    className="py-1 w-[200px] border bg-white rounded-md"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">จังหวัด</div>
                  <Dropdown
                    value={province}
                    onChange={(e) => setProvince(e.value)}
                    options={provinceSer.data}
                    optionLabel="name"
                    placeholder={province}
                    filter
                    valueTemplate={selectedCountryTemplate}
                    itemTemplate={countryOptionTemplate}
                    className="w-[200px] focus:ring-0 outline-none border rounded-md"
                    style={{ boxShadow: 'none' }}
                  />
                </div>
                <div className={'w-1/2 flex gap-2 ' + (!province && ' cursor-not-allowed')}>
                  <div className="w-[100px]">อำเภอ</div>
                  <Dropdown
                    value={amphure}
                    onChange={(e) => setAmphure(e.value)}
                    options={amphuresSer?.data}
                    optionLabel="name"
                    placeholder={amphure}
                    filter
                    valueTemplate={selectedCountryTemplate}
                    itemTemplate={countryOptionTemplate}
                    className="w-[200px] focus:ring-0 outline-none border rounded-md"
                    style={{ boxShadow: 'none' }}
                    disabled={!province}
                  />
                </div>
              </div>
              <div className="flex">
                <div className={'w-1/2 flex gap-2 ' + (!amphure && ' cursor-not-allowed')}>
                  <div className="w-[100px]">ตำบล</div>
                  <Dropdown
                    value={tambon}
                    onChange={(e) => setTambon(e.value)}
                    options={tambonsSer?.data}
                    optionLabel="name"
                    placeholder={tambon}
                    filter
                    valueTemplate={selectedCountryTemplate}
                    itemTemplate={countryOptionTemplate}
                    className={'w-[200px] focus:ring-0 outline-none border rounded-md'}
                    style={{ boxShadow: 'none' }}
                    disabled={!amphure}
                  />
                </div>
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">ที่อยู่</div>
                  <input
                    value={petDetail.address}
                    onChange={(e) => {
                      setPetDetail({
                        ...petDetail,
                        address: e.target.value,
                      })
                    }}
                    type="text"
                    className="py-1 w-[200px] border bg-white rounded-md"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">สายพันธ์ุ</div>
                  <input
                    value={petDetail.species}
                    onChange={(e) => {
                      setPetDetail({
                        ...petDetail,
                        species: e.target.value,
                      })
                    }}
                    type="text"
                    className="border bg-white w-[200px] h-[35px] rounded-md"
                  />
                </div>
                <div className="w-1/2 flex gap-4 ">
                  <div className="">รายละเอียดเพิ่มเติม</div>
                  <textarea
                    value={petDetail.description}
                    onChange={(e) => {
                      setPetDetail({
                        ...petDetail,
                        description: e.target.value,
                      })
                    }}
                    className="py-1 w-full border bg-white rounded-md"
                  />
                </div>
              </div>
              <div className="justify-center items-center w-full">
                อัพโหลดรูป
                <label
                  style={{ zoom: 0.5 }}
                  htmlFor="dropzone-file"
                  className="relative flex flex-col justify-center items-center w-full h-13 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:border bg-white dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <img src={petDetail.image} className="w-[300px] object-contain " />
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
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </Observer>
  )
}
