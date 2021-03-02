<template>
	<div class="chat-message">
		<!--商品信息-->
		<div v-if="chat_goods">
			<div class="dstouch-chat-product" @click="$router.push({ name: 'HomeGoodsdetail', query: { goods_id: chat_goods.goods_id } })">
				<div class="goods-pic"><img :src="chat_goods.goods_image" alt="" /></div>
				<div class="goods-info">
					<div class="goods-name">{{ chat_goods.goods_name }}</div>
					<div class="goods-price">
						<span>￥</span>
						<span>{{ chat_goods.goods_price }}</span>
					</div>
				</div>
			</div>
		</div>
		<!--聊天信息-->
		<div v-else>
			<div v-if="item.f_id">
				<div v-if="item.if_show_time" class="time">{{ item.add_time }}</div>
				<dl :class="item.f_id != t_id ? 'msg-me' : 'msg-other'">
					<dt>
						<img
							:src="item.f_id != t_id ? memberInfo.member_avatar + '?' + time : (userInfo.store_id ? userInfo.store_avatar : userInfo.member_avatar) + '?' + time"
							alt=""
						/>
						<i></i>
					</dt>
					<dd v-html="getContent(item.t_msg)"></dd>
				</dl>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			time: '',
			chat_goods: false,
			smilies_array: {
				':smile:': { image: 'smile.gif', text: '微笑' },
				':sad:': { image: 'sad.gif', text: '难过' },
				':biggrin:': { image: 'biggrin.gif', text: '呲牙' },
				':cry:': { image: 'cry.gif', text: '大哭' },
				':huffy:': { image: 'huffy.gif', text: '发怒' },
				':shocked:': { image: 'shocked.gif', text: '惊讶' },
				':tongue:': { image: 'tongue.gif', text: '调皮' },
				':shy:': { image: 'shy.gif', text: '害羞' },
				':titter:': { image: 'titter.gif', text: '偷笑' },
				':sweat:': { image: 'sweat.gif', text: '流汗' },
				':mad:': { image: 'mad.gif', text: '抓狂' },
				':lol:': { image: 'lol.gif', text: '阴险' },
				':loveliness:': { image: 'loveliness.gif', text: '可爱' },
				':funk:': { image: 'funk.gif', text: '惊恐' },
				':curse:': { image: 'curse.gif', text: '咒骂' },
				':dizzy:': { image: 'dizzy.gif', text: '晕' },
				':shutup:': { image: 'shutup.gif', text: '闭嘴' },
				':sleepy:': { image: 'sleepy.gif', text: '睡' },
				':hug:': { image: 'hug.gif', text: '拥抱' },
				':victory:': { image: 'victory.gif', text: '胜利' },
				':sun:': { image: 'sun.gif', text: '太阳' },
				':moon:': { image: 'moon.gif', text: '月亮' },
				':kiss:': { image: 'kiss.gif', text: '示爱' },
				':handshake:': { image: 'handshake.gif', text: '握手' }
			}
		};
	},
	props: {
		item: {},
		t_id: {},
		userInfo: {},
		memberInfo: {}
	},

	created() {
		this.time = new Date().getTime();
		let content = this.item.t_msg;
		if (content.match(/^\[goods\](.)+\[\/goods\]$/)) {
			try {
				this.chat_goods = JSON.parse(content.replace(/\[\/?goods\]/g, ''));
			} catch (e) {
				console.log(e);
			}
		}
	},

	methods: {
		getContent(content) {
			for (var key in this.smilies_array) {
				let smile = this.smilies_array[key];
				let reg = new RegExp('' + key, 'g');
				content = content.replace(reg, "<img title='" + smile.text + "' alt='" + smile.text + "' src='" + this.getSmile(smile.image) + "'>");
			}

			return content;
		},
		getSmile(smile) {
			return env.SITE_URL + '/static/plugins/js/smilies/images/' + smile;
		}
	}
};
</script>

