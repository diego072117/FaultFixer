<?php

namespace App\Models\Posts;

use App\Models\Users\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Posts extends Model
{
    use SoftDeletes;

    protected $table = 'posts';

    protected $fillable = [
        'descripcion',
        'publicacion',
        'id_usuarioCreador',
        'id_usuarioAdquirido',
        'state',
    ];

    public function usuarioCreador()
    {
        return $this->belongsTo(User::class, 'id_usuarioCreador');
    }
}
