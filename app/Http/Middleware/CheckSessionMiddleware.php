<?php namespace App\Http\Middleware;

use Closure;
use Cache;

class CheckSessionMiddleware {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		$id = Cache::get($request->json("session",""));
                                                                                                                                           
                if( $id == "" ) {
                        $result = array('code' => trans('code.SessionAlreadyExpired'),'desc' => __LINE__, 'message' => trans('errormsg.SessionAlreadyExpired'));
                        return $result;
                }
		$request["id"] = $id;

		return $next($request);
	}

}
