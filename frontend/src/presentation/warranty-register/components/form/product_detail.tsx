import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { WheelDetail } from './wheel_detail'

export const ProductDetail = ({ productDetailData, setProductDetailData }) => {
  const [selectedDealer, setSelectedDealer] = useState(null)
  const carManufacturers = [
    'Toyota',
    'Honda',
    'Nissan',
    'Mazda',
    'Mitsubishi',
    'Mercedes-Benz',
    'BMW',
    'Chevrolet',
    'Subaru',
    'Suzuki',
    'Isuzu',
    'MG',
    'Ford',
    'Peugeot',
    'Volkswagen',
    'Mini',
    'Lexus',
    'Volvo',
    'Land Rover',
    'Proton',
    'Audi',
    'Tata',
    'Alfa Romeo',
    'Hyundai',
    'Haval',
    'BYD',
    'Tesla',
    'Kia',
    'GWM',
    'Other',
  ]

  const dealer = ['ร้านค้า1', 'ร้านค้า2']

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }
  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option}</div>
      </div>
    )
  }
  return (
    <div className="w-full flex flex-col gap-2 text-[14px] p-4 font-light">
      <div className="flex flex-col gap-2">
        <div className="font-bold">ข้อมูลการซื้อสินค้า</div>
        <div className="card font-light flex justify-content-center">
          <Dropdown
            value={selectedDealer}
            onChange={(e) => setSelectedDealer(e.value)}
            options={dealer}
            optionLabel="name"
            placeholder="ร้านค้า"
            filter
            valueTemplate={selectedCountryTemplate}
            itemTemplate={countryOptionTemplate}
            className="w-full  focus:ring-0 outline-none border rounded-md"
            style={{ boxShadow: 'none' }}
          />
        </div>

        <div className="w-full">
          <Calendar
            inputClassName="custom-placeholder"
            placeholder="วันที่ซื้อ"
            className="border w-full font-light py-1 px-2 rounded-md"
            id="buttondisplay"
            showIcon
          />
        </div>
      </div>
    </div>
  )
}
