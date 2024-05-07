import React from 'react'
import { HomePage } from 'src/presentation/home/pages/home_page'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomeRoute = () => {
  //---------------------
  //   RENDER
  //---------------------
  return <HomePage />
}
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
export default HomeRoute
