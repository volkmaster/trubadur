<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'winner_id', 'level_id', 'mode', 'type', 'finished',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    public function winner()
    {
        return $this->belongsTo('App\User');
    }

    public function level()
    {
        return $this->belongsTo('App\Level');
    }

    public function questions()
    {
        return $this->hasMany('App\Question');
    }

    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps()->using('App\GameUser');
    }
}
