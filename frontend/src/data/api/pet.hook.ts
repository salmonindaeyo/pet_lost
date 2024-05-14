import getConfig from 'next/config'
import { UseQueryOptions } from '@tanstack/react-query'
import FileSaver from "file-saver";
import { RoundInterface } from 'src/domain/round.domain'
import { QueryKeyT, useDelete, useFetch, usePost ,usePut } from './common/react_query'
const { publicRuntimeConfig } = getConfig()



export function useAddPet( options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
    return usePost(`${publicRuntimeConfig.BASE_API}/api/pet`, options)
  }
  

  export function usePetLostNotFound() {
    return useFetch<any>(`${publicRuntimeConfig.BASE_API}/api/pet?status=LOST&type=LOST_PET`)
  }


  export function usePetLookOwnerNotFound() {
    return useFetch<any>(`${publicRuntimeConfig.BASE_API}/api/pet?status=LOST&type=LOOK_FOR_OWNER`)
  }

  export function useMyPet(id , options?: UseQueryOptions<any, Error, unknown, QueryKeyT>) {
    return useFetch<any>(`${publicRuntimeConfig.BASE_API}/api/pet/${id}`,null,options)
  }

  export function useDeletePet(id) {
    return useDelete(`${publicRuntimeConfig.BASE_API}/api/pet/${id}`)
  }


  export function useUpdatePet(id ,  options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
    return usePut(`${publicRuntimeConfig.BASE_API}/api/pet/${id}`,options)
  }