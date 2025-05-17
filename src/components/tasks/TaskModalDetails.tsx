import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formateDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import { TaskStatus } from '@/types/index';
import NotesPanel from '../notes/NotesPanel';


export default function TaskModalDetails() {
    const navigate = useNavigate()

    const location = useLocation()
    const taskId = new URLSearchParams(location.search).get('viewTaskId')!;
    const params = useParams()
    const projectId = params.projectId!
    const show = taskId ? true : false;

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId, //do not fetch if taskId is not present
        retry: false
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            queryClient.invalidateQueries({ queryKey: ['viewProject', projectId] })
            navigate(-1)
        },
        onError: (error) => {
            toast.error(error.message, { toastId: 'error' });
        }
    })
    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const status = e.target.value as TaskStatus
        const data = {
            projectId,
            taskId,
            status
        }
        mutate(data)
    }

    useEffect(() => {
        if (isError && error) {
            toast.error(error.message, { toastId: 'error' });
            navigate(`/projects/${projectId}`);
        }
    }, [isError, error, navigate, projectId]);


    if (data) return (
        <>
            <Transition appear show={show} as={Fragment}>
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
                                    <p className='text-sm text-slate-400'>Agregada el: {formateDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formateDate(data.updatedAt)}</p>

                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.taskName}

                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>{data.description}</p>
                                    {data.completedBy.length ? (
                                        <>
                                            <p className='text-slate-500 mb-2'>Historial de cambios:</p>
                                            <details className="px-5 text-sm text-slate-600">
                                                <summary className="cursor-pointer font-semibold text-slate-700 mb-2">Ver historial de cambios</summary>
                                                <ul className="list-decimal mt-2">
                                                    {data.completedBy.map((activityLog) => (
                                                        <li key={activityLog._id} className="mb-1">
                                                            <span className="font-bold">{statusTranslations[activityLog.status]}:</span>{" "}
                                                            <span>{activityLog.user.username}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </details>
                                        </>
                                    ):null}

                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>
                                        <select
                                            className='w-full p-2 border bg-white border-gray-300 '
                                            defaultValue={data.status}
                                            onChange={handleChangeStatus}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <NotesPanel notes={data.notes}/>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}