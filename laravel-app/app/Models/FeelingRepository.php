<?php

namespace App\Models;

use Illuminate\Support\Facades\Cache;

class FeelingRepository
{
    public function getNestedFeelings()
    {
        $cacheKey = 'nested_feelings';

        $nestedFeelings = Cache::store('file')->get($cacheKey);

        if (!$nestedFeelings) {
            $allFeelings = Feeling::all();
            $feelingsByParent = [];
            foreach ($allFeelings as $feeling) {
                $feelingsByParent[$feeling->parent_id][] = $feeling;
            }
            $nestedFeelings = $this->buildNestedFeelings($feelingsByParent, null);
            Cache::store('file')->put($cacheKey, $nestedFeelings, 1440);
        }

        return $nestedFeelings;
    }

    private function buildNestedFeelings(&$feelingsByParent, $parentId)
    {
        $nested = [];
        if (isset($feelingsByParent[$parentId])) {
            foreach ($feelingsByParent[$parentId] as $feeling) {
                unset($feeling->color);
                $feeling->children = $this->buildNestedFeelings($feelingsByParent, $feeling->id);
                $nested[] = $feeling;
            }
        }
        return $nested;
    }
}
