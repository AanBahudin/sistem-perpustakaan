export const bukuMatch = (query: any) => {
    let queryMatch: any = {}
    
    if (query?.query) {
        queryMatch.judul = {$regex: query.query, $options: 'i'}
    }

    if (query?.status) {
        queryMatch.status = {$regex: query.status, $options: 'i'}
    }

    if (query?.penulis) {
        queryMatch.penulis = {$regex: query.penulis, $options: 'i'}
    }

    if (query?.penerbit) {
        queryMatch.penerbit = {$regex: query.penerbit, $options: 'i'}
    }

    if (query?.tahunTerbit) {
        queryMatch.tahunTerbit = {$regex: query.tahunTerbit, $options: 'i'}
    }

    if (query?.kategori) {
        queryMatch.kategori = {
            $in: [new RegExp(query.kategori, "i")]
        };
    }

    return queryMatch
}