<template>
    <div @click="onclick()">
        <!-- <i class="order-item-icon iconfont" v-html="iconfont"></i> -->
		<img class="order-item-icon" :src="iconfont" alt="">
        <label class="item-title order-item-title">{{title}}</label>
        <span class="number" v-if="orderNumber == 0 ? '': orderNumber && isEmpty == false ? '': orderNumber">{{ orderNumber }}</span>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    iconfont: {
      type: String
    },
    title: {
      type: String
    },
    testAttr: {
      type: String
    },
    id: {
      default: ''
    },
    orderNumber: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isEmpty: false
    }
  },
  computed: mapState({
    isOnline: state => state.member.isOnline
  }),
  created () {
    this.isSignin()
  },
  methods: {
    ...mapMutations({
      changeStatus: 'changeStatus'
    }),
    onclick () {
      if (this.isOnline) {
        this.$router.push({ name: this.testAttr, query: { state: this.id } })
      } else {
        this.$router.push({ name: 'signin' })
      }
    },
    // 是否登录
    isSignin () {
      if (this.isOnline) {
        this.isEmpty = true
      } else {
        this.isEmpty = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .item-title {
    	font-size: 1rem;
    	color: #666;
    }
    .order-item-icon {
    	width: 2rem;
    	height: 1.73rem;
    	// font-size: 1.3rem;
    	// margin-top: 0.8rem;
    }
    .order-item-title {
    	margin-top: 0.5rem;
    }
    span.number {
    	position: absolute;
    	top: -0.5rem;
    	right: 1rem;
    	width: 1.3rem;
    	height: 1.3rem;
		line-height: 1.3rem;
    	background: rgba(230, 49, 22, 1);
    	border-radius: 50%;
    	font-size: 0.5rem;
    	color: RGBA(255, 255, 255, 1);
    	font-size:0.78rem;
    	font-family:DIN-Medium,DIN;
    	font-weight:500;
    	color:rgba(255,255,255,1);
    	text-align: center;
    }
</style>
