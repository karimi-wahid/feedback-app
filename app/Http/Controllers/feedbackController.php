<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class feedbackController extends Controller
{
    public function index()
    {
        $feedbacks = Feedback::all();
        return Inertia::render('Feedback/Index', compact('feedbacks'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'feedback' => 'required|string|max:255'
        ]);
        Feedback::create([
            'title' => $request->input('title'),
            'feedback' => $request->input('feedback'),
        ]);
        return redirect()->route('feedback.index')->with('success', 'Feedback created successfully.');
    }

    public function update(Request $request, Feedback $feedbackId)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'feedback' => 'required|string|max:255'
        ]);

        $feedbackId->update($validated);
        return redirect()->route('feedback.index')->with('success', 'Feedback updated successfully.');
    }
}
