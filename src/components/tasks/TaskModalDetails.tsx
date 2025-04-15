import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTaskById } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formateDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';


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
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>
                                        <select
                                            className='w-full p-2 border bg-white border-gray-300 '
                                            defaultValue={data.status}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value])=>(
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}