import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"

export default function ProjectDetailsView() {
    const { data: user, isLoading: authLoading, isError: authError } = useAuth()
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['viewProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })
    const canEdit = useMemo(()=> data?.manager === user?._id, [data, user])

    if (isLoading || authLoading) return 'cargando..'
    if (isError || authError) return <Navigate to={'/404'} />
    if (data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-gray-500 text-2xl mt-5">{data.description}</p>
            {isManager(data.manager, user._id) &&
                <nav className="my-5 flex gap-3">
                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-4 py-3 font-bold text-white uppercase transition-colors cursor-pointer"
                        onClick={() => navigate(`?newTask=true`)}
                    >
                        Agregar Tarea
                    </button>
                    <Link
                        to={`/projects/${projectId}/team`}
                        className="bg-fuchsia-400 hover:bg-fuchsia-500 px-4 py-3 font-bold text-white uppercase transition-colors cursor-pointer"
                    >Colaboradores</Link>
                </nav>}
            <TaskList 
                tasks={data.tasks}
                canEdit={canEdit}
            />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}

