import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery} from '@tanstack/react-query'
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"

export default function ProjectDetailsView() {
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()

    const { data, isLoading,isError } = useQuery({
        queryKey:['editProject',projectId],
        queryFn:() => getProjectById(projectId),
        retry:false
    })

    if(isLoading) return 'cargando..'
    if(isError) return <Navigate to={'/404'}/>
    
    if(data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-gray-500 text-2xl mt-5">{data.description}</p>
            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-4 py-3 font-bold text-white uppercase transition-colors cursor-pointer"
                    onClick={() => navigate(`?newTask=true`)}
                >
                    Agregar Tarea
                </button>
            </nav>
            <AddTaskModal/>
        </>
    )
}

