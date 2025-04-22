import React from 'react'
import { BookOpenText } from 'lucide-react'
import { landingNavbarLink } from '../../../utils/links'

const Navbar : React.FC= () => {
  return (
    <nav className='bg-slate-50 w-full border border-b-2 border-[#d2d2d2] p-6'>
        <section className='w-[90%] mx-auto flex items-center justify-between'>
          <div className='w-10 h-10 rounded-md bg-blue-500 flex items-center justify-center'>
            <BookOpenText className="text-white" />
          </div>

          {/* menu section */}
          <div className='flex items-center justify-center gap-x-10'>
            <div className='flex items-center justify-center gap-x-6'>
              {landingNavbarLink.map(item => {
                return (
                  <a href={item.text} key={item.id} className='capitalize font-medium'>{item.text}</a>
                )
              })}
            </div>
            <button className='bg-blue-400 px-6 py-1 rounded-md font-semibold text-white'>Masuk</button>
          </div>

        </section>

    </nav>  
  )
}

export default Navbar