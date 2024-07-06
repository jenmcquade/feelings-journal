<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Feeling;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeelingSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $json = file_get_contents(database_path('seeders/feelings.json'));
        $feelings = json_decode($json, true);
        foreach ($feelings as $index => $feeling) {
            $this->createNestedFeelings($feeling);
        }
    }

    public function createNestedFeelings(array $feelingData, ?Feeling $parentFeeling = null, int $base = 1)
    {
        if (!$parentFeeling) {
            $parentFeeling = Feeling::firstOrCreate([
                'text' => $feelingData['value'],
            ]);
            $parentFeeling->save();
        } else {
            $parentFeeling = $parentFeeling->children()->create([
                'text' => $feelingData['value'],
            ]);
        }

        if (isset($feelingData['feelings'])) {
            foreach ($feelingData['feelings'] as $index => $childData) {
                $child = $this->createNestedFeelings($childData, $parentFeeling, $index + 1);
                if ($child->id !== $parentFeeling->id) {
                    $parentFeeling->children()->save($child);
                }
            }
        }

        return $parentFeeling;
    }
}
