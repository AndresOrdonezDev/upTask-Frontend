import { Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDraggable } from '@dnd-kit/core'
import {TaskProject } from "@/types/index"
import { deleteTask } from '@/api/TaskAPI'

type TaskCardProps = {
    task: TaskProject,
    canEdit?: boolean
}

export default function TaskCard({ task, canEdit }: TaskCardProps) {

    const navigate = useNavigate()

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id
    })

    //get ProjectId
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['viewProject', projectId] })
            toast.error(data)
        },
        onError: (error) => {
            toast.error(error.message)
        }

    })
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px,0)`,
        padding:"1.25rem",
        backgroundColor:'#fff',
        width:'300px',
        display:"flex",
        borderWidth:"1px",
        borderColor:'#d0d0d0',
         borderRadius:"3px"
    } : undefined
    return (
        <li className="bg-white shadow mt-5 p-5 border-slate-300 flex justify-between gap-3">

            <div
                {...listeners}
                {...attributes}
                ref={setNodeRef}
                style={style}
                className="min-w-0 flex flex-col gap-y-2"
            >
                <p
                    className="text-xl font-bold text-slate-600 text-left"
                >
                    {task.taskName}
                </p>
                <p className="text-slate-500 text-sm">{task.description}</p>
            </div>
            <div className="flex shrink-0  gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                                <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                    onClick={() => navigate(location.pathname + `?viewTaskId=${task._id}`)}
                                >
                                    Ver Tarea
                                </button>
                            </Menu.Item>
                            {canEdit && (
                                <>
                                    <Menu.Item>
                                        <button
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                            onClick={() => navigate(location.pathname + `?editTaskId=${task._id}`)}
                                        >
                                            Editar Tarea

                                        </button>
                                    </Menu.Item>

                                    <Menu.Item>
                                        <button
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-red-500'
                                            onClick={() => mutate({ projectId, taskId: task._id })}
                                        >
                                            Eliminar Tarea
                                        </button>
                                    </Menu.Item>

                                </>
                            )}

                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </li>
    )
}
