import React from 'react'

const DataContainer = ({children} : {children: React.ReactNode}) => {
  return (
    <section className='my-10'>
        {children}
    </section>
  )
}

export default DataContainer