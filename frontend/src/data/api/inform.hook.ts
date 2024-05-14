import getConfig from 'next/config'
import { UseQueryOptions } from '@tanstack/react-query'
import FileSaver from "file-saver";
import { RoundInterface } from 'src/domain/round.domain'
import { QueryKeyT, useDelete, useFetch, usePost ,usePut } from './common/react_query'
const { publicRuntimeConfig } = getConfig()



export function useAddInform( options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
    return usePost(`${publicRuntimeConfig.BASE_API}/api/inform`, options)
  }
  

  export function useInform(id) {
    return useFetch<any>(`${publicRuntimeConfig.BASE_API}/api/inform/${id}`)
  }


