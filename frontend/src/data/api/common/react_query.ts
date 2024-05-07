import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { appAxios } from 'src/core/lib/axios'
import { useStore } from 'src/data/providers/app_store_provider'
import { useRouter } from 'next/navigation'

export type QueryKeyT = [string, object | undefined]

export const useDefaultError = () => {
  const { modalStore } = useStore()
  const router = useRouter()

  return (error: AxiosError<{ message?: string }>) => {
    const errorMassage = error.response?.data?.message || error.message
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
  }
}


export const fetcher = <T,>({ queryKey }): Promise<T> => {
  const [url, params] = queryKey
  return appAxios()
    .get(url, { params: { ...params } })
    .then((res) => res.data)
}

export const useFetch = <T,>(
  url: string | null,
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT> | null
) => {
  return useQuery<T, Error, T, QueryKeyT>({
    ...config,
    queryKey: [url, params], 
    queryFn: ({ queryKey }) => fetcher({ queryKey }),
  })
}

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  config?
) => {
  return useMutation<AxiosResponse, AxiosError, T | S>({
    ...config,
    mutationFn: func, 
    onError: useDefaultError(),
  });
};

export const usePost = <T, S>(
  url: string,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  return useGenericMutation<T, S>(
    (data) => appAxios().post<S>(url, data),{
      ...config,
      onError: useDefaultError()
    });
};

export const usePut = <T, S>(
  url: string,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  return useGenericMutation<T, S>(
    (data) => appAxios().put<S>(url, data),{
      ...config,
      onError: useDefaultError()
    });
};

export const useDelete = <T, S>(
  url: string,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  return useGenericMutation<T, S>(
    () => appAxios().delete<S>(url),{
      ...config,
      onError: useDefaultError()
    });
};