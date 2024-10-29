import { PropsWithChildren } from 'react'
import { Header } from './Header'

export function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}
