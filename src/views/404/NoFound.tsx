import { Link } from "react-router-dom";

export default function NoFound() {
  return (
    <>
        <h1 className="text-center text-white text-4xl font-black">Página no encontrada</h1>
        <h1 className="text-8xl text-fuchsia-500 mt-10 text-center font-black">404</h1>
        <p className="text-white text-center mt-10 text-2xl">Tal vez quieras ir a <Link to={'/'} className="text-fuchsia-500">Proyectos</Link></p>
    </>
  )
}
