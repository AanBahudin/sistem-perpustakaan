import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"


const CategoryPage = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = searchParams.get('q')
  
  useEffect(() => {
    if (!params) {
      navigate('/my/buku')
    }
  })
  
  return (
    <div>CategoryPage</div>
  )
}

export default CategoryPage