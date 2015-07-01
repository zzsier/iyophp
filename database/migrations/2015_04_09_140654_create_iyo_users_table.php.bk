<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIyoUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('iyo_users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('email')->default('');
			$table->string('phone')->default('')->unique();
			$table->string('username')->default('');
			$table->string('password')->default('');
			$table->string('imageUrl')->default('');
			$table->string('token')->default('');
			$table->integer('activate')->default(0);
			$table->integer('type')->default(0)->index();
			$table->integer('follow_count')->default(0);
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
		Schema::drop('iyo_users');
	}

}
