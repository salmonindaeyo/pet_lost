import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'

export const UserDetail = ({ userDetailData, setUserDetailData }) => {
  useEffect(() => {}, [])

  function validateEmail() {
    if (userDetailData.email.length > 0) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const isEmailValid = emailPattern.test(userDetailData.email)
      if (!isEmailValid) {
        return true
      }
    }
  }

  return (
    <div className="w-full  flex flex-col gap-2 text-[14px] p-4">
      <div className="">กรอกข้อมูลส่วนตัว</div>
      <input
        value={userDetailData.name}
        onChange={(e) => {
          setUserDetailData({
            ...userDetailData,
            name: e.target.value,
          })
        }}
        className="border font-light w-full rounded-md px-2 py-1"
        placeholder="ชื่อ-นามสกุล"
      />
      <input
        value={userDetailData.phone}
        onChange={(e) => {
          setUserDetailData({
            ...userDetailData,
            phone: e.target.value,
          })
        }}
        type="number"
        className="border font-light w-full rounded-md px-2 py-1"
        placeholder="เบอร์โทรศัพท์"
      />
      <div>
        <input
          value={userDetailData.email}
          onChange={(e) => {
            setUserDetailData({
              ...userDetailData,
              email: e.target.value,
            })
          }}
          type="email"
          className="border font-light w-full rounded-md px-2 py-1"
          placeholder="อีเมล"
        />
        {validateEmail() && <div className="text-red-500 text-[10px] py-1 ">*อีเมลไม่ถูกต้อง</div>}
      </div>
    </div>
  )
}
