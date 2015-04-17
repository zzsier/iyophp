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
			$table->string('email')->nullable();
			$table->string('phone')->nullable()->unique();
			$table->string('username')->nullable();
			$table->string('password')->nullable();
			$table->string('imageUrl')->nullable();
			$table->string('token')->nullable();
			$table->integer('activate')->nullable();
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
		Schema::drop('tb_users');
	}

}
