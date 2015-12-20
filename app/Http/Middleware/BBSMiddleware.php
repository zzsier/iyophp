<?php namespace App\Http\Middleware;

use Closure;
use Cache;
use App\Model\IyoUser;
use Auth;
use Agent;
use Log;
use Illuminate\View\FileViewFinder;
use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Contracts\Routing\Middleware;

class BBSMiddleware implements Middleware {

	protected $view;

	public function __construct(ViewFactory $view)
	{
		$this->view = $view;
    }

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		if (Agent::isMobile()) {
			$app = app();
			$paths = $app['config']['view.paths'];
			array_unshift($paths, $app['config']['view.mobile_path']);
			$this->view->setFinder(new FileViewFinder($app['files'], $paths));
			Log::info("in mobile explorer");
		} else {
			Log::info("in desktop explorer");
		}

		$session = "";
		if( isset($request["session"]) ) {
			$session = $request["session"];
			setcookie("session", $session);
		}
		if( isset($_COOKIE["session"]) ){
			$session = $_COOKIE["session"];
		}

		if( $session == "" ) {
			return $next($request);
		}
		$id = Cache::get($session);

		if( $id == "" ) {
			return $next($request);
		}
		
		$user = IyoUser::find($id);
		Auth::login($user, true);

		return $next($request);
	}

}
