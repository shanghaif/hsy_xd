<template>
  <div class="scan"  :style="{height:select.h0}">
    <div id="bcid" :style="{height:select.h1}" >
     <div :style="{height:select.h2}" > 
      <p class="tip">...载入中...</p>
    </div>
    <div class="footer">
      <button @click="startRecognize">1.创建控件</button>
      <button @click="startScan">2.开始扫描</button>
      <button @click="cancelScan">3.结束扫描</button>

      <button @click="closeScan">4.关闭控件</button>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
    import wx from 'weixin-js-sdk'
    import $ from 'jquery'

  let scan = null

  export default {
    data () {
      return {
       select:{ h0:'600px',h1:'500px',h2: '400px'},
        codeUrl: '',
      }
    },
    methods: {
hh(){
this.h0=(window.innerHeight)-20+'px'
this.h1=(window.innerHeight)-100+'px'
this.h2='50%'
},
see1(s){
alert(s)
window.location.href=s
},

      // 创建扫描控件
      startRecognize () {
        this.hh()
        let that = this
        if (!window.plus) {
	this.wxsm()
	return
	}
var filter=[plus.barcode.QR]
        scan = new plus.barcode.Barcode('bcid',filter)
        scan.onmarked = onmarked
        scan.start()
        function onmarked (type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR'
              break
            case plus.barcode.EAN13:
              type = 'EAN13'
              break
            case plus.barcode.EAN8:
              type = 'EAN8'
              break
            default:
              type = '其它' + type
              break
          }
          result = result.replace(/\n/g, '')
          that.codeUrl = result
          
          that.closeScan()
          scan.close()
        window.location.href=result
//alert(result)
        }
      },
      // 开始扫描
      startScan () {
        if (!window.plus) return
        scan.start()
      },
      // 关闭扫描
      cancelScan () {
        if (!window.plus) return
        scan.cancel()
      },
      // 关闭条码识别控件
      closeScan () {
        if (!window.plus) return
        scan.close()
      },
//微信扫码
wxsm(){

// 获取微信签名
	$.ajax({
   		url: 'https://shop.ihaosy.com/crontab/wxapi',
   		data: { 
     			url: location.href.split('#')[0],     // 这里是当前页面的url，一定要 location.href 获取，不然签名会无效
  		 },
   		success: function (res1) {
console.log(res1)
var res2=JSON.parse(res1)
res2=res2.result
console.log(res2)
			wx.config({
   				debug: false,
   				appId: res2.appId, // 必填,公众号的唯一标识
   				timestamp: res2.timestamp, // 必填,生成签名的时间戳
  				nonceStr: res2.nonceStr, // 必填,生成签名的随机串
   				signature: res2.signature, // 必填,签名
   				jsApiList: ['scanQRCode'] // 必填,需要使用的JS接口列表
			})
			wx.ready(function () {
  				// config信息验证成功后会执行ready方法,所有接口调用都必须在config接口获得结果之后
 		 		// config 是一个客户端的异步操作,所以如果需要在页面加载时调用相关接口,则须把相关接口放在		ready函数中调用来确保正确执行.对于用户触发是才调用的接口,则可以直接调用,不需要放在ready函数中
  				wx.checkJsApi({ // 判断当前客户端版本是否支持指定JS接口
    					jsApiList: [  'scanQRCode' ],
    					success: function (res) { // 以键值对的形式返回，可用true，不可用false。如：{"checkResult":{"scanQRCode":true},"errMsg":"checkJsApi:ok"}
      						if (res.checkResult.scanQRCode === true) {
         							wx.scanQRCode({ // 微信扫一扫接口
           								desc: 'scanQRCode desc',
           								needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
           								scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
           								success: function (res) {
             									const getCode = res.resultStr // 当needResult 为 1 时，扫码返回的结果
									//alert(res.resultStr)
									window.location.href=res.resultStr

         								}
      							})
    						} else {alert('抱歉，当前客户端版本不支持扫一扫')
      						}
    					},
   					fail: function (res) { // 检测getNetworkType该功能失败时处理
      						alert('fail' + res)
    					}
  				})
			})

 			/* 处理失败验证 */
			wx.error(function (res) {
					// config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
   					alert('配置验证失败: ' + res.errMsg)
			})

  		 }
	})


  },
},
	mounted(){
  		this.startRecognize ();
	}
  }
</script>
<style >
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