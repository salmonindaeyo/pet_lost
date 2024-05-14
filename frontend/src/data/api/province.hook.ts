import getConfig from 'next/config'
import { UseQueryOptions } from '@tanstack/react-query'
import FileSaver from "file-saver";
import { RoundInterface } from 'src/domain/round.domain'
import { QueryKeyT, useDelete, useFetch, usePost ,usePut } from './common/react_query'
const { publicRuntimeConfig } = getConfig()


export type RoundCheckParam = {
    id?: string
  }
  
export function useProvince() {
    return useFetch<RoundInterface[]>(`${publicRuntimeConfig.BASE_API}/api/province`)
  }

  export function useAmphure(params : RoundCheckParam , options?: UseQueryOptions<any, Error, unknown, QueryKeyT>) {
    return useFetch<any>(`${publicRuntimeConfig.BASE_API}/api/province/amphures/${params.id}`,null,options)
  }



  export function useTambons(params : RoundCheckParam , options?: UseQueryOptions<any, Error, unknown, QueryKeyT>) {
    return useFetch<any>(`${publicRuntimeConfig.BASE_API}/api/province/tambons/${params.id}`,null,options)
  }




