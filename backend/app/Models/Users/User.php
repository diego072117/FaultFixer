<?php

namespace App\Models\Users;

use App\Models\Comment\Comment;
use App\Models\Posts\Posts;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, SoftDeletes, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'username',
        'email',
        'telefono',
        'avatar',
        'password',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class, 'id_user');
    }

    public function posts()
    {
        return $this->hasMany(Posts::class, 'id_usuarioCreador');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
