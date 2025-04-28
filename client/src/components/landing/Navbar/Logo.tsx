import React from 'react'
import { BookOpenText } from 'lucide-react'

const Logo : React.FC = () => {
  return (
    <div className='w-10 h-10 rounded-md bg-primary flex items-center justify-center'>
        <BookOpenText className="text-white" />
    </div>
  )
}

export default Logo