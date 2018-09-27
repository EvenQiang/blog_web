<template>
<div class="nav" ref="nav" :class="{'mobile-nav-on': isMobileOn}">
  <div class="nav-bar">
    <div class="pc-nav-bar">
      <div class="fl">
        <h1 class="pc-logo">
          <router-link to="/">
            <img src="~/assets/images/logo.png" alt="">
          </router-link>
        </h1>
      </div>
      <div class="fr">
        <router-link :class="title == item.name ? 'active' : title" v-for="item in routerConfig" :key="item.name" :to="item.url">{{item.name}}</router-link>
      </div>
    </div>
    <div class="mobile-nav-bar">
      <div class="">
        <div>
          <h1 class="mobile-logo">
            <router-link to="/">
              <img src="~/assets/images/logo.png" alt="">
            </router-link>
          </h1>
        </div>
        <div class="mobile-nav-toggle" @click="toggleNav">
          <span class="mobile-nav-toggle-bar"></span>
          <span class="mobile-nav-toggle-bar"></span>
          <span class="mobile-nav-toggle-bar"></span>
        </div>
      </div>

    </div>
  </div>
  <transition name="fade">
    <nav class="mobile-nav" v-show="isMobileOn">
      <div class="mobile-nav-inner">
        <ul>
          <li v-for="item in routerConfig"  :key="item.name">
            <router-link :class="title == item.name ? 'active' : title" :to="item.url">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </transition>
</div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      routerConfig: [{
          url: '/',
          name: 'Home'
        },
        {
          url: '/blog',
          name: 'Blog'
        },
        {
          url: '/raspberryPi',
          name: 'RaspberryPi'
        },
      ],
      isMobileOn: false
    }
  },
  methods: {
    toggleNav(){
      this.isMobileOn = !this.isMobileOn;
      this.$emit('EventMobileNavToggle', this.isMobileOn)
    },

  },
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.nav{
  box-shadow: 0 0 10px #000;
  position: relative;
  z-index: 2;
}
.nav-bar{
  z-index: 1;
  background-color: #333;
  position: relative;
  padding: 10px 15px;
  .logo{
    height: 34px;
    line-height: 34px;
    text-align: center;
  }
}
.pc-nav-bar{
  max-width: 700px;
  height: 42px;
  margin: 0 auto;
  display: block;
  .fl{
    float: left;
  }
  .fr{
    float: right;
    a{
      display: inline-block;
      padding: 0 15px;
      line-height: 42px;
      color: rgba(255,255,255,0.5);
      transition: 0.3s ease;
    }
    a:hover{
      color: #fff;
      text-shadow: 0 0 3px #fff
    }
    .active{
      color: #fff;
      text-shadow: 0 0 3px #fff
    }
  }
}
.mobile-nav-bar{
  display: none;
}
.mobile-nav{
  display: none;
  overflow: hidden;
  background: #fff;
  .mobile-nav-inner{
    padding: 10px 0;
  }
  a{
    color: #222;
    text-decoration: none;
    display: block;
    padding: 10px 15px;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
}
@media screen and (max-width: 479px){
  .mobile-nav, .mobile-nav-bar{
    display: block;
    .active{
      color: #3eaf7c;
      text-shadow: 0 0 5px #fff;
    }
  }
  .pc-nav-bar{
    display: none;
  }

}
.mobile-nav-toggle{
  position: absolute;
  top: 17px;
  bottom: 0;
  right: 20px;
  width: 25px;
  height: 20px;
  cursor: pointer;
  -webkit-transition: .2s;
  -moz-transition: .2s;
  -ms-transition: .2s;
  transition: .2s
}
.mobile-nav-toggle-bar{
  background: rgba(255,255,255,0.8);
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  -webkit-transition: .4s;
  -moz-transition: .4s;
  -ms-transition: .4s;
  transition: .4s;
  -webkit-transform-origin: 0;
  -moz-transform-origin: 0;
  -ms-transform-origin: 0;
  transform-origin: 0;
  border-radius: 2px;
}
.mobile-nav-toggle-bar:first-child{
  top: 0;
}
.mobile-nav-on .mobile-nav-toggle-bar:first-child{
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.mobile-nav-toggle-bar:nth-child(2){
  top: 9px;
}
.mobile-nav-on .mobile-nav-toggle-bar:nth-child(2){
  opacity: 0;
}
.mobile-nav-toggle-bar:last-child{
  top: 18px;
}
.mobile-nav-on .mobile-nav-toggle-bar:last-child{
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.pc-logo{
  width: 42px;
  height: 42px;
  border-radius: 5px;
  overflow: hidden;
  img{
    max-width: 100%;
  }
}
.mobile-logo{
  width: 34px;
  height: 34px;
  border-radius: 3px;
  overflow: hidden;
  img{
    max-width: 100%;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
