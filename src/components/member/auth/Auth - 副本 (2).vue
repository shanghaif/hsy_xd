<template>
    <div class="member-auth">
      <div class="common-header-wrap">
        <mt-header title="从业人员认证" class="common-header">
          <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
      </div>
      <div class="form">
       <div class="ui-form-area">
        <div class="ui-form-control"><input type="text" v-model="realname" placeholder="真实姓名" class="ui-form-input"></div>
      </div>
       <div class="ui-form-area">
        <div class="ui-form-control"><input type="text" v-model="idcard" placeholder="身份证号" class="ui-form-input"></div>
      </div>
       <div class="ui-form-area">
        <div class="ui-form-control"><input type="text" v-model="dwname" placeholder="单位名称" class="ui-form-input"></div>
      </div>

<div>
      <div class="ui-form-area">
        		<div class="ui-form-control register-form-select">
			<select class="ui-form-input " v-model='hangye'><option v-for='(prov,index) of hangyes' :key='index' :value='index' v-text='prov'></option></select>
 
  		</div> 
   </div>  
      <div class="ui-form-area">
        		<div class="ui-form-control register-form-select">   
			<select class="ui-form-input" v-model='gangwei'>
  <option v-for='(c,index) of gangweis[hangye]' :key='index' :value='c.id' v-text='c.n'></option> </select>

 		</div> 
   </div>  
</div>
        <div class="idcard-wrapper">
            <div class="idcard-item">
                <div class="img">
                     <div v-if="user.member_idcard_image1_url" class="user-avatar">
                        <img v-if="user.member_idcard_image1_url" @click="openImage(user.member_idcard_image1_url)" :src="user.member_idcard_image1_url">
                        <span v-if="user.member_auth_state!=1 && user.member_auth_state!=3" @click="dropImage('member_idcard_image1')" class="del-btn iconfont">&#xe619;</span>
                    </div>
                    <div v-else-if="user.member_auth_state!=1 && user.member_auth_state!=3" class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadInformPic('member_idcard_image1',$event)">
                        <img src="../../../assets/image/member_idcard_image1.png">
                        <input type="file" accept="image/*">
                    </div>
                </div>
                <div class="title">身份证正面照片</div>
            </div>
            <div class="idcard-item">
                <div class="img">
                    <div v-if="user.member_idcard_image2_url" class="user-avatar">
                        <img v-if="user.member_idcard_image2_url" @click="openImage(user.member_idcard_image2_url)" :src="user.member_idcard_image2_url">
                        <span v-if="user.member_auth_state!=1 && user.member_auth_state!=3" @click="dropImage('member_idcard_image2')" class="del-btn iconfont">&#xe619;</span>
                    </div>
                    <div v-else-if="user.member_auth_state!=1 && user.member_auth_state!=3" class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadInformPic('member_idcard_image2',$event)">
                        <img src="../../../assets/image/member_idcard_image2.png">
                        <input type="file" accept="image/*">
                    </div>
                </div>
                <div class="title">健康证</div>
            </div>
            <div class="idcard-item">
                <div class="img">
                    <div v-if="user.member_idcard_image3_url" class="user-avatar">
                        <img v-if="user.member_idcard_image3_url" @click="openImage(user.member_idcard_image3_url)" :src="user.member_idcard_image3_url">
                        <span v-if="user.member_auth_state!=1 && user.member_auth_state!=3" @click="dropImage('member_idcard_image3')" class="del-btn iconfont">&#xe619;</span>
                    </div>
                    <div v-else-if="user.member_auth_state!=1 && user.member_auth_state!=3" class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadInformPic('member_idcard_image3',$event)">
                        <img src="../../../assets/image/member_idcard_image3.png">
                        <input type="file" accept="image/*">
                    </div>
                </div>
                <div class="title">学习证</div>
            </div>
        </div>
        <mt-button class="ds-button-large mb-10" type="primary" @click="submitInformation" v-if="user.member_auth_state!=1 && user.member_auth_state!=3">保存</mt-button>
      </div>
      <mt-popup v-model="isshow" popup-transition="popup-fade" class="popup" >
        <img :src="showimage" :style="getBannerStyle" @click="isshow=false">
      </mt-popup>
    </div>
</template>
<script>

