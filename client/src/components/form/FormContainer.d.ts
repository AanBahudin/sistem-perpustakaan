import React from 'react';
type ActionFunction = (formData: FormData) => Promise<any>;
declare const FormContainer: ({ action, children, className }: {
    action: ActionFunction;
    children: React.ReactNode;
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
export default FormContainer;
