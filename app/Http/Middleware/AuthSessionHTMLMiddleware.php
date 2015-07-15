<?php namespace App\Http\Middleware;

use Closure;
use Cache;
use App\Model\IyoUser;
use Auth;

class AuthSessionHTMLMiddleware{

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		$session = "";
		if( isset($request["session"]) ) {
			$session = $request["session"];
			setcookie("session", $session);
		}
		if( isset($_COOKIE["session"]) ){
			$session = $_COOKIE["session"];
		}

		if( $session == "" ) {
			$result = array('code' => trans('code.SessionAlreadyExpired'),'desc' => __LINE__, 'message' => trans('errormsg.SessionAlreadyExpired'));
			return $result;
		}
		$id = Cache::get($session);

		if( $id == "" ) {
			$result = array('code' => trans('code.SessionAlreadyExpired'),'desc' => __LINE__, 'message' => trans('errormsg.SessionAlreadyExpired'));
			return $result;
		}
		
		$user = IyoUser::find($id);
		Auth::login($user, true);

		return $next($request);
	}

}
