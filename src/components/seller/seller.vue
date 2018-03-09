<template>
    <div class="seller_wrapper" ref="seller">
      <div class="seller">
        <div class="seller_top">
            <div class="seller_msg">
              <div class="seller_msg_left">
                <h1 class="title">粥品香坊</h1>
                <star :size="36" :score="seller.score"></star>
                <span class="ratingCount">({{seller.ratingCount}})</span>
                <span class="sellCount">月售{{seller.sellCount}}单</span>
              </div>
              <div class="seller_msg_right">
                <p><i class="mui-icon mui-icon-star"></i></p>
                <span>收藏</span>
              </div>
            </div>
          </div>
          <div class="seller_delivery">
            <div class="sendPrice">
              <p>起送价</p>
              <span><strong>{{seller.minPrice}}</strong>元</span>
            </div>
            <div class="deliveryPrice">
              <p>商家配送</p>
              <span><strong>{{seller.deliveryPrice}}</strong>元</span>
            </div>
            <div class="averageTime">
              <p>平均配送时间</p>
              <span><strong>{{seller.deliveryTime}}</strong>元</span>
            </div>
          </div>
          <split></split>
          <div class="seller_bulletin_activity">
            <div class="bulletin">
              <h1 class="title">公告与活动</h1>
              <p class=
              "content">{{seller.bulletin}}</p>
            </div>
            <div class="avtivity">
              <ul>
                <li>asdfasda</li>
                <li>asdfasda</li>
              </ul>
            </div>
          </div>
      </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import star from '../star/star.vue';
import split from '../split/split.vue';
export default {
  data(){
    return{

    }
  },
  props:{
    seller:{
      type:Object
    }
  },
  mounted() {
    this._initScroll();
  },
  methods: {
    _initScroll() {
      this.scroll = new BScroll(this.$refs.seller,{
        click:true,
      })
    }
  },
  components: {
    star,
    split
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mini.styl';
  .seller_wrapper
    background:#fff
    overflow:hidden

    .seller_top
      padding:15px 20px
      border-1px(rgba(7,17,27,0.1))
      .seller_msg
        display:flex
        .seller_msg_left
          flex:2
          .title
            font-size:14px
            font-weight:normal
          .ratingCount
            color:#4d555d
            font-size:10px
          .sellCount
            color:#4d555d
            font-size:12px
        .seller_msg_right
          flex:0.2
          p i
            color:#d4d6d9
          span
            font-size:12px
            color:#4d555d
    .seller_delivery
      padding: 20px 20px
      text-align:center
      display:flex
      border-1px(rgba(7,17,27,0.1))
      div
        p
          font-size:10px
        span
          color:#07111b
          font-size:12px
          strong
            font-size:24px
            font-weight:400
      div + div
        border-left: 1px solid rgba(7,17,27,0.1)
      .sendPrice
        flex:1
      .deliveryPrice
        flex:1
      .averageTime
        flex:1
    .seller_bulletin_activity
      padding: 10px 20px
      .bulletin
        .title
          margin-bottom: 8px;
          line-height: 14px;
          color: #07111b;
          font-size: 14px;
          font-weight:normal
        .content
          line-height:24px
          color:#f01414
          font-size:12px
          padding:0 10px
      .activity
        ul
          padding:0
          li
            padding: 20px 0
            text-align:left
            border-top:1px solid rgba(7,17,27,0.1)

</style>
