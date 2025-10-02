import { Input } from "@/components/ui/input"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"

const SearchFilter = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const fullParams = new URLSearchParams(searchParams)
    const params = searchParams.get('nama') || ''

    const handleNavigate = useDebouncedCallback((value: string) => {
        if (value) {
            fullParams.set('nama', value)
        } else {
            fullParams.delete('nama')
        }
        navigate(`?${fullParams.toString()}`)
    }, 500)


    return (
        <section className='w-[80%]'>
        <Input
            onChange={(e) => handleNavigate(e.target.value)}
            autoFocus
            defaultValue={params}
            type='text' placeholder='Cari pustakawan'
            className='flex-1 placeholder:text-xs text-xs'
        />
        </section>
    )
}

export default SearchFilter