type FormContextType = {
    isLoading: boolean;
};
declare const FormContext: import("react").Context<FormContextType | null>;
export declare const useFormStatus: () => FormContextType;
export default FormContext;
