<template>
    <div class="goodsWrapper">
        <div class="item_left_wrapper">
            <ul>
              <li v-for="value in goods" ref="category" @click="active($event)"><span>{{value.name}}</span></li>
            </ul>
        </div>
        <div class="item_right_wrapper">
          <div class="for_wrapper" v-for="value in goods">
              <p class="title">{{value.name}}</p>

              <div class="food_wrapper">
                <div v-for="food in value.foods" class="mui-card-header mui-card-media">
                    <img :src="food.icon"/>
                    <div class="mui-media-body">
                      {{food.name}}
                      <p v-if="food.description" class="des">{{food.description}}</p>
                      <p><i>月售{{food.sellCount}}份</i>&nbsp;&nbsp;&nbsp;<i>好评率{{food.rating}}%</i></p>
                      <i>￥6</i>
                    </div>
                </div>
              </div>

          </div>
        </div>
    </div>
</template>
<script>
const errno = 0
export default{
  data() {
    return {
      goods:{}
    }
  },
  created() {
    const self = this;
    this.$axios.get('/api/goods')
    .then(function(response){
        console.log(response);
        // if(response.errno==errno){
          self.goods = response.data.data;
          console.log(self.goods)
        // }
    })
    .catch(function(error){
        console.log(error);
    });
  },
  methods:{
    active:function(event){
      console.log(this.$refs.category)
      this.$refs.category.forEach(function(item,index){
         item.classList.remove('active');
      })
      event.currentTarget.classList.add('active');
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.goodsWrapper
  display:flex
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

</style>
