import FormContext from '@/context/FormContext'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';

type ActionFunction = (formData: FormData) => Promise<any>;

const FormContainer = ({action, children, className} : {action: ActionFunction, children: React.ReactNode, className?: string}) => {
  const queryClient = useQueryClient()
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
        onSuccess: ({message, deskripsi, redirectTo, showToast = true, queryKey}) => {
          setMessage(message || '');
          setLoading(false);
          
          if (redirectTo !== '') {
            navigate(redirectTo)
          }
      
          if (queryKey.length > 0) {
            queryClient.invalidateQueries(queryKey)
          }

          if (showToast) {
            toast(message, {description: deskripsi})
          }

        },
        onError: (error: any) => {
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
            <form encType='multipart/form-data' className={cn('w-full h-full mx-auto', className)} onSubmit={handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    )
}

export default FormContainer