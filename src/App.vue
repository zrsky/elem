<template>
  <div>
      <v-header :seller="seller"></v-header>
      <div class="mui-content">
        <div class="mui-row">
            <div class="mui-col-sm-4 mui-col-xs-4">
                <li class="mui-table-view-cell">
                  <router-link to="/goods">商品</router-link>
                </li>
            </div>
            <div class="mui-col-sm-4 mui-col-xs-4">
                <li class="mui-table-view-cell">
                  <router-link to="/ratings">评论</router-link>
                </li>
            </div>
            <div class="mui-col-sm-4 mui-col-xs-4">
                <li class="mui-table-view-cell">
                    <router-link to="/seller">商家</router-link>
                </li>
            </div>
        </div>
        <router-view :seller="seller" keep-alive></router-view>
    </div>

  </div>
</template>

<script>
import header from './components/header/header.vue'
import {urlParse} from './common/js/utils.js'


export default {
  data() {
    return{
      seller:{}
    };
  },
  created(){
    var that = this;
    this.$axios.get("/api/seller")
            .then(function(response){
              var errno = 0
              console.log('改变前'+JSON.stringify(that.seller))

              if(response.data.errno ==errno){
                that.seller = response.data.data
              }

              console.log('改变后'+JSON.stringify(that.seller))


            })
            .catch(function(error){
              console.log(error);
            });
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import "./common/stylus/mini";
  li
    list-style:none
    text-align:center
  .mui-row
    background: #fff
    height: 43px
    font-size: 14px
    border-1px(#E6E4E4)
    router-link:link,router-link:visited,router-link:hover,router-link:active
      color: #EA8D8D
</style>
