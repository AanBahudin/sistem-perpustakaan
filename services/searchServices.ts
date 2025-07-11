import Buku from "../model/Buku"

export const searchServices = async(title: string | any) => {
    console.log(title)
    const buku = await Buku.find({
        $or: [
            {judul: {$regex: title, $options: 'i'}},
            {penulis: {$regex: title, $options: 'i'}},
            {penerbit: {$regex: title, $options: 'i'}},
        ]
    })

    return title ? buku : []
}