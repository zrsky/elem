<template>
		<div class="cart">
			<div class="content">

			<div class="cartIcon" @click="isShow">
			<div class="outerCircle">
				<div v-show="totalCount" class="num"><span>{{totalCount}}</span></div>
				<div class="innerCircle" :class="cartColor">
					<i class="icon-shopping-cart"></i>
				</div>
			</div>

		</div>
		<div class="totalPrice" :class="totalPriceColor"><strong>￥{{totalPrice}}</strong></div>
		<div class="deliveryPrice"><span>另需配送费￥{{deliveryPrice}}元</span></div>
		<div class="pay" :class="payClass">{{payDesc}}</div>

	</div>
	<transition name="fade">
   <div ref="food_list" class="food_list" v-show="isCartShow">
        <div class="food_list_content">
          <div class="food_list_top">
            <h4 class="left">购物车</h4>
            <span class="right" @click="clearFoods">清空</span>
          </div>
          <div class="food_list_body"  style="height:60vw;overflow:hidden;" ref="foodList">
            <ul ref="ul_food_list">
              <li v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price"> <span>￥{{food.price}}</span></div>
                <cartcontrol :food="food"></cartcontrol>
              </li>
            </ul>
          </div>
        </div>
  </div>
  </transition>
</div>

</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
	export default {
    data() {
      return {
        isCartShow:false,
      }
    },
		props: {
			selectFoods: {
				type:Array,
				default() {
					return [
						{
							price:10,
							count:1,
						}
					]
				}
			},
			deliveryPrice: {
				type:Number,
				default:0
			},
			minPrice: {
				type:Number,
				default:15
			}
		},
		computed: {
			totalPrice() {
				let totalprice = 0;
				this.selectFoods.forEach((item,index)=>{
					totalprice += item.price * item.count;
				})
				return totalprice;
			},
			payDesc() {
				if(this.totalPrice = 0){
					return '￥' + this.minPrice + '元起送';
				}else if(this.totalPrice<this.minPrice){
					let diff = this.minPrice - this.totalPrice;
					return '还差￥' + diff + '元起送';
				}else if(this.totalPrice >= this.minPrice){
					return '去结算';
				}
			},
			payClass() {
				if(this.totalPrice < this.minPrice){
					return 'not-enough';
				}else{
					return 'enough';
				}
			},
			totalCount() {
				var count=0;
				this.selectFoods.forEach((food,index)=>{
					count += food.count
				})
				return count
			},
			cartColor() {
				if(this.totalCount > 0){
					return 'changeColor';
				}
			},
			totalPriceColor() {
				if(this.totalPrice > 0){
					return 'totalPriceColor';
				}
			},
		},
    mounted(){
      this._initScroll();
    },
		methods:{
      clearFoods() {
        this.isCartShow = false;
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });

      },
      _initScroll() {
        this.scroll = new BScroll(this.$refs.foodList,{
          // 开启点击事件
          click:true,
        })
      },
      isShow() {
        if(this.selectFoods.length){
          this.isCartShow = !this.isCartShow;

        }
      }
		},
		components:{
			cartcontrol:cartcontrol
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mini.styl';
.cart
	width:100%
	position:fixed
	bottom:0
	z-index:50
	.content
		position:fixed
		bottom:0
		display:flex
		line-height:50px
		color:#80858a
		height:50px
		width:100%
		background:#141d27
		.cartIcon
			flex:1
			.outerCircle
				width:50px
				height:50px
				text-align:center
				position:absolute
				bottom:10px;
				border-radius:50%
				background:#141d27
				left:5%
				.num
					position:absolute
					top:-4px
					left:30px
					width:20px
					height:15px
					border-radius:7px
					background:#f01414
					color:#fff
					span
						position:absolute
						top:-16px
						transform:translate(-50%)
						left:50%
						font-size:9px
				.innerCircle
					width:40px
					height:40px
					margin-top:5px
					background:#2b343c
					border-radius:50%
					display:inline-block
					line-height:40px
					i
						display:inline-block
						height:30px
						width:30px
						font-size:18px
				.changeColor
					background:#00a0dc
					i
						color:#fff

		.totalPrice
			flex:0.6
		.totalPriceColor
			color:#fff
		.deliveryPrice
			flex:1.4
			font-size:12px
			margin-left:10px
		.pay
			flex:1.4
			font-size:14px
			text-align:center
		.enough
			background:#00b43c
			color:#fff
			font-weight:bold
		.not-enough
			background:#2b333b
	.food_list
		position:absolute
		bottom:50px
		width:100%
		z-index:-1
		.food_list_top
			height:44px
			line-height:44px
			text-align:center
			width:100%
			border-1px(rgba(7,17,27,0.1))
			background:#f3f5f7
			.left
				float:left
				font-size:14px
				display:inline-block
				line-height:44px
				margin:0
				margin-left:20px
			.right
				float:right
				color:#00a0dc
				font-size:12px
				margin-right:20px
		.food_list_body
			background:#fff
			padding:0 20px
			ul
				padding:0
				margin:0
				width:100%
				li
					font-size:14px
					text-align:left
					padding:12px 0
					display:flex
					.name
						flex:4
					.price
						flex:1
						color:#f01414
					.circle_cart
						flex:0.5
						margin-top:-2px
						margin-left:30px
</style>
