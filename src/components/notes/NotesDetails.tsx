import { deleteNote } from "@/api/NoteAPI";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formateDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
type NotesDetailsProps = {
    note: Note
}
export default function NotesDetails({ note }: NotesDetailsProps) {

    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTaskId')!

    const queryClient = useQueryClient()
    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })
    const handleDelete = () => {
        mutate({ projectId, taskId, noteId: note._id })
    }
    if (isLoading) return 'Cargando...'
    if (data) return (
        <div className="p-2 flex justify-between items-center">
            <div>
                <p className="text-slate-600">{note.content} por : <span className=" font-bold text-sm">{note.createdBy.username}</span></p>
                <p className="text-xs text-slate-500">{formateDate(note.createdAt)}</p>
            </div>
            {canDelete && <button onClick={handleDelete} type="button" className="text-red-400 text-sm cursor-pointer hover:text-red-700 transition-all duration-200">
                Eliminar
            </button>}

        </div>
    )
}
