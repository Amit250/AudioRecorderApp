import { PropsWithChildren } from 'react'
import { RealmProvider } from '@realm/react'
import { Recording } from './../models/Recording'

export default function Realm({ children }: PropsWithChildren) {
  return <RealmProvider schema={[Recording]}>{children}</RealmProvider>
}
