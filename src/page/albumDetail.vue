<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import './../style/mixin.scss';
.desc-head{
  overflow: hidden;
  .weui-media-box{
    align-items: flex-start;
    .weui-media-box__title{
      padding-top:.1rem;
    }
  }
  .weui-media-box__title,.weui-media-box__desc{
    @include multiTextOverflow(1)
  }
  .weui-media-box__desc{
    @include disFlex();
    align-items: center;
    font-size:.12rem;
    padding-top:.1rem;
    .avatar{
      $width:0.2rem;
      @include wh($width,$width);
      overflow:hidden;
      border-radius: $width/2;
      img{
        width:100%;
        height:100%;
      }
    }
    span{
      padding-left: .04rem;
    }
  }
  .flex{
    text-align: center;
    z-index: 1;
    padding:.1rem 0;
    i{font-size:.2rem;}
    i,p{
      text-align:center;
      color:#fff;
    }
  }
}
.weui-media-box{
  padding:.08rem;
  width:100%;
  align-self: center;
}
section .icon-section{
  color:#999
}
.tracks-no{
  @include wh(0.2rem,0.2rem)
  text-align:center;
  line-height:0.2rem;
  padding-right: .1rem;
}
.song-desc{
  overflow:hidden;
  margin-left: .1rem;
  h4{
    font-size:.16rem;
  }
  p{
    font-size:0.13rem;
  }
}
</style>

<template>
	<div class="parent-container"> 
    <music-header style="position:absolute;" :style="bgRed?'background-image:url('+data.coverImgUrl+');opacity:0.3;':'background:transparent'" title="歌单" :contain="{back:true,search:true,select:true}"></music-header>
    <section class="second-container has-footbar" v-if="data" @scroll="changeHeadBg">
      <header class="desc-head has-navbar">  
        <div class="blur-background " :style="'background-image:url('+ data.coverImgUrl +')'">
        </div>
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="data.coverImgUrl" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h3 class="weui-media-box__title">{{data.name}}</h3>
            <div class="weui-media-box__desc">
              <div class="avatar">
                <img :src="data.creator.avatarUrl" alt="">
              </div>
              <span>{{data.creator.nickname}}</span>
              <i class="iconfont icon-next"></i>
            </div>
          </div>
        </div>
        <div class="disFlex">
          <div class="flex">
            <i class="iconfont icon-tianjia"></i>
            <p>{{data.subscribedCount||'收藏'}}</p>
          </div>
          <div class="flex">
            <i class="iconfont icon-pinglun"></i>
            <p>{{data.commentCount||'评论'}}</p>
          </div>
          <div class="flex">
            <i class="iconfont icon-fenxiang"></i>
            <p>{{data.shareCount||'分享'}}</p>
          </div>
          <div class="flex">
            <i class="iconfont icon-xiazai"></i>
            <p>下载</p>
          </div>
        </div>
      </header>
      <section>
        <a class="disFlex" v-for="(x,index) in data.tracks" @click="selectSong(x)">
          <a class="weui-media-box weui-media-box_appmsg">
            <div class="tracks-no">
                {{index+1}}
            </div>
            <div class="weui-media-box__bd song-desc">
                <h4 class="weui-media-box__title">{{x.name}}</h4>
                <p class="weui-media-box__desc">{{x.artists | artists}}</p>
            </div>
          </a>
          <a class="weui-media-box flex">
            <i class="iconfont icon-section"></i>
          </a>
        </a>
      </section>
    </section>
    <keep-alive>
      <music-footer></music-footer>
    </keep-alive>
	</div>
</template>

<script>
import musicHeader from '../components/music-header.vue'
import musicFooter from '../components/music-footer.vue'
import {mapActions} from 'vuex'
import fetch from '../config/fetch'
export default {
  components:{
    musicHeader,musicFooter
  },
  data () {
    return {
      id: this.$route.params.id,
      data:'',
      bgRed:false
    }
  },
  created(){
    this.getData();
  },
  methods:{
    ...mapActions([
      'selectSong'
    ]),
    async getData(){
      let re = await fetch('GET','/api/playlist/detail',{id:this.id});
      this.data = re.result;
    },
    changeHeadBg(e){
      // console.log(e)
      if(e.target.scrollTop>44){
        this.bgRed = true;
      }else{
        this.bgRed = false;
      }
    },
  }
}
</script>