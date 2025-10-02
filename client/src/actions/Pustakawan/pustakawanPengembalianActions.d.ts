export declare const getAllPengembalian: ({ query }: {
    query: string;
}) => Promise<any>;
export declare const getSinglePengembalianPustakawan: (id: string) => Promise<any>;
export declare const createPengembalianDataPustakawan: (formData: any) => Promise<any>;
export declare const approvePengembalianDataPustakawan: ({ idPengembalian }: {
    idPengembalian: string;
}) => Promise<any>;
