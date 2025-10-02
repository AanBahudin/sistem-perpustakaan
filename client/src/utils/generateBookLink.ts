import { store } from "@/store"
import { setShareLink } from "@/cart/globalSlice"

export const generateBookLink = (id: string) => {
    const bookURL = `http://localhost:5173/my/buku/${id}`
    store.dispatch(setShareLink(bookURL))
}