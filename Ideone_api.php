<?php

$user = ‘tareq’; //–> API username
$pass = ‘********’; //–> API password

$lang = 1; //–> Source Language Code; Here is 1 => C++

$code = ‘#include<stdio.h>
int main() {
printf("hello");
return 0;
}
‘; //–> Source Code

$input = ”;
$run = true;
$private = false;

//create new SoapClient
$client = new SoapClient( "http://ideone.com/api/1/service.wsdl" );

//create new submission
$result = $client->createSubmission( $user, $pass, $code, $lang, $input, $run, $private );

//if submission is OK, get the status
if ( $result[‘error’] == ‘OK’ ) {

$status = $client->getSubmissionStatus( $user, $pass, $result[‘link’] );

if ( $status[‘error’] == ‘OK’ ) {

//check if the status is 0, otherwise getSubmissionStatus again
while ( $status[‘status’] != 0 ) {
sleep( 3 ); //sleep 3 seconds
$status = $client->getSubmissionStatus( $user, $pass, $result[‘link’] );
}

//finally get the submission results
$details = $client->getSubmissionDetails( $user, $pass, $result[‘link’], true, true, true, true, true );
if ( $details[‘error’] == ‘OK’ ) {
var_dump( $details );
} else {
//we got some error
var_dump( $details );
}
} else {
//we got some error
var_dump( $status );
}
} else {
//we got some error
var_dump( $result );
}

[/sourcecode]