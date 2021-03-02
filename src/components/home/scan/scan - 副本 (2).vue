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
see1(s){window.location.href=s},

      // 创建扫描控件
      startRecognize () {
        this.hh()
        let that = this
        if (!window.plus) return
        scan = new plus.barcode.Barcode('bcid')
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
         this.see1(result)
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