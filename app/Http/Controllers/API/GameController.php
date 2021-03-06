<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Answer;

class GameController extends Controller
{
    /**
     * Defines the model class.
     **/
    const MODEL = 'App\Game';

    /**
     * Defines dependencies.
     **/
    const DEPENDENCIES = ['difficulty' => 'App\Difficulty'];

    /**
     * Defines pivot dependencies.
     **/
    const PIVOT_DEPENDENCIES = ['users' => 'App\User'];

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->prepareAndExecuteIndexQuery($request, self::MODEL, self::DEPENDENCIES, self::PIVOT_DEPENDENCIES);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = [
            'difficulty_id' => 'required|numeric',
            'mode'          => 'required|string|in:practice,single,multi',
            'type'          => 'required|string|in:intervals,rythm',
            'users'         => 'array'
        ];

        return $this->prepareAndExecuteStoreQuery($request, $data, self::MODEL, self::DEPENDENCIES, self::PIVOT_DEPENDENCIES);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        return $this->prepareAndExecuteShowQuery($request, $id, self::MODEL, self::DEPENDENCIES, self::PIVOT_DEPENDENCIES);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = [
            'difficulty_id' => 'numeric',
            'mode'          => 'string|in:practice,single,multi',
            'type'          => 'string|in:intervals,rythm',
            'users'         => 'array'
        ];

        return $this->prepareAndExecuteUpdateQuery($request, $data, $id, self::MODEL, self::DEPENDENCIES, self::PIVOT_DEPENDENCIES);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->prepareAndExecuteDestroyQuery($id, self::MODEL);
    }

    /**
     * Generate game statistics.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function statistics(Request $request, $id)
    {
        $response = $this->show($request, $id);
        if ($response->status() !== 200) {
            return $response;
        }

        $game = $response->getOriginalContent();
        $users = $game->users()->orderBy('points', 'desc')->get(['id', 'name', 'rating', 'avatar', 'points']);

        $participated = false;
        foreach ($users as $user) {
            if ($user->id === $request->user()->id) {
                $participated = true;
                break;
            }
        }

        $statistics = null;

        if ($participated) {
            $answers = Answer::where(['game_id' => $game->id, 'user_id' => $request->user()->id])->get();

            $statistics = [];

            $statistics['timeAvg'] = $answers->avg('time');
            $statistics['nAdditionsAvg'] = $answers->avg('n_additions');
            $statistics['nDeletionsAvg'] = $answers->avg('n_deletions');
            $statistics['nPlaybacksAvg'] = $answers->avg('n_playbacks');

            $statistics['successAvg'] = $answers->avg('success');

            $statistics['successAvgByChapter'] = [];
            for ($i = 1; $i <= 3; $i++) {
                $statistics['successAvgByChapter'][$i] = $answers->where('question.chapter', $i)->avg('success');
            }

            $statistics['successByChapter'] = [];
            for ($i = 1; $i <= 3; $i++) {
                $statistics['successByChapter'][$i] = $answers->where('question.chapter', $i)->pluck('success')->all();
            }
        }

        return response()->json([
            'users'      => $users,
            'difficulty' => $game->difficulty,
            'statistics' => $statistics
        ], 200);
    }
}
