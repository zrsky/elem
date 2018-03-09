<template>
<div class="food_detail" ref="food_wrapper" v-show="showFlag">
	<div class="food_wrapper">
		<div class="food_detail_img">
			<img :src="food.image">
			<a class="mui-icon mui-icon-left-nav mui-pull-left" @click="hide()"></a>
		</div>
		<div class="content">
			<h1 class="title">{{food.name}}</h1>
			<div class="detail"><span class="sell-count">月售{{food.sellCount}}份</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="rating">好评率{{food.rating}}%</span></div>
			<div class="price"><span>￥{{food.price}}</span>
			<cartcontrol :food="food"></cartcontrol>
		</div>
	</div>
	<split v-show="food.info"></split>
	<div class="info">
		<h1 class="title">商品信息</h1>
		<p class="desc">{{food.info}}</p>
	</div>
	<split></split>
	<div class="ratings">
		<h1 class="title">商品评价</h1>
		<ratingselect v-on:ratingSelect="onSelectType" v-on:ratingContent="onOnlyContent"  :desc="desc" :ratings="food.ratings" :onlyContent="onlyContent" :selectType="selectType"></ratingselect>
		<div class="rating_wraper" v-show="food.ratings && food.ratings.length">

         <div v-for="value in food.ratings" v-show="needShow(value.rateType,value.text)" style="margin-top:15px">
           <p class="mui-pull-left time">{{value.rateTime}}</p>
            <p class="mui-pull-right name">{{value.username}}
            <img width="10px" :src="value.avatar">
            </p>
            <div class="ratingcontent" style="padding-top:25px;font-size:12px;"><span class="content1">{{value.text}}</span></div>
         </div>

		</div>
	</div>
</div>
</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import cartcontrol from '../cartcontrol/cartcontrol.vue';
	import ratingselect from '../ratingselect/ratingselect.vue';
	import split from '../split/split.vue';
  import connect from '../../common/js/connector.js';
  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
	export default {
		data() {
			return {
				showFlag:false,
				desc:{
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				},
        selectType:2,
        onlyContent:false,
			};
		},
		props:{
			food: {
				type: Object
			}
		},
		mounted() {
			this.$nextTick(function(){
				this._initScroll()
			})
		},
		methods: {
			_initScroll() {
				 this.scroll = new BScroll(this.$refs.food_wrapper, {
	              click: true
	            });
			},
			show() {
				this.showFlag = true;
			},
			hide() {
				this.showFlag = false;
			},
      needShow(type,text) {
        if(this.onlyContent && !text){
          return false;
        }
        if(this.selectType == ALL) {
          return true;
        } else if(this.selectType == type) {
          return true;
        }
      },
      onSelectType(type) {
        // connect.$on('ratingSelect',function(type){
          this.selectType = type;
          this.scroll.refresh();
        // })
      },
      onOnlyContent(text) {
        // connect.$on('ratingContent',function(text){
          this.onlyContent = text;
        // })
      },
		},
		components:{
			cartcontrol,
			split,
			ratingselect,
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mini.styl';

	.food_detail
		position:fixed
		top:0
		left:0
		height:93%
		right:0
		z-index:10
		background:#fff
		overflow:hidden
		.food_detail_img
			height:60%
			img
				width:100%
				height:100%
			.mui-icon-left-nav
				position:absolute
				top:10px
				left:5px
				font-size:30px
				color:#fff
		.content
			padding:10px
			border-1px(rgba(7,17,27,0.1))
			h1
				font-size:14px
			.detail
				color:#93999f
				font-size:10px
				margin-bottom:16px
			.price
				color:#f01414
				font-size:14px
				position:relative
				.circle_cart
					position:absolute
					right:30px
		.info
			padding:15px
			.title
				font-size:14px
				margin-bottom:8px
				font-weight:normal
		.ratings
			padding:15px
			.title
				font-size:14px
				font-weight:normal
			.rating_wraper
				padding: 10px 0
				p
					font-size:10px
        .name img
          width:10px
				.ratingcontent
					padding-top:20px
					padding:0
					span.content1
						margin-left:-16px
</style>
