<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUser;
use App\Http\Requests\User\UpdateUser;
use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function createUser(CreateUser $request)
    {
        // La validación se maneja automáticamente por Laravel
        $userData = $request->all();

        // Aplicar hash bcrypt a la contraseña antes de almacenarla
        $userData['password'] = Hash::make($userData['password']);

        User::create($userData);

        return response()->json(['message' => 'Usuario registrado con éxito'], 201);
    }


    public function loginUser(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $user = auth()->user(); // Obtén el usuario autenticado

        return $this->respondWithTokenAndUser($token, $user);
    }

    public function getUserById($id)
    {
        // Busca el usuario junto con las relaciones followings y followers de una vez
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json($user);
    }

    public function getAllUsers()
    {
        $users = User::orderBy('created_at', 'DESC')->get();

        return response()->json($users);
    }

    protected function respondWithTokenAndUser($token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $user,
        ]);
    }

    public function updateUser(UpdateUser $request, $id)
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        //$newUserInfo = collect($request->all());

        $validatedData = $request->validated();

        // Actualizar el avatar si se proporciona uno nuevo
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatarPath = $avatar->storeAs('avatars', 'avatar_' . $user->id . '_' . time() . '.' . $avatar->getClientOriginalExtension(), 'public');
            $validatedData['avatar'] = $avatarPath;
        }

        // Actualizar el usuario con los datos validados
        $user->update($validatedData);

        return $user;
    }
}
