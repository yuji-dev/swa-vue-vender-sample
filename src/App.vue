<template>
  <div id="app">

    <!-- Vender 自動販売機の生成-->
    <Vender msg="いらっしゃいませ" ref="refVender"/>

    <!-- *** 補充員作業：今日の作業-->
    <div v-if="!isSupplied">
      <button class="btn btn-primary" v-on:click="init()">今日の補充作業</button>
    </div>

  </div>
</template>

<script>
import Vender from './components/Vender.vue'

export default {
  name: 'App',
  components: {
    Vender  
  },
  props: {
      //初回補充済か
      isSupplied: {
        type: Boolean,
        default: false
      }
  },
  created: function() {
    this.isSupplied = false;
  },
  data: () => {
    return {
      //補充可能な商品情報（補充トラック積載）
      products: [
          {id: 100, name: "ボスブラック", size: 350, price: 130, currentStock: 12, hot_or_cool: "hot", image: require("./assets/boss_black.png")},
          {id: 200, name: "綾鷹", size: 350, price: 150, currentStock: 10, hot_or_cool: "cool", image: require("./assets/ayataka.png")},
          {id: 300, name: "綾鷹濃い味", size: 350, price: 150, currentStock: 10, hot_or_cool: "cool", image: require("./assets/ayataka_koi.png")},
          {id: 400, name: "三ツ矢サイダー", size: 500, price: 150, currentStock: 10, hot_or_cool: "cool", image: require("./assets/mitsuya_cider.jpg")},
          {id: 500, name: "クリアアサヒ", size: 500, price: 200, currentStock: 10, hot_or_cool: "cool", image: require("./assets/clearasahi.png")},
      ],
    };
  },
  methods: {
    //初期化（Today's TODO）
    init: function() {

      //商品を補充する（商品棚ごとに補充）
      this.$refs.refVender.supplyProduct(1, this.products[0]);
      this.$refs.refVender.supplyProduct(5, this.products[1]);
      this.$refs.refVender.supplyProduct(6, this.products[2]);
      this.$refs.refVender.supplyProduct(7, this.products[3]);
      this.$refs.refVender.supplyProduct(8, this.products[4]);

      //自動販売機のスイッチをオンにする
      this.$refs.refVender.switchOn();

      //補充済みにする（今日の仕事終わり）
      this.isSupplied = true;

    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
