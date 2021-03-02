<template>
<div class="tree_cont">
  <div class="tree" :style="{minWidth: TreeWidth+'px'}">
    <ul>
      <li v-for="(item,index) in cateList" :key="index" v-show="item.showType">
        <div @click="fun_clickMe(item)">
          <div :style="{marginLeft: (item.grade-1)*20+'px'}">
            <i v-show="item.active" class="iconfont ">&#xe692;</i><!---++ -->
            <i v-show="!item.active" class="iconfont ">&#xe693;</i>
            名称：{{item.product_name}}
            数量：{{item.product_num}}
            时间：{{item.add_time}}
            合格证编号：{{item.certificate_no}}
            <!-- --:{{item.certificate_id}} -->
          </div>
        </div>
      </li>
    </ul>
  </div>
   
</div>
</template>

<script>
import TreeTable from 'vue-table-with-tree-grid'
import { Toast } from 'mint-ui'
import { getCertificate, getCertificateChild } from '../../../api/sellerQualify'
import { requestRaw } from '../../../util/network'
export default {
  components:{
    TreeTable
  },
  data() {
      return {
          TreeWidth:0,//宽度
          // 查询条件
          queryInfo: {
              type:3,
              pagenum:1,
              pagesize:10
          },
          // 商品分类的数据列表
          cateList: [],
          // 商品分类的数据列表
          oldCateList: [],
          // 总数据条数
          total:0,
          // 为table指定列的定义
          columns: [
            // {
            //     label: '商家名称',
            //     prop: 'name',
            // }
             {
                label: "合格证发放列表",
                prop: "name"
            },
            // {
            //     label: "描述",
            //     prop: "description",
            //     minWidth: "50px"
            // },
            // {
            //     label: "所有者",
            //     prop: "owner"
            // },
            // {
            //     label: "状态",
            //     prop: "active",
            //     type: "template",
            //     template: "active"
            // },

          ]
      }
  },
  created() {
    getCertificate().then(res=>{
      var arr = [];
      var time = new Date().getTime();
      for(var i = 0;i< res.result.length; i++){
        var obj = res.result[i];
        var item = obj.child;
        arr.push({
          fromi:i,
          ind: parseInt(i),         //下标
          grade: obj.grade,  //级别
          getData:false,//  获取过数据
          active: true,// 加号
          showType:true,  //点击过
          certificate_id:item.certificate_id,
          time:time,
          
          certificate_no:item.certificate_no,
          
          id:obj.goods_id,
          product_name: item.product_name,
          product_num: item.product_num,
          certificate_image: item.certificate_image,
          add_time:item.add_time,
        });
      }
      console.log(arr);
      this.cateList = arr;
    })
  },
  methods: {
    fun_clickMe(who){
      // 如果是 减号
      if( !who.active ){
        who.active = true;//改为加号
        // console.log(who);
        for( var item of this.cateList){          
          if( who.ind < item.ind){
            if( who.certificate_id == item.certificate_id ){
              if( who.ind != item.ind){
                if( who.time != item.time ){
                  item.showType = false;
                }
              }
            }
          }
        }
      // 如果是 加号 判断之前没点击过
      }else{
        // 如果获取过其数据
        if( who.getData ){
          who.active = false;
          
          for( var item of this.cateList){
            if( who.ind < item.ind){
              if( who.certificate_id == item.certificate_id ){
                if( who.ind != item.ind){
                  if( who.time != item.time ){
                    item.showType = true;
                  }
                }
              }
            }
          }
        // 如果没有获取过数据
        }else{
          getCertificateChild( who.id, who.grade ).then(res=>{
            if( res.result.length == 0 ){
              who.active = false;
              who.getData = true;
              return false;
            }
            
            var time = new Date().getTime();
            // 获取过数据 改为 true
            who.getData = true;
            who.active = false;
            var oldArr = this.cateList;
            // console.log(res);
            //------start-----
            var arr = [];
            for(var i = 0;i< res.result.length; i++){
              var obj = res.result[i];
              var item = obj.child;
              var OBJ = {
                fromi: who.ind,
                ind: who.ind+1+i,         //下标
                grade: obj.grade,  //级别
                getData: false,//  获取过数据
                active: true,// 加号
                showType: true,  //点击过
                certificate_id: item.certificate_id,
          
                certificate_no: item.certificate_no, 
                time: time,
                
                id:obj.goods_id,
                product_name: item.product_name,
                product_num: item.product_num,
                certificate_image: item.certificate_image,
                add_time:item.add_time,
              };              
              oldArr.splice(who.ind+1, 0, OBJ);
            }
            var newOldArr = this.cateList;
            for( var k = 0; k< newOldArr.length; k++){
              newOldArr[k].ind = parseInt(k);
            }
            // console.log(newOldArr);
          }).catch(err=>{
            Toast(err.message);
          })
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.tree_cont{
  padding: 1rem;
  height: 100vh;
  text-align: center;

  .tree{    
    .i_mini:before {
        content: "\E632";
    }
    .i_plus:before {
        content: "\E631";
    }

    li{
      text-align: left;
      padding: 0.368rem 0 0 0;
      font-size: 0.68rem;
      border-bottom: 1px solid #999;
    }
  }
}
</style>