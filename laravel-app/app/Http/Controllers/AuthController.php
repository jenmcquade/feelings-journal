<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function auth(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            try {
                $request->session()->regenerate();
            } catch (\Exception $e) {
                return response()->json(['error' => 'Session regeneration failed'], 500);
            }
            
            $user = Auth::user();
            return response()->json(['message' => 'User authenticated', 'user' => $user], 200);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function register(Request $request)
    {
        $username = $request->input('username');
        $email = $request->input('email');
        $password = $request->input('password');
        $confirmPassword = $request->input('confirmPassword');

        if ($password !== $confirmPassword) {
            return response()->json(['error' => 'Passwords do not match'], 400);
        }

        $user = User::firstOrNew(['email' => $email]);

        if ($user->exists) {
            return response()->json(['error' => 'Your account already exists'], 400);
        }

        $user->name = $username;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->save();

        return response()->json(['message' => 'User created', 'user' => $user], 200);
    }

    public function getUser(Request $request)
    {
        $user = Auth::user();
        return response()->json(['user' => $user], 200);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'User logged out'], 200);
    }
}
