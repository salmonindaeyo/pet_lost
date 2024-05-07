import { observer } from 'mobx-react-lite'
import { useStore } from 'src/data/providers/app_store_provider'

export const Modal = observer(() => {
  //---------------------
  // Hooks
  //---------------------
  const { modalStore } = useStore()
  //---------------------
  // RENDER
  //---------------------
  return (
    <>
      {modalStore.isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto backdrop-opacity-10 bg-gray-500/30">
          <div className="flex justify-center items-center h-screen">
            <div className="z-50 flex justify-center w-screen overflow-y-auto pointer-events-none">
              <div className="pointer-events-auto">{modalStore.isOpen && modalStore.modal}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
})
