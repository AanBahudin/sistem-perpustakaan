import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"


const UploadImageContainerEdit = ({buku} : {buku: any}) => {

  const [selectedImg, setImg] = useState('')

  const handleImgInput = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      setImg(URL.createObjectURL(file))
    }
  }

  return (
    <section className='w-full p-4 bg-accent/10 rounded-xl'>
      <h1 className='text-lg font-semibold mb-4'>Upload Gambar</h1>
      <main className='w-full min-h-[40vh] rounded-lg bg-accent/40 flex items-center justify-center'>
        {selectedImg ? (
          <div className='w-[70%] h-[35vh] relative'>
            <X onClick={() => setImg('')} className='p-1 bg-destructive/90 absolute w-6 h-6 stroke-3 top-2 right-2  stroke-white rounded-full' />
            <img src={selectedImg} alt="Gambar Buku" className='w-full h-full object-cover rounded' />
          </div>
        ) : (
          <div className='w-[70%] h-[35vh] relative'>
            <img src={buku.cover} alt="Gambar Buku" className='w-full h-full object-cover rounded' />
          </div>
        )}
      </main>
      <Input onChange={(e) => handleImgInput(e)} type='file' name='cover' id='cover' className='mt-4 hidden' accept='image/*' />
      <Label htmlFor='cover' className='block bg-primary hover:bg-primary/70 duration-200 ease-in-out text-xs py-2 rounded text-white text-center mt-4'>Upload Gambar</Label>
      
      
    </section>
  )
}

export default UploadImageContainerEdit