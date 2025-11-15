import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const PasswordInput = () => {

    const [showPass, setShowPass] = useState<Boolean>(false)

    return (
       <>
          <div className="grid items-center gap-1.5">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input type={showPass ? 'text' : 'password'} id="password" name='password' placeholder="****" className='mt-2' />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" onCheckedChange={() => setShowPass(!showPass)} />
              <label htmlFor="terms" className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Lihat Password
              </label>
            </div>
       </>
    )
}

export default PasswordInput