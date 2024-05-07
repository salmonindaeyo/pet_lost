import React, { useEffect, useState } from 'react'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'
import { setCookie, getCookie, deleteCookie } from 'src/core/utils/cookie'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const HomePage = () => {
  return <Observer>{() => <div className="w-full h-screen  flex flex-col gap-4 justify-center items-center ">s</div>}</Observer>
}
