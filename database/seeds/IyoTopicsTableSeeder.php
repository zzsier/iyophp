<?php

use Illuminate\Database\Seeder;  
use App\Model\IyoTopic;

class IyoTopicsTableSeeder extends Seeder
{
	public function run()
	{
		foreach (range(1, 100) as $index) {
			IyoTopic::create([
				'uid'	=> 67,
				'title'	  => 'title'.$index,
				'body'	   => 'body'.$index,
				'from'	   => 'from'.$index,
				'image'	   => 'image'.$index,
				'abstract' => 'abstract'.$index,
			]);
		}
	}
}
