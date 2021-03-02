<template>
<div class="tree_cont"  :style="{width:TreeWidth}">
  <div class="tree">
    <!-- 表格 -->
    <tree-table  
      :border="true"
      :show-index="false"
      :expand-type="false"
      :isFold="false"
      index-text="索引"
      :selection-type='false'
      :data="cateList"
      :columns="columns">
      </tree-table>
  </div>
</div>
</template>

<script>
import TreeTable from 'vue-table-with-tree-grid'
export default {
  components:{
    TreeTable
  },
  data() {
      return {
          TreeWidth:null,//宽度
          // 查询条件
          queryInfo: {
              type:3,
              pagenum:1,
              pagesize:10
          },
          // 商品分类的数据列表
          cateList: [],
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
    var arr = [
      {        
        name: '我',
        description: '111',
        owner:'admin',
        active: true,
      }
    ];
    var index;
    this.fun_tree(arr,0,index);
    console.log(JSON.stringify(arr));
    this.cateList = arr;
    this.TreeWidth = 200+24*20+'px';
  },
  methods: {
    fun_tree(arr,i,index){
      if(i<20){
        arr[0].children =  [
          {
            name: '商家'+i,
            description: ''+i,
            owner: '',
            active: true,
          },
          {
            name: '商家'+i+1,
            description: ''+i,
            owner: '',
            active: true,
          },
          {
            name: '商家'+i+1,
            description: ''+i,
            owner: '',
            active: true,
          },
        ];
          this.fun_tree(arr[0].children,++i,index);
        // if(i<18){
        //   this.fun_tree(arr[0].children,++i,index);
        // }else if(i<25){
        //   this.fun_tree(arr[1].children,++i,index);
        // }else{
        //   this.fun_tree(arr[2].children,++i,index);
        // }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tree_cont{
  padding: 1rem;
  // background: pink;
  text-align: center;
  .tree{
    & /deep/ .zk-table__cell-inner{
      position: relative;
    }
    & /deep/ .zk-table__body-cell, .zk-table__footer-cell, .zk-table__header-cell {
      word-break: keep-all;
      overflow: scroll;
    }
  }
}
</style>