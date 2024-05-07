import { makeAutoObservable } from 'mobx'
import { enableStaticRendering, Observer } from 'mobx-react-lite'

import { Modal as ModalDefault } from '../../presentation/components/modal'

enableStaticRendering(typeof window === 'undefined')

interface ModalContentType {
  title: string
  content?: string | React.ReactNode
}

interface ActionButtonType {
  confirm?: () => void | null | Promise<any>
  cancel?: () => void | null | Promise<any>
}

export interface DefaultModalType {
  content: ModalContentType
  actionButton: ActionButtonType
  icon?: string | React.ReactNode
  textButton?: { confirm?: string; cancel?: string }
}

export interface ModalStoreType {
  isOpen: boolean
  modal: JSX.Element
  isLoading: boolean
  style?: string
  hydrate: (data: ModalStoreType) => void
  closeModal: () => void
  openModal: (modal: DefaultModalType) => void
  setValue: <k extends keyof this>(key: k, value: this[k]) => void
  openCustomModal: (modal: JSX.Element) => void
}

export class Modal {
  isOpen: boolean
  modal: JSX.Element
  isLoading: boolean
  style?: string

  constructor() {
    this.isOpen = false
    this.modal = null
    this.isLoading = false
    this.style = ''

    makeAutoObservable(this)
  }

  openModal({ content: { title, content }, icon, actionButton: { confirm, cancel }, textButton }: DefaultModalType) {
    this.isOpen = true
    this.modal = (
      <Observer>
        {() => {
          return (
            <div className="bg-white drop-shadow-md flex justify-between flex-col w-[512px] p-6 rounded-lg min-h-[194px]">
              <div className="flex w-full mb-4 gap-x-4">
                {icon &&
                  (typeof icon === 'string' ? (
                    <div>
                      <i className={icon}></i>{' '}
                    </div>
                  ) : (
                    <div>{icon}</div>
                  ))}
                <div className="w-full">
                  {title && <div className="text-dark-0 bodyL text-[24px]">{title}</div>}
                  {content && <div className="whitespace-pre-wrap text-dark-3 bodyM text-[20px] mt-4">{content}</div>}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
              
                {textButton?.confirm && (
                  <button onClick={(e) => confirm && confirm()} title={textButton?.confirm} className="w-[106px]" data-cy="modal_confirm_button">
                    OK
                  </button>
                )}
              </div>
            </div>
          )
        }}
      </Observer>
    )
  }

  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value
  }

  openCustomModal(modal: JSX.Element) {
    this.isOpen = true
    this.modal = modal
  }

  closeModal() {
    this.isOpen = false
  }

  hydrate = (data: ModalStoreType) => {
    if (!data) return

    this.isOpen = data.isOpen || false
    this.modal = data.modal || null
    this.isLoading = data.isLoading || false
    this.style = data.style || ''
  }
}
