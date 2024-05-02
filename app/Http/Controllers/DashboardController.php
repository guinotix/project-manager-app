<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalPendingTasks = Task::query()->where('status', 'pending')->count();
        $myPendingTasks = Task::query()->where('status', 'pending')->where('assigned_to', auth()->user()->id)->count();

        $totalProgressTasks = Task::query()->where('status', 'in_progress')->count();
        $myProgressTasks = Task::query()->where('status', 'in_progress')->where('assigned_to', auth()->user()->id)->count();

        $totalCompleteTasks = Task::query()->where('status', 'complete')->count();
        $myCompleteTasks = Task::query()->where('status', 'complete')->where('assigned_to', auth()->user()->id)->count();

        $activeTasks = Task::query()->whereNot('status', 'completed')->where('assigned_to', auth()->user()->id)->limit(3)->get();
        $activeTasks = TaskResource::collection($activeTasks);

        return Inertia::render('Dashboard', compact('totalPendingTasks', 'myPendingTasks', 'totalProgressTasks', 'myProgressTasks', 'totalCompleteTasks', 'myCompleteTasks', 'activeTasks'));
    }
}
