import React from 'react'
import { RegisterPage } from 'src/presentation/register/pages/register_page'

const RegisterRoute = () => {
  //---------------------
  //   RENDER
  //---------------------
  return <RegisterPage />
}
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
export default RegisterRoute
