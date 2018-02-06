<template>
  <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" :class="itemClass" class="itemClass" track-by="$index"></span>
  </div>
</template>
<script>
    const star_on = 'on';
    const star_half = 'half';
    const star_off = 'off';
    const star_length = 5;
  export default {
    props:{
      score: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    computed:{
      starType(){
        return 'star-'+this.size;
      },
      itemClasses(){
        let result = [];
        let score = Math.floor(this.score*2)/2;
        let decimal = score % 1;
        let integer = Math.floor(score);
        for(let i = 0; i < integer; i++){
          result.push(star_on);
        }
        if(decimal){
          result.push(star_half);
        }
        while(result.length < length){
          result.push(star_off);
        }
        return result;
      }
    },
    created(){
      console.log(this.size,this.itemClasses)
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mini.styl"
  .star
    font-size:0
    &.star-24
      width:20px
      height: 20px
      margin-right:22px
      &.on
        bg-image('images/star24_on')
      &.half
        bg-image('images/star24_half')
      &.off
        bg-image('images/star24_off')
    &.star-36
      width:15px
      height:15px
      margin-right:6px
      &.on
        bg-image('images/star36_on')
      &.half
        bg-image('images/star36_half')
      &.off
        bg-image('images/star36_off')
    &.star-48
      width:10px
      height:10px
      margin-right:3px
      & > .on
        bg-image('images/star48_on')
      & > .half
        bg-image('images/star48_half')
      & > .off
        bg-image('images/star48_off')
</style>
