import { Task } from "@/types/index"
import TaskCard from "./TaskCard"
import { statusTranslations } from "@/locales/es"
type TaskListProps = {
    tasks: Task[]
}

type GroupedTasks ={
    [key: string]: Task[]
}

const initialStatusGroups : GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    complete: []
}

const statusStyles:{[key:string]:string} = {
    pending:'border-t-slate-500',
    onHold:'border-t-pink-500',
    inProgress:'border-t-indigo-500',
    underReview:'border-t-amber-500',
    complete:'border-t-teal-500'
}

export default function TaskList({ tasks }: TaskListProps) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { 
            ...acc, 
            [task.status]: currentGroup 
        };
    }, initialStatusGroups );

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>

                        <h3 
                            className={`${statusStyles[status]} text-xl text-center capitalize border border-slate-300 bg-white border-t-8`}
                        >{statusTranslations[status]}</h3>
                        
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}
