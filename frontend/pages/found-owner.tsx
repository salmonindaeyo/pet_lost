import React from 'react'
import { FoundOwnerPage } from 'src/presentation/found-owner/pages/found_owner_page'

const LostPetRoute = () => {
  //---------------------
  //   RENDER
  //---------------------
  return <FoundOwnerPage />
}
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
export default FoundOwnerPage
