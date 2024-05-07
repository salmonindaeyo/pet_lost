import React from 'react'
import { WarrantyPage } from 'src/presentation/warranty/pages/warranty_page'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomeRoute = () => {
  //---------------------
  //   RENDER
  //---------------------
  return <WarrantyPage />
}
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}

export default HomeRoute
