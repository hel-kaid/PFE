<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(Request $request)
    {

        $validated = $request->validate([
            'username' => 'required|string|min:3|max:50|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/'
            ],
        ], [
            'username.required' => 'Username is required',
            'username.min' => 'Username must be at least 3 characters',
            'username.max' => 'Username must not exceed 50 characters',
            'username.unique' => 'Username already exists',
            'email.required' => 'Email is required',
            'email.email' => 'Email must be valid',
            'email.unique' => 'Email already exists',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 8 characters',
            'password.confirmed' => 'Passwords do not match',
            'password.regex' => 'Password must contain uppercase, lowercase, and numbers',
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'avatar' => "https://ui-avatars.com/api/?name=" . urlencode($validated['username']),
            'xp' => 0,
            'level' => 1,
            'streak_days' => 0,
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('username', $credentials['username'])->first();

        if (!$user) {
            return response()->json([
                'errors' => [
                    'username' => ['Username not found']
                ]
            ], 401);
        }


        if (!Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'errors' => [
                    'password' => ['Password is incorrect']
                ]
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function profile(Request $request)
    {

        if (!Auth::check()) {

            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        return response()->json([
            'user' => Auth::user()
        ]);
    }

    public function updateProfile(Request $request)
    {
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        /** @var User $user */
        $user = Auth::user();


        $rules = [
            'username' => 'sometimes|required|string|min:3|max:50|unique:users,username,' . $user->id,
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'avatar' => 'nullable|string',
            'current_password' => 'nullable|string',
            'password' => 'nullable|string|min:8|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/',
            'password_confirmation' => 'nullable|string|same:password',
        ];

        $messages = [
            'username.min' => 'Username must be at least 3 characters',
            'username.max' => 'Username must not exceed 50 characters',
            'username.unique' => 'Username already exists',
            'email.email' => 'Email must be valid',
            'email.unique' => 'Email already exists',
            'password.min' => 'Password must be at least 8 characters',
            'password.regex' => 'Password must contain uppercase, lowercase, and numbers',
            'password_confirmation.same' => 'Passwords do not match',
        ];

        $validated = $request->validate($rules, $messages);


        if (!empty($validated['password'])) {
            if (empty($validated['current_password'])) {
                return response()->json([
                    'errors' => [
                        'current_password' => ['Current password is required to change password']
                    ]
                ], 422);
            }

            if (!Hash::check($validated['current_password'], $user->password)) {
                return response()->json([
                    'errors' => [
                        'current_password' => ['Current password is incorrect']
                    ]
                ], 422);
            }

            $user->password = Hash::make($validated['password']);
        }


        if (isset($validated['username']) && !empty($validated['username'])) {
            $user->username = $validated['username'];
        }

        if (isset($validated['email']) && !empty($validated['email'])) {
            $user->email = $validated['email'];
        }

        if (isset($validated['avatar']) && !empty($validated['avatar'])) {
            $user->avatar = $validated['avatar'];
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful'
        ]);
    }

    public function verifyEmail(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $user = User::where('email_verification_token', $request->token)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid or expired verification token'
            ], 404);
        }

        // Marquer l'email comme vérifié
        $user->update([
            'email_verified_at' => now(),
            'email_verification_token' => null,
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Email verified successfully. You can now login.',
            'user' => $user
        ]);
    }
}