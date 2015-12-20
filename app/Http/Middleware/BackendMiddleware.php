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
use Illuminate\Contracts\Auth\Guard;

class BackendMiddleware implements Middleware {

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
		if( ! Auth::check() ) {
			return redirect()->guest('backend/auth/login');
		}

		return $next($request);
	}

}
