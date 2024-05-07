import React, { useEffect, useState } from 'react'
import { useStore } from 'src/data/providers/app_store_provider'
import { useRouter } from 'next/navigation'
import { ArrowRightSquare } from 'lucide-react'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Consent } from '../components/consent'
import { UserDetail } from '../components/form/user_detail'
import { CarDetail } from '../components/form/car_detail'
import { PictureDetail } from '../components/form/picture_detail'
import { ProductDetail } from '../components/form/product_detail'

import { Header } from '../components/header'
import { Loading } from 'src/core/components/Loading'
import { StepTab } from '../components/step_tab'

const stepList = ['USER_DETAIL', 'CAR_DETAIL', 'PRODUCT_DETAIL', 'PICTURE']
export const WarrantyRegister = () => {
  const [isApplyConsent, setIsApplyConsent] = useState(false)
  const [checked, setChecked] = useState(false)
  const [step, setStep] = useState('USER_DETAIL')

  const [userDetailData, setUserDetailData] = useState({
    name: '',
    phone: '',
    email: '',
  })

  const [carDetailData, setCarDetailData] = useState({
    Brand: '',
    model: '',
    license: '',
  })

  const [productDetailData, setProductDetailData] = useState({
    store: '',
    boughtDate: '',
    front_wheel: {
      brand: '',
      model: '',
      size: '',
      pcd: '',
      offset: '',
      color: '',
    },
    back_wheel: {
      brand: '',
      model: '',
      size: '',
      pcd: '',
      offset: '',
      color: '',
    },
  })

  useEffect(() => {
    console.log('🚀 ~ WarrantyRegister ~ carDetailData:', carDetailData)
  }, [carDetailData])

  function validateData() {
    if (step === 'USER_DETAIL') {
      const isNotEmpty = Object.values(userDetailData).every((value) => value.trim() !== '')
      if (!isNotEmpty) {
        return false
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const isEmailValid = emailPattern.test(userDetailData.email)
      if (!isEmailValid) {
        return false
      }
      return true
    }

    if (step === 'CAR_DETAIL') {
      return true
    }
    return true
  }

  function addData() {
    // setStep('LOADING')
    // if (step === 'USER_DETAIL') {
    //   const check = fetchUserDetail()
    //   if (check) {
    //     nextStep()
    //   }
    // }
    nextStep()
  }

  function fetchUserDetail() {
    return true
  }

  function nextStep() {
    if (validateData()) {
      const currentIndex = stepList.indexOf(step)
      const nextIndex = currentIndex + 1
      if (nextIndex < step.length) {
        setTimeout(() => {
          setStep(stepList[nextIndex])
        }, 1000)
      }
    }
  }

  return (
    <>
      {isApplyConsent ? (
        <div className="flex flex-col relative w-screen h-screen items-center bg-[#FAFAFA] pt-[70px] ">
          {step !== 'LOADING' && <StepTab step={step} stepList={stepList} />}
          <div className="mb-[20px]">
            <Header />
          </div>
          <div className="w-full h-full flex flex-col justify-between pb-6">
            <div className="bg-white">
              {step === 'USER_DETAIL' && <UserDetail userDetailData={userDetailData} setUserDetailData={setUserDetailData} />}
              {step === 'CAR_DETAIL' && <CarDetail carDetailData={carDetailData} setCarDetailData={setCarDetailData} />}
              {step === 'LOADING' && <Loading />}
              {step === 'PRODUCT_DETAIL' && <ProductDetail productDetailData={productDetailData} setProductDetailData={setProductDetailData} />}
              {step === 'PICTURE' && <PictureDetail />}
            </div>

            <div className="px-4">
              <div
                onClick={() => validateData() && addData()}
                className={(validateData() ? 'bg-[#E30000]' : 'bg-[#C6C6C6]') + ' transition-all w-full text-center rounded-md py-2  text-white'}
              >
                ถัดไป
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Consent checked={checked} setChecked={setChecked} setIsApplyConsent={setIsApplyConsent} />
      )}
    </>
  )
}
