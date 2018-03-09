<template>
    <div class="goodsWrapper">
        <div class="item_left_wrapper" ref="menu">
            <ul>
              <li v-for="(value,index) in goods" ref="category" :class="{'active':currentIndex===index}" @click="selectMenu(index,$event)"><span>{{value.name}}</span></li>
            </ul>
        </div>
        <div class="item_right_wrapper" ref="content">
        <div class="scrollWrapper">
          <div class="for_wrapper" v-for="value in goods">
              <p class="title">{{value.name}}</p>

              <div class="food_wrapper">
                <div v-for="food in value.foods" class="mui-card-header mui-card-media" @click="selectFood(food,$event)">
                    <img :src="food.icon"/>
                    <div class="mui-media-body">
                      {{food.name}}
                      <p v-if="food.description" class="des">{{food.description}}</p>
                      <p><i>月售{{food.sellCount}}份</i>&nbsp;&nbsp;&nbsp;<i>好评率{{food.rating}}%</i></p>
                      <i>￥{{food.price}}</i>
                      <cartcontrol :food="food"></cartcontrol>
                    </div>
                </div>
              </div>

          </div>
          </div>
        </div>
        <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>

        <food :food="selectedFood" ref="food"></food>
    </div>
</template>
<script>
import shopcart from '../shopcart/shopcart.vue';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
import food from '../food/food.vue';
const errno = 0
import BScroll from 'better-scroll';
export default{
  data() {
    return {
      goods:[],
      listHeight:[],
      scrollY:0,
      selectedFood:{}
    }
  },
  props:{
    seller:{
      type:Object
    }
  },
  computed: {
    currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          // console.log('zhege:'+i)
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            // console.log(height1,height2,i)
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        var selectFood = [];
        this.goods.forEach((good,index)=>{
          good.foods.forEach((food,index)=>{
            if(food.count){
              selectFood.push(food);
            }
          })
        })
        return selectFood;
      },
  },
  created() {
    const self = this;
    this.$axios.get('/api/goods')
    .then(function(response){
        // console.log(response);
        // if(response.errno==errno){
          self.goods = response.data.data;
          // console.log(self.goods)
          self.$nextTick(()=>{
            self._initScroll();
            self._calculateHeight();
          })
        // }
    })
    .catch(function(error){
        console.log(error);
    });


  },
  methods:{
    selectMenu:function(index,event){
      if (!event._constructed) {
          return;
        }
        let els = this.$refs.content.querySelectorAll(".for_wrapper");
        let el = els[index];
        this.contentscroll.scrollToElement(el,300);
        // console.log(index)
    },
    // active:function(event){
    //   console.log(this.$refs.category)
    //   this.$refs.category.forEach(function(item,index){
    //      item.classList.remove('active');
    //   })
    //   event.currentTarget.classList.add('active');
    // },
    _initScroll:function(){
      this.menuscroll = new BScroll(this.$refs.menu,{
        //点击事件许可
        click:true,
      })
      this.contentscroll = new BScroll(this.$refs.content,{
        //点击事件许可
        click:true,
        probeType:3
      })
      this.contentscroll.on('scroll',(pos)=>{
        this.scrollY = Math.abs(Math.round(pos.y));
        // console.log(this.scrollY)
      })
    },
    _calculateHeight:function(){
       let height = 0;
       this.listHeight.push(height);
       let foodList = this.$refs.content.getElementsByClassName('for_wrapper');

       for(var i=0,len=foodList.length;i<len;i++){
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
       }
    },
    selectFood:function(food,event){
      if(!event._constructed){
          return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    }
  },
  components:{
    shopcart:shopcart,
    cartcontrol:cartcontrol,
    food:food,
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.goodsWrapper
  display:flex
  overflow:hidden
  position:absolute
  top:185px
  bottom: 46px
  .item_left_wrapper
    flex:2
    font-size:12px
    background:#f3f5f7
    ul
      margin:0
      display: table
      padding:0
      width:100%
      height:100%
      li
        padding:0 15px 0 10px
        height:54px
        display: flex
        align-items:center
        justify-content:center
      li.active
        background:#fff!important


  .item_right_wrapper
    flex:8
    .title
        border-left:2px solid #d9dde1
    .food_wrapper
        background:#fff
    .mui-card-header
      background:#fff
      padding: 25px 0 !important;
      margin: 0 15px;
      border-bottom: 1px solid #F1F0F0;
      img
        width:57px!important
        height:57px!important
      div.mui-media-body
        color:#000!important
        margin-left:70px!important
        .des
          color:#93999f!important
        p
          color:#000!important
          padding:4px 0
          height:21px
          overflow:hidden
          font-size:12px
          i
            color:#93999f
        i
          color:#FC1515
        .circle_cart
          height:18px
          position:relative
          display:inline-block
          margin-left:70%
          .food_count
            display:inline-block
            color:#93999f
            position:absolute
            left: -15px
            top: 4px
          .circle_decrease,.circle_add
            color:#00a0dc
            position:absolute


</style>
