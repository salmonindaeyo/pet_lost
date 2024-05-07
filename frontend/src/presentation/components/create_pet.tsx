import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Plus } from 'lucide-react'
import { Calendar } from 'primereact/calendar'

export const CreatePet = ({ type }) => {
  const [visible, setVisible] = useState(false)
  const footerContent = (
    <div>
      <div
        className=" cursor-pointer rounded-2xl py-2 drop-shadow-md text-white text-center hover:bg-[#df523c] bg-[#EB6E5A]"
        onClick={() => setVisible(false)}
      >
        {' '}
        ยืนยัน{' '}
      </div>
    </div>
  )

  return (
    <Observer>
      {() => (
        <div>
          <div
            className="bg-[#EB6E5A] hover:scale-110 transition-all cursor-pointer flex items-center flex-col justify-center h-[250px] w-[250px] rounded-2xl text-white"
            onClick={() => setVisible(true)}
          >
            <Plus size={102} color="#ffffff" /> ฉันต้องการประกาศ
          </div>
          <Dialog style={{ width: '700px' }} header="ประกาศตามหาสัตว์หาย" visible={visible} onHide={() => setVisible(false)} footer={footerContent}>
            <div className="flex flex-col gap-4">
              <div className="flex">
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">ชื่อสัตว์เลี้ยง</div>
                  <input type="text" className="border bg-white w-[200px] rounded-md" />
                </div>
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">วันที่หาย</div>
                  <Calendar
                    inputClassName="custom-placeholder"
                    placeholder=""
                    className="border  w-[200px] font-light py-1 px-2 rounded-md"
                    id="buttondisplay"
                    showIcon
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">เพศ</div>
                  <input type="text" className="py-1 w-[200px] border bg-white rounded-md" />
                </div>
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">สี</div>
                  <input type="text" className="py-1 w-[200px] border bg-white rounded-md" />
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">อายุ</div>
                  <input type="text" className="py-1 w-[200px] border bg-white rounded-md" />
                </div>
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">รางวัล</div>
                  <input type="text" className="py-1 w-[200px] border bg-white rounded-md" />
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">จังหวัด</div>
                  <input type="text" className="py-1 w-[200px] border bg-white rounded-md" />
                </div>
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">อำเภอ</div>
                  <input type="text" className="py-1 w-[200px] border bg-white rounded-md" />
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">ตำบล</div>
                  <input type="text" className="py-1 w-[200px] border bg-white rounded-md" />
                </div>
                <div className="w-1/2 flex gap-2">
                  <div className="w-[100px]">ที่อยู่</div>
                  <input type="text" className="py-1 w-[200px] border bg-white rounded-md" />
                </div>
              </div>
              <div className="flex">
                <div className="w-full ">
                  <div className="">รายละเอียดเพิ่มเติม</div>
                  <textarea className="py-1 w-full border bg-white rounded-md" />
                </div>
              </div>
              <div className="justify-center items-center w-full">
                อัพโหลดรูป
                <label
                  style={{ zoom: 0.5 }}
                  htmlFor="dropzone-file"
                  className="flex flex-col justify-center items-center w-full h-13 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:border bg-white dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
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
                      <span className="font-semibold">upload file</span>{' '}
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </Observer>
  )
}
