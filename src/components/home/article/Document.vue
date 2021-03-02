<template>
    <div class="distributor-article-list">
      <!-- <div class="common-header-wrap">
        <mt-header :title="title" class="common-header">
          <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
      </div> -->

      <div class="head_title_cont">
          
        <div class="header-wrap">
          <img  @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
          <span class="header-title">{{title}}</span>
          <span></span>
        </div>

      </div>

      <div class="content" v-html='content'></div>
    </div>
</template>
<script>
import { getDocumentInfo } from '../../../api/homeArticle'
import { Toast } from 'mint-ui'
import { resetRem, resumeRem } from '@/util/rem';


export default {

  name: 'HomeDocument',
  data () {
    return {
      title: '',
      content: ''
    }
  },

  created: function () {
    let type = this.$route.query.type
    getDocumentInfo(type).then(res => {
      this.title = res.result.document_title
      this.content = res.result.document_content
    }).catch(function (error) {
      Toast(error.message)
    })
  },
  

  mounted () {
    resetRem();
  },

  beforeDestroy(){
    resumeRem();
  },

}
</script>
<style  lang="scss" scoped>
.content{padding:.5rem;font-size:.7rem;}

.head_title_cont{
  height: 3.74rem;
  background: #F4F5F7;
  font-size: 1.28rem;
  position: relative;
  z-index: 1;
  div{
    box-sizing: border-box;
  }

  // 头部
  .header-wrap {
    padding: 1rem 1.43rem;
    position: relative;
    display: flex;
    background: #fff;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
    img {
      width: 1.64rem;
      height: 1.64rem;
    }
    .header-title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.39rem;
      font-weight: 400;
      color: rgba(22, 22, 22, 1);
    }
    .header-right {
      span {
        font-size: 1.3rem;
      }
    }
  }

}
</style>
