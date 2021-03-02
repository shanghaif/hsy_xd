<?php 
function _union_pay($order_info,$openid){
    $appId = "8a81c1bf72c847240172e43faadd000a";
	        $appKey = "b0db6f0d202a44cbb58b3242583822f7"; 
	        $str = md5(uniqid(mt_rand(), true));
            $uuid  = substr($str,0,8) . '-';
            $uuid .= substr($str,8,4) . '-';
            $uuid .= substr($str,12,4) . '-';
            $uuid .= substr($str,16,4) . '-';
            $uuid .= substr($str,20,12);
            $nonce = $uuid;
            $hsy_mid = '898310148164882';
        	$hsy_tid = '20129406';
        	$pay_sn = $order_info['pay_sn'];
        	$merOrderId =  '104M' . $pay_sn;
        	$totalAmount = $order_info['api_pay_amount'];
        	$timestamp = getTimeString();
        	$requestTimestamp = date("Y-m-d H:i:s");
        	$srcReserve="请求系统预留字段";
				        $subAppid = 'wx02db868bbf8922d5';
				        $orderDesc = '账单描述';
				        $divisionFlag = true;
			            $subOrders_arr = array();
			            $platformAmount = 0;
			            $i = 0;
			            foreach ($order_info['order_list'] as $order_k=>$order_store){
			                $i++;
			                $subOrders_arr[$order_k]['mid'] = $order_store['zf_mid'];
			                $subOrders_arr[$order_k]['merOrderId'] = '104M' . $order_store['order_sn'];
			                $subOrders_arr[$order_k]['totalAmount'] =  ($order_store['order_amount']*100)-($order_store['t_c_price']*100);
			                if ($order_store['mort_type'] == 'c'){
			                    $platformAmount = $platformAmount+($order_store['t_c_price']);
			                }
			            }
			            //'subOpenId'=>'o0Rg_w1tHA1RHJvapWHocOiYslkY',
				        $data = array(
					            'requestTimestamp' => $requestTimestamp,
					            'mid' => $hsy_mid,
			                    'tid' => $hsy_tid,
					            'instMid' => 'MINIDEFAULT',
					            'attachedData'=>$orderDesc,
					            'merOrderId' => $merOrderId,
					            'subappid' => $subAppid,
					            'tradetype'=>'MINI',
					            'subOpenId'=>$openid,
					            'totalAmount' => $totalAmount*100,
			                    'divisionFlag' => $divisionFlag,
			                    'platformAmount' => $platformAmount*100,
			                    'subOrders' => $subOrders_arr,
			                    'notifyUrl' =>'https://shop.ihaosy.com/Api/Refund/app_wx_refund',
					            
					        );
					    $body =  json_encode($data);
					  
      	
				        $header = app_getSignHeader($appId,$appKey,$timestamp,$nonce,$body);
				        $url = "https://api-mop.chinaums.com/v1/netpay/wx/unified-order";
				        $zfb_app_json= app_http_post($url,$body,30,$header);
				        $json_msg = $zfb_app_json;
				        return $json_msg;
}
 function get_openid($coder){
       	
     	if(!empty($coder)){
     		$appid = 'wx02db868bbf8922d5';
     		$secret = 'f936e347b677d43827d6e78928615eb3';
     		//$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$secret&code=$coder&grant_type=authorization_code";
     		$url = "https://api.weixin.qq.com/sns/jscode2session?appid=$appid&secret=$secret&js_code=$coder&grant_type=authorization_code";
     		$weixin =  sendRequest($url);//通过code换取网页授权access_token
     		//$gzh_json = $this->get_wxnet_authorization($weixin['openid']);
     	//	ds_json_encode(10001,$weixin);
	    	return $weixin['openid'];
     	}
     }
     //发送请求
function sendRequest($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        return json_decode($output, true);
        //return $output;
    }
 function getTimeString(){
        date_default_timezone_set("Asia/Shanghai");
        return date("YmdHis",time());
    }
    /*
    *银联app方法Header头文件加密
    */
    function app_getSignHeader($appId,$appKey,$timestamp,$nonce,$body){
        $b = hash("sha256",$body,false);
        $c = $appId.$timestamp.$nonce.$b;
        $e = hash_hmac('sha256',$c,$appKey,true);
        $f = base64_encode($e);
        $retur_arr = 'Authorization: OPEN-BODY-SIG AppId="'.$appId.'",Timestamp="'.$timestamp.'",Nonce="'.$nonce.'",Signature="'.$f.'"';
        return  $retur_arr;
    }
    /*
    *银联app方法post提交
    */
    function app_http_post($url='',$post_data=array(),$timeout=30,$header_info) {
        $ch = curl_init();//初始化CURL连接
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  // 从证书中检查SSL加密算法是否存在
        //dump($header);exit;
        $header = array(
            $header_info,
            "content-type: application/json"
        );
        //$header = ['User-Agent: php test']; //设置一个你的浏览器agent的header
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        //curl_setopt($ch, CURLOPT_HEADER, 1); //返回response头部信息
        //curl_setopt($ch, CURLINFO_HEADER_OUT, true); //TRUE 时追踪句柄的请求字符串，从 PHP 5.1.3 开始可用。这个很关键，就是允许你查看请求header
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);//设置结果返回而不是直接显示
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);//设置cURL允许执行的最长秒数。
        $response = curl_exec($ch);//发出请求接受返回的数据,发生错误返回false
        //echo curl_getinfo($ch, CURLINFO_HEADER_OUT); //官方文档描述是“发送请求的字符串”，其实就是请求的header。这个就是直接查看请求header，因为上面允许查看
        //$meta = curl_getinfo($ch);
        curl_close($ch);//关闭资源
        return $response;
    } 
?>