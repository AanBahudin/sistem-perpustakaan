import { toast } from 'sonner';
interface PerpanjanganData {
    tipe: string;
    data: {
        _id: string;
        idBuku: string;
    };
    title: string;
    deskripsi: string;
}
export declare const handlePerpanjanganDiterima: (response: PerpanjanganData, navigate: (path: string) => void, toastFn: typeof toast) => void;
export declare const handlePerpanjanganDitolak: (response: PerpanjanganData, navigate: (path: string) => void, toastFn: typeof toast) => void;
export {};
