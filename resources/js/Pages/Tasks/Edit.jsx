import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, task, projects, users }) {

    const { data, setData, post, errors, reset } = useForm({
        name: task.name || "",
        description: task.description || "",
        status: task.status || "",
        priority: task.priority || "",
        due_date: task.due_date || "",
        project_id: task.project_id || "",
        assigned_to: task.assigned_to || "",
        _method: "PUT"
    });

    const submitForm = (event) => {
        event.preventDefault();

        post(route("tasks.update", task.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit task "{task.name}"</h2>}
        >
            <Head title="Edit task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submitForm} className="p-4 bg-white shadow dark:bg-gray-800 sm:p-8 sm:rounded-lg">
                            
                            {/* Name */}
                            <div className="mt-4">
                                <InputLabel htmlFor="task_name" value="Task Name" />
                                <TextInput id="task_name" type="text" name="name" value={data.name} className="mt-1 block w-full" isFocused={true} onChange={(event) => setData("name", event.target.value)} />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            
                            {/* Description */}
                            <div className="mt-4">
                                <InputLabel htmlFor="task_description" value="Task Description" />
                                <TextAreaInput id="task_description" name="description" value={data.description} className="mt-1 block w-full" onChange={(event) => setData("description", event.target.value)} />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Due Date */}
                            <div className="mt-4">
                                <InputLabel htmlFor="task_due_date" value="Deadline" />
                                <TextInput id="task_due_date" type="date" name="due_date" value={data.due_date} className="mt-1 block w-full" onChange={(event) => setData("due_date", event.target.value)} />
                                <InputError message={errors.due_date} className="mt-2" />
                            </div>

                            {/* Status */}
                            <div className="mt-4">
                                <InputLabel htmlFor="task_status" value="Status" />
                                <SelectInput id="task_status" name="status" value={data.status} className="mt-1 block w-full" onChange={(event) => setData("status", event.target.value)}>
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            {/* Priority */}
                            <div className="mt-4">
                                <InputLabel htmlFor="task_priority" value="Priority" />
                                <SelectInput id="task_priority" name="priority" value={data.priority} className="mt-1 block w-full" onChange={(event) => setData("priority", event.target.value)}>
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </SelectInput>
                                <InputError message={errors.priority} className="mt-2" />
                            </div>

                            {/* Assigned User */}
                            <div className="mt-4">
                                <InputLabel htmlFor="task_assigned_to" value="Assigned User" />
                                <SelectInput id="task_assigned_to" name="assigned_to" value={data.assigned_to} className="mt-1 block w-full" onChange={(event) => setData("assigned_to", event.target.value)}>
                                    <option value="">Select User</option>
                                    {
                                        users.data.map(user => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))
                                    }
                                </SelectInput>
                                <InputError message={errors.assigned_to} className="mt-2" />
                            </div>

                            {/* Project ID */}
                            <div className="mt-4">
                                <InputLabel htmlFor="task_project_id" value="Project" />
                                <SelectInput id="task_project_id" name="project_id" value={data.project_id} className="mt-1 block w-full" onChange={(event) => setData("project_id", event.target.value)}>
                                    <option value="">Select Project</option>
                                    {
                                        projects.data.map(project => (
                                            <option key={project.id} value={project.id}>{project.name}</option>
                                        ))
                                    }
                                </SelectInput>
                                <InputError message={errors.project_id} className="mt-2" />
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={route("tasks.index")} className="bg-gray-100 px-3 py-1 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
