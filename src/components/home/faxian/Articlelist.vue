<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-02-24 15:39:17
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-03-01 14:32:03
-->
<template>
    <div class="container">

        <div class="flex-wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <ul class="article-class">
                <li v-for='item in articleList' v-bind:key='item.article_id' @click="goArticleDetail(item)">{{item.article_title}}</li>
            </ul>
            <!-- <empty-record v-if='articleList.length <= 0 && !isMore'></empty-record> -->
        </div>
    </div>
</template>

<script>
import EmptyRecord from '../../EmptyRecord'
import { Toast, Indicator } from 'mint-ui'
import { getArticleList } from '../../../api/homeArticle'
export default {
  name: 'ArticleList',
  components: {
    EmptyRecord
  },
  data () {
    return {
      article_type_name: '',
      ac_id:7, // 文章分类ID
      articleList: [],
      params: { 'page': 0, 'per_page': 10 },
      loading: false, // 是否加载更多
      isMore: true // 是否有更多
    }
  },
  methods: {
    loadMore () {
      this.loading = true
      this.params.page = ++this.params.page
      if (this.isMore) {
        this.loading = false
        this.getArticleList(true)
      }
    },
    getArticleList () {
      Indicator.open()
      getArticleList(this.params, this.ac_id).then(res => {
        Indicator.close()
        if (res.result.hasmore) {
          this.isMore = true
        } else {
          this.isMore = false
        }

        if (this.articleList) {
          this.articleList = this.articleList.concat(res.result.article_list)
        } else {
          this.articleList = res.result.article_list
        }
        this.article_type_name = res.result.article_type_name
      }).catch(function (error) {
        Indicator.close()
        Toast(error.message)
      })
    },
    goArticleDetail (item) {
      this.$router.push({ 'name': 'HomeArticledetail', 'query': { 'article_id': item.article_id } })
    }
  }
}
</script>

<style scoped>
.article-class{}
.article-class li{width:96%;padding:0 2%;line-height:2rem;height:2rem;background:#fff;border-bottom: 1px dotted #ded6c9;font-size:0.8rem;}
</style>
