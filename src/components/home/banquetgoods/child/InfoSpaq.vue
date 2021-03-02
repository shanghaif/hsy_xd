<!-- Buy.vue -->
<template>
	<div class="ui-buy-wrapper ui-detail-common" >
		<div
			class="buy-wrapper header"
			@click="changeCartState()"
			v-if="this.activeBuy()"
		>

			<p >
				食品安全
			</p>
			<span class="iconfont">&#xe6ef;</span>
		</div>

	</div>
</template>

<script>

export default {
  data () {
    return {}
  },

  computed: {

  },

  created () {},

  watch: {
    detailInfo: function (value) {
      this.setSpecification()
    }
  },

  methods: {


    activeBuy: function () {

    },

    changeCartState () {

    },

    setSpecification () {

    }
  }
}
</script>

<style lang="scss" scoped>
.ui-buy-wrapper {
	.buy-wrapper {
		&.header {
			padding: 0;
			height: 2rem;
		}
		&.isopacity {
			opacity: 0.5;
		}
		p {
			font-size: 0.7rem;
			color: rgba(78, 84, 93, 1);
			line-height: 1rem;
			padding: 0;
			margin: 0;
			i {
				font-weight: normal;
				font-style: normal;
			}
		}
		.iconfont {
			width:0.25rem;
			height: 0.5rem;
			cursor: pointer;
		}
	}
}
.ui-detail-common {
	height: 2rem;
	margin-top: 0.4rem;
	background: white;
	padding: 0 0.75rem;
}
.ui-detail-common .header {
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	width: auto;
}
</style>
