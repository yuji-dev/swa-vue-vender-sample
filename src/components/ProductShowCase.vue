<template>
  <div class="card" style="width: 8rem;">
    <!-- ProductShowCase 商品画像の生成-->
    <img class="card-img-top rounded-sm" :src="product.image" width="80" height="120" />
    <p>{{ showcaseSetting.view_name }}</p>

    <!-- ProductShowCase 温度表示の生成-->
    <p class="text-danger" v-if="showcaseSetting.hot_or_cool === 'hot'">あったか～い</p>
    <p class="text-primary" v-else>つめた～い</p>

    <!-- ProductShowCase 価格表示の生成-->
    <p>{{ product.price }}円</p>

    <!-- ProductShowCase 在庫数表示の生成-->
    <p>{{ product.currentStock }}本</p>

    <!-- ProductShowCase 購入ボタンの生成-->
    <div v-if="product.currentStock == 0">
      <!-- ProductShowCase 在庫がない場合は売り切れ-->
      <button class="btn btn-outline-danger btn-block rounded-pill" disabled>売切れ</button>
    </div>
    <div v-else-if="product.price > chargeTotal">
      <!-- ProductShowCase 投入金額が不足している場合は非活性-->
      <button class="btn btn-outline-secondary btn-block rounded-pill" disabled>販売中</button>
    </div>
    <div v-else>
      <!-- ProductShowCase 上記以外は活性-->
      <button class="btn btn-outline-success btn-block rounded-pill" v-on:click="buyProduct()">購入</button>
    </div>

    <!-- ProductShowCase （将来実装）ナンバー購入向け-->
    <button class="btn btn-dark btn-block" disabled>{{ showcaseSetting.id }}</button>
  </div>
</template>

<script>
export default {
  name: "ProductShowCase",
  props: {
    //自動販売機の設定情報
    showcaseSetting: {
      type: Object,
      default: function() {
        return {
          id: {
            Type: Number,
            Default: 0
          },
          view_name: {
            Type: String,
            Default: "なし"
          },
          size: {
            Type: Number,
            Default: 350
          },
          maximumStock: {
            Type: Number,
            Default: 10
          },
          hot_or_cool: {
            Type: String,
            Default: "cool"
          }
        };
      }
    }
  },
  created: function() {
    this.product.price = 0;
    this.product.currentStock = 0;
    this.product.image = require("../assets/logo.png");
    this.chargeTotal = 0;
  },
  data: () => {
    return {
      //商品情報
      product: {
        type: Object,
        default: function() {
          return {
            id: {
              Type: Number,
              Default: 0
            },
            name: {
              Type: String,
              Default: "なし"
            },
            size: {
              Type: Number,
              Default: 350
            },
            price: {
              Type: Number,
              Default: 0
            },
            image: function() {
              return require("../assets/logo.png");
            },
            currentStock: {
              Type: Number,
              Default: 0
            },
            hot_or_cool: {
              Type: String,
              Default: "cool"
            }
          };
        }
      },
      chargeTotal: {
        Type: Number,
        Default: 0
      }
    };
  },
  methods: {
    //商品の補充
    supplyProduct: function(product) {
      if (product != null) {
        //各種チェックは省略
        this.product = product;
        this.showcaseSetting.view_name = this.product.name;
        //在庫数更新を上位コンポーネントに通知
        this.$emit("updateStock", this.product.currentStock);
      }
    },
    //購入処理
    buyProduct: function() {
      //在庫を減算
      this.removeInventory(1);
      //購入イベントを上位コンポーネントに通知
      this.$emit("checkout", this.product);
    },
    //在庫を減算
    removeInventory: function(stock) {
      if (this.product.currentStock != 0) this.product.currentStock -= stock;
    },
    //購入ランプ点灯依頼
    buyLampControl: function(total) {
      this.chargeTotal = total;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
