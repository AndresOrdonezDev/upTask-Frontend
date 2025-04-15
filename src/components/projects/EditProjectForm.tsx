import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from 'react-hook-form'
import { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import {toast} from 'react-toastify'

export type EditProjectFormProps = {
    data: ProjectFormData,
    projectId:Project['_id']
}

export default function EditProjectForm({data, projectId}:EditProjectFormProps) {

    const navigate = useNavigate()
    
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
        "projectName": data.projectName,
        "clientName": data.clientName,
        "description": data.description
    }})
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn :updateProject,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:['editProject', projectId]})
            toast.success(data)
            navigate('/')
        }
    })

   const handleForm = (formData:ProjectFormData)=>{
        const data ={
            formData,
            projectId
        }
        mutate(data)
   }
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-black">Editar proyecto</h1>
                <p
                    className="text-lg font-semibold text-gray-500 mt-5">
                    Llenar formulario 
                </p>
                <nav className="my-5">
                    <Link  
                        to={'/'}
                        className="bg-purple-400 hover:bg-purple-500 px-8 py-2 text-white text-xl font-bold cursor-pointer transition-colors"
                    >
                        Volver 
                    </Link>
                </nav>
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer transition-color w-full p-3 text-white uppercase font-bold"
                    />
                </form>
            </div>
        </>
    )
}
