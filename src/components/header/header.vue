<template>
  <div class="header">
    <div class="mui-card-header mui-card-media">
      <img class="avatar" :src="seller.avatar" />
      <div class="mui-media-body">
        <h4>{{seller.name}}</h4>
        <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <p v-if="seller.supports"><span>{{seller.supports[0].description}}</span><a><span><i @click="showDetail()">{{seller.supports.length}}个</i><i class="mui-icon mui-icon-arrowright"></i></span></a></p>
      </div>
    </div>
    <div class="notice" @click="showDetail()">
      <span></span>
      <span class="public">{{seller.bulletin}}</span>
      <i class="mui-icon mui-icon-arrowright"></i>
    </div>
    <!-- 弹层 -->
    <transition name="fade">
      <div class="popup" ref="popup" v-show="detailShow" @click="hideDetail()">
        <div class="popup_content">
            <h4>{{seller.name}}</h4>
            <div class="star-wrapper">
              <!-- <star :size="48" :score="seller.score"></star> -->
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="discountMsg">
              <ul v-if="seller.supports">
                <li v-for="(support,index) in seller.supports" :key="index"><span :class="classMap[support.type]"></span><span>{{support.description}}</span></li>
              </ul>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <div class="content">
                {{seller.bulletin}}
              </div>
            </div>
        </div>
        <div class="bulletin-close">
          <i class="icon-close" @click="hideDetail()"></i>
        </div>
    </div>
    </transition>
    <!-- /弹层 -->
  </div>
</template>
<script type="text/ecmascript-6">
// import star from '../star/star';
export default {
  props:{
    seller:{
      type:Object
    }
  },
  data() {
      return {
        detailShow: false
      };
    },
  created:function(){
     this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
  // components:{
  //    star
  // }

}

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mini";
  @import "../../common/stylus/icon";
  .mui-icon-arrowright
      font-size:12px
  .mui-card-header
    height:120px
    background:#6D6B6B
    padding:25px!important
    & >img
      width:64px!important
      height:auto!important
      margin-right:15px
    h4
      font-size:17px
    & > div
      color:#fff!important
      p
        color:#fff
        & > span
          display:inline-block
          width:45%
        a
          color:#fff
          display:inline-block
          width:38%
          text-align:right
          span
            padding:5px 10px
            display:inline-block
            border-radius:30px
            background:#000
  .mui-card-header:after, .mui-card-footer:before
    content:none
  .notice
    color:#fff
    background: #000
    padding: 0 15px
    position:relative
    .public
      overflow:hidden
      white-space:nowrap
      text-overflow:ellipsis
      width:85%
      position:absolute
      font-size:12px
      top:1px
    span:first-child
      display:inline-block
      bg-image(bulletin)
      width:22px
      height:12px
      margin-right:10px
    > i
       position:absolute
       right:0
       top:5px
  .fade-enter-active,.fade-leave-active
    transition: all 0.5s
  .fade-enter,.fade-leave-to
    opacity:0
  .popup
    height:100%
    background:#000
    position: fixed
    width:100%
    top:0
    left:0
    z-index:100
    color:#fff
    padding:64px 50px
    h4
      text-align:center
    .title
      margin-top:25px
      display:flex
      justify-content:space-between
      > div
        flex:1
      > .text
        text-align:center
        font-size:14px
        font-weight:600
      > .line
        height:1px
        background:rgba(255,255,255,0.4)
        margin-top:9px
    .discountMsg ul
      padding:0
      >li
        text-align:left
        margin-bottom:5px
        > span.decrease,span.discount,span.special,span.invoice,span.guarantee
          display:inline-block;
          width:16px
          height:18px
          margin-right:5px
          vertical-align:middle
        > span.decrease
          bg-image('decrease_1')
        > span.discount
          bg-image('discount_1')
        > span.special
          bg-image('special_1')
        > span.invoice
          bg-image('invoice_1')
        > span.guarantee
          bg-image('guarantee_1')
        > span:nth-of-type(2)
          font-size: 12px
          vertical-align:middle
    .bulletin
      margin-top:25px
      font-size:12px
    .bulletin-close
      position:absolute
      bottom: 50px
      left:49%
      font-size:20px



</style>
