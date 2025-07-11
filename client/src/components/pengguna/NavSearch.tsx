import { searchBook } from "@/actions/searchActions"
import { Input } from "../ui/input"
import { useDebouncedCallback } from "use-debounce"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const NavSearch = () => {
  const [value, setValue] = useState('')
  const [suggestData, setSuggestData] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()

  const wrapperRef = useRef<HTMLDivElement>(null)
  
  const newHandleSearch = async(value: string) => {
    setValue(value)
    await retrieveData(value)
}

  const retrieveData = useDebouncedCallback(async (value: string) => {
    if (!value.trim()) {
      setSuggestData([])
      return
    }
    const data = await searchBook(value)
    setSuggestData(data)
    setShowSuggestions(true)
  }, 700)


  const navigateAction = (id: string) => {
    setValue('')
    setSuggestData([])
    setShowSuggestions(false)
    navigate(`/my/buku/${id}`)
  }

  const dataLength : number = suggestData.length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <section ref={wrapperRef} className="max-w-[500px] flex flex-col items-center justify-center gap-y-4 relative dark:bg-black">
      <Input 
        onChange={(e) => newHandleSearch(e.target.value)}
        onFocus={() => {
          if (suggestData.length > 0) setShowSuggestions(true)
        }} 
        className="w-[500px] hidden md:block selection:text-white" placeholder="Cari sesuatu..." value={value} />
  
      <main className={`w-full max-h-[400px] overflow-y-auto scroll-custom border rounded-lg ${showSuggestions && suggestData.length ? 'absolute' : 'hidden'} top-12 p-4 dark:bg-black bg-white z-10`}>
        <div className="w-full flex flex-col gap-y-4">
          {suggestData.map((item: any) => {
            return (
              <div key={item._id} className="w-full flex items-center justify-start gap-x-4 cursor-default hover:bg-primary/40 dark:hover:bg-primary-foreground/30 p-2 rounded-lg ease-in-out duration-150">
                <img src={item.cover} alt={item.judul} className="w-8 h-8 rounded object-cover" />
                <div className="flex-1 flex-col items-start justify-start">
                  <p onClick={() => navigateAction(item._id)} className="text-sm">{item.judul}</p>
                  <p className="text-[12px] text-muted-foreground no-underline">{item.penulis}</p>
                </div>
              </div>
            )
          }) }
        </div>
      </main>

    </section>
  )
}

export default NavSearch