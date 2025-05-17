import { NoteFormData } from '@/types/index'
import { useForm } from 'react-hook-form'

import ErrorMessage from '../ErrorMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/api/NoteAPI'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

export default function AddNoteForm() {
    const initialValues: NoteFormData = {
        content: ''
    }
    const params = useParams()
    const projectId = params.projectId!
    
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTaskId')!

    const { register, handleSubmit,reset, formState: { errors } } = useForm({ defaultValues: initialValues })
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn:createNote,
        onSuccess:(data)=>{
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
    const handleAddNote = (formData:NoteFormData)=>{
        const data = {
            formData,
            projectId,
            taskId
        }
        mutate(data)
    }
    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-2"
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label
                    className="font-bold"
                    htmlFor="content"
                >Crear Nota</label>
                <input
                    type="text"
                    id="content"
                    placeholder="Contenido de la nota"
                    className="w-full p-2 border border-gray-300 "
                    {...register('content', {
                        required: 'La nota es requerida',
                    })}
                />
                {errors.content &&
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                }
            </div>
            <input
                type="submit"
                value="Crear Nota"
                className="w-full p-2 bg-fuchsia-600 text-white font-bold rounded hover:bg-fuchsia-700 transition duration-200 cursor-pointer"
            />
        </form>
    )
}
