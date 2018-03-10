<template>
  <div class="ratings" ref="ratings">
    <div class="ratings_scroll">
      <div class="grade_wrapper">
        <div class="grade_left">
          <h3>{{seller.score}}</h3>
          <span>综合评分</span>
          <p>高于周边商家{{seller.rankRate}}</p>
        </div>
        <div class="grade_right">
        <p>服务态度<star :size="36" :score="seller.serviceScore"></star><span>{{seller.serviceScore}}</span></p>
          <p>商品评分<star :size="36" :score="seller.foodScore"></star><span>{{seller.foodScore}}</span></p>
          <p>送达时间<span class="delivery">{{seller.deliveryTime}}分钟</span></p>
        </div>
      </div>
      <split></split>
      <ratingSelect v-on:ratingSelect="onSelectType" v-on:ratingContent="onOnlyContent" :desc="desc" :ratings="ratings" :onlyContent="onlyContent"></ratingSelect>
      <div class="rating_wrapper">
        <ul v-show="ratings.length">
          <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
            <div class="top">
              <div class="avatar">
                <img :src="rating.avatar">
              </div>
              <div class="left">
              <div class="message">
                <span class="username">{{rating.username}}</span>
                <star :size="48" :score="rating.score"></star>
              </div>
            </div>
            <div class="right"><span class="time">{{rating.rateTime}}</span></div>
            </div>
            <div class="rating_content">
              <span>{{rating.text}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import ratingSelect from '../ratingSelect/ratingSelect.vue';
  import dateFormat from '../../common/js/date.js';
  const ALL = 2;
  const positive = 0;
  const negative = 1;
  export default {
    data(){
      return {
        desc:{
          all:'全部',
          positive:'满意',
          negative:'不满意'
        },
        selectType:ALL,
        ratings:[],
        onlyContent:false,

      }
    },
    props: {
      seller:{
        type:Object
      }
    },
    created(){
        var that = this;
       console.time('a')
        this.$axios.get("/api/ratings")
              .then(function(response){
                var errno = 0


                if(response.data.errno ==errno){
                  that.ratings = response.data.data
                  that.ratings.forEach((rating,index)=>{
                    console.log(new Date(rating.rateTime).format("yyyy-MM-dd hh:mm:ss"))
                    rating.rateTime = new Date(rating.rateTime).format("yyyy-MM-dd hh:mm:ss")
                  })
                  console.log(that.ratings)
                }

                // console.log('改变后'+JSON.stringify(that.ratings))


              })
              .catch(function(error){
                console.log(error);
              });
              console.timeEnd('a')
    },
    mounted(){
       this.$nextTick(()=>{
              this._initScroll();
        });
     },
    methods:{
      _initScroll() {
        this.scroll = new BScroll(this.$refs.ratings,{
          // click:true,
        })
      },
      needShow(type,text){
        if(this.onlyContent && !text){
          return false;
        }
        if(this.selectType == ALL){
          return true;
        } else {
          return type == this.selectType;
        }
      },
      onSelectType(type) {
        this.selectType = type;
      },
      onOnlyContent(text) {
        this.onlyContent = text;
      }
    },
      components: {
        star,
        split,
        ratingSelect
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mini.styl';
  .ratings
    background:#fff
    overflow:hidden
    height:500px
    .grade_wrapper
      padding:20px 0
      display:flex
      border-bottom:1px solid rgba(7,17,27,0.1)
      .grade_left
        flex:1.5
        border-right:1px solid rgba(7,17,27,0.1)
        text-align:center
        h3
          font-weight:normal
          color:#f90
        span
          font-size:12px
        p
          font-size:10px
      .grade_right
        flex:2
        text-align:left
        padding-left:3vw
        p
          color:#07111b
          font-size:12px
          margin-bottom:5px
          span
            color:#f90
          .delivery
            color:#93999f
            margin-left:20px
    .ratingselect
      padding:0 15px
    .rating_wrapper
      padding:0 20px
      ul
        padding:0
        margin:0
        li
          border-1px(rgba(7,17,27,0.1))
          padding:18px 0
          .top
            display:flex
            text-align:left
            .avatar
                flex:0.1
                img
                  border-radius:50%
                  width:20px
                  height:20px
            .left
              flex:1

              .message
                display:inline-block
                color:#07111b
                font-size:10px
                margin-left:10px
            .right
              flex:1
              text-align:right
              font-size:10px
              .time
                color:#93999f
          .rating_content
            text-align:left
            margin-left:30px
            font-size:12px


</style>
