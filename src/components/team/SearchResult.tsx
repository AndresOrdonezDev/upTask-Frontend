import { addUserToProject } from "@/api/TeamAPI";
import { TeamMember } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
type SearchResultProps ={
    user:TeamMember,
    reset: () => void
}


export default function SearchResult({user, reset}:SearchResultProps) {
    const navigate = useNavigate()
    const projectId = useParams().projectId! 
    const {mutate} = useMutation({
        mutationFn:addUserToProject,
        onError:(error)=> toast.error(error.message),
        onSuccess:(data)=> {
            toast.success(data)
            reset()
            navigate(-1)
        }
    })

    const handleAddUserToProject = ()=>{
        const data ={
           projectId,
           id:user._id 
        }
        mutate(data)
    }
  return (
    <>
        <p className="mt-10 text-center font-bold">Resultado:</p>
        <div className="flex justify-between items-center">
            <p className="font-bold">{user.username}</p>
            <button
                onClick={handleAddUserToProject}
                className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
            >
                Agregar al Proyecto
            </button>
        </div>
    </>
  )
}
