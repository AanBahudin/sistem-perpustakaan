export declare const tambahBukuPustakawan: ({ data }: {
    data: FormData;
}) => Promise<any>;
export declare const getAllBukuPustakawan: ({ query }: {
    query: string;
}) => Promise<any>;
export declare const getSingleBukuPustakawan: ({ idBuku }: {
    idBuku: string;
}) => Promise<any>;
export declare const editBukuPustakawan: (data: FormData, idBuku: string) => Promise<any>;
export declare const getAllBukuDipinjamPustakawan: ({ query }: {
    query: string;
}) => Promise<any>;
export declare const getAllBukuDiperpanjanganPustakawan: ({ query }: {
    query: string;
}) => Promise<any>;
export declare const getAllBukuDikembalikanPustakawan: ({ query }: {
    query: string;
}) => Promise<any>;
export declare const getAllBukuDihilangkanPustakawan: ({ query }: {
    query: string;
}) => Promise<any>;
export declare const getAllBooksPublishedYear: () => Promise<any>;
