import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'
import { useRouter } from 'next/navigation'
import { useLogin, useRegister } from 'src/data/api/auth.hook'
import { Loading } from 'src/presentation/components/loading'
import { ArrowRightSquare } from 'lucide-react'
import { InputText } from 'primereact/inputtext'

export const RegisterPage = () => {
  const router = useRouter()

  const [userDetailData, setUserDetailData] = useState({
    username: '',
    password: '',
  })

  const loginServ = useLogin()
  const registerServ = useRegister()

  async function Login() {
    if (userDetailData.username.length > 0 && userDetailData.password.length > 0) {
      try {
        const resp = await loginServ.mutateAsync({ userDetailData })
        localStorage.setItem('userpetalert', JSON.stringify(resp.data))
        router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const [userDetailRegisData, setUserDetailRegisData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
  })
  const [errors, setErrors] = useState('')

  async function Register() {
    const validationErrors = validate(userDetailRegisData)
    if (Object.keys(validationErrors).length === 0) {
      try {
        const resp = await registerServ.mutateAsync({ userDetailRegisData })
        Login()
        setUserDetailData({ username: userDetailRegisData.username, password: userDetailRegisData.password })
      } catch (err) {
        console.log(err)
      }
    } else {
      setErrors(validationErrors)
    }
  }

  function validate(data) {
    let errors = ''
    if (!data.username.trim()) {
      errors = 'กรุณากรอกชื่อผู้ใช้'
    }

    if (!data.password.trim()) {
      errors = 'กรุณากรอกรหัสผ่าน'
    }

    if (!data.email.trim()) {
      errors = 'กรุณากรอกอีเมล'
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors = 'รูปแบบอีเมลไม่ถูกต้อง'
    }

    if (!data.phone.trim()) {
      errors = 'กรุณากรอกหมายเลขโทรศัพท์'
    } else if (!/^\d{10}$/.test(data.phone)) {
      errors = 'รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง'
    }

    return errors
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
              <div className="text-center text-[36px] font-bold">Sign Up</div>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <div>Email</div>
                  <div>
                    <input
                      type="email"
                      value={userDetailRegisData.email}
                      onChange={(e) => {
                        setUserDetailRegisData({
                          ...userDetailRegisData,
                          email: e.target.value,
                        })
                      }}
                      className="w-full mt-2 border-b outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div>Phone Number</div>
                  <div>
                    <input
                      type="number"
                      value={userDetailRegisData.phone}
                      onChange={(e) => {
                        setUserDetailRegisData({
                          ...userDetailRegisData,
                          phone: e.target.value,
                        })
                      }}
                      className="w-full mt-2 border-b outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div>Username</div>
                  <div>
                    <input
                      type="text"
                      value={userDetailRegisData.username}
                      onChange={(e) => {
                        setUserDetailRegisData({
                          ...userDetailRegisData,
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
                      value={userDetailRegisData.password}
                      onChange={(e) => {
                        setUserDetailRegisData({
                          ...userDetailRegisData,
                          password: e.target.value,
                        })
                      }}
                      type="password"
                      className="w-full mt-2 border-b outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="text-red-500 mt-4">{userDetailRegisData.email.length > 0 && validate(userDetailRegisData)}</div>

              <div
                onClick={Register}
                className="w-full mt-4 cursor-pointer rounded-2xl py-2 drop-shadow-md text-white text-center hover:bg-[#df523c] bg-[#EB6E5A]"
              >
                สมัครสมาชิก
              </div>
              <div className="mt-4 text-center">
                Already have an account{' '}
                <span onClick={() => router.push('/login')} className="cursor-pointer text-[#EB6E5A]">
                  Log In
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  )
}
