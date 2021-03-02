<template>
<div class="ttp" v-show="currentValue">
  <mt-popup  v-model="currentValue">
	
  <div class="viewer" >
    
		<span class="back" v-show="!model"  @click="fun_clickLeft" ></span>
		<span class="back" v-show="model"  @click="model = false" ></span>
    <div id="app">
      <div class="model" v-show="model" @click="model = false">
        <div class="model-show">
          <img :src="modelSrc" alt="">
        </div>
      </div>
      <!-- 控件 -->
      <div class="cut">
        <vue-cropper ref="cropper"
          :img="option.img"
          :output-size="option.size"
          :output-type="option.outputType"
          :info="true"
          :full="option.full"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :fixed-box="option.fixedBox"
          :original="option.original"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :center-box="option.centerBox"
          :fixed="fixed"
          @real-time="realTime"
          :high="option.high"
          ></vue-cropper>
      </div>
      <!-- 切换 按钮 -->
      <div class="test-button">
        <!-- <button @click="changeImg" class="btn">changeImg</button> -->
        <!-- <button @click="startCrop" v-if="!crap" class="btn">start</button> -->
        <!-- <button @click="stopCrop" v-else class="btn">stop</button>
        <button @click="clearCrop" class="btn">clear</button> -->
        <div>
          <div class="div_flex">
            <!-- 选择图片 -->
            <div class="wid33" id="cropIpt" @change="uploadImg($event, 1)">
              <label class="btn" for="uploads">选择图片</label>
              <input type="file" id="uploads" 
                style="position:absolute; clip:rect(0 0 0 0);"
                accept="image/png, image/jpeg, image/gif, image/jpg">
            </div>
            <!-- 预览图片 -->
            <div class="wid33">
              <button class="btn" @click="finish('base64')">预览图片</button>

            </div>
            <!-- 还原图片 -->
            <div class="wid33">
              <button class="btn" @click="refreshCrop" >还原图片</button>
            </div>
          </div>

          <div class="div_flex">
            <button @click="rotateRight" class="btn">左转</button>
            <button @click="changeScale(1)" class="btn">放大</button>
            <button @click="changeScale(-1)" class="btn">缩小</button>
            <button @click="rotateLeft" class="btn">右转</button>
          </div>          
        </div>
        <!-- <button @click="finish('blob')" class="btn">预览(blob)</button> -->
        <!-- <a @click="down('base64')" class="btn">(base64)</a> -->
        <!-- <a @click="down('blob')" class="btn">(blob)</a> -->
        <div class="div_flex">
          <!-- <a @click="down('base64')" class="btn">上传</a> -->
          <button class="btn_new" @click="down('base64')" >上传</button>
        </div>

        <div style="display:none;">
          <label class="c-item">
            <span>上传图片是否显示原始宽高 (针对大图 可以铺满)</span>
            <input type="checkbox" v-model="option.original">
            <span>original: {{ option.original}}</span>
          </label>
          <label class="c-item">
            <span>能否拖动图片</span>
            <input type="checkbox" v-model="option.canMove">
          </label>
          <label class="c-item">
            <span>能否拖动截图框</span>
            <input type="checkbox" v-model="option.canMoveBox">
            <span>canMoveBox: {{ option.canMoveBox}}</span>
          </label>
          <label class="c-item">
            <span>截图框固定大小</span>
            <input type="checkbox" v-model="option.fixedBox">
            <span>fixedBox: {{ option.fixedBox}}</span>
          </label>
          <label class="c-item">
            <span>是否输出原图比例的截图</span>
            <input type="checkbox" v-model="option.full">
            <span>full: {{ option.full}}</span>
          </label>
          <label class="c-item">
            <span>是否自动生成截图框</span>
            <input type="checkbox" v-model="option.autoCrop">
            <span>autoCrop: {{ option.autoCrop}}</span>
          </label>
          <label class="c-item">
            <span>是否根据dpr生成适合屏幕的高清图片</span>
            <input type="checkbox" v-model="option.high">
            <span>high: {{ option.high}}</span>
          </label>
          <label class="c-item">
            <span>截图框是否限制在图片里(只有在自动生成截图框时才能生效)</span>
            <input type="checkbox" v-model="option.centerBox">
            <span>centerBox: {{ option.centerBox}}</span>
          </label>
          <label class="c-item">
            <p>输出图片格式</p>
            <label>jpg
              <input type="radio" name="type" value="jpeg" v-model="option.outputType">
            </label>
            <label>png
              <input type="radio" name="type" value="png" v-model="option.outputType">
            </label>
            <label>webp
              <input type="radio" name="type" value="webp" v-model="option.outputType">
            </label>
          </label>
        </div>
      </div>
      <!-- 预览 图 -->
      <div class="yulan" v-if="1==2">
        <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '0 auto', 'text-align': 'center'}">
          <div :style="previews.div" >
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </div>
      
    </div>
	</div>

  </mt-popup>
