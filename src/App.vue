<template>
  <div id="app">

    <!-- Vender 自動販売機の生成：コカ・コーラ -->
    <Vender msg="コカコーラ - いらっしゃいませ" ref="refVender_cocacola"/>
    <!-- Vender 自動販売機の生成：アサヒ飲料 -->
    <Vender msg="アサヒ飲料 - いらっしゃいませ" ref="refVender_asahi"/>


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
      products: {
         s1: {id: 100, name: "ボスブラック", size: 350, price: 130, currentStock: 12, hot_or_cool: "hot", image: require("./assets/boss_black.png")},
         c1: {id: 201, name: "綾鷹", size: 350, price: 150, currentStock: 10, hot_or_cool: "cool", image: require("./assets/ayataka.png")},
         c2: {id: 202, name: "綾鷹濃い味", size: 350, price: 150, currentStock: 10, hot_or_cool: "cool", image: require("./assets/ayataka_koi.png")},
         a1: {id: 301, name: "三ツ矢サイダー", size: 500, price: 150, currentStock: 10, hot_or_cool: "cool", image: require("./assets/a_mitsuya_cider.png")},
         a2: {id: 302, name: "クリアアサヒ", size: 500, price: 200, currentStock: 10, hot_or_cool: "cool", image: require("./assets/clearasahi.png")},
         a3: {id: 303, name: "ドトールカフェオレ", size: 350, price: 150, currentStock: 10, hot_or_cool: "cool", image: require("./assets/a_doutor_coffee_ore.png")},
         a4: {id: 304, name: "十六茶", size: 500, price: 150, currentStock: 10, hot_or_cool: "cool", image: require("./assets/a_jyuroku_cha.png")},
         a5: {id: 305, name: "ロイヤルミルクティ", size: 500, price: 200, currentStock: 10, hot_or_cool: "cool", image: require("./assets/a_royal_milktea.png")},
         a6: {id: 306, name: "ワンダ極ブラック", size: 500, price: 200, currentStock: 10, hot_or_cool: "cool", image: require("./assets/a_wander_kiwami_black.png")},
      },
    };
  },
  methods: {
    //初期化（Today's TODO）
    init: function() {

      //商品を補充する（商品棚ごとに補充）
      this.$refs.refVender_cocacola.supplyProduct(5, this.products.c1);
      this.$refs.refVender_cocacola.supplyProduct(8, this.products.c2);

      //自動販売機のスイッチをオンにする
      this.$refs.refVender_cocacola.switchOn();

      //商品を補充する（商品棚ごとに補充）
      this.$refs.refVender_asahi.supplyProduct(1, this.products.a6);
      this.$refs.refVender_asahi.supplyProduct(5, this.products.a1);
      this.$refs.refVender_asahi.supplyProduct(6, this.products.a3);
      this.$refs.refVender_asahi.supplyProduct(7, this.products.a4);
      this.$refs.refVender_asahi.supplyProduct(8, this.products.a5);

      //自動販売機のスイッチをオンにする
      this.$refs.refVender_asahi.switchOn();

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
