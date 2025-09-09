import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"

const TambahPenggunaInputPassword = () => {

    const [showPass, setShowPass] = useState<boolean>(false)
    const handleSetPass = () => {
        setShowPass(!showPass)
    }

    return (
        <section className="w-full flex flex-col gap-y-1.5">
            <main className="w-full flex flex-col gap-y-1.5">
                <Label className="text-xs">Password (sementara)</Label>
                <div className="flex items-center gap-x-2">
                    <Input
                        type={showPass ? 'text' : 'password'} name="password"
                        placeholder="Masukan password"
                        min={8} max={25}
                        className="!text-xs border-none"
                    />
                    <Button 
                        type="button" variant={showPass ? 'default' : 'outline'}
                        onClick={handleSetPass} >
                            {showPass ? <Eye /> : <EyeClosed />}
                        </Button>
                </div>
            </main>
        </section>
    )
}

export default TambahPenggunaInputPassword