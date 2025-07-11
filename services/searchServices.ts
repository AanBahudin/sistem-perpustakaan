import Buku from "../model/Buku"

export const searchServices = async(title: string | any) => {

    if (!title || title.trim() === "") return []
    const buku = await Buku.find({
        $or: [
            {judul: {$regex: title, $options: 'i'}},
            {penulis: {$regex: title, $options: 'i'}},
            {penerbit: {$regex: title, $options: 'i'}},
        ]
    }).limit(15)

    return buku
}