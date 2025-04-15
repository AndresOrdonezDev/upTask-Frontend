import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal";
import { Task } from "@/types/index";

export default function EditTaskData() {
    //get ProjectId
    const params = useParams()
    const projectId = params.projectId!
    //get taskId
    const location = useLocation()
    const taskId = new URLSearchParams(location.search).get('editTaskId')!;

    const { data, isError }= useQuery<Task>({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId }),
        enabled: !!taskId,
    })
    if(isError) return <Navigate to={'/404'} />
    if (data) return (
        <EditTaskModal data={data} taskId={taskId} projectId={projectId}/>
    )
}
