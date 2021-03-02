<template>
    <div class="check_address" @click="onclick">
        <div class="c_a_icon">
          <img src="@/assets/image/icon2/area.png" alt="">
        </div>
        <div class="c_a_data">
            <div v-if="hasAddress" class="selected-wrapper">
                <div class="c_a_default">
                    <span v-if="isDefault">默认</span>
                    <span>{{item.area_info}}</span>
                </div>
                <div>
                    {{tuan?tuan:item.address_detail}}
                </div>
                <div class="details">
                    <label>{{item.address_realname}}</label>
                    <label>{{item.address_mob_phone}}</label>
                </div>
            </div>
            <div v-else class="data_else">
                <span class="desc">您还没有收货地址，点击这里添加。</span>
            </div>
            
        </div>

        <img class="abs_right" src="@/assets/image/icon2/icon-right.png" alt="">
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['item'],
  created: function () {
    //   console.log(this.item);
  },
  computed: {
    ...mapState({
        tuan:state =>state.member.tuan,
    }),
    hasAddress () {
      if (this.item) {
        return true
      }
      this.onclick()
      return false
    },
    isDefault () {
      if (this.item && this.item.address_is_default) {
        return true
      }
      return false
    }
  },
  methods: {
    onclick () {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
.check_address{
    padding: 1.2rem 1rem;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px 13px rgba(242, 242, 242, 0.54);
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    

    .abs_right{
        position: absolute;
        right: 1rem;
        width: 1.4rem;
    }

    
    .c_a_icon{
        width: 2.555rem;
        img{
            width: 100%;
        }
    }

    .c_a_data{
        width: 88%;
        font-size: 1.2rem;
        box-sizing: border-box;
        position: relative;

        .c_a_default{
            color: #6F6F6F;
            font-size: 1.2rem;
            span{
                &:first-child{
                    background: #E53216;
                    border-radius: 6px;
                    color: #fff;
                    padding: 0 .4rem;
                    padding-bottom: .1rem;
                    line-height: 1.1rem;
                    font-size: 1.1rem;
                    text-align: center;
                    width: 3rem;
                    margin-right: .5rem;

                }
            }

            .data_else{
                color: #161616;
                font-size: 1.78rem;
                flex-direction: row;
                justify-content: flex-start;
            }
        }

        div{
            margin: .1rem 0;
            color:#161616;
            font-size: 1.78rem;
        }

        .details{
            color: #161616;
            font-size: 1.2rem;
            label{
                margin-right: 1rem;
            }
        }

        .data_else{
            color: #161616;
            font-size: 1.78rem;
            flex-direction: row;
            justify-content: flex-start;
        }
    }

}
    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        background-color: #fff;
    }
    .top-wrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;
    }
    .selected-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
    }
    .title-wrapper {
        height: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .icon {
        width: 0.8rem;
        height: 0.8rem;
        margin-left: 0.5rem;
    }
    .title {
        font-size: 0.8rem;
        color: #333;
        margin-left: 0.5rem;
    }
    .default {
        width: 1.4rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        border: 1px solid #e93b3d;
        color: $primaryColor;
        font-size: 0.5rem;
        text-align: center;
        border-radius: 0.1rem;
    }
    .desc {
        color: #7C7F88;
        font-size: 0.7rem;
    }
    .address-text {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        margin-left: 1.8rem;
    }
    .unselected-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .indicator {
        width: 0.35rem;
        height: 0.6rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
    .line-wrapper {
        background:#eee;
        // position: relative;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 0.1rem;
    }
</style>