<style scoped lang="scss">
.chat-message {
	div {
		box-sizing: border-box;
	}
}
.dstouch-chat-product {
	width: 93%;
	margin: 0.5rem auto;
	padding: 1rem 0;
	border: solid 0.05rem #ddd;
	background-color: #fff;
	position: relative;
}
.dstouch-chat-product .goods-pic {
	width: 5rem;
	height: 5rem;
	position: absolute;
	border-radius: 0.76rem;
	overflow: hidden;
	top: 1rem;
	left: 1.43rem;
}
.dstouch-chat-product .goods-pic img {
	width: 100%;
}
.dstouch-chat-product .goods-info {
	margin: 0 0.5rem 0 7.5rem;
}
.dstouch-chat-product .goods-name {
	font-size: 1.43rem;
	line-height: 1.7rem;
	height: 3.2rem;
	overflow: hidden;
	margin-bottom: 0.3rem;
	color: #000;
}
.dstouch-chat-product .goods-price {
	font-size: 1.6rem;
	line-height: 1.9rem;
	height: 1.9rem;
	color: #f23030;
	font-weight: 600;
	span {
		&:nth-child(1) {
			font-size: 1.23rem;
		}
		&:nth-child(2) {
			font-size: 1.6rem;
		}
	}
}

.chat-message .time {
	text-align: center;
	font-size: 1.22rem;
	color: #6f6f6f;
}
.chat-message dl {
	position: relative;
	min-height: 4.4rem;
	padding: 0.4rem 0.86rem 0;
	margin-bottom: 0.4rem;
	overflow: hidden;
}
.chat-message dl.msg-other {
	margin-top: 1.9rem;
	animation: optionMsgLeft 0.5s ease-in-out;
	-webkit-animation: optionMsgLeft 0.5s ease-in-out;
}
@keyframes optionMsgLeft {
	from {
		opacity: 0.5;
		left: -100%;
		right: 100%;
	}
	to {
		opacity: 1;
		left: 0;
		right: 0;
	}
}
@-webkit-keyframes optionMsgLeft {
	from {
		opacity: 0.5;
		left: -100%;
		right: 100%;
	}
	to {
		opacity: 1;
		left: 0;
		right: 0;
	}
}
.chat-message dl.msg-me {
	margin-top: 1.9rem;
	animation: optionMsgRight 0.5s ease-in-out;
	-webkit-animation: optionMsgRight 0.5s ease-in-out;
}
@keyframes optionMsgRight {
	from {
		opacity: 0.5;
		left: 100%;
		right: -100%;
	}
	to {
		opacity: 1;
		left: 0;
		right: 0;
	}
}
@-webkit-keyframes optionMsgRight {
	from {
		opacity: 0.5;
		left: 100%;
		right: -100%;
	}
	to {
		opacity: 1;
		left: 0;
		right: 0;
	}
}
.chat-message dl dt {
	width: 4rem;
	height: 4rem;
	position: absolute;
	top: 0.3rem;
}
.chat-message dl dt i {
	width: 0.5rem;
	height: 0.5rem;
	position: absolute;
	top: 0.5rem;
	background-repeat: no-repeat;
	background-position: 50% 50%;
	background-size: 100%;
}
.chat-message dl dt img {
	max-width: 4rem;
	max-height: 4rem;
	border-radius: 100%;
}
.chat-message dl.msg-other dt {
	left: 0.4rem;
}
.chat-message dl.msg-other dt i {
	left: 2.3rem;
	background-image: url(../../../assets/image/chat/chat-msg-other.png);
}
.chat-message dl.msg-me dt {
	right: 0.4rem;
	top: 0.2rem;
}
.chat-message dl.msg-me dt i {
	right: 2.3rem;
	background-image: url(../../../assets/image/chat/chat-msg-me.png);
}
.chat-message dl dd {
	display: block;
	max-width: 10rem;
	padding: 0.4rem 0.6rem;
	border-radius: 0.4rem;
	min-height: 1.8rem;
	font-size: 1.55rem;
	line-height: 1.8rem;
	color: #000;
	word-wrap: break-word;
}
.chat-message dl dd img {
	background: #fff;
	max-width: 8rem;
	max-height: 8rem;
	padding: 0.2rem;
	border-radius: 0.3rem;
	vertical-align: text-bottom;
	margin: 0 0.2rem;
}
.chat-message dl.msg-other dd {
	margin-left: 5rem;
	float: left;
	background: #fff;
	color: #161616;
	border-radius: 8px;
	padding: 0.8rem 1.2rem;
}
.chat-message dl.msg-me dd {
	margin-right: 5rem;
	float: right;
	// background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
	background-color: #fff;
	color: rgba(22, 22, 22, 1);
	// color: #ffffff;
	border-radius: 8px;
	padding: 0.8rem 1.2rem;
}
</style>
