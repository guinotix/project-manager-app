<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $projects = Project::paginate(3);

        return Inertia::render('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Projects/Create');
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
        ]);
        $validated['created_by'] = auth()->user()->id;
        $validated['updated_by'] = auth()->user()->id;

        Project::create($validated);
        
        return redirect(route('projects.index'))->with('success', 'Project created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $tasks = $project->tasks()->paginate(5);

        return Inertia::render('Projects/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|' . Rule::in(['pending', 'in_progress', 'completed']),
        ]);
        $validated['updated_by'] = auth()->user()->id;

        $project->update($validated);

        return redirect(route('projects.index'))->with('success', 'Project updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return redirect(route('projects.index'))->with('success', 'Project deleted');
    }
}
