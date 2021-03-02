<template>
	<div class="container">
		<!-- <div class="common-header-wrap">
            <mt-header title="最近消息" class="common-header">
                <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
            </mt-header>
        </div> -->
		<head-title title="最近消息"></head-title>
		<div>
			<ul class="dstouch-message-list" id="messageList">
				<li v-for="(item, index) in list">
					<a @click="$router.push({ name: 'MemberChatInfo', query: { t_id: index, t_name: item.u_name } })">
						<div class="avatar">
							<img :src="item.avatar + '?' + time" />
							<sup v-if="item.r_state == 2"></sup>
						</div>
						<dl>
							<dt>{{ item.u_name }}</dt>
							<dd>{{ item.t_msg }}</dd>
						</dl>
						<time>{{ item.time }}</time>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, Indicator } from 'mint-ui';
import { getChatList } from '../../../api/memberChat';
export default {
	data() {
		return {
			time: '',
			list: false
		};
	},
	components:{
		HeadTitle
	},
	mounted() {
		resetRem();
	},
	created() {
		this.time = new Date().getTime();
		Indicator.open();
		getChatList()
			.then(res => {
				this.list = res.result.list;
				Indicator.close();
			})
			.catch(function(error) {
				Indicator.close();
				Toast(error.message);
			});
	},
	beforeDestroy() {
		resumeRem();
	},
	watch: {},
	methods: {}
};
</script>

<style scoped lang="scss">
.dstouch-message-list {
	background-color: #fff;
	padding: 0 1.42rem;
	overflow: hidden;
}
.dstouch-message-list li {
	padding: 1.53rem 0 1.48rem;
	// position: relative;
	// z-index: 1;
	// height: 3rem;
	// border-bottom: solid 0.05rem #eee;
	// margin: 0 1.5rem 0 3.2rem;
	a {
		display: flex;
	}
	position: relative;
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		width: 105%;
		height: 1px;
		background-color: rgba(151, 151, 151, 0.16);
	}
}
.dstouch-message-list li .avatar {
	// position: absolute;
	position: relative;
	// z-index: 1;
	// top: 0.4rem;
	// bottom: 0.4rem;
	// left: -2.7rem;
	display: block;
	width: 3.72rem;
	height: 3.72rem;
	background-color: #eee;
	border-radius: 100%;
	margin-right: 1.81rem;
}
.dstouch-message-list li .avatar img {
	width: 100%;
	height: 100%;
	border-radius: 100%;
}
.dstouch-message-list li .avatar sup {
	position: absolute;
	z-index: 1;
	top: 0;
	right: 0;
	width: 0.8rem;
	height: 0.8rem;
	background-color: #f23030;
	border-radius: 100%;
}
.dstouch-message-list li dl {
	display: block;
	// padding: 0.4rem 0;
}
.dstouch-message-list li dt {
	display: block;
	// height: 1.2rem;
	// font-size: 0.7rem;
	// line-height: 1.2rem;
	// color: #111;
	font-size: 1.34rem;
	font-weight: 600;
	color: #161616;
}
.dstouch-message-list li dd {
	display: block;
	// height: 1rem;
	// font-size: 0.6rem;
	// line-height: 1rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 1.24rem;
	font-weight: 400;
	color: #6F6F6F;
	width: 5rem;
}
.dstouch-message-list li time {
	// position: absolute;
	margin-left: auto;
	z-index: 1;
	top: 0.4rem;
	right: 0.4rem;
	font-size: 1.05rem;
	line-height: 0.9rem;
	color: #bbb;
	margin-top: 1.8rem;
}
</style>
