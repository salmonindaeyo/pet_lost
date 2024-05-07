import { AxiosError } from 'axios'
import React, { useState } from 'react'

import { useStore } from 'src/data/providers/app_store_provider'
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query'

export const QueryProviderLayout = (props: { children: React.ReactElement }) => {
  //---------------------
  //   CONST
  //---------------------
  const { modalStore } = useStore()
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error: AxiosError<{ message?: string }>) => {
            modalStore.openModal({
              content: {
                title: 'Error',
                content: error.response?.data?.message || error.message,
              },
              actionButton: {
                confirm: () => modalStore.closeModal(),
                cancel: () => modalStore.closeModal(),
              },
              textButton: {
                confirm: 'OK',
                cancel: 'Close',
              },
            })
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  //---------------------
  //   RENDER
  //---------------------
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}
