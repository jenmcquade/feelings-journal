<?php

namespace App\Http\Controllers;

use App\Models\FeelingRepository;

class FeelingsController extends Controller
{
    public function getAllFeelings()
    {
        $feelings = app(FeelingRepository::class)->getNestedFeelings();
        return response()->json(['all_feelings' => $feelings], 200);
    }

    public function saveDailyNote()
    {
        $note = request()->input('note');
        $user = auth()->user();

        $existingNote = $user->notes()->where('created_at', '>=', now()->today())->first();

        if ($existingNote) {
            $existingNote->update(['note' => $note]);
            return response()->json(['note' => $note], 200);
        }

        $user->notes()->create([
            'note' => $note,
        ]);

        return response()->json(['note' => $note], 200);
    }

    public function saveFeeling()
    {
        $feelingId = request()->input('feeling_id');
        $user = auth()->user();

        if (!$user->todaysFeelings()->exists() || !$user->todaysFeelings()->where('feeling_id', $feelingId)->exists()) {
            $user->feelings()->attach($feelingId);

            return response()->json(['todays_feelings' => $user->todaysFeelings()->get()], 200);
        }

        $existingFeeling = $user->todaysFeelings()
            ->where('feeling_id', $feelingId)
            ->first();

        if ($existingFeeling) {
            $existingFeeling->pivot->delete();
            return response()->json(['todays_feelings' => $user->todaysFeelings()->get()], 200);
        }

        $user->feelings()->attach($feelingId);

        return response()->json(['todays_feelings' => $user->todaysFeelings()->get()], 200);
    }
}
