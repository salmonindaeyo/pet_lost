import React from 'react'
import { LoginPage } from 'src/presentation/login/pages/login_page'

const LoginRoute = () => {
  //---------------------
  //   RENDER
  //---------------------
  return <LoginPage />
}
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
export default LoginRoute
