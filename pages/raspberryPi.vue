<template lang="html">
  <div class="blog" :class="{'overflowHidden': bOff}">
    <nav-bar :title="title" @EventMobileNavToggle="mobileNavToggle"></nav-bar>
    <div class="wrapper">
      <article class="header">
        <h1>WEN QIANG</h1>
        <p class="links">
          <a href="https://github.com/EvenQiang" target="_blank">
            <svg height="32" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
          </a>
        </p>
      </article>
      <section class="page-container">
        <div class="blog-item" v-for="item in list" :key="item.id">
          <router-link tag="div" :to="{ name: 'detail', query: { id: item.id, type: 'pi'} }">
            <div class="item">
              <h3 class="blog-title">{{item.title}}</h3>
              <time class="blog-time">{{item.timestamp | parseTime('{y}-{m}-{d}')}}</time>
              <p class="blog-content">{{item.content_short}}</p>
            </div>
            <router-link class="more" :to="{ name: 'detail', query: { id: item.id, type: 'pi'} }">更多</router-link>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { parseTime } from '@/plugins'
import { fetchList } from '@/api/pi'
export default {
  data () {
    return {
      title: 'RaspberryPi',
      list: '',
      bOff: false,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  asyncData({ query },callback){
    fetchList({
      page: query.page,
      limit: query.limit
    }).then(response => {
      const aData = response.data.data
      if(aData){
        callback(null,{
          list: aData,
          total: aData.length,
          listLoading: false
        })
      }else{
        callback({ statusCode: 404, message: '没有数据呦～' })
      }
    })
    .catch((e) => {
       callback({ statusCode: 404, message: 'Post not found' })
    })
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
  @import "../assets/themes/white.styl"
</style>
