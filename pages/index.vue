<template lang="html">
  <div class="home">
    <!-- <nav-bar :title="title"></nav-bar> -->
    <div ref="container" id="container"></div>
    <section class="wrapper">
      <h1>wang wen qiang</h1>
      <p>
        <router-link :to="{ name: 'blog', query: { page: 1, limit: 5 } }">Blog</router-link>
      </p>
      <p>
        <router-link :to="{ name: 'raspberryPi', query: { page: 1, limit: 5 } }">RaspberryPi</router-link>
      </p>
      <p>
        <a href="https://github.com/EvenQiang" target="_blank">Github</a>
      </p>
    </section>
  </div>
</template>


<script>
import NavBar from '@/components/NavBar'
import { parseTime } from '@/plugins'
import * as THREE from 'three';
export default {
  data () {
    return {
      title: 'Home',
      list: '',
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  asyncData(context){
    // fetchList(params.listQuery).then(response => {
    //
    //   const aData = response.data.data
    //   if(aData){
    //     callback(null,{
    //       list: aData,
    //       total: aData.length,
    //       listLoading: false
    //     })
    //   }else{
    //     callback({
    //       message: '数据为空'
    //     })
    //   }
    // }).catch((e) => {
    //   callback({ statusCode: 404, message: 'Post not found' })
    // })
  },
  mounted(){
    this.createAnimation()
  },
  methods: {
    createAnimation(){
      var container = this.$refs.container;
      var width = container.clientWidth;
      var height = container.clientHeight;
      var aspect = width / height;
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
      camera.position.z = 500

      var system = new THREE.Group();

      scene.add(
        new THREE.AmbientLight(0xFFFFFF, 0.2)
      );

      var light = new THREE.DirectionalLight(0xFFFFFF, 2.5);
      light.position.set(1500, 2500, 0);
      scene.add(light);

      var material = new THREE.MeshLambertMaterial({
        color: 0x0C2D4D
      });

      var planet = new THREE.Mesh(
        new THREE.IcosahedronGeometry(100, 3),
        material
      );

      for (var i = 0; i < planet.geometry.vertices.length; i++)
        planet.geometry.vertices[i].multiplyScalar(
          Math.random() * 0.05 + 0.95
        );

      planet.geometry.computeFlatVertexNormals();
      system.add(planet);

      var asteroids = new THREE.Group();

      for (var p = 0; p < Math.PI * 2; p = p + Math.random() * 0.15) {
        var asteroid = new THREE.Mesh(
          new THREE.IcosahedronGeometry(8, 0),
          material
        );

        var size = Math.random() * 0.5;
        for (var i = 0; i < asteroid.geometry.vertices.length; i++)
          asteroid.geometry.vertices[i].multiplyScalar(
            Math.random() * 0.5 + size
          );

        var rand = Math.random() * 60 - 30;
        asteroid.position.set(200 * Math.sin(p) + rand, rand, 200 * Math.cos(p) + rand);

        asteroid.geometry.computeFlatVertexNormals();
        asteroids.add(asteroid);
      }

      system.add(asteroids);

      system.rotation.x = 0.1;
      system.rotation.y = -.3;
      system.rotation.z = -0.4;

      scene.add(system);

      for (var i = 0; i < 10; i++) {
        var particles = new THREE.Points(
          new THREE.Geometry(),
          new THREE.PointsMaterial({
            size: Math.random() * 5
          })
        );
        for (var j = 0; j < 20; j++) {
          var vertex = new THREE.Vector3();
          vertex.x = Math.random() * width * 1.1 - width * 1.1 / 2;
          vertex.y = Math.random() * height * 1.1 - height * 1.1 / 2;
          vertex.z = -500;
          particles.geometry.vertices.push(vertex);
          particles.material.color.setScalar(Math.random() * 0.4 + 0.2);
        }
        scene.add(particles);
      }

      function render() {
        requestAnimationFrame(render);

        planet.rotation.y += 0.001;
        planet.rotation.z -= 0.0005;

        asteroids.rotation.y += 0.003;

        renderer.render(scene, camera);
      }

      render();
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
