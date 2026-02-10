<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class feedbackController extends Controller
{
    public function index()
    {
        return Inertia::render('Feedback/Index');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'feedback' => 'required|string|max:255'
        ]);
        Feedback::create($validated);
        return redirect()->route('feedback.index')->with('success', 'Feedback created successfully.');
    }
}
