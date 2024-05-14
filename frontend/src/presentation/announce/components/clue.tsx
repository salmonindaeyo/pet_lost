import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { Phone, Search } from 'lucide-react'
import { useInform } from 'src/data/api/inform.hook'
import { Dialog } from 'primereact/dialog'

export const Clue = ({ id }) => {
  const informSer = useInform(id)
  const [visible, setVisible] = useState(false)

  return (
    <Observer>
      {() => (
        <div className="w-full">
          <div onClick={() => setVisible(true)} className="flex text-[14px] w-full cursor-pointer hover:bg-[#b4351e] flex-col gap-1 items-center">
            <Search color="#ffffff" />
            เบาะแส
          </div>
          <Dialog
            visible={visible}
            onHide={() => setVisible(false)}
            style={{ width: '55vw', padding: '0px' }}
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            content={({ hide }) => (
              <div>
                <div className="w-full bg-[#E3462C] py-3 rounded-t-lg text-white text-[20px] text-center">แจ้งเบาะแส</div>
                <div className="bg-white flex  flex-col gap-3 rounded-b-lg p-4">
                  <div className="h-[400px] overflow-auto px-4 gap-4 flex flex-col">
                    {informSer.data.map((item, index) => (
                      <div key={index}>
                        <div className="flex gap-4">
                          <img src={item.image} className="w-[200px] object-cover h-[200px] rounded-lg" />
                          <div className="flex flex-col w-full">
                            <div className="flex w-full justify-between">
                              <div>
                                Write by <span className="font-bold">{item.name}</span>{' '}
                              </div>
                              <div className="flex gap-2">
                                <Phone color="#000000" /> {item.phone}
                              </div>
                            </div>
                            <div className="bg-gray-200 rounded-lg mt-2 p-4">
                              <div className=" h-[120px] overflow-auto">{item.message}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <div onClick={() => setVisible(false)} className="bg-gray-400 px-4 py-1.5 rounded-xl text-white cursor-pointer ml-2">
                      ปิด
                    </div>
                  </div>
                </div>
              </div>
            )}
          ></Dialog>
        </div>
      )}
    </Observer>
  )
}
