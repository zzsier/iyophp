<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateModelIyoTopicsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('iyo_topics', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('title')->default('');
			$table->string('simple')->default('');
			$table->string('copyfrom')->default('');
			$table->string('image')->default('');
			$table->text('body')->default('');
			$table->integer('uid')->index();
			$table->integer('nid');
			$table->integer('reply_count')->default(0)->index();
			$table->integer('view_count')->default(0)->index();
			$table->integer('like_count')->default(0)->index();
			$table->integer('favorite_count')->default(0)->index();
			$table->softDeletes();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('iyo_topics');
	}

}
