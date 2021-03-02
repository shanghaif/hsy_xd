<template>
	<div class="container">
		<div class="uni-steps">
			<div :class="'uni-steps-' + direction" class="uni-steps-items">
				<div v-for="(item, index) in options" :key="index" :class="{ 'uni-steps-process': index === active, 'uni-steps-finish': index < active }" class="uni-steps-item">
					<div :style="{ color: index === active ? activeColor : '' }" class="uni-steps-item-title-container">
						<div class="uni-steps-item-title">{{ item.title }}</div>
						<div v-if="item.desc" class="uni-steps-item-desc">{{ item.desc }}</div>
					</div>
					<div class="uni-steps-item-circle-container">
						<div v-if="index !== active" :style="{ backgroundColor: index < active ? activeColor : '' }" class="uni-steps-item-circle" />
						<div v-else class="uni-steps-item-check iconfont" :style="{ color: activeColor }">&#xe69d;</div>
					</div>
					<div v-if="index !== options.length - 1" :style="{ backgroundColor: index < active ? activeColor : '' }" class="uni-steps-item-line" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GoodsStep',
	data() {
		return {
			activeColor: '#f01414',
			direction: 'row'
		};
	},
	props: {
		options: { type: Array },
		active: {
			type: Number,
			default: 0
		}
	},
	created() {},
	methods: {}
};
</script>

<style scoped lang="scss">
$uni-border-color-light: #ebedf0; //较浅的灰色，如steps时间轴的颜色
$uni-text-color-grey: #999;
$uni-font-size-base: 14px;
$uni-font-size-sm: 12px;
$uni-bg-color: #fff;
$uni-border-radius-circle: 50%;
$uni-text-color: #333;
.uni-steps {
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	position: relative;
	&-items {
		position: relative;
		display: flex;
		flex-direction: row;
		margin: 10px;
		box-sizing: border-box;
		overflow: hidden;
		&.uni-steps-column {
			margin: 10px 0;
			padding-left: 31px;
			flex-direction: column;
			.uni-steps-item {
				&:after {
					content: ' ';
					position: absolute;
					height: 1px;
					width: 100%;
					bottom: 9px;
					left: 0;
					background-color: $uni-border-color-light;
					transform: scaleY(0.5);
				}
				&:last-child {
					position: relative;
					&:after {
						height: 0px;
					}
					.uni-steps-item-title-container {
						text-align: left;
					}
					.uni-steps-item-circle-container {
						left: -17px;
						right: auto;
					}
				}
				&-title-container {
					transform: none;
					display: block;
					line-height: 36px;
				}
				&-title {
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				&-desc {
					white-space: normal;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				&-circle-container {
					left: -17px;
					top: -1px;
					bottom: auto;
					padding: 8px 0px;
					z-index: 1;
				}
				&-line {
					height: 100%;
					width: 1px;
					left: -15px;
					top: -1px;
					bottom: auto;
				}
				&.uni-steps-process {
					.uni-steps-item-circle-container {
						bottom: auto;
						left: -21px;
					}
				}
			}
		}
	}
	&-item {
		flex: 1;
		position: relative;
		padding-bottom: 18px;
		&-title-container {
			text-align: left;
			margin-left: 3px;
			display: inline-block;
			transform: translateX(-50%);
			color: $uni-text-color-grey;
		}
		&-title {
			font-size: $uni-font-size-base;
		}
		&-desc {
			font-size: $uni-font-size-sm;
		}
		&:first-child {
			.uni-steps-item-title-container {
				transform: none;
				margin-left: 0;
			}
		}
		&:last-child {
			position: absolute;
			right: 0;
			.uni-steps-item-title-container {
				transform: none;
				text-align: right;
			}
			.uni-steps-item-circle-container {
				left: auto;
				right: -8px;
			}
		}
		&-circle-container {
			position: absolute;
			bottom: 8px;
			left: -8px;
			padding: 0 8px;
			background-color: $uni-bg-color;
			z-index: 1;
		}
		&-circle {
			width: 5px;
			height: 5px;
			background-color: $uni-text-color-grey;
			border-radius: $uni-border-radius-circle;
		}
		&-line {
			background-color: $uni-border-color-light;
			position: absolute;
			bottom: 10px;
			left: 0;
			width: 100%;
			height: 1px;
		}
		&.uni-steps-finish {
			.uni-steps-item-title-container {
				color: $uni-text-color;
			}
		}
		&.uni-steps-process {
			.uni-steps-item-circle-container {
				bottom: 3px;
				height: 14px;
				line-height: 14px;
				display: flex;
			}
		}
	}
}
.uni-steps-item-check {
	font-size: 14px;
}
</style>
