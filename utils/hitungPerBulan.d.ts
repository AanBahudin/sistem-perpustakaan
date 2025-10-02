type Dokumen = {
    createdAt: Date | string;
    [key: string]: any;
};
type PerBulanMap = Record<string, number>;
export declare const hitungPerBulan: (data: Dokumen[], fieldTanggal: keyof Dokumen) => PerBulanMap;
export {};
