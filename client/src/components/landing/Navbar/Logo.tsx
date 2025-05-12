import React from 'react'
import { BookOpenText } from 'lucide-react'
import { Link } from 'react-router-dom'

const Logo : React.FC = () => {
  return (
    <Link to='/' className='w-10 h-10 rounded-md bg-primary flex items-center justify-center'>
        <BookOpenText className="text-white" />
    </Link>
  )
}

export default Logo