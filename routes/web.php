<?php

use App\Http\Controllers\feedbackController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Route::get('dashboard', function () {
//     return Inertia::render('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
    return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('feedback', [feedbackController::class, 'index'])->name('feedback.index');
    Route::post('feedback', [feedbackController::class, 'store'])->name('feedback.store');
    Route::put('feedback/{feedbackId}', [feedbackController::class, 'update'])->name('feedback.update');
});

require __DIR__.'/settings.php';
