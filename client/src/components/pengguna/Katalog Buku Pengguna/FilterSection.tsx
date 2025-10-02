import { Input } from '@/components/ui/input'
// import React, { useState } from 'react'
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { kategori } from '@/utils/constants'


const FilterSection = () => {

  // const [isChecked, setChecked] = useState<string | null>();

  // const handleChecked = (value: any) => {
  //   setChecked(value)
  // }

  return (
    <section className='col-span-3 pr-4 border-r'>
      <h1 className='font-semibold text-xl'>Filters</h1>

      <main className='mt-6 w-full'>

        <div className='flex flex-col gap-y-4'>
          <Input type='number' placeholder='ISBN' />
          <Input type='text' placeholder='Penulis' />
          <Input type='text' placeholder='Penerbit' />
          <Input type='number' placeholder='Tahun Terbit' />
        </div>

        <div className='mt-6'>
          <h3 className='font-semibold mb-6'>Kategori</h3>
  
        </div>
      </main>
    </section>
  )
}

export default FilterSection