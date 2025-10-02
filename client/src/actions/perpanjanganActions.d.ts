export declare const getPerpanjangan: (query: string) => Promise<any>;
export declare const getPerpanjanganDetail: (id: string) => Promise<any>;
export declare const getSinglePerpanjanganByPeminjamanId: (id: string) => Promise<any>;
export declare const tambahPerpanjangan: ({ idPeminjaman, idBuku, durasi, alasan }: {
    idPeminjaman: string;
    idBuku: string;
    durasi: number;
    alasan: string;
}) => Promise<{
    message: string;
    deskripsi: string;
} | undefined>;
export declare const editPerpanjangan: ({ idPerpanjangan, data }: {
    idPerpanjangan: string;
    data: any;
}) => Promise<void>;
export declare const pembatalanPerpanjangan: ({ idPerpanjangan }: {
    idPerpanjangan: string;
}) => Promise<{
    message: string;
    deskripsi: string;
} | undefined>;
