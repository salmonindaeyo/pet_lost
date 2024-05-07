import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'
import { useRouter } from 'next/navigation'
import { useLogin } from 'src/data/api/login.hook'
import { Loading } from 'src/presentation/components/loading'
import { ArrowRightSquare, Mail, Phone } from 'lucide-react'
import { InputText } from 'primereact/inputtext'
import { ProgressBar } from 'primereact/progressbar'

export const WarrantyPage = () => {
  const [userDetailData, setUserDetailData] = useState({
    name: '',
    phone: '',
    email: '',
  })

  return (
    <Observer>
      {() => (
        <div className="h-screen relative">
          <div className="h-[300px]" style={{ backgroundImage: 'linear-gradient(90deg, #790004 13%, #FF3E3E 90%)' }}></div>

          <div className="absolute top-0 w-full px-3">
            <div className="w-full text-center mt-[50px]">
              <div className="text-white text-[24px]">ใบรับประกัน</div>
              <div className="text-white text-[16px] font-light">รายการใบรับประกันที่ลงทะเบียนทั้งหมด</div>
            </div>
            <div className="bg-white rounded-2xl w-full py-4 px-2 mt-[36px] drop-shadow-lg">
              <div className="flex flex-col items-center pb-4 border-b border-gray-100">
                <img className="w-[100px]" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/QR_Code_example.png" alt="qr" />
                <div className="text-gray-500 font-bold">N P 0 0 0 1 2 3</div>
              </div>
              <div className="py-2 flex flex-col gap-4">
                <div className="text-[#35363A] font-bold">คุณ Nathawat Thumthiwong</div>
                <div className="flex flex-row gap-2">
                  <div className="flex">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#FFF2F4] p-1.5 rounded-full">
                        <Phone size={20} color="#ff0000" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-[#8C8A8E] font-light text-[12px]">เบอร์โทรศัพท์</div>
                        <div className="text-[#35363A] text-[14px] font-medium">086-423-4323</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FFF2F4] p-1.5 rounded-full">
                        <Mail size={20} color="#ff0000" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-[#8C8A8E] font-light text-[12px]">อีเมล</div>
                        <div className="text-[#35363A] text-[14px] font-medium">test@gmail.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="border flex flex-col gap-2 rounded-xl py-4 px-2 font-light">
                  <div className="text-[12px] text-[#35363A]"> ระยะเวลาประกันสีที่เหลือ </div>
                  <div className="font-light">
                    สิ้นสุดประกัน <span className="font-bold text-[#35363A] ml-1"> 31/12/25667</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <ProgressBar className="rounded-xl h-[10px] w-4/5" value={50} showValue={false} color={'#00841C'}></ProgressBar>{' '}
                    <div className="text-[12px]">200 วัน </div>
                  </div>
                </div>
                <div className="border flex flex-col gap-2 rounded-xl py-4 px-2 font-light">
                  <div className="border-b pb-2 border-gray-100">
                    <div className="text-[12px] text-[#35363A]"> รถยนต์ </div>
                    <div className="text-[#35363A] font-medium">Toyota CHR (7กฏ8203)</div>
                  </div>
                  <div className="border-b pb-2 border-gray-100">
                    <div className="text-[12px] text-[#35363A]"> ร้านค้า </div>
                    <div className="text-[#35363A] font-medium">บจ. เจ.เอส เรชชิ่ง วีล</div>
                  </div>
                  <div className="border-b pb-2 border-gray-100">
                    <div className="text-[12px] text-[#35363A]"> รุ่นที่ซื้อ </div>
                    <div className="text-[#35363A] font-medium">-</div>
                  </div>
                  <div className="border-b pb-2 border-gray-100">
                    <div className="text-[12px] text-[#35363A]"> ชุดล้อหน้า </div>
                    <div className="text-[#35363A] font-medium">NK Performance NK30(RE-30) </div>
                    <div className="text-[#35363A] font-medium">NK30(RE-30) 18x8.5" 5H114.3 ET35 Dark </div>
                  </div>
                  <div className=" pb-2 border-gray-100">
                    <div className="text-[12px] text-[#35363A]"> ชุดล้อหน้า </div>
                    <div className="text-[#35363A] font-medium">NK Performance NK30(RE-30) </div>
                    <div className="text-[#35363A] font-medium">NK30(RE-30) 18x8.5" 5H114.3 ET35 Dark </div>
                  </div>
                </div>
                <div className="border flex flex-col gap-2 rounded-xl py-4 px-2 font-light">
                  <div className="border-b pb-2 border-gray-100">
                    <div className="text-[12px] text-[#35363A]"> วันที่ซื้อ </div>
                    <div className="text-[#35363A] font-medium">02/01/2567</div>
                  </div>
                  <div className=" pb-2 border-gray-100">
                    <div className="text-[12px] text-[#35363A]"> วันที่ลงทะเบียน </div>
                    <div className="text-[#35363A] font-medium">02/01/2567</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#ED1C24] font-light text-white text-center my-4 py-2 rounded-xl">เพิ่มใบรับประกัน</div>
          </div>
        </div>
      )}
    </Observer>
  )
}
