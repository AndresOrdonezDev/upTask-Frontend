import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"

export default function CreateProjectView() {
    const navigate = useNavigate()
    const initialValues: ProjectFormData = {
        "projectName": "",
        "clientName": "",
        "description": ""
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    //****create freely
    // const handleForm = async (formData:ProjectFormData) => {
    //     const data = await createProject(formData)
    //     navigate('/')
    //     toast.success(data)
    // }

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })
    const handleForm = (formData: ProjectFormData) => mutate(formData)

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-black">Crear proyecto</h1>
                <p
                    className="text-lg font-semibold text-gray-500 mt-5">
                    Llenar formulario
                </p>
                <nav className="my-5">

                    <Link
                        to={'/'}
                        className="bg-purple-400 hover:bg-purple-500 px-8 py-2 text-white text-xl font-bold cursor-pointer transition-colors"
                    >Volver</Link>
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
                        value="Crear proyecto"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer transition-color w-full p-3 text-white uppercase font-bold"
                    />
                </form>
            </div>
        </>
    )
}
