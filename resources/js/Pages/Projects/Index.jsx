import Paginator from '@/Components/Paginator';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import { STATUS_CLASS_MAP, STATUS_TEXT_MAP } from '@/badges.jsx'

export default function Index({ auth, projects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
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
                                        projects.data.map(project => (
                                            <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th className="px-3 py-2">{project.id}</th>
                                                <th className="px-3 py-2 hover:underline">
                                                    <Link href={route("projects.show", project.id)}>
                                                        {project.name}
                                                    </Link>
                                                </th>
                                                <td className="px-3 py-2">
                                                    <span className={"px-2 py-1 rounded text-slate-50 " + STATUS_CLASS_MAP[project.status]}>
                                                        {STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">{project.created_at}</td>
                                                <td className="px-3 py-2">{project.due_date}</td>
                                                <td className="px-3 py-2">{project.created_by.name}</td>
                                                <td className="px-3 py-2">
                                                    <Link href={route("projects.edit", project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                        Edit
                                                    </Link>
                                                    <Link href={route("projects.destroy", project.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <Paginator links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
