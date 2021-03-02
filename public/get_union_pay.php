<?php 
include_once("./function.php");
$post = $_POST;
	
$order_info = json_decode($post['order_info'],TRUE);
$openid = get_openid($post['wxcoder']);

$union_data = _union_pay($order_info,$openid);
     		
echo json_encode($union_data);exit;

?>