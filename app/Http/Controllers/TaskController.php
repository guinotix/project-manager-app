<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $tasks = Task::paginate(8);

        return Inertia::render('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
            'success' => session('success'),
        ]);
    }

    public function indexUserTasks()
    {
        $tasks = Task::query()->where('assigned_to', auth()->user()->id)->paginate(8);

        return Inertia::render('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return Inertia::render('Tasks/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|' . Rule::in(['pending', 'in_progress', 'completed']),
            'priority' => 'required|' . Rule::in(['low', 'medium', 'high']),
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
        ]);
        $validated['created_by'] = auth()->user()->id;
        $validated['updated_by'] = auth()->user()->id;

        Task::create($validated);
        
        return redirect(route('tasks.index'))->with('success', 'Task created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return Inertia::render('Tasks/Show', [
            // 'project' => new ProjectResource($project),
            'task' => new TaskResource($task)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return Inertia::render('Tasks/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|' . Rule::in(['pending', 'in_progress', 'completed']),
            'priority' => 'required|' . Rule::in(['low', 'medium', 'high']),
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
        ]);
        $validated['updated_by'] = auth()->user()->id;

        $task->update($validated);

        return redirect(route('tasks.index'))->with('success', 'Task updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return redirect(route('tasks.index'))->with('success', 'Task deleted');
    }
}
