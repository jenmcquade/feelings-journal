<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeelingRepository
{
    public function getNestedFeelings()
    {
        $allFeelings = Feeling::all();
        $feelingsByParent = [];
        foreach ($allFeelings as $feeling) {
            $feelingsByParent[$feeling->parent_id][] = $feeling;
        }
        $nestedFeelings = $this->buildNestedFeelings($feelingsByParent, null);

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
