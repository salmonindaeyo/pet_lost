import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { Observer } from 'mobx-react-lite'
import { Dropdown } from 'primereact/dropdown'

export const WheelDetail = ({ setValue, value, type, productColor }) => {
  useEffect(() => {}, [])
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
    <Observer>
      {() => (
        <div className="flex flex-col gap-2">
          <div className="font-bold"> {type === 'front_wheel' ? 'รุ่นล้อแมกซ์ชุดล้อหน้า' : 'รุ่นล้อแมกซ์ชุดล้อหลัง'}</div>
          {/* <div className="card font-light flex justify-content-center">
            <Dropdown
              value={value}
              onChange={(e) => setValue(e.value)}
              options={dealer}
              optionLabel="name"
              placeholder="แบรนด์"
              filter
              valueTemplate={selectedCountryTemplate}
              itemTemplate={countryOptionTemplate}
              className="w-full  focus:ring-0 outline-none border rounded-md"
              style={{ boxShadow: 'none' }}
            />
          </div>
          <div className="card font-light flex justify-content-center">
            <Dropdown
              value={value}
              onChange={(e) => setValue(e.value)}
              options={dealer}
              optionLabel="name"
              placeholder="โมเดล"
              filter
              valueTemplate={selectedCountryTemplate}
              itemTemplate={countryOptionTemplate}
              className="w-full  focus:ring-0 outline-none border rounded-md"
              style={{ boxShadow: 'none' }}
            />
          </div> */}
          {/* <div className="card font-light flex justify-content-center">
            <Dropdown
              value={value[type].size}
              onChange={(e) => {
                setValue({
                  ...value,
                  front_wheel: {
                    ...value[type],
                    size: e.target.value,
                  },
                })
              }}
              options={dealer}
              optionLabel="name"
              placeholder="ขนาด"
              filter
              valueTemplate={selectedCountryTemplate}
              itemTemplate={countryOptionTemplate}
              className="w-full  focus:ring-0 outline-none border rounded-md"
              style={{ boxShadow: 'none' }}
            />
          </div>
          <div className="card font-light flex justify-content-center">
            <Dropdown
              value={value[type].pcd}
              onChange={(e) => setValue(e.value)}
              options={dealer}
              optionLabel="name"
              placeholder="PCD"
              filter
              valueTemplate={selectedCountryTemplate}
              itemTemplate={countryOptionTemplate}
              className="w-full  focus:ring-0 outline-none border rounded-md"
              style={{ boxShadow: 'none' }}
            />
          </div>
          <div className="card font-light flex justify-content-center">
            <Dropdown
              value={value[type].offset}
              onChange={(e) => setValue(e.value)}
              options={dealer}
              optionLabel="name"
              placeholder="Offset"
              filter
              valueTemplate={selectedCountryTemplate}
              itemTemplate={countryOptionTemplate}
              className="w-full  focus:ring-0 outline-none border rounded-md"
              style={{ boxShadow: 'none' }}
            />
          </div> */}
          <div className="card font-light flex justify-content-center">
            <Dropdown
              value={value[type].color}
              onChange={(e) => setValue(e.value)}
              options={productColor}
              optionLabel="name"
              placeholder="สี"
              filter
              valueTemplate={selectedCountryTemplate}
              itemTemplate={countryOptionTemplate}
              className="w-full  focus:ring-0 outline-none border rounded-md"
              style={{ boxShadow: 'none' }}
            />
          </div>
        </div>
      )}
    </Observer>
  )
}
