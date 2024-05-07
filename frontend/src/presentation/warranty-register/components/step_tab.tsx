import React from 'react'
import { useTranslation } from 'next-i18next'

export const StepTab = ({ step, stepList }) => {
  const currentStepIndex = stepList.indexOf(step) + 1
  const totalSteps = stepList.length

  return <div className="absolute text-[10px] text-[#696969] top-7 right-4 flex gap-2">{`ขั้นตอนที่ ${currentStepIndex} จาก ${totalSteps}`}</div>
}

const stepList = ['USER_DETAIL', 'CAR_DETAIL', 'PRODUCT_DETAIL', 'PICTURE']
const currentStep = 'USER_DETAIL'

;<StepTab step={currentStep} stepList={stepList} />
