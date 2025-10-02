export declare const getAllSimpanan: () => Promise<any>;
export declare const addOrRemoveSimpanan: (id: string) => Promise<{
    message: string;
    deskripsi: string;
} | undefined>;
