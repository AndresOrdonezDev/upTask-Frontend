import AddMemberModal from "@/components/team/AddMemberModal"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function ProjectTeamView() {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!
    return (
        <>
            <h1 className="text-5xl font-black">Administrar Equipo</h1>
            <p className="text-gray-500 text-2xl mt-5">Equipo de trabajo para este proyecto</p>
            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-4 py-3 font-bold text-white uppercase transition-colors cursor-pointer"
                    onClick={() => navigate(`?addMember=true`)}
                >
                    Agregar Colaborador
                </button>
                <Link
                    to={`/projects/${projectId}`}
                    className="bg-fuchsia-400 hover:bg-fuchsia-500 px-4 py-3 font-bold text-white uppercase transition-colors cursor-pointer"
                >Volver</Link>
            </nav>
            <AddMemberModal/>
        </>
    )
}
