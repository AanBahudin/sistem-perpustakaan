import { toast } from "sonner";
interface PerpanjanganData {
    tipe: string;
    data: {
        _id: string;
    };
    title: string;
    deskripsi: string;
}
interface HandleFn {
    data: PerpanjanganData;
    navigate: (path: string) => void;
    toastFn?: typeof toast;
}
export declare const pustakawanHandlePerpanjangan: ({ data, navigate }: HandleFn) => void;
export {};
