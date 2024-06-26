import Paginator from '@/Components/Paginator';
import { STATUS_CLASS_MAP, STATUS_TEXT_MAP } from '@/badges.jsx'
import { Link, router } from '@inertiajs/react';

export default function TasksTable({ tasks, success }) {

    const deleteTask = (task) => {
        if (!window.confirm("Are you sure you want to delete the task?")) return;
        router.delete(route("tasks.destroy", task.id));
    }

    return (
        <>
        
        {/* Success bag */}
        {success && 
            (<div className="bg-emerald-500 px-4 py-2 text-white rounded mb-4">
                { success }
            </div>)
        }

        <div className="overflow-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <th className="px-3 py-2">ID</th>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Creation date</th>
                        <th className="px-3 py-2">Due date</th>
                        <th className="px-3 py-2">Created by</th>
                        <th className="px-3 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.data.map(task => (
                            <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-3 py-2">{task.id}</th>
                                <td className="px-3 py-2 hover:underline">
                                    <Link href={route("tasks.show", task.id)}>
                                        {task.name}
                                    </Link>                
                                </td>
                                <td className="px-3 py-2">
                                    <span className={"px-2 py-1 rounded text-slate-50 " + STATUS_CLASS_MAP[task.status]}>
                                        {STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="px-3 py-2">{task.created_at}</td>
                                <td className="px-3 py-2">{task.due_date}</td>
                                <td className="px-3 py-2">{task.created_by.name}</td>
                                <td className="px-3 py-2">
                                    <Link href={route("tasks.edit", task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                        Edit
                                    </Link>
                                    <button onClick={e => deleteTask(task)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Paginator links={tasks.meta.links} />
        </div>
        </>
    );
}