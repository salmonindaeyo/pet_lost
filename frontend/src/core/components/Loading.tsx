import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
export const Loading = () => {
  //---------------------
  //   I18n
  //---------------------
  const { t, i18n } = useTranslation()

  //---------------------
  //   CONTEXT
  //---------------------

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {}, [])

  //---------------------
  //   RENDER
  //---------------------
  return (
    <div>
      <div className="spinner center">
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
      </div>
    </div>
  )
}
