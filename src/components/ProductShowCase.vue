<template>
  <div class="card mt-1 mb-1 ml-1" style="width: 9rem;">
    <!-- ProductShowCase 商品画像の生成-->
    <img class="mx-auto d-block" :src="product.image" width="45" height="110" />
    <p class="small mt-0 mb-0">{{ showcaseSetting.view_name }}</p>

    <!-- ProductShowCase 価格表示の生成-->
    <p class="mt-0 mb-0">{{ product.price }}円</p>

    <!-- ProductShowCase 在庫数表示の生成-->
    <p class="mt-0 mb-0">{{ product.currentStock }}本</p>

    <!-- ProductShowCase 温度表示の生成-->
    <p class="small text-danger mt-0 mb-0" v-if="showcaseSetting.hot_or_cool === 'hot'">あったか～い</p>
    <p class="small text-primary mt-0 mb-0" v-else>つめた～い</p>

    <!-- ProductShowCase 購入ボタンの生成-->
    <div v-if="product.currentStock == 0">
      <!-- ProductShowCase 在庫がない場合は売り切れ-->
      <button class="btn btn-outline-danger btn-block rounded-pill btn-sm" disabled>
        <span class="badge badge-dark">{{ showcaseSetting.id }}</span>
        売切れ
      </button>
    </div>
    <div v-else-if="product.price > chargeTotal">
      <!-- ProductShowCase 投入金額が不足している場合は非活性-->
      <button class="btn btn-outline-secondary btn-block rounded-pill btn-sm" disabled>
        <span class="badge badge-dark">{{ showcaseSetting.id }}</span>
        販売中
      </button>
    </div>
    <div v-else>
      <!-- ProductShowCase 上記以外は活性-->
      <button
        class="btn btn-outline-success btn-block rounded-pill btn-sm"
        v-on:click="buyProduct()"
      >
        <span class="badge badge-dark">{{ showcaseSetting.id }}</span>
        購入
      </button>
    </div>

    <!-- ProductShowCase （将来実装）ナンバー購入向け-->
    <!-- <button class="btn btn-dark btn-block" disabled>{{ showcaseSetting.id }}</button> -->
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
    //内部：購入処理
    buyProduct: function() {
      //在庫を減算
      this.removeStock(1);
      //購入イベントを上位コンポーネントに通知
      this.$emit("checkout", this.product);
    },
    //内部：在庫を減算
    removeStock: function(stock) {
      if (this.product.currentStock != 0) this.product.currentStock -= stock;
    },
    //上位コンポーネントより：商品の補充
    supplyProduct: function(product) {
      if (product != null) {
        //各種チェックは省略
        this.product = product;
        //表示商品名に商品名をセット
        this.showcaseSetting.view_name = this.product.name;
        //在庫数更新を上位コンポーネントに通知
        this.$emit("updateStock", this.product.currentStock);
      }
    },
    //上位コンポーネントより：現在の投入金額合計を受け取る
    updateTotal: function(total) {
      this.chargeTotal = total;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
