import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'
import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'
import { Toast } from 'primereact/toast'
import getConfig from 'next/config'
import 'primeicons/primeicons.css'
const { publicRuntimeConfig } = getConfig()

export function NavBar() {
  interface UserDetail {
    username: string
    id: number
    email: string
    phone: string
  }

  const [userDetailData, setUserDetailData] = useState<UserDetail | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { userStore } = useStore()

  const menuList = [
    { name: 'หน้าแรก', link: '/' },
    { name: 'สัตว์เลี้ยงหาย', link: '/lost-pet' },
    { name: 'ตามหาเจ้าของ', link: '/found-owner' },
    { name: 'ประกาศของฉัน', link: '/announce' },
  ]

  const [visible, setVisible] = useState(false)
  const toast = useRef(null)
  const buttonEl = useRef(null)
  const menuLeft = useRef(null)
  const items = [
    {
      label: userDetailData?.username,
      items: [
        {
          label: 'ออกจากระบบ',
          icon: 'pi pi-sign-out',
          command: () => {
            router.push('/login')
            localStorage.removeItem('userpetalert')
          },
        },
      ],
    },
  ]

  const accept = () => {
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 })
  }

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
  }

  function checkLogin() {
    const storedUserDetail = localStorage.getItem('userpetalert')
    let userDetail = null
    if (storedUserDetail) {
      userDetail = JSON.parse(storedUserDetail)
      setUserDetailData(userDetail.user)
    }

    if (!userDetail) {
      console.log(pathname)
      if (pathname !== '/login' && pathname !== '/register') {
        router.push('/login')
      }
    } else {
      const loginData = {
        token: userDetail.token,
        user: userDetail.user,
      }
      userStore.UpdateUserDetail(userDetail)
    }
  }
  const logout = () => {
    localStorage.removeItem('userpetalert')
    router.push('/login')
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <Observer>
      {() => (
        <div className="w-full select-none bg-[#FFF4CE] h-full flex items-center justify-between">
          <img
            onClick={() => router.push('/lost-pet')}
            className="ml-4 w-[200px] cursor-pointer"
            src="https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/pp%2FPet%20Alert%20(8)%202.png?alt=media&token=5528fd50-7d55-425b-a36f-f6103f79220d"
          />

          <div className="flex h-full items-center mr-4 gap-6">
            {menuList.map((menu) => (
              <div
                key={menu.name}
                className={'cursor-pointer' + (pathname === menu.link ? ' text-[#ff7c68] transition-all font-bold border-b border-[#ff7c68]' : '')}
                onClick={() => {
                  router.push(menu.link)
                }}
              >
                {menu.name}
              </div>
            ))}
            {userDetailData ? (
              <div
                onClick={(event) => menuLeft.current.toggle(event)}
                aria-controls="popup_menu_left"
                aria-haspopup
                className="text-[#df523c] font-bold cursor-pointer select-none"
              >
                {userDetailData.username}
              </div>
            ) : (
              <div className="px-4  cursor-pointer rounded-2xl py-2 drop-shadow-md text-white text-center hover:bg-[#df523c] bg-[#EB6E5A]">
                เข้าสู่ระบบ
              </div>
            )}
          </div>

          <Toast ref={toast}></Toast>
          <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
        </div>
      )}
    </Observer>
  )
}
