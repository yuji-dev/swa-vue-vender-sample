<template>
  <div class="vender">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>{{ msg }}</h1>
          <div v-if="!isActive">
            <h2 class="text-danger">営業中止</h2>
          </div>
          <div v-else>
            <h2 class="text-success">営業中</h2>
          </div>
          総在庫数 {{ totalStockCount }} 本 / 総販売数 {{ totalSoldCount }} 本  /売上高 {{ amount.toLocaleString('ja-JP', {"style":"currency", "currency":"JPY"}) }}
        </div>
        <div class="col-md">
          <!-- ProductShowCase 商品棚の生成-->
          <td v-for="showcaseSetting in showcaseSettings" :key="showcaseSetting.id">
            <ProductShowCase 
              :showcaseSetting="showcaseSetting" 
              ref="refProductShowCase"
              @checkout="checkoutProduct"
              @updateStock="updateStock"/>
          </td>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-4">
          <!-- PaymentCash 現金支払機の生成-->
          <PaymentCash
            @updatechargeTotal="updatechargeTotal"
            @cashbackAll="cashbackAll"
            ref="refPaymentCash"/>
        </div>
        <div class="col-md">
          <!-- PaymentCash 取出口の生成-->
          <Outlet  ref="refOutlet"/>
        </div>
      </div>
    </div>

    <!-- PaymentCash 補充口の生成-->
    <div v-if="!isSupplied">
      <button class="btn btn-primary" v-on:click="supplyProduct()">まず補充</button>
    </div>

    <!-- 未実装：当たり！ルーレット-->
    <!-- 未実装：ICカード決裁向けの支払機-->
    <!-- 未実装：テンキーパネルによる購入-->
    <!-- 未実装：災害時の無償提供-->

    <!-- デバッグメッセージ -->
    <p class="text-primary">{{ message }}</p>

  </div>
</template>

<script>
import ProductShowCase from './ProductShowCase.vue'
import PaymentCash from './PaymentCash.vue'
import Outlet from './Outlet.vue'

export default {
  name: 'Vender',
  props: {
    msg: String,
  },    
  components: {
    ProductShowCase,
    PaymentCash,
    Outlet
  },
  created: function() {
    this.message = null;
    this.totalStockCount = 0;
    this.totalSoldCount  = 0;
    this.amount = 0;
    this.isSupplied = false;
    this.isActive = false;
  },
  data: () => {
    return {
      //自動販売機の初期設定
      showcaseSettings: [
          {id: 1, view_name: "-", size: 350, maximumStock: 10, hot_or_cool: "hot"},
          {id: 2, view_name: "-", size: 350, maximumStock: 10, hot_or_cool: "hot"},
          {id: 3, view_name: "-", size: 500, maximumStock: 10, hot_or_cool: "hot"},
          {id: 4, view_name: "-", size: 500, maximumStock: 10, hot_or_cool: "hot"},
          {id: 5, view_name: "-", size: 350, maximumStock: 10, hot_or_cool: "cool"},
          {id: 6, view_name: "-", size: 350, maximumStock: 10, hot_or_cool: "cool"},
          {id: 7, view_name: "-", size: 500, maximumStock: 10, hot_or_cool: "cool"},
          {id: 8, view_name: "-", size: 500, maximumStock: 10, hot_or_cool: "cool"},

      ],
      //補充する商品情報
      products: [
          {id: 1, name: "ボスブラック", size: 350, price: 130, currentStock: 12, hot_or_cool: "hot", image: require("../assets/boss_black.png")},
          {id: 5, name: "綾鷹", size: 350, price: 150, currentStock: 10, hot_or_cool: "cool", image: require("../assets/ayataka.png")},
          {id: 6, name: "綾鷹濃い味", size: 350, price: 150, currentStock: 10, hot_or_cool: "cool", image: require("../assets/ayataka_koi.png")},
          {id: 7, name: "三ツ矢サイダー", size: 500, price: 150, currentStock: 10, hot_or_cool: "cool", image: require("../assets/mitsuya_cider.jpg")},
          {id: 8, name: "クリアアサヒ", size: 500, price: 200, currentStock: 10, hot_or_cool: "cool", image: require("../assets/clearasahi.png")},
      ],
      //子コンポーネントからのメッセージを表示
      message: {
        type: String,
        default: ""
      },
      //総在庫数(0になったら稼働中止)
      totalStockCount: {
        type: Number,
        default: 0
      },
      //総販売数
      totalSoldCount: {
        type: Number,
        default: 0
      },
      //売上高
      amount: {
        type: Number,
        default: 0
      },
      //稼働状態
      isActive: {
        type: Boolean,
        default: false
      },
      //初回補充済か
      isSupplied: {
        type: Boolean,
        default: false
      }

    };
  },
  methods: {
    //商品補充
    supplyProduct: function() {

       //最初に適当に補充（参照解決にもう一工夫必要）
       this.$refs.refProductShowCase[0].supplyProduct(this.products[0]);
       this.$refs.refProductShowCase[4].supplyProduct(this.products[1]);
       this.$refs.refProductShowCase[5].supplyProduct(this.products[2]);
       this.$refs.refProductShowCase[6].supplyProduct(this.products[3]);
       this.$refs.refProductShowCase[7].supplyProduct(this.products[4]);

       //補充済みにする
       this.isSupplied = true;

       //現金支払機のスイッチを入れる
       this.$refs.refPaymentCash.switchOn();

       //自動販売機のスイッチを入れる
       this.isActive = true;

       this.message = "Venderより：商品が補充されました"
    },

    //イベント：ProductShowCase 在庫数量更新
    updateStock: function(currentStock) {
      this.message = "ProductShowCaseより：在庫が補充されました =>" + currentStock
      //総在庫数を更新
      this.totalStockCount += currentStock;
    },

    //イベント：ProductShowCase 購入ボタン押下
    checkoutProduct: function(product) {
      this.message = "ProductShowCaseより：購入されました =>" + product.name
      //現金支払機に請求
      this.$refs.refPaymentCash.spendMoney(product.price);
      //売上計上
      this.amount += product.price;
      //取出口に商品を出す
      this.$refs.refOutlet.addOutlet(product);
      //総在庫数を更新
      this.totalStockCount -= 1;
      //総販売数を更新
      this.totalSoldCount += 1;
      //総在庫数が0の場合は営業終了
      if(this.totalStockCount==0) {
          this.$refs.refPaymentCash.switchOff();
          this.isActive = false;
      }
    },
    //イベント：PaymentCash 現金投入
    updatechargeTotal: function(total) {
      this.message = "PaymentCashより：入金されました =>" + total
      this.$refs.refProductShowCase.forEach(
        function(obj){
          obj.buyLampControl(total);
        }
      );
    },
    //イベント：PaymentCash おつり・返金
    cashbackAll: function(total) {
      this.message = "PaymentCashより：返金されました =>" + total
      this.$refs.refProductShowCase.forEach(
        function(obj){
          obj.buyLampControl(total);
        }
      );
    }
  }    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
