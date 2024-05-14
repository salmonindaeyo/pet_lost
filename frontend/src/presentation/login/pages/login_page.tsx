import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'
import { useRouter } from 'next/navigation'
import { useLogin } from 'src/data/api/auth.hook'
import { Loading } from 'src/presentation/components/loading'
import { ArrowRightSquare } from 'lucide-react'
import { InputText } from 'primereact/inputtext'

export const LoginPage = () => {
  const router = useRouter()
  const [userDetailData, setUserDetailData] = useState({
    username: '',
    password: '',
  })
  const loginServ = useLogin()

  async function Login() {
    if (userDetailData.username.length > 0 && userDetailData.password.length > 0) {
      try {
        const resp = await loginServ.mutateAsync(userDetailData)
        localStorage.setItem('userpetalert', JSON.stringify(resp.data))
        router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Observer>
      {() => (
        <div className="w-screen h-screen flex justify-center items-center bg-[#FFFBEC]">
          <div className="w-[400px] flex flex-col rounded-md drop-shadow-lg bg-white">
            <div className="w-full bg-[#FFF4CE] p-2 flex justify-center items-center">
              <img
                className="w-[300px]"
                src="https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/pp%2FPet%20Alert%20(8)%202.png?alt=media&token=5528fd50-7d55-425b-a36f-f6103f79220d"
              />
            </div>
            <div className="w-full p-4">
              <div className="text-center text-[36px] font-bold">Log In</div>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <div>Username</div>
                  <div>
                    <input
                      value={userDetailData.username}
                      onChange={(e) => {
                        setUserDetailData({
                          ...userDetailData,
                          username: e.target.value,
                        })
                      }}
                      className="w-full mt-2 border-b outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div>Password</div>
                  <div>
                    <input
                      value={userDetailData.password}
                      onChange={(e) => {
                        setUserDetailData({
                          ...userDetailData,
                          password: e.target.value,
                        })
                      }}
                      type="password"
                      className="w-full mt-2 border-b outline-none"
                    />
                  </div>
                </div>
              </div>
              <div
                onClick={Login}
                className="w-full mt-4 cursor-pointer rounded-2xl py-2 drop-shadow-md text-white text-center hover:bg-[#df523c] bg-[#EB6E5A]"
              >
                เข้าสู่ระบบ
              </div>
              <div className="mt-4 text-center">
                Don't have an account?{' '}
                <span onClick={() => router.push('/register')} className="cursor-pointer text-[#EB6E5A]">
                  Sign up
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  )
}
