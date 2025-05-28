import { useFormStatus } from "@/context/FormContext"
import { BookMarked, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const AddSimpananButton = ({id, savedData} : {id: string, savedData: any}) => {
    const {isLoading} = useFormStatus()
    const idBukuTersimpan = savedData.map((item: any) => item.buku._id.toString())

    return (
        <>
            <Button type='submit' className={`w-8 h-8 border p-2 ${idBukuTersimpan.includes(id) ? 'bg-primary-foreground hover:bg-primary' : 'bg-transparent hover:bg-muted'}  duration-200 ease-in-out`}>
                {isLoading ? (
                    <Loader2 className="w-8 h-8 stroke-white animate-spin" />
                ) : (
                    <BookMarked className="w-8 h-8 stroke-white" />
                )}
            </Button>
            <input type="hidden" name="bookId" id="bookId" value={id}  />
        </>
    )
}

export default AddSimpananButton