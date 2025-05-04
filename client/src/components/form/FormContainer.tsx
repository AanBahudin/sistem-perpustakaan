import FormContext from '@/context/FormContext'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

type ActionFunction = (formData: FormData) => Promise<any>;

const FormContainer = ({action, children} : {action: ActionFunction, children: React.ReactNode}) => {

    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
          return await action(formData);
        },
        onMutate: () => {
          setLoading(true);
        },
        onSuccess: (message) => {
          setMessage(message || '');
          setLoading(false);
        },
        onError: (error: any) => {
          setMessage(error.message || 'Something went wrong');
          setLoading(false);
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutation.mutate(formData);
      };

    return (
        <FormContext.Provider value={{
            isLoading: loading
        }}>
            <form onSubmit={handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    )
}

export default FormContainer