<template>
    <div class="container">
        <div class="common-header-wrap">
            <mt-header title="售卖区域" class="common-header">
                <mt-button slot="left" icon="back" @click="goBack"></mt-button>
                <mt-button slot="right" @click="onAdd">新增</mt-button>
            </mt-header>
        </div>
        <div class="mt-5" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div v-if="transportList && transportList.length">
            <div class="item mb-5" v-for="item in transportList" :key="item.transport_id">

                    <div class="bottom-wrapper">
                        <div class="bottom-left-wrapper">
                            <label class="subtitle">
                                {{ item.transport_title }}
                            </label>
                        </div>
                        <div class="bottom-right-wrapper">
                            <div v-if="ifComponent" class="edit-wrapper" @click="onUse(item.transport_id,item.transport_title)">
                                <label class="subtitle">应用</label>
                            </div>
                            <div class="edit-wrapper" @click="onEdit(item.transport_id)">
                                <label class="subtitle">编辑</label>
                            </div>
                            <div class="edit-wrapper delete-wrapper" @click="onDelete(item.transport_id)">
                                <label class="subtitle">删除</label>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
            <empty-record v-else />
        </div>
    </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from 'mint-ui'
import EmptyRecord from '../../../components/EmptyRecord'
import { getTransportList, delTransport } from '../../../api/sellerTransport'
export default {
  name: 'CostList',
  props: {
    ifComponent: {
      type: Boolean,
      default: false
    }
  },
  components: {
    EmptyRecord
  },
  data () {
    return {
      params: { 'page': 0, 'per_page': 10 },
      loading: false, // 是否加载更多
      isMore: true, // 是否有更多
      transportList: false // 记录列表
    }
  },
  computed: {
    storecost_state () {
      return function (state) {
        if (state === 0) {
          return '未结算'
        } else {
          return '已结算'
        }
      }
    }
  },
  methods: {
    onUse (transport_id, transport_name) {
      this.$emit('useTransport', transport_id, transport_name)
    },
    goBack () {
      if (this.ifComponent) {
        this.$emit('closeTransortList')
      } else {
        this.$router.go(-1)
      }
    },
    onAdd () {
      if (this.ifComponent) {
        this.$emit('addTransport')
      } else {
        this.$router.push({ name: 'SellerTransportForm', query: { action: 'add' } })
      }
    },
    onEdit (transport_id) {
      if (this.ifComponent) {
        this.$emit('editTransport', transport_id)
      } else {
        this.$router.push({ name: 'SellerTransportForm', query: { action: 'edit', transport_id: transport_id } })
      }
    },
    onDelete (transport_id) {
      MessageBox.confirm('您确定要删掉此售卖地区吗？').then(action => {
        delTransport(transport_id).then(res => {
          this.reload()
        }).catch(error => {
          Toast(error.message)
        })
      })
    },
    getTransportList (ispush) {
      Indicator.open()
      let params = this.params
      getTransportList(params).then(res => {
        Indicator.close()

        if (ispush && this.transportList) {
          this.transportList = this.transportList.concat(res.result.transport_list)
        } else {
          this.transportList = res.result.transport_list
        }
        if (res.result.hasmore) {
          this.isMore = true
        } else {
          this.isMore = false
        }
        this.loading = false
      })
    },
    loadMore () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.params.page = ++this.params.page
      if (this.isMore) {
        this.getTransportList(true)
      }
    },
    reload () {
      // 重新加载数据
      this.loading = false
      this.params.page = 0
      this.isMore = true
      this.transportList = false
      this.loadMore()
    }
  }
}
</script>

<style scoped>
    .item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        background-color: #fff;
        border-bottom: 1px solid #e8eaed;
    }
    .bottom-wrapper {
        height: 2.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: stretch;
    }
    .bottom-left-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .bottom-right-wrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: stretch;
    }
    .edit-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .delete-wrapper {
        margin-right: 0.5rem;
    }
    .subtitle {
        font-size: 0.7rem;
        color: #7c7f88;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        margin-left: 1rem;
        margin-right: 0.5rem;
    }
    .subtitle i{font-size:0.8rem;margin-right:.5rem;}
</style>
