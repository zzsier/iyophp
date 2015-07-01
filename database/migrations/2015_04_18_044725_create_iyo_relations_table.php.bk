<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIyoRelationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('iyo_relations', function(Blueprint $table)
		{
			$table->integer('id'); //用户id
			$table->integer('fid')->index(); //被关注者id
			$table->primary(array('id', 'fid'));
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('iyo_relations');
	}

}
