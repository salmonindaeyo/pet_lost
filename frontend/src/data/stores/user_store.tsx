import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export interface UserStoreType {
  userDetail: UserDetails | null
  UpdateUserDetail: (loginData: LoginData) => void
  logoutUser: () => void
}

export interface UserDetails {
  id: number
  username: string
  name: string
  token?: string
}

export interface LoginData {
  token: string
  user: UserDetails
}

export class User implements UserStoreType {
  userDetail: UserDetails | null = null

  constructor() {
    this.userDetail = null
    makeAutoObservable(this)
  }

  UpdateUserDetail(loginData: LoginData) {
    if (loginData.token && loginData.user) {
      this.userDetail = {
        ...loginData.user,
        token: loginData.token,
      }
    } else {
      console.log('Invalid login data')
    }
  }

  logoutUser() {
    this.userDetail = null
  }
}
