<template>
	<div class="circle_cart">
		<transition name="move">
			<div class="mui-icon mui-icon-minus circle_decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)"></div>
		</transition>
		<div class="food_count" v-show="food.count>0"><span class="inner">{{food.count}}</span></div>
		<div class="mui-icon mui-icon-plus circle_add" @click.stop.prevent="addCart($event)"></div>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default{
		props:{
			food:{
				type:Object,
			},
		},
		methods:{
			addCart(event) {
		        // if (!event._constructed) {
		        //   return;
		        // }
		        if (!this.food.count) {
		          Vue.set(this.food, 'count', 1);
		        } else {
		          this.food.count++;
		        }
		        // this.$dispatch('cart.add', event.target);
		        // console.log(this.food);
		      },
		      decreaseCart(event) {
		      	// if(!event._constructed){
		      	// 	return;
		      	// }
		      	if(this.food.count!=0){
		      		this.food.count--;
		      	}
		      }
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .circle_cart

          position:relative
          display:inline-block

          .food_count
            display:inline-block
            color:#93999f
            position:absolute
            left: -15px
            top: 4px
          .circle_decrease,.circle_add
            color:#00a0dc
            position:absolute
          .circle_decrease
          	left:-45px


</style>
