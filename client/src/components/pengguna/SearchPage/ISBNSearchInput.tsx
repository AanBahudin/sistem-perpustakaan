import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ISBNSearchInput = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const params = searchParams.get('ISBN')

    const [value, setValue] = useState(params || '')
    
    const submitAction = (e : any) => {
        if (e.key === 'Enter' && value) {
            const params = new URLSearchParams(searchParams)
            if (value) {
                params.set('ISBN', value)
            } else {
                params.delete('ISBN')
            }

            navigate(`/my/discovery/search/?${params.toString()}`);
        }
    }

    const resetISBN = () => {
        const isParamsExist = searchParams.get('ISBN')
        if (isParamsExist) {                     
            const params = new URLSearchParams(searchParams)
            params.delete('ISBN')
            navigate(`/my/discovery/search/?${params.toString()}`);
        }
        setValue('')
    }

    const setISBNValue = (value: any) => {
        const cleaned = value.replace(/[^0-9]/g, '')
        setValue(cleaned)
    }

    return (
        <section className='w-full flex flex-col mt-3'>
            <label htmlFor="ISBN" className='uppercase font-semibold text-xs mb-3'>NOMOR ISBN</label>
            <main className='w-full flex justify-between items-center gap-x-2'>
                <Input
                    value={value}
                    inputMode='numeric'
                    pattern="\d*"
                    onChange={e => setISBNValue(e.target.value)}
                    onKeyDown={submitAction}
                    className='w-full selection:text-white placeholder:text-xs text-xs' 
                    placeholder='3842105724' />
                {value && <Button className='ease-in-out duration-300' onClick={resetISBN} type='button' size='icon' variant='destructive'><X /></Button>}
            </main>
        </section>
    )
}

export default ISBNSearchInput