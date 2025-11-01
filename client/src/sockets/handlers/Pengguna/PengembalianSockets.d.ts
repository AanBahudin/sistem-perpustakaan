import { toast } from 'sonner';
interface PengembalianData {
    tipe: string;
    data: {
        _id: string;
        idBuku: string;
    };
    title: string;
    deskripsi: string;
}
export declare const handlePengembalianPeminjaman: (response: PengembalianData, navigate: (path: string) => void, toastFn: typeof toast) => void;
export {};
