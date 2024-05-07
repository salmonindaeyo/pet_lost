import '../styles/global.css'
import '@web/fontawesome-pro/css/all.css'
import { appWithTranslation } from 'next-i18next'

import { Modal } from 'src/presentation/components/modal'
import { StoreProvider } from 'src/data/providers/app_store_provider'
import { QueryProviderLayout } from 'src/core/components/queryProvider.layout'
import { NavBar } from 'src/presentation/components/NavBar'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const currentPath = router.pathname

  return (
    <StoreProvider {...pageProps}>
      <QueryProviderLayout>
        <div>
          <Modal />
          <div className="flex flex-col ">
            {currentPath !== '/login' && currentPath !== 'register' && <NavBar />}
            <Component {...pageProps} />
          </div>
        </div>
      </QueryProviderLayout>
    </StoreProvider>
  )
}

export default appWithTranslation(MyApp)
