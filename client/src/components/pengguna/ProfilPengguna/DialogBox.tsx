import { updateEmailAction, updatePasswordAction, updateProfileAction } from '@/actions/userActions'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SubmitButton from '@/components/form/SubmitButton'
import FormContainer from '@/components/form/FormContainer'
import { kelasEnum } from '@/utils/constants'
import { useRouteLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { Eye } from 'lucide-react'


export const NoHpDialog = () => {
  const data = useRouteLoaderData('user-profil')
  return (
    <FormContainer action={updateProfileAction} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor='kontak' className="text-right capitalize">Nomor Telepon lama</Label>
          <Input required id='no_hp' readOnly defaultValue={data.no_hp} className="col-span-3 selection:text-white" />
          <Label htmlFor='kontak' className="text-right capitalize">Nomor Telepon baru</Label>
          <Input required id='no_hp' autoFocus name='no_hp' type='text'  className="col-span-3 selection:text-white" />
        </div>
        <SubmitButton className='text-white mt-6 place-self-end w-fit' text="Save changes "/>
    </FormContainer>
  )
}

export const KelasDialog = () => {
  const data = useRouteLoaderData('user-profil')
  return (
    <FormContainer action={updateProfileAction} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor='kelas' className="text-right capitalize"> Kelas </Label>
          <Select name='kelas' defaultValue={data.kelas}>
            <SelectTrigger className="w-full col-span-3">
              <SelectValue placeholder="Pilih kelas anda" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Kelas</SelectLabel>
                {kelasEnum.map(item => <SelectItem value={item}>{item}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <SubmitButton className='text-white mt-6 place-self-end w-fit' text="Save changes "/>
    </FormContainer>
  )
}

export const NamaDialog = () => {
  const data = useRouteLoaderData('user-profil')
  return (
    <FormContainer action={updateProfileAction} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor='nama' className="text-right capitalize"> Nama Lama </Label>
        <Input readOnly defaultValue={data.nama} className="col-span-3 selection:text-white" />
        <Label htmlFor='nama' className="text-right capitalize"> Nama Baru </Label>
        <Input required id='nama' name='nama' autoFocus className="col-span-3 selection:text-white" />
      </div>
      <SubmitButton className='text-white mt-6 place-self-end w-fit' text="Save changes "/>
    </FormContainer>
  )
}

export const EmailDialog = () => {
  const data = useRouteLoaderData('user-profil')
  return (
    <FormContainer action={updateEmailAction} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor='email' className="text-right capitalize"> email Lama </Label>
        <Input readOnly defaultValue={data.email} className="col-span-3 selection:text-white" />
        <Label htmlFor='email' className="text-right capitalize"> Email Baru </Label>
        <Input type='email' required id='email' name='email' autoFocus className="col-span-3 selection:text-white" />
      </div>
      <SubmitButton className='text-white mt-6 place-self-end w-fit' text="Save changes "/>
    </FormContainer>
  )
}

export const PasswordDialog = () => {

  const [showPass, setShowPass] = useState<boolean>(false)
  const [confirmPass, setShowConfirmPass] = useState<boolean>(false)

  return (
    <FormContainer action={updatePasswordAction} className="grid gap-4 py-4">
      <div className="flex flex-col items-start gap-4">
        <Label htmlFor='oldPassword' className="text-right capitalize"> password Lama </Label>
        <main className='col-span-3 w-full flex items-center justify-center gap-x-2'>
          <Input type={showPass ? 'text' : 'password'} required id='oldPassword' name='oldPassword' autoFocus className="w-full selection:text-white" />
          <Eye onClick={() => setShowPass(!showPass)} className={`w-fit h-full rounded p-1 ${showPass ? 'stroke-primary-foreground  ' : 'stroke-white'}`} />
        </main>

        <Label htmlFor='newPassword' className="text-right capitalize"> Password Baru </Label>
        <main className='col-span-3 w-full flex items-center justify-center gap-x-2'>
          <Input type={confirmPass ? 'text' : 'password'} required id='newPassword' name='newPassword' className="col-span  -3 selection:text-white" />
          <Eye onClick={() => setShowConfirmPass(!confirmPass)} className={`w-fit h-full rounded p-1 ${confirmPass ? 'stroke-primary-foreground  ' : 'stroke-white'}`} />
        </main>
      </div>
      <SubmitButton className='text-white mt-6 place-self-end w-fit' text="Save changes "/>
    </FormContainer>
  )
}

export default NoHpDialog