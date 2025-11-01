import { toast } from 'sonner';
interface PeminjamanData {
    tipe: string;
    data: {
        _id: string;
        buku: string;
    };
    title: string;
    deskripsi: string;
}
export declare const handlePeminjamanDitolak: (data: PeminjamanData, navigate: (path: string) => void, toastFn: typeof toast) => void;
export declare const handlePeminjamanDiterima: (data: PeminjamanData, navigate: (path: string) => void, toastFn: typeof toast) => void;
export {};
