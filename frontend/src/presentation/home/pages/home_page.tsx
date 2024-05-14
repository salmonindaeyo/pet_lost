import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'
import { setCookie, getCookie, deleteCookie } from 'src/core/utils/cookie'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PawPrint } from 'lucide-react'

export const HomePage = () => {
  return (
    <Observer>
      {() => (
        <div className="w-full h-screen  flex flex-col gap-4">
          <div className="flex justify-center mt-6">
            <div className="relative flex flex-col w-1/2 items-center justify-center text-[40px] font-bold">
              <span>We're here to help</span>
              <span>you find your pet !</span>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/pettttt%2FFindMyPet%202.png?alt=media&token=cfedc28a-8eaf-43b3-9047-c753be9f036b"
                className="absolute left-0 top-0"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/pettttt%2FFindMyPet%204.png?alt=media&token=3b8e7a4d-4d2b-4ddc-b4c0-2719a802ba38"
                className="absolute right-0 bottom-0"
              />
            </div>
            <img
              className="w-[600px]"
              src="https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/pettttt%2FGroup%202.png?alt=media&token=b80a2913-70a7-4ff0-a7ef-64a4c4ea524e"
            />
          </div>
          <div className="text-center bg-[#FFFBEC] py-7">
            <div className="text-[20px] font-bold">
              เราสามารถ<span className="text-[#E3462C]">ประกาศและค้นหา</span>อะไรได้บ้าง ?
            </div>
            <div className="flex gap-4 mt-6   w-full justify-center">
              <div className="bg-[#EFEFEF] flex flex-col items-center p-4 rounded-xl drop-shadow-lg">
                <img src="https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/pettttt%2FGroup%201.png?alt=media&token=2e927d3d-c72b-45fc-a909-a1be97b662e9"></img>
                <div className="bg-[#3A2950] text-white rounded-2xl w-fit px-4 py-2">สัตว์เลี้ยงหาย</div>
              </div>
              <div className="bg-[#EFEFEF] w-[290px] flex flex-col items-center p-4 rounded-xl drop-shadow-lg">
                <img src="https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/pettttt%2FGirl%20trains%20a%20dog.png?alt=media&token=1283714f-2346-48b6-8932-972174db8e8d"></img>
                <div className="bg-[#3A2950] text-white rounded-2xl w-fit px-4 py-2">ตามหาเจ้าของ</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-[20px] mt-10 font-bold">
              เรา<span className="text-[#E3462C]">ช่วยเหลือ</span>คุณได้อย่างไรบ้าง ?
              <div className="flex pb-10 gap-6 w-full justify-center">
                <img
                  className="w-[400px] object-contain mt-4"
                  src="https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/pettttt%2FGroup%203.png?alt=media&token=b780abbf-1366-4156-9a5a-f00fe5befaf7"
                />
                <div className="flex mt-8  gap-4 flex-col">
                  <div className="border-2 border-black flex flex-col rounded-xl px-6 py-4 ">
                    <div className="text-[16px] items-center mb-2 flex gap-2">
                      <PawPrint size={28} className="bg-[#E3462C] rounded-full p-1" color="white" />
                      มีการระบุหมดหมู่ของสัตว์ และการระบุพื้นที่
                    </div>
                    <div className="text-[14px] font-light">ช่วยในการคัดกรองข้อมูล และสามารถตามหาสัตว์เลี้ยงได้ง่ายขึ้น</div>
                  </div>
                  <div className="border-2 border-black flex flex-col rounded-xl px-6 py-4 ">
                    <div className="text-[16px] items-center mb-2 flex gap-2">
                      <PawPrint size={28} className="bg-[#E3462C] rounded-full p-1" color="white" />
                      ผู้ใช้งานสามารถโพสต์ประกาศได้ทันที
                    </div>
                    <div className="text-[14px] font-light">ลงข้อมูลผ่านเว็บไซต์ได้อย่างรวดเร็ว โดยไม่ต้องรอการอนุมัตินาน</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  )
}