</div>
</template>

<script>
// 组件内使用
import { VueCropper }  from 'vue-cropper' 
import { Toast, MessageBox } from 'mint-ui'

export default {
  components: {
    VueCropper,
  },
  props:['dataType','fixed'],  // 需要 返回的数据 类型 （true？fromData:base64）  是否固定裁切框比例
  data() {
    return{
      currentValue: false,  // 隐藏 显示
      files:null,           // 
      cropImgName: null,     // 当前 选中的  图片 名称

      comeBack: 0,     // 返回 回调的参数

      model: false,
      modelSrc: '',
      crap: false,
      previews: {},
      lists: [
        // {
        //   img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'
        // },
        // {
        //   img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png'
        // },
        // {
        //   img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
        // },
        // {
        //   img: 'http://ofyaji162.bkt.clouddn.com/bg2.jpg',
        // },
        // {
        //   img: 'http://ofyaji162.bkt.clouddn.com/can.jpg'
        // },
        // {
        //   img: 'http://ofyaji162.bkt.clouddn.com/nightcat.jpg'
        // }
      ],
      option: {
        // img: 'https://shop.ihaosy.com/uploads/home/appadv/5e9cc7eea54d7.jpg',
        img: '',
        size: 0.5,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 150,
        autoCropHeight: 150,
        centerBox: false,
        high: true
      },
      show: true
    }
  },
  watch:{
    currentValue:function(v){
      if( v ){
        this.option.img = '';
        this.model = false;
      }
      // console.log(this.cropImgName);
    },

    files:function(f){
      var ipt = document.createElement('input');
      ipt.type = "file";
      ipt.accept = "image/*";
      ipt.id = "uploads";
      ipt.files = f;
      ipt.style.width = "0";
      ipt.style.display = 'none';
      document.getElementById('uploads').remove();
      document.getElementById('cropIpt').append( ipt );
      var num = 1;
      var file = ipt.files[0];
      
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(ipt.value)) {
        Toast('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    }
  },
  methods: {
    changeImg() {
      this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
    },
    startCrop() {
      // start
      this.crap = true
      this.$refs.cropper.startCrop()
    },
    stopCrop() {
      //  stop
      this.crap = false
      this.$refs.cropper.stopCrop()
    },
    clearCrop() {
      // clear
      this.$refs.cropper.clearCrop()
    },
    refreshCrop() {
      // clear
      this.$refs.cropper.refresh()
    },
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    finish(type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          var img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    // 实时预览函数
    realTime(data) {
      // console.log(data)
      this.previews = data
    },

    finish2(type) {
      this.$refs.cropper2.getCropData((data) => {
        this.model = true
        this.modelSrc = data
      })
    },
    finish3(type) {
      this.$refs.cropper3.getCropData((data) => {
        this.model = true
        this.modelSrc = data
      })
    },
    
    // uploadInformPic (index, event) {
    //   if (typeof (event.target.files[0]) === 'undefined') {
    //     return
    //   }
    //   let formdata = new FormData();
    //   if( event.target.files[0].size >200*1024 ){
    //     Toast("上传图片不得大于200k,请重新选择图片");
    //     return false;
    //   }
    //   formdata.append(index, event.target.files[0])
    //   formdata.append('id', index)
    //   uploadAuth(formdata).then(res => {
    //     this.user[index + '_url'] = res.result.file_path
    //     var temp = {}
    //     temp[index + '_url'] = res.result.file_path
    //     this.memberEdit(temp)
    //   }).catch(function (error) {
    //     Toast(error.message)
    //   })
    // },

    fun_clickLeft(){
      this.model = false;
      this.$emit('haveCropImgData',{type:false})
    },

    down(type) {
      // console.log(this.previews.url);
      this.$refs.cropper.getCropBlob((data) => {
        // console.log(''+data.size/1024);   
        if( data.size/1024 > 200){
          Toast("请缩小图片后上传");
          return false;
        }  
        // this.$refs.cropper.getCropBlob((data) => {
        //   setTimeout(()=>{
        //     Toast(window.URL.createObjectURL(data))
        //     console.log(window.URL.createObjectURL(data))
        //   },2000)
        // })
        
        this.$refs.cropper.getCropData((data) => {
          // console.log( data )
          this.currentValue = false;
          if( this.comeBack == 0 ){
            if( this.dataType ){
              // 转换 数据类型（ base64 => fromData ）
              // var formdata = new FormData();
              var array = [];
              var bytes = window.atob( data.split(',')[1] );
              for(var i = 0; i < bytes.length; i++){
                array.push(bytes.charCodeAt(i));
              }
              var blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
              // formdata.append('order_image',blob, Date.now() + '.jpg');
              // formdata.append('id', 'order_image');
              // 转换完成
              this.$emit('haveCropImgData',{ name:this.cropImgName, data:blob, type:true })
            }else{
              this.$emit('haveCropImgData',{ name:this.cropImgName, data:data, type:true })
            }
          }else{
            this.$emit('haveCropImgDataEnd',{ name:this.cropImgName, data:data, type:true })
          }
        })
      })
      return false;
      // event.preventDefault()
      var aLink = document.createElement('a')
      aLink.download = 'demo'
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data)
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    },

    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        Toast('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    imgLoad(msg) {
      console.log(msg)
    }
  },
}
</script>

<style scoped lang="scss">
.ttp{
  position: absolute;
  top: 0;
  left: 0;
  &/deep/.mint-popup{
    top: 0;
    left: 0;
    width:100vw;
    height: 100vh;
    transform: translate3d(0, 0, 0);
  }
}
.yulan{
  background: rgb(255, 255, 255);
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 3rem 0 !important;
}
.viewer{
	height: 100vh;
	width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  
  .back{    
    &::before{
      content:'\2716';
      position: absolute;
      top: 2vw;
      left: 2vw;
      z-index: 20;
      text-align: center;
      width: 8vw;
      font-size: 6vw;
      z-index: 100;
      mix-blend-mode: difference;
      color: aliceblue;
      mix-blend-mode: color-dodge;
      color: #fff;
    }
  }
      * {
        margin: 0;
        padding: 0;
      }
      $cropper: 46.66666vh;
      // $cropper: 35vh;
      .cut {
        width: 500px;
        height: 500px;
        margin: 30px auto;
        width: 100vw;
        height: 70vh;
        overflow-y: auto;
        overflow-x: hidden;
        margin: 0;

        width: 100vw;
        height: 70vh;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        margin: 0;
        flex-direction: column;
        justify-content: center;

        & /deep/ .vue-cropper {
          transform: scale(1.5);
          // transform: scale(2);
          width: 100vw;
          height: $cropper;
        }
      }

      .c-item {
        max-width: 800px;
        margin: 10px auto;
        margin-top: 20px;
      }
    
      .content {
        margin: auto;
        max-width: 1200px;
        margin-bottom: 100px;
      }
    
      .test-button {
        height: 29vh;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-evenly;
        background: #666;
        background: #fff;
        font-size: 1rem;
        .div_flex{
          width: 92vw;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .wid33{
            width: 32%;
            &:nth-child(2){
              text-align:center;
            }
            &:nth-child(3){
              text-align:right;
            }
          }
          // 按钮
          .btn_new{
            background:linear-gradient(90deg,rgba(252,105,82,1) 0%,rgba(229,50,22,1) 100%);
            box-shadow:0px 0px 20px 0px rgba(251,104,84,0.5);
            border-radius:40px;
            color: #fff;
            width: 92vw;
            margin: 6px auto;
            font-size: 16px;
            padding: 6px 0;
          }
        }
      }
    
      .btn {
        font-size: 16px;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c0ccda;
        color: #1f2d3d;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        // margin:20px 10px 0px 0px;
        margin: 6px 2px;
        padding: 6px 16px;
        border-radius: 4px;
        color: #fff;
        // background-color: #50bfff;
        border-color: #50bfff;
        background: linear-gradient(89deg, #fc6952 0%, #e53216 99%);
        border: 0;
        transition: all .2s ease;
        text-decoration: none;
        user-select: none;
      }
    
      .des {
        line-height: 30px;
      }
    
      code.language-html {
        padding: 10px 20px;
        margin: 10px 0px;
        display: block;
        background-color: #333;
        color: #fff;
        overflow-x: auto;
        font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
        border-radius: 5px;
        white-space: pre;
      }
    
      .show-info {
        margin-bottom: 50px;
      }
    
      .show-info h2 {
        line-height: 50px;
      }
    
      /*.title, .title:hover, .title-focus, .title:visited {
        color: black;
      }*/
    
      .title {
        display: block;
        text-decoration: none;
        text-align: center;
        line-height: 1.5;
        margin: 20px 0px;
        background-image: -webkit-linear-gradient(left,#3498db,#f47920 10%,#d71345 20%,#f7acbc 30%,#ffd400 40%,#3498db 50%,#f47920 60%,#d71345 70%,#f7acbc 80%,#ffd400 90%,#3498db);
        color: transparent;
        -webkit-background-clip: text;
        background-size: 200% 100%;
        animation: slide 5s infinite linear;
        font-size: 40px;
      }
    
      .test {
        height: 500px;
      }
    
      .model {
        position: fixed;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
      }
    
      .model-show {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
      }
    
      .model img {
        display: block;
        margin: auto;
        max-width: 80%;
        user-select: none;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
      }
    
      .c-item {
        display: block;
        user-select: none;
      }
    
      @keyframes slide {
        0%  {
          background-position: 0 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
}
</style>
