<?php

class UserTest extends TestCase {

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testBasicExample()
	{
		$response = $this->action('POST', 'UserController@login', ['phone' => '13641271607', 'password'=>'123456']);
		$this->assertEquals(200, $response->getStatusCode());
	}

}
