import manifest from '../../manifest'

export function Header() {
  return (
    <>
      <header className="w-full h-[calc(env(safe-area-inset-top)+56px)] pt-[env(safe-area-inset-top)] bg-blue-600 text-white fixed">
        <div className="flex container h-full items-center">
          <h1 className="text-xl leading-[1cap] font-semibold">
            {manifest.name}
          </h1>
        </div>
      </header>
      <div className="h-[calc(env(safe-area-inset-top)+56px)]" />
    </>
  )
}
