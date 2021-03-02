<template>
<div>  
  <div v-show="cropDataShow">
    <div class="common-header-wrap">
      <mt-header class="common-header" title="新增食品合格证">
          <mt-button icon="back" slot="left" @click="fun_back"></mt-button>
          <!-- <mt-button slot="right" size="small"
            style="width:2.6rem;height: 1.6rem;color:#fff" 
            type="primary" 
            @click="submitData">追溯</mt-button> -->
      </mt-header>
      <!-- <span class="tree" @click="$router.push({name:'SellerQtree'})">追溯</span> -->
    </div>

    <div class="q_new">
        <!-- 顶部开始 -->
        <!-- <div class="header"> -->
          <!-- 返回按钮 -->
          <!-- <span class="down_arrow"  @click="fun_back"></span>
          <span>新增食品合格证</span>
        </div> -->
        <!-- 上面输入框 -->
        <div class="top_cont">
          <div @click="classVisible=true">
            <mt-cell class="menu-item"
              title="产品分类"
              :value="goods_class.gc_name"
              is-link>
            </mt-cell>
          </div>      
          <div><mt-field label="农产品名称：" v-model="product_name"></mt-field></div>
          <div><mt-field label="合格证编号：" type="number" v-model="certificate_no"></mt-field></div>
          <div>
            <mt-cell class="mt-5" title="上传合格证">
              <div class="user-avatar-wrapper">
                  <div v-if="goods.goods_image" class="user-avatar">
                      <img :src="goods.goods_image_url" @click="openImage(goods.goods_image_url)">
                      <span @click="dropImage('goods_image')" class="del-btn iconfont">&#xe6d8;</span>
                  </div>
                  <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('goods_image',$event)">
                      <div class="center-text">相机/相册</div>
                      <input type="file" accept="image/*">
                  </div>
              </div>
            </mt-cell>
          </div>
          <div><mt-field label="数量(重量)：" type="number" v-model="product_num"></mt-field></div>
          <div @click="getUnitpicker"><mt-field label="单位：" :readonly="true" v-model="unit_name"></mt-field></div>
        </div>
        <!-- 结束 -->
        <div style="background:#F4F5F7;height:5px"></div>
        <!-- 我承诺 -->
        <div class="bottom_cont">
          <!-- 提交按钮 -->
          <mt-button
            @click="fun_addQualify"
            class="btn_new"
            size="large"
            >保存
          </mt-button>  

        </div>
        <!--服务分类-->
        <mt-popup v-model="classVisible" position="bottom">
          <mt-picker ref="class_picker" :slots="buildItems" valueKey="value" @change="onClassChange" showToolbar>
            <div class="toolbar">
              <button class="toolbar-item cancel-item" @click="cancelClass">取消</button>
              <div class="picker-header">选择分类</div>
              <button class="toolbar-item confirm-item" @click="confirmClass">确定</button>
            </div>
          </mt-picker>
        </mt-popup>
        <!-- 单位选择器 -->
        <unit-picker ref="unitpicker" @onConfirmUnit="onUnit"></unit-picker>
    </div>

  </div>

  <!-- 图片裁切 插件 -->
  <crop-img ref="cropImg" @haveCropImgData="fun_getCropImgData"></crop-img>
  
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapState, mapActions } from 'vuex'
import UnitPicker from "../UnitPicker.vue";
import { getGoodsClass } from '../../../api/sellerGoods'
import { uploadInfoFile, } from '../../../api/sellerGoods'
import { saveImgQualify, uploadCropImg } from "../../../api/sellerQualify";
import { uploadGoodsCropImg } from "../../../api/sellerGoods";

import CropImg from '../../CropImg'  // 图片裁切

