export declare const getAllPengajuan: () => Promise<any>;
export declare const getAllPengajuanPeminjaman: ({ params }: {
    params: string;
}) => Promise<any>;
export declare const getDetailPengajuanPeminjaman: ({ id }: {
    id: string;
}) => Promise<any>;
export declare const terimaPengajuanPeminjaman: ({ data }: {
    data: {
        idPeminjaman: string;
        kondisiBuku: string;
    };
}) => Promise<any>;
export declare const tolakPengajuanPeminjaman: ({ idPeminjaman }: {
    idPeminjaman: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
