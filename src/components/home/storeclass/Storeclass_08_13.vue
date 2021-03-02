<template>

    <div class="container">
        <div class="common-header-wrap">
            <mt-header class="common-header" title="商家列表">
                <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
            </mt-header>
        </div>

 <div class="ui-category-body">
    <div class="category-flex">
      <div class="category-sidebar">
        <ul>
          <li class="item"
              v-for='item in storeclass_list'
              v-bind:key="item.storeclass_id"
              v-on:click='openclass(item.storeclass_id)'
              v-bind:class="{'sidbaractive': (item.storeclass_id==currentid), 'noActive' : (item.storeclass_id!=currentid)}">
            <a>{{ item.storeclass_name }}</a>
          </li>
        </ul>
      </div>

      <div class="category-content" >
	<common-store-list ref="child" :currentid="currentid"></common-store-list>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { getStoreClass } from '../../../api/seller'
import EmptyRecord from '../../../components/EmptyRecord'
import { Toast, Indicator } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import CommonStoreList from '../common/CommonStoreList'
import HomeCommonSearch from '../common/HomeCommonSearch'
export default {
  name: 'HomeStorelist',
  components: {
    HomeCommonSearch,
    CommonStoreList,
    EmptyRecord
  },

  name: 'Storeclass',

  data () {
    return {
      storeclass_list: false,
currentid:1,
      params: {
        keyword: ''
      }
    }
  },
  created: function () {
    this.getStoreclassList()
  },
  methods: {
    getStoreclassList () {
      Indicator.open()
        getStoreClass().then(res => {
        Indicator.close()
        this.storeclass_list = res.result.store_class
      }).catch(function (error) {
        Indicator.close()
        Toast(error.message)
      })
    },
    goHomeStorelist (storeclassId) {
      this.$router.push({ name: 'HomeStorelist', query: { storeclass_id: storeclassId } })
    },
openclass(id){
this.currentid=id
this.params.keyword=id
// this.$refs.child.getValue();
}
  }
}
</script>

<style scoped lang="scss">
  .ui-category-body{
    width: 100%;
    -webkit-overflow-scrolling: touch;
    .category-flex {
      display: flex;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      width: 100%;
      position: absolute;
      bottom: 0;
      width: 100%;
      top: 2.5rem;
      .category-sidebar {
        flex-basis:6rem;
        background-color: #F0F2F5;
        overflow-y: scroll;
        ul {
          border-right: 0.5px solid #E8EAED;
          li {
            display: block;
            padding: 0.8rem 0.25rem;
            a {
              color: #333;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              font-size:0.6rem;
              text-align: center;
            }
          }
          li.noActive {
            background-color: #F0F2F5;
            border-left: 0.1rem solid transparent;
            a {
              color: #333;
            }
          }
          li.sidbaractive{
            background-color: #FFFFFF;
            border-left: 0.1rem solid #e93b3d;
            a {
              font-weight:600;
              color: $primaryColor;
            }
          }
        }
      }
      .category-content {
        width: 100%;
        background-color: #fff;
        overflow: auto;
        margin-bottom:3rem;
        ul {
          height: 100%;
          li {
            display: block;
            padding: 0.95rem 0;
            text-align: left;
            cursor: pointer;
	
            border-bottom: 0.5px solid rgb(232,234,237);
            a {
              color: #333;
              font-weight:700;
              line-height:2rem;
              font-size:0.7rem;
              text-align: center;
              display:block;;
            }

          }
          dl{
            display:inline-block;
            width:32.8%;
            text-align:center;
            dt{
              position:relative;
              img{width:3.5rem;height:3.5rem;overflow:hidden;}
            }
            dd{font-size:0.6rem;line-height:1rem;height:1rem;overflow: hidden;margin-bottom:0.5rem;}
          }
        }
      }
    }
  }
</style>