export default {
  data () {
    return {
      cropDataShow:true,  // 隐藏 当前页面

      id: this.$route.query.id,
      classVisible: false,//关闭产品分类
      unit_name:'',       //单位名称
      unit_id:'',       //单位名称id
      store_bind_class: false,
      goods_class:{},
      goods:{},
      showimage:null,
      isshow:false,
      certificate_no:null,
      product_num:"",   //产品数量
      product_name:null,//名称
      cropImgIndex:'',
    }
  },
  components: {
    "unit-picker": UnitPicker,
    'crop-img': CropImg
  },
  computed: {
    ...mapState({
      items: state => state.goodsclass.items
    }),
    buildItems: function () {
      if (!this.items || !this.store_bind_class || !this.items[0]) {
        return []
      }
      let items = new Array()

      if (this.store_bind_class.bind_all) {
        this.getDefaultItems(this.items, items)
      } else {
        this.getDefaultItems(this.store_bind_class.goods_class, items)
      }
      return items
    }
  },
  created () {
    getGoodsClass().then(res => {
      this.store_bind_class = res.result
    }).catch(error => {
      Toast(error.message)
    })
    this.fetchGoodsclassList()
  },
  methods: {
    ...mapActions({
      fetchGoodsclassList: 'fetchGoodsclassList'
    }),
    // 选择单位插件 显示
    getUnitpicker(){
      this.$refs.unitpicker.currentValue = true;
    },
    // 单位插件
    onUnit(values){
      this.unit_name = values[0].name;
      this.unit_id = values[0].id;
    },
    //////////////////
    openImage (src) {
      this.showimage = src
      this.isshow = true
    },
    dropImage (type) {
      this.goods[type] = ''
      this.$forceUpdate()
    },

    uploadImage (type, event) {
      if (typeof (event.target.files[0]) === 'undefined') {
        return
      }
      let formdata = new FormData();

      if (event.target.files[0].size > 200 * 1024) {
        // Toast("上传图片不得大于200k,请裁切图片后上传");
        // 传值 隐藏 当前页面 打开 插件
        this.cropDataShow = false;
        this.$refs.cropImg.currentValue = true;
        // 保存 当前 值 名称
        this.$refs.cropImg.cropImgName = type;
        // 将当前 的 input 里的 文件 传递给 插件
        this.$refs.cropImg.files = event.target.files;

        // 清除 当前 input 的 值
        event.target.files = null;
        event.target.type = null;
        // 重新 设置 类型 是文件
        event.target.type = "file";

        return false;
      }
      formdata.append('file', event.target.files[0])
      formdata.append('name', 'file')

      uploadInfoFile(formdata).then(res => {
        if (type == 'goods_body') {
          this.bodyItem.value = res.result.path
          this.bodyItem.value_url = res.result.url
          this.bodyEditVisible = false

        } else {
          this.goods[type] = res.result.path
          this.goods[type+"_url"] = res.result.url
        }
        this.$forceUpdate()
      }).catch(function (error) {
        Toast(error.message)
      })
    },

    // 图片 接收 图片
    fun_getCropImgData(obj){
      // 关闭插件 显示 当前页面
      this.$refs.cropImg.currentValue = false;
      this.cropDataShow = true;
      // 如果 是 带值 传递过来的 上传 图片
      if( obj.type ){
        // console.log(obj);
        uploadGoodsCropImg(obj.data).then(res=>{
          this.goods[obj.name] = res.result.file_name;
          this.goods[obj.name+"_url"] = res.result.file_path;
          this.$forceUpdate();
          // console.log(this.goods);
        }).catch(err=>{
          Toast(err.message);
        })
        
      }
    },
//////////////////////

    getDefaultItems (_item, defaultItems) {
      defaultItems.push({
        flex: 1,
        values: _item,
        textAlign: 'center'

      })
      defaultItems.push({
        flex: 1,
        values: _item[0].children,
        textAlign: 'center'

      })
      defaultItems.push({
        flex: 1,
        values: (_item[0].children && _item[0].children.length) ? _item[0].children[0].children : [],
        textAlign: 'center'

      })
    },

    cancelClass () {
      this.classVisible = false
    },
    confirmClass () {
      let values = this.$refs.class_picker.getValues()
      var temp = values[2]
      if (!temp) {
        temp = values[1]
      }
      if (!temp) {
        temp = values[0]
      }
      this.goods_class.gc_name = temp.value
      this.goods_class.gc_id = temp.id

      this.classVisible = false
    },
    onClassChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
      picker.setSlotValues(2, values[1] ? values[1].children : [])
      picker.setSlotValues(3, values[2] ? values[2].children : [])
    },
    // 返回
    fun_back(){
      this.$router.push( {name:"SellerQualify",query:{id:'2'} });
    },
    // 提交保存
    fun_addQualify(){      
      if( !this.goods_class.gc_id){
        Toast("请选择产品分类");
        return false;
      } 
      if( !this.product_name){
        Toast("请输入产品名称");
        return false;
      }
      if( !this.certificate_no){
        Toast("请输入编号");
        return false;
      }
      if( !this.goods.goods_image){
        Toast("请选择图片");
        return false;
      }
      if( !this.product_num){
        Toast("请输入数量");
        return false;
      }
      if( !this.unit_id){
        Toast("请选择单位");
        return false;
      }
      // console.log(this.goods);
      // return false;
      saveImgQualify(
          2,
          this.goods_class.gc_id,
          this.product_num,
          this.unit_id,
          this.goods.goods_image,
          this.certificate_no,
          this.product_name
        ).then(res=>{
          Toast("保存成功");          
          this.$router.push({name:"SellerQualify"});
        })
    }
  }
}
</script>

