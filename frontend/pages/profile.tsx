import React from 'react'
import { ProfilePage } from 'src/presentation/profile/pages/profile_page'

const HomeRoute = () => {
  //---------------------
  //   RENDER
  //---------------------
  return <ProfilePage />
}
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
export default HomeRoute
