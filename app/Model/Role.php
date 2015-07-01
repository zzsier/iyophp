<?php
namespace App\Model;
use Zizaco\Entrust\EntrustRole;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;
use DB;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Log\Writer;

class Role extends EntrustRole
{
}
