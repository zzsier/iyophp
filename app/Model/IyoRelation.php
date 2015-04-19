<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class IyoRelation extends Model {

	//
    public function save() {
        $redis = Redis::connetion("default");
        $redis->del('star_follow_'.$this->id);
        $redis->del('union_follow_'.$this->id);
        parent::save();
    }

    public function delete() {
        $redis = Redis::connetion("default");
        $redis->del('star_follow_'.$this->id);
        $redis->del('union_follow_'.$this->id);
        parent::delete();
    }

    public static function queryFollowUnionList($id) {
        $redis = Redis::connetion("default");
        if(!$redis->exists('union_follow_'.$id)) {

            $union_relations = IyoRelation::where('id', '=', $id)
                ->where('type', '=', '2')->orderby('name')->get();

            $union_ids = [];

            foreach ($union_relations as $union_relation)
            {
                $union_ids[] = $union_relation["fid"];
            }

            $ids = $redis->set('union_follow_'.$id, json_encode($union_ids));
        }
    }

    public static function queryFollowStarList($id) {
        $redis = Redis::connetion("default");
        if(!$redis->exists('star_follow_'.$id)) {

            $union_relations = IyoRelation::where('id', '=', $id)
                ->where('type', '=', '1')->orderby('name')->get();

            $union_ids = [];

            foreach ($union_relations as $union_relation)
            {
                $union_ids[] = $union_relation["fid"];
            }

            $ids = $redis->set('star_follow_'.$id, json_encode($union_ids));
        }
    }

}
