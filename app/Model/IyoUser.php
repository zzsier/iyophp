<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class IyoUser extends Model {

	//

    public static function queryById($id)
    {
        $redis = Redis::connetion("default");

        if(!$redis->exists('user_'.$id)) {
            $user = IyoUser::find($id);
            if($user["usertype"] == 2 ) {
                $union = IyoUnion::find($id);
                $user["union"] = $union;
            }
            $redis->set('user_' . $id, json_encode($user));
        }

        $user = json_decode($redis->get('user_' . $id));
        return $user;
    }

    public static function queryListByIds($ids, $num=0, $current=0)
    {
        $results = [];

        if($num == 0) {
            foreach ($ids as $fid) {
                $results[] = IyoUser::queryId($fid);
            }
        } else {
            for( $i = $current; $i < $num; $i++ ) {
                if($i >= count($ids)) {
                    break;
                }
                $results[] = IyoUser::queryId($ids[$i]);
            }
        }

        return $results;
    }

}
