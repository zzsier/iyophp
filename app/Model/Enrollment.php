<?php
namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Input;
use URL;

class Enrollment extends Model
{
	public function activity()
	{
		return $this->belongsTo('App\Model\Activity');
	}

	public function user()
	{
		return $this->belongsTo('App\Model\IyoUser');
	}
}
