export declare const profileAction: () => Promise<any>;
export declare const getStats: () => Promise<any>;
export declare const updateProfileAction: (formData: FormData) => Promise<{
    message: string;
    deskripsi: string;
} | undefined>;
export declare const updatePhotoAction: (formData: FormData) => Promise<any>;
export declare const updateEmailAction: (formData: FormData) => Promise<{
    message: string;
    deskripsi: string;
} | undefined>;
export declare const updatePasswordAction: (formData: FormData) => Promise<{
    message: string;
    deskripsi: string;
} | undefined>;
