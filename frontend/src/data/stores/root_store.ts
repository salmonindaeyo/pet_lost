import { Modal, ModalStoreType } from './modal_store'
import { User, UserStoreType } from './user_store'

interface RootStoreType {
  modalStore: ModalStoreType,
  userStore : UserStoreType
}

export class RootStore {
  modalStore: ModalStoreType
  userStore : UserStoreType

  constructor() {
    this.modalStore = new Modal()
    this.userStore = new User()
  }

  hydrate(data: RootStoreType) {
    if (!data) return
    this.modalStore.hydrate(data.modalStore)
  }
}
