export declare const getAllPerpanjangan: ({ query }: {
    query: string;
}) => Promise<any>;
export declare const getSinglePerpanjanganPustakawan: (id: string) => Promise<any>;
export declare const terimaPengajuanPerpanjanganPustakawan: ({ idPerpanjangan }: {
    idPerpanjangan: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const tolakPerpanjanganPustakawan: (id: string) => Promise<import("axios").AxiosResponse<any, any>>;
