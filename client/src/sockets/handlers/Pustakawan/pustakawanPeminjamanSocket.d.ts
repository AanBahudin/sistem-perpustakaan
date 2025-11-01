import { toast } from "sonner";
interface PeminjamanData {
    tipe: string;
    data: {
        _id: string;
    };
    title: string;
    deskripsi: string;
}
interface HandleFn {
    data: PeminjamanData;
    navigate: (path: string) => void;
    toastFn?: typeof toast;
}
export declare const pustakawanHandlePeminjaman: ({ data, navigate }: HandleFn) => void;
export {};
