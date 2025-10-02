import { LucideIcon } from "lucide-react";
type DetailDataDisplayType = {
    title: string;
    Icon: LucideIcon;
    value: string | number;
    variant?: string;
};
declare const DetailDataDisplay: ({ title, Icon, value, variant }: DetailDataDisplayType) => import("react/jsx-runtime").JSX.Element;
export default DetailDataDisplay;
