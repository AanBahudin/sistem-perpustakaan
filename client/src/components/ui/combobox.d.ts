export type ComboboxOption = {
    label: string;
    value: string;
};
interface ComboboxProps {
    options: ComboboxOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}
export declare function Combobox({ options, value, onChange, placeholder }: ComboboxProps): import("react/jsx-runtime").JSX.Element;
export {};
