import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'
import { setCookie, getCookie, deleteCookie } from 'src/core/utils/cookie'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { MapPinned, Trophy } from 'lucide-react'
import { Inform } from '../components/inform'
export const DetailPage = () => {
  const router = useRouter()
  const data = JSON.parse(router.query.detail as string)
  console.log(data)

  return (
    <Observer>
      {() => (
        <div className="w-full flex items-center   flex-col  ">
          <div className="w-full text-[20px] h-[70px] flex items-center px-4 text-white bg-[#3A2950]">
            {data.type === 'LOST_PET' ? 'สัตว์เลี้ยงหาย' : 'ตามหาเจ้าของ'}
          </div>
          <div className="flex justify-center w-full p-6 max-w-[1200px]">
            <div className="w-1/2">
              <img src={data.image} className="rounded-2xl w-[400px] object-cover" />
              <div className="flex flex-col gap-3 text-[20px] p-4 border-2 border-black mt-4 rounded-lg w-[400px]">
                <div className="flex gap-2">
                  <Trophy size={28} />
                  รางวัลตามหา
                </div>
                <div> {data.reward ? data.reward : '-'} </div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <div className="flex gap-4 items-center ">
                <div className="text-[36px] font-bold"> {data.name} </div>
                <div className="text-[30px] mt-1.5">{data.species}</div>
                <Inform data={data} />
              </div>
              <div className="bg-gray-200 p-4 flex-col gap-6 rounded-xl">
                <div className="flex">
                  <div className="w-1/2 flex">
                    <div className="w-[100px] font-bold">สายพันธุ์</div>
                    <div> {data.species}</div>
                  </div>
                  <div className="w-1/2 flex">
                    <div className="w-[100px] font-bold">เพศ</div>
                    <div> {data.gender === 'Female' ? 'หญิง' : 'ชาย'}</div>
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="w-1/2 flex">
                    <div className="w-[100px] font-bold">อายุ</div>
                    <div> {data.age} ปี</div>
                  </div>
                  <div className="w-1/2 flex">
                    <div className="w-[100px] font-bold">สี</div>
                    <div> {data.color}</div>
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="flex">
                    <div className="w-[100px] font-bold">วันที่หาย</div>
                    <div>
                      {new Date(data.lost_date).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-bold mb-2">รายละเอียดเพิ่มเติม</div>
                  {data.description}
                </div>

                <div className="mt-4">
                  <div className="font-bold mb-2 flex gap-2 item-center">
                    <MapPinned size={28} /> <div className="mt-0.5"> สถานที่หาย </div>
                  </div>
                  {data.province_name + ' ' + data.amphure_name + ' ' + data.tambon_name}
                  <br />
                  <span className="font-light mt-2">ที่อยู่เพิ่มเติม : {data.address} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  )
}
