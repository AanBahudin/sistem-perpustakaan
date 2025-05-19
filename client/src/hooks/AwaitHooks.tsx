import React, { Suspense } from 'react'
import { Await } from 'react-router-dom'

type AwaitHooksPropsType = {
  data: Promise<any>
  loadingComponent: React.ReactNode
  children: (data: any) => React.ReactNode
}

const AwaitHooks = ({ children, data, loadingComponent }: AwaitHooksPropsType) => {
  return (
    <Suspense fallback={loadingComponent}>
      <Await resolve={data}>
        {(resolvedData) => children(resolvedData)}
      </Await>
    </Suspense>
  )
}

export default AwaitHooks
