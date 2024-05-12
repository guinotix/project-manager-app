<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $currentUser = auth()->user();

        $totalPendingTasks = Task::query()->where('status', 'pending')->count();
        $myPendingTasks = Task::query()->where('status', 'pending')->where('assigned_to', $currentUser->id)->count();

        $totalProgressTasks = Task::query()->where('status', 'in_progress')->count();
        $myProgressTasks = Task::query()->where('status', 'in_progress')->where('assigned_to', $currentUser->id)->count();

        $totalCompleteTasks = Task::query()->where('status', 'completed')->count();
        $myCompleteTasks = Task::query()->where('status', 'completed')->where('assigned_to', $currentUser->id)->count();

        $activeTasks = Task::query()->whereIn('status', ['pending', 'in_progress'])->where('assigned_to', $currentUser->id)->limit(3)->get();
        $activeTasks = TaskResource::collection($activeTasks);

        return Inertia::render('Dashboard', compact('totalPendingTasks', 'myPendingTasks', 'totalProgressTasks', 'myProgressTasks', 'totalCompleteTasks', 'myCompleteTasks', 'activeTasks'));
    }
}
