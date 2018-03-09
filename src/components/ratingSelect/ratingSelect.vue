<template>
	<div class="ratingselect">
		<div class="type_wrapper">
			<span class="all" :class="{'active':selectedType==2}" @click="select(2,$event)">{{desc.all}}<span>{{ratings.length}}</span></span>
			<span class="positive" :class="{'active':selectedType==0}" @click="select(0,$event)">{{desc.positive}}<span>{{positiveRatings.length}}</span></span>
			<span class="negative" :class="{'active':selectedType==1}" @click="select(1,$event)">{{desc.negative}}<span>{{negativeRatings.length}}</span></span>
		</div>
		<div class="switch">
			<div class="circle" @click="toggleContent($event)" :class="{'active':onlyContented==true}">
				<i class="mui-icon mui-icon-checkmarkempty">
				</i>
			</div>
			<p>只看有内容的评价</p>
		</div>
	</div>
</template>
<script>
  import connect from '../../common/js/connector.js';
  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
	export default {
    data(){
      return {
        selectedType:ALL,
        onlyContented:false,
      }
    },
		props:{
			desc: {
				type: Object,
				default() {
					return {
						all:'全部',
						positive:'推荐',
						negative:'吐槽'
					}
				}
			},
			selectType: {
				type:Number,
				default:ALL
			},
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			onlyContent: {
				type:Boolean,
				default:false
			}
		},
		computed: {
			positiveRatings() {
				return this.ratings.filter(function(rating){
					return rating.rateType==0;
				})
			},
			negativeRatings() {
				return this.ratings.filter(function(rating){
					return rating.rateType==1;
				})
			},
		},
		methods: {
			select(type,event) {
				// if(!event._constructed){
				// 	return;
				// }
				this.selectedType = type;
				this.$emit('ratingSelect',type);
			},
			toggleContent(event) {
				// if(!event._constructed){
				// 	return;
				// }
				if(this.onlyContented==true){
					this.onlyContented = false;
				}else{
					this.onlyContented = true;
				}
				this.$emit('ratingContent',this.onlyContented);
			}
		},

	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mini.styl';
	.ratingselect
		.type_wrapper
			padding:18px 0
			border-1px(#EFECEC)
			& > span
				display:inline-block
				padding:8px 12px
				font-size:12px
				color:#4d555d
				margin-right:5px
				span
					margin-left:2px
			.all,.positive
				background:rgba(0,160,220,0.2)
				&.active
					color:#fff
					background:#00a0dc
			.negative
				background:rgba(77,85,93,0.2)
				&.active
					color:#fff
					background:#4d555d
		.switch
			padding: 10px 0
			border-1px(#EFECEC)
			.circle
				background:#ccc
				border-radius:50%
				display:inline-block
				width: 20px
				height:20px
				text-align:center
				line-height:20px
				&.active
					background:#00c850
				i
					font-size:20px
					color:#fff
			p
				display:inline-block
				font-size: 12px

</style>
