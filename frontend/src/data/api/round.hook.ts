import getConfig from 'next/config'
import { UseQueryOptions } from '@tanstack/react-query'
import FileSaver from "file-saver";
import { RoundInterface } from 'src/domain/round.domain'
import { QueryKeyT, useDelete, useFetch, usePost ,usePut } from './common/react_query'
const { publicRuntimeConfig } = getConfig()

export type ExcelParam = {
  id?: string
  name?: string
}
export type RoundCheckParam = {
  id?: string
}


export function useRound() {
  return useFetch<RoundInterface[]>(`${publicRuntimeConfig.BASE_API}/api/course/round`)
}


export function useAddRound( options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
  return usePost(`${publicRuntimeConfig.BASE_API}/api/course/round`, options)
}

export function editAddRound( options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
  return usePut(`${publicRuntimeConfig.BASE_API}/api/course/round`, options)
}


export function useExport( options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
  return usePost(`${publicRuntimeConfig.BASE_API}/api/course/export?id=1`, options)
}


export async function getExcelFile(params : ExcelParam) {
  let userDetail = { token: '' };
  const storedUserDetail = localStorage.getItem('issaramUser');
  
  if (storedUserDetail) {
    userDetail = JSON.parse(storedUserDetail);
  }
  
  try {
    const response = await fetch(
      publicRuntimeConfig.BASE_API + `/api/course/export?id=${params.id}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userDetail.token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error("cannot fetch blog");
    }
    const data = await response.blob();

    return FileSaver.saveAs(data, params.name + ".xlsx");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


export function useRoundCheck(params : RoundCheckParam , options) {
  return useFetch<RoundInterface[]>(`${publicRuntimeConfig.BASE_API}/api/course/round/person?id=${params.id}` , params , options)
}
