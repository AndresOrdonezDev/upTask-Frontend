import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from "react-router-dom"
import { useQuery} from '@tanstack/react-query'
import { getProjects } from "@/api/ProjectAPI"
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import DeleteProjectModal from '@/components/projects/DeleteProjectModal'
export default function DashboardView() {

  
  const navigate = useNavigate()
  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  if (isLoading || authLoading) return <p className="text-center py-5">Cargando...</p>

  if (data && user) return (
    <>
      <h1 className="text-3xl font-black">Mis Proyectos</h1>
      <p className="text-lg font-semibold text-gray-500 mt-5">Maneja y administra tus proyectos</p>
      <nav className="my-5">

        <Link
          to={'/projects/create'}
          className="bg-purple-400 hover:bg-purple-500 px-8 py-2 text-white text-xl font-bold cursor-pointer transition-colors"
        >Nuevo proyecto </Link>
      </nav>
      {data.length ? (
        <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 shadow-lg space-y-2">
          {data.map((project) => (
            <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10 bg-white ">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space">
                  <div className='mb-2'>
                    {project.manager === user._id ?
                      <p className='font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5'>Administrador</p> :
                      <p className='font-bold text-xs uppercase bg-teal-50 text-teal-500 border-2 border-teal-500 rounded-lg inline-block py-1 px-5'>Colaborador</p>
                    }
                  </div>
                  <Link to={`/projects/${project._id}`}
                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                  >{project.projectName}</Link>

                  <p className="text-sm text-gray-400 mt-5">
                    Cliente: {project.clientName}
                  </p>

                  <p className="text-sm text-gray-400">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                  </Menu.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    >
                      <Menu.Item>
                        <Link to={`/projects/${project._id}`}
                          className='block px-3 py-1 text-sm leading-6 text-gray-900 font-bold'>
                          Ver Proyecto
                        </Link>
                      </Menu.Item>

                      {isManager(project.manager, user._id) &&
                        <>
                          <Menu.Item>
                            <Link to={`/projects/${project._id}/edit`}
                              className='block px-3 py-1 text-sm leading-6 text-gray-900 font-bold'>
                              Editar Proyecto
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type='button'
                              className='block px-3 py-1 text-sm leading-6 text-red-500 font-bold'
                              onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                            >
                              Eliminar Proyecto
                            </button>
                          </Menu.Item>
                        </>
                      }
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>

          ))}
        </ul>
        
      ) : (
        <p className="text-center py-5">Aun no se han creado proyectos {' '}
          <Link
            to={'/projects/create'}
            className="text-fuchsia-500 font-bold"
          >
            Crear Proyecto
          </Link>
        </p>
      )}
      <DeleteProjectModal/>
    </>
  )
}
