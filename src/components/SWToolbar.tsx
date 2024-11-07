import { toast } from 'sonner'
import { useRegisterSW } from 'virtual:pwa-register/react'

export function SWToolbar() {
  const {} = useRegisterSW({
    onRegisteredSW: () => {
      toast('Ready to work offline')
    },
  })

  if (process.env.NODE_ENV !== 'development') return

  return (
    <div className="flex items-center justify-between w-full p-4 bg-gray-800 absolute bottom-4 right-4">
      <div className="flex items-center">
        <button
          onClick={() => {}}
          className="p-2 text-white bg-gray-700 rounded-md"
        >
          Reset SW
        </button>
      </div>
    </div>
  )
}
