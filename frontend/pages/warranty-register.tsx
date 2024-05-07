import React from 'react'
import { WarrantyRegister } from 'src/presentation/warranty-register/pages/warranty_register_page'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomeRoute = () => {
  //---------------------
  //   RENDER
  //---------------------
  return <WarrantyRegister />
}
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
export default HomeRoute
