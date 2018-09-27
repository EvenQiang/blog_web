<template lang="html">
  <div class="detail">
    <nav-bar :title="title" @EventMobileNavToggle="mobileNavToggle"></nav-bar>
    <div class="wrapper">
      <section class="page-container">
        <div class="blog-item">
          <h1 class="blog-title">{{oData.title}}</h1>
          <time class="blog-time">{{oData.timestamp | parseTime('{y}-{m}-{d}') || ''}}</time>
          <div class="blog-content" v-html="oData.content"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { parseTime } from '@/plugins'
import request from '@/plugins/request'
import { fetchBlogDetail } from '@/api/blog'
import { fetchPiDetail } from '@/api/pi'
import axios from 'axios'
export default {
  data () {
    return {
      oData: {
        title: '',
        timestamp: undefined,
        content: ''
      },
    }
  },
  asyncData({ query },callback){
    //raspberryPi
    if(query.type && query.type == 'pi'){
      fetchPiDetail(query.id).then( function(response){
        const aData = response.data.data
        if(aData){
          callback(null,{
            oData: aData
          })
        }else{
          callback({ statusCode: 404, message: '没有数据呦～' })
        }
      })
      .catch((e) => {
         callback({ statusCode: 404, message: '没有数据呦～' })
      })
    }else{
      //blog
      fetchBlogDetail(query.id).then( function(response){
        const aData = response.data.data
        if(aData){
          callback(null,{
            oData: aData
          })
        }else{
          callback({ statusCode: 404, message: '没有数据呦～' })
        }
      })
      .catch((e) => {
         callback({ statusCode: 404, message: 'Post not found' })
      })
    }
  },
  computed: {
    title: function(){
      return this.$route.query.type ? 'RaspberryPi' : 'Blog'
    }
  },
  methods: {
    mobileNavToggle(status){
      this.bOff = status ? true : false
    }
  },
  filters: {
    parseTime: parseTime
  },
  components: {
    NavBar
  }
}
</script>

<style lang="stylus">
.detail{
  .page-container{
    max-width: 700px;
    margin: 10px auto 20px;
    .blog-title{
      font-size: 1.4rem;
    }
    .blog-time{
      font-size: 0.875rem;
    }
    .blog-content{
      margin-top: 10px;
      ul{
        list-style: initial;
        padding-left: 25px;
      }
    }
    h2{
      margin: 15px 0 10px;
      font-size: 20px;
    }
    h3,h4{
      margin: 15px 0 5px;
    }
    a{
      color: #41b883;
    }
    p{
      line-height: 26px;
      color: #4a4a4a;
      font-family: -apple-system, BlinkMacSystemFont, PingFang-SC-Regular, 'Hiragino Sans GB', 'Microsoft Yahei', Arial, sans-serif;
    }
  }
  @media screen and (max-width: 479px){
    .page-container{
      margin: 0 auto;
      padding: 0;
      .blog-item{
        border-radius: 0;
      }
    }
  }
}
</style>
