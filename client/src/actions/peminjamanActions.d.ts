export declare const getPeminjamanData: (search?: string) => Promise<any>;
export declare const getDetailPeminjaman: (id: string) => Promise<any>;
export declare const getPeminjamanByBookId: (bookId: string) => Promise<any>;
export declare const getPeminjamanByPengembalianId: (idPengembalian: string) => Promise<any>;
export declare const tambahPeminjaman: (formData: FormData) => Promise<{
    message: string;
    deskripsi: string;
    queryKey?: undefined;
    redirectTo?: undefined;
    showToast?: undefined;
} | {
    message: string;
    deskripsi: string;
    queryKey: (FormDataEntryValue | null)[];
    redirectTo: string;
    showToast: boolean;
}>;
export declare const tambahPinjamanNew: ({ idBuku, alasan, durasi }: {
    idBuku: string;
    alasan: string;
    durasi: number;
}) => Promise<void>;
export declare const pembatalanPeminjamanBuku: (data: {
    idPeminjaman: string;
    idBuku: string;
}) => Promise<{
    message: string;
    deskripsi: string;
} | undefined>;
