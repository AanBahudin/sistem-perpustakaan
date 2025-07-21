import Buku from "../model/Buku"

export const searchServices = async(params: string | any) => {
    const queryObj: Record<string, any> = {
        dihapus: false
    };

    console.log(params.ISBN)

    // looping
    for (const key in params) {
        const value = params[key]
        if (value) {
            if (key === 'kategori') {
                queryObj[key] = { $regex: new RegExp(value, 'i') };
            }
            queryObj[key] = {$regex: value, $options: 'i'}
        }
    }
    const buku = await Buku.find(queryObj).limit(30).select('-createdBy -dihapus -totalDihilangkan')
    return buku
}

export const typedSearch = async(judul: string |any) => {
    const buku = await Buku.find({
        judul: {$regex: judul, $options: 'i'}
    })

    return buku
}