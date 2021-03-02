<template>
<div class="tree">
  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>

  <!-- <el-table
    :data="tableData1"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :load="load"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table> -->
</div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [
          {
            id: 0,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            children:[
              {
                id:1,
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                children:[
                  {
                    id:2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    children:[
                      {
                        id:3,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄',
                        children:[
                          {
                            id:1,
                            date: '2016-05-04',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1517 弄',
                            children:[
                              {
                                id:2,
                                date: '2016-05-04',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1517 弄',
                                children:[
                                  {
                                    id:3,
                                    date: '2016-05-04',
                                    name: '王小虎',
                                    address: '上海市普陀区金沙江路 1517 弄',                        
                                  }
                                ]                 
                              }
                            ]
                          }
                        ]                    
                      },
                      {
                        id:3,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄',
                      }
                    ]                 
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    created(){
      // var arr = [
      //   {
      //     id: 0,
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   }
      // ];
      // this.fun_tree(arr,0);
      // console.log(arr);
      // this.tableData = arr;
    },
    methods: {
      load(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ])
        }, 1000)
      },
      fun_tree(arr,i){
        if(i<23){
          arr[0].children =  [
            {
              id: i+1,
              date: '2016-05-'+(i+1),
              name: '王小'+(i+1),
              address: '上海市普陀区金沙江路'+(i+1)+' 弄'
            },
            {
              id: i+1,
              date: '2016-05-'+(i+1),
              name: '王小'+(i+1),
              address: '上海市普陀区金沙江路'+(i+1)+' 弄'
            },
          ];
          this.fun_tree(arr[0].children,++i);
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.tree{
  & /deep/ .el-table [class*=el-table__row--level] .el-table__expand-icon {
    display: block;
  }
}
</style>