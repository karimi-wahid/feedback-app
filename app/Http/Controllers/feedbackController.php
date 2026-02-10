<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class feedbackController extends Controller
{
    public function index()
    {
        return Inertia::render('Feedback/Index');
    }
}
