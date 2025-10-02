import { BookOpenText } from 'lucide-react'
import { Link } from 'react-router-dom'

const Logo = ({url = '/'} : {url?: string}) => {
  return (
    <Link to={url} className='w-10 h-10 rounded-md bg-primary flex items-center justify-center'>
        <BookOpenText className="text-white" />
    </Link>
  )
}

export const SecondaryLogo = () => {
  return (
    <Link to='/' className='w-10 h-10 rounded-md dark:bg-accent bg-primary flex items-center justify-center'>
        <BookOpenText className="stroke-white" />
    </Link>
  )
}

export default Logo