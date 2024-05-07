import React from 'react'
import { LostPetPage } from 'src/presentation/lost-pet/pages/lost_pet_page'

const LostPetRoute = () => {
  //---------------------
  //   RENDER
  //---------------------
  return <LostPetPage />
}
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
export default LostPetRoute
