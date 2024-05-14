import React from 'react'
import { AnnouncePage } from 'src/presentation/announce/pages/announce_page'

const AnnounceRoute = () => {
  //---------------------
  //   RENDER
  //---------------------
  return <AnnouncePage />
}
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
export default AnnounceRoute
