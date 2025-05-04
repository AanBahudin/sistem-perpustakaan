import { Button } from '../ui/button'
import { useFormStatus } from '@/context/FormContext'

const SubmitButton = ({text} : {text: string}) => {

    const {isLoading} = useFormStatus()

    return (
        <Button disabled={isLoading} type='submit' className='text-white text-center capitalize'>
            {isLoading ? 'Loading...' : text}
        </Button>
    )
}

export default SubmitButton