import { Toast, MessageBox } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { uploadAuth, dropAuth, updateMemberAuth } from '../../../api/member'
export default {
  components: {
  },
  name: 'MemberProfileSet',
  data () {
    return {
      if_confirm: false,
      showimage: '',
      isshow: false,
      realname: '',
      idcard: '',
      member_ww: '',
hangye:0,
gangwei:0,
hangyes:['执法监管','食品生产','食品流通','餐饮服务','水产品生产','畜牧产品生产','农业生产','林业生产','食源性疾病'],
gangweis:[
[{n:'食品安全监管人员',id:1},{n:'农业执法监管人员',id:11},{n:'林业执法监管人员',id:13},{n:'水产品执法监管人员',id:16},{n:'畜牧执法监管人员',id:19}],
 [{n:'食品生产企业负责人',id:2},{n:'食品生产企业安全管理员',id:3},{n:'食品生产从业人员',id:4}],
 [{n:'食品流通企业负责人',id:5},{n:'食品流通企业安全管理员',id:6},{n:'食品流通企业从业人员',id:7}],
 [{n:'餐饮服务企业负责人',id:8},{n:'餐饮服务安全管理员',id:9},{n:'餐饮服务从业人员',id:10}],
 [{n:'水产品生产管理人员',id:17},{n:'水产品从业人员',id:18}],
 [{n:'畜牧生产从业人员',id:20}],
 [{n:'农药经营人员',id:12}],
 [{n:'林业生产管理人员',id:14},{n:'林业从业人员',id:15}],
 [{n:'食源性疾病流调人员',id:21},{n:'食源性疾病报告人员',id:22}]
 ]
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      user: state => state.member.info
    }),
    getBannerStyle: function () {
      const { width, height } = window.screen
      let itemWidth = width
      let itemHeight = height
      return {
        maxWidth: itemWidth + 'px',
        maxHeight: itemHeight + 'px'
      }
    }
  },
  created: function () {
    if (this.user) {
      this.realname = this.user.member_truename
      this.idcard = this.user.member_idcard
    }
  },

  methods: {
    ...mapMutations({
      memberEdit: 'memberEdit'
    }),
    submitInformation () {
      if (!this.if_confirm) {
        this.confirmSumit()
        return
      }
      MessageBox.confirm('请仔细核对信息，确认上传后除非管理员审核否则无法再次上传').then(action => {
        this.confirmSumit()
      })
    },
    confirmSumit () {
      updateMemberAuth(this.realname, this.idcard, this.if_confirm).then(res => {
        if (this.if_confirm) {
          this.memberEdit({ member_truename: this.realname, member_idcard: this.idcard, member_auth_state: 1 })
          Toast(res.message)
        } else {
          this.if_confirm = true
          this.submitInformation()
        }
      }).catch(function (error) {
        Toast(error.message)
      })
    },
    openImage (src) {
      this.showimage = src
      this.isshow = true
    },
    dropImage (id) {
      MessageBox.confirm('确定要删除该图片吗？').then(action => {
        dropAuth(id).then(res => {
          this.user[id + '_url'] = ''
          var temp = {}
          temp[id + '_url'] = ''
          this.memberEdit(temp)
        }).catch(function (error) {
          Toast(error.message)
        })
      })
    },
    uploadInformPic (index, event) {
      if (typeof (event.target.files[0]) === 'undefined') {
        return
      }
      let formdata = new FormData()
      formdata.append(index, event.target.files[0])
      formdata.append('id', index)
      uploadAuth(formdata).then(res => {
        this.user[index + '_url'] = res.result.file_path
        var temp = {}
        temp[index + '_url'] = res.result.file_path
        this.memberEdit(temp)
      }).catch(function (error) {
        Toast(error.message)
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
  .member-auth {
    background: #fff;
    .idcard-wrapper{
        padding: .5rem 5% ;
        background: #f5f5f5;
        .idcard-item{
            background: #fff;
            padding: 1rem 0;
            margin-bottom:.5rem;
            .del-btn{
                    position: absolute;
                    font-size: 1.5rem;
                    top: -.75rem;
                    right: -.75rem;
            }
            .title{
                font-size: .8rem;
                text-align: center;
                margin-top:.5rem;
            }
        }
    }
    .user-avatar {
      display: block;
      position: relative;
      width: 10rem;
      height: 8rem;
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
    }
    .user-avatar::before {
      position: absolute;
      font-size: 1.5rem;
      line-height: 8rem;
      left: 50%;
      margin-left: -.75rem;
      color: rgba(0, 0, 0, 0.5)
    }
  }
.ui-form-control{padding: 0.2em 0.5em 0.2em; border-radius: 1em; background-color: #eee;}
.register-form-select{position: relative; z-index: 1;}
.ui-form-input{width: 100%; background-color: transparent;}
.ui-form-input,
.ui-form-input:focus{outline: none; border: none; color: #2c333a; font-size: 0.9em;}
.ui-form-area{margin-bottom: 0.5em;}
</style>
<style>
  .member-auth .mint-cell-title{flex:unset;width:7rem}
  .member-auth .mint-cell-value{flex:1}
</style>