<style scoped lang="scss">
.q_new{
  $arrow: .6rem;
  $arrowcolor: #000;
  background:#fff;
  position: relative;

  // 顶部内容----------------------------------
  .header{
    text-align: center;
    position: relative;  
    padding: .46rem .2rem;
    font-size: 1rem;
    color: #000;
    // 返回箭头
    .down_arrow {
      position: absolute;
      width: $arrow;            
      height: $arrow;
      margin: 0 auto;      
      left: .4rem;
      top: .1rem;
    }
    .down_arrow:after {            
      content: '';
      display: block;
      width: $arrow;
      height: $arrow;
      transform: rotate(225deg);
      border-right: 2px solid $arrowcolor;
      border-top: 2px solid $arrowcolor;
      margin-top: .5rem;
    }
  }
  & /deep/ .mint-cell-title{
    width: 40%;
  }
  // 上面输入框
  .top_cont{    
    padding: 0 .68rem 0;
    .user-avatar-wrapper{display: inline-block;vertical-align: top;margin-right: .5rem;margin-bottom:.5rem}
    .user-avatar-wrapper .del-btn{position:absolute;bottom:.2rem;right:.2rem}
    .user-avatar {
      display: block;
      border:1px solid #eee;
      position: relative;
      width: 5rem;
      height: 5rem;
      margin: 0 auto;
      text-align: center;
      img {
          width: 100%;
          height: 100%
      }
      input {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0
      }
      .center-text{padding:.2rem;padding-top:3.5rem;font-size:.6rem}
    }
    .user-avatar::before {
      position: absolute;
      font-size: 1.5rem;
      line-height: 5rem;
      left: 50%;
      margin-left: -.75rem;
      color: rgba(0, 0, 0, 0.5)
    }

    .user-avatar-wrapper .del-btn{
      mix-blend-mode: difference;
      font-size: 1.6rem;
      position: absolute;
      bottom: .2rem;
      right: .2rem;
    }

  }
  .bottom_cont{    
    padding: .68rem;
    font-size: .72rem;
    p{
      margin-left: 10px;
    }
    & /deep/ .mint-checkbox-core {
      background: rgba(229,50,22,1);
      display: inline-block;
      background-color: #fff;
      border-radius: 0;
      border: 1px solid #ccc;
      position: relative;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }

    & /deep/ .mint-checkbox-input:checked + .mint-checkbox-core {
      background: rgba(229,50,22,1);
    }

    & /deep/ .mint-checklist-label {
      display: flex;
    }
    & /deep/ .mint-checkbox-label {
      vertical-align: middle;
      width: 90%;
      line-height: 1.2;
    }

    // 按钮
    .btn_new{
      background:linear-gradient(90deg,rgba(252,105,82,1) 0%,rgba(229,50,22,1) 100%);
      box-shadow:0px 0px 20px 0px rgba(251,104,84,0.5);
      border-radius:40px;
      color: #fff;
      margin: 1rem 0;
    }
  }

}
.toolbar {
    height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background-color: #f0f2f5;
    .toolbar-item {
        font-size: .6rem;
        border: none;
        border-radius: 0;
        background-color: #f0f2f5;
    }
    .cancel-item {
        margin-left: 0.5rem;
        color: #4e545d;
    }
    .confirm-item {
        margin-right: 0.5rem;
        color: red;
    }
    .picker-header {
        color: #4e545d;
        line-height: 2rem;
        font-size:.8rem;
    }
}
</style>
