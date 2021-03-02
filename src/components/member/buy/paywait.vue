<template>
  <div class="scan"  :style="{height:select.h0}">
    <div id="bcid" :style="{height:select.h1}" >
      <div :style="{height:select.h2}" > 
        <p class="tip">...载入中...</p>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      channel:null,//支付通道
      paytype:null,//支付类型
    }
  },
	mounted(){
    this.startGetChannels();
	},
  methods: {
    // 获取支付通道
    startGetChannels () {
      if (!window.plus) {
        // this.wxsm()
        return
      }
      // 获取支付通道
      plus.payment.getChannels((channels)=>{
        for (var i in channels) {
            this.channel = channels[i];
            pays[this.channel.id] = channel;
            checkServices(this.channel); //检测是否安装支付服务
            console.log('======安的支付服务=====' + channel.id)
        }
        },(e)=>{
        console.log("获取支付通道失败："+e.message);
      });
    },
    // 获取订单
    requestOrder(){
      plus.nativeUI.showWaiting('检测支付环境...');
      iap.requestOrder(ids,function(e){
        plus.nativeUI.closeWaiting();
        console.log('requestOrder success: '+JSON.stringify(e));
      },function(e){
        console.log('requestOrder failed: '+JSON.stringify(e));
        plus.nativeUI.closeWaiting();
        plus.nativeUI.confirm("错误信息："+JSON.stringify(e), function(e){
          if(e.index==0){
            requestOrder();
          }else{
            back();
          }
        }, '重新请求支付',['确定','取消']);
      });
    },
    // 支付
    pay(){
      plus.payment.request(wxChannel, data,(res)=>{
        // 支付成功处理
        console.log("支付成功");          
      },(msg)=> {
          console.log('支付失败');
      });
    },
    //微信支付
    weixinPay(data) {
      //获取支付通道
      let payChanel = '';
      plus.payment.getChannels(function(channels) {
        for (var i in channels) {
            if (channels[i].id == "wxpay") {
                payChanel = channels[i];
            }
        }
        let payParam = { //后台返回的支付参数最好全部都是小写（论坛看到的提醒）
            "appid": data.appid,
            "noncestr": data.noncestr,
            "package": data.package,
            "partnerid": data.partnerid,
            "prepayid": data.prepayid,
            "timestamp": data.timestamp,
            "sign": data.sign
        };
        payParam = {
          "appid":"wx0411fa6a39d61297",
          "noncestr":"4MaVHi9WAouHWeJA",
          "package":"Sign=WXPay",
          "partnerid":"1230636401",
          "prepayid":"wx0310312914399387e98461e71827639900",
          "timestamp":1593743489,
          "sign":"5105BCE0BBF6936D3D35B3DF1E7F5538"
        };
        // 请求支付操作
        plus.payment.request(payChanel, payParam,
            function(result) {
                // 支付成功处理
                alert('支付成功:'+JSON.stringify(result))
            },
            function(error) {  
                // 支付失败处理              
                alert('支付失败:'+JSON.stringify(error))
            })
    },function(e) {
        alert('获取支付通道失败：' + e.message);
    })
  }
    
},
}
</script>

<style scoped lang="scss">
.scan {

  #bcid {
    width: 100%;
    position: absolute;     
    text-align: center;
    color: #fff;
    background: #ccc;
  }

  .footer {
    position: absolute;
    left: 0;
    bottom: 1rem;
    height: 2rem;
    line-height: 2rem;
    z-index: 2;
  }
}
</style>