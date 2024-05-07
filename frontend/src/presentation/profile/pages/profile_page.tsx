import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'
import { useRouter } from 'next/navigation'
import { useLogin } from 'src/data/api/login.hook'
import { Loading } from 'src/presentation/components/loading'
import { ArrowRightSquare } from 'lucide-react'
import { InputText } from 'primereact/inputtext'

export const ProfilePage = () => {
  const [userDetailData, setUserDetailData] = useState({
    name: '',
    phone: '',
    email: '',
  })

  return <Observer>{() => <div></div>}</Observer>
}
