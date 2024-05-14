import React from 'react'
import { DetailPage } from 'src/presentation/detail/pages/detail_page'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PetDetailPage = () => {
  //---------------------
  //   RENDER
  //---------------------
  return <DetailPage />
}
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
export default PetDetailPage
