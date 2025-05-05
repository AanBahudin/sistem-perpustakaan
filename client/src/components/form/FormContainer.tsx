import FormContext from '@/context/FormContext'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type ActionFunction = (formData: FormData) => Promise<any>;

const FormContainer = ({action, children} : {action: ActionFunction, children: React.ReactNode}) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
          return await action(formData);
        },
        onMutate: () => {
          setLoading(true);
        },
        onSuccess: ({message, deskripsi, redirectTo}) => {
          setMessage(message || '');
          setLoading(false);
          toast(message, {description: deskripsi})
        
          if (redirectTo) {
            navigate(redirectTo)
          }
        },
        onError: (error: any) => {
          const isRedirect = error.response.data.redirectTo
          console.log(error);
    
          setMessage(error.message || 'Something went wrong');
          setLoading(false);
          toast("Terjadi Kesalahan", {description: error.response.data.message})
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
            <form className='w-full' onSubmit={handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    )
}

export default FormContainer