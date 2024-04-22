import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {

    const { data, setData, post, errors, reset } = useForm({
        name: "",
        description: "",
        status: "",
        due_date: "",
    });

    const submitForm = (event) => {
        event.preventDefault();

        post(route("projects.store"));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="New project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submitForm} className="p-4 bg-white shadow dark:bg-gray-800 sm:p-8 sm:rounded-lg">
                            
                            {/* Name */}
                            <div className="mt-4">
                                <InputLabel htmlFor="project_name" value="Project Name" />
                                <TextInput id="project_name" type="text" name="name" value={data.name} className="mt-1 block w-full" isFocused={true} onChange={(event) => setData("name", event.target.value)} />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            
                            {/* Description */}
                            <div className="mt-4">
                                <InputLabel htmlFor="project_description" value="Project Description" />
                                <TextAreaInput id="project_description" name="description" value={data.description} className="mt-1 block w-full" onChange={(event) => setData("description", event.target.value)} />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Due Date */}
                            <div className="mt-4">
                                <InputLabel htmlFor="project_due_date" value="Deadline" />
                                <TextInput id="project_due_date" type="date" name="due_date" value={data.due_date} className="mt-1 block w-full" onChange={(event) => setData("due_date", event.target.value)} />
                                <InputError message={errors.due_date} className="mt-2" />
                            </div>

                            {/* Status */}
                            <div className="mt-4">
                                <InputLabel htmlFor="project_status" value="Status" />
                                <SelectInput id="project_status" name="status" className="mt-1 block w-full" onChange={(event) => setData("status", event.target.value)}>
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={route("projects.index")} className="bg-gray-100 px-3 py-1 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
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
