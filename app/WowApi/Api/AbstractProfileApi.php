<?php
namespace App\WowApi\Api;

use App\WowApi\Request\RequestInterface;
use App\WowApi\Exception\ApiException;
use App\WowApi\ParameterBag;
use App\WowApi\Utilities;

abstract class AbstractProfileApi extends AbstractApi
{
    /**
     * @var array Array containing allowed fields
     */
    protected $fieldsWhitelist = array();

    protected $queryWhitelist = array('fields');

    /**
     * Set profile fields to be fetched
     *
     * @param array $fields Fields
     *
     * @return void
     */
    protected function setFields($fields)
    {
        if(is_array($fields)) {
            foreach ( $fields as $field ) {
                if ( !in_array($field, $this->fieldsWhitelist) ) {
                    throw new \InvalidArgumentException(sprintf('The field `%s` was not recognized.', $field));
                }
            }
        } elseif($fields === true) {
            $fields = $this->fieldsWhitelist;
        } else {
            throw new \InvalidArgumentException("The argument passed to setFields was invalid");
        }

        $this->setQueryParams( array('fields'=>$fields, 'apikey'=>'s7k5athwmb7je72bh3egqn5uyu72ymhm') );

        //$this->setQueryParam('apikey','s7k5athwmb7je72bh3egqn5uyu72ymhm');
    }
}
