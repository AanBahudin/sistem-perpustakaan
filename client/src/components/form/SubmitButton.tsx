import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useFormStatus } from '@/context/FormContext'

const SubmitButton = ({text,className} : {text: string, className?: string}) => {

    const {isLoading} = useFormStatus()

    return (
        <Button disabled={isLoading} type='submit' className={cn('text-white text-center capitalize w-full', className)} >
            {isLoading ? 'Loading...' : text}
        </Button>
    )
}

export default SubmitButton