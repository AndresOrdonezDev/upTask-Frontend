import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate} from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Project, Task, TaskFormData } from '@/types/index';
import TaskForm from './TaskFrom';
import { updateTask } from '@/api/TaskAPI';


type EditTaskModalProps = {
    data: Task,
    taskId: Task['_id'],
    projectId:Project['_id']
}

export default function EditTaskModal({data, taskId, projectId}: EditTaskModalProps) {

    const navigate = useNavigate()

    const {register,handleSubmit, formState:{errors}, reset } = useForm({defaultValues:{
        taskName: data.taskName,
        description: data.description
    }})

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: updateTask,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['viewProject', projectId]})
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            toast.success(data)
            reset()
            navigate(-1)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

   const handleEditTask = (formData: TaskFormData)=>{
       
        const data= {
            formData, 
            projectId,
            taskId
        }
        mutate(data)
   }

    
    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(-1)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    noValidate
                                >
                    
                                    <TaskForm 
                                        register={register} 
                                        errors={errors}
                                    />
                    
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Guardar Tarea'
                                    onClick={handleSubmit(handleEditTask)}
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}