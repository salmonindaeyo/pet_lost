import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'

import getConfig from 'next/config'

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
    { name: 'ตามหาเจ้าของ', link: '/manage' },
  ]
  function checkLogin() {
    const storedUserDetail = localStorage.getItem('userpetalert')
    let userDetail = null
    if (storedUserDetail) {
      userDetail = JSON.parse(storedUserDetail)
      setUserDetailData(userDetail.user)
    }

    if (!userDetail) {
      router.push('/login')
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
        <div className="w-full bg-[#FFF4CE] h-full flex items-center justify-between">
          <img
            className="w-[200px]"
            src="https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/pp%2FPet%20Alert%20(8)%202.png?alt=media&token=5528fd50-7d55-425b-a36f-f6103f79220d"
          />

          <div className="flex h-full items-center mr-4 gap-6">
            {menuList.map((menu) => (
              <div
                key={menu.name}
                className="cursor-pointer"
                onClick={() => {
                  router.push(menu.link)
                }}
              >
                {menu.name}
              </div>
            ))}
            {userDetailData ? (
              <div className="text-[#df523c] font-bold">{userDetailData.username}</div>
            ) : (
              <div className="px-4  cursor-pointer rounded-2xl py-2 drop-shadow-md text-white text-center hover:bg-[#df523c] bg-[#EB6E5A]">
                เข้าสู่ระบบ
              </div>
            )}
          </div>
        </div>
      )}
    </Observer>
  )
}
