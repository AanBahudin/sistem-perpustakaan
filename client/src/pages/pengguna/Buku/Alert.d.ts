import { LucideIcon } from 'lucide-react';
type AlertContainerType = {
    title: string;
    link?: string;
    description: string;
    Icon?: LucideIcon;
};
export declare const DefaultAlert: ({ title, Icon, description }: AlertContainerType) => import("react/jsx-runtime").JSX.Element;
export declare const LinkAlert: ({ Icon, title, description, link }: AlertContainerType) => import("react/jsx-runtime").JSX.Element;
export declare const DangerAlert: ({ title, Icon, description }: AlertContainerType) => import("react/jsx-runtime").JSX.Element;
export declare const DiajukkanAlert: ({ title, deskripsi, link }: {
    title: string;
    deskripsi: string;
    link: string;
}) => import("react/jsx-runtime").JSX.Element;
export {};
