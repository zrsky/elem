<template>
  <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" :class="itemClass" class="itemClass"></span>
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
        while(result.length < star_length){
          result.push(star_off);
        }
        return result;
      }
    },
    created(){
      // console.log(this.size,this.itemClasses)
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mini.styl"
  .star
    font-size:0
    &.star-24
      width:100%
      height:20px
      text-align:center
      margin-right:22px
      & > .on
        bg-image('star24_on')
        width:20px
        height:20px
        display:inline-block
        margin-right:20px
      & > .half
        bg-image('star24_half')
        width:20px
        height:20px
        display:inline-block
        margin-right:20px
      & > .off
        bg-image('star24_off')
        width:20px
        height:20px
        display:inline-block
        margin-right:20px
    &.star-36
      height:15px
      text-align:center

      display:inline-block
      & > .on
        bg-image('star36_on')
        width:15px
        height:15px
        display:inline-block
        margin-right:6px
      & > .half
        bg-image('star36_half')
        width:15px
        height:15px
        display:inline-block
        margin-right:6px
      & > .off
        bg-image('star36_off')
        width:15px
        height:15px
        display:inline-block
        margin-right:6px
    &.star-48
      width:100%
      height:10px
      margin-right:3px
      text-align:center
      & > .on
        bg-image('star48_on')
        width:10px
        height:10px
        display:inline-block
        margin-right:4px
      & > .half
        bg-image('star48_half')
        width:10px
        height:10px
        display:inline-block
        margin-right:4px
      & > .off
        bg-image('star48_off')
        width:10px
        height:10px
        display:inline-block
        margin-right:4px
</style>
