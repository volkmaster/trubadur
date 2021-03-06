<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Difficulty extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'range', 'min_notes', 'max_notes',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    public function gradeSchool()
    {
        return $this->hasOne('App\GradeSchool');
    }

    public function games()
    {
        return $this->hasMany('App\Game');
    }
}
