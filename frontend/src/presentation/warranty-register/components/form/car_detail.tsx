import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'

export const CarDetail = ({ carDetailData, setCarDetailData }) => {
  useEffect(() => {}, [])

  const [selectedCarBrand, setSelectedCarBrand] = useState(null)
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
      <div className="">ข้อมูลรถยนต์</div>
      <div className="card font-light flex justify-content-center">
        <Dropdown
          value={selectedCarBrand}
          onChange={(e) => setSelectedCarBrand(e.value)}
          options={carManufacturers}
          optionLabel="name"
          placeholder="ยี่ห้อรถยนต์"
          filter
          valueTemplate={selectedCountryTemplate}
          itemTemplate={countryOptionTemplate}
          className="w-full  focus:ring-0 outline-none border rounded-md"
          style={{ boxShadow: 'none' }}
        />
      </div>
      <input
        value={carDetailData.phone}
        onChange={(e) => {
          setCarDetailData({
            ...carDetailData,
            model: e.target.value,
          })
        }}
        className="border font-light w-full rounded-md px-2 py-2"
        placeholder="รุ่นที่ซื้อ"
      />
      <div>
        <input
          value={carDetailData.email}
          onChange={(e) => {
            setCarDetailData({
              ...carDetailData,
              license: e.target.value,
            })
          }}
          className="border font-light w-full rounded-md px-2 py-2"
          placeholder="ทะเบียนรถยนต์
          "
        />
      </div>
    </div>
  )
}
