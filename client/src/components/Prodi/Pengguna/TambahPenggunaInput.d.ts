type TambahPenggunaInputType = {
    name: string;
    label: string;
    type?: string;
    readonly?: boolean;
    placeholder?: string;
    defaultValue?: string;
    autofocus?: boolean;
    required?: boolean;
};
declare const TambahPenggunaInput: ({ name, label, type, readonly, defaultValue, placeholder, autofocus, required }: TambahPenggunaInputType) => import("react/jsx-runtime").JSX.Element;
export default TambahPenggunaInput;
