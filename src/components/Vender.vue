<template>
  <div class="vender">
    <div class="container">
      <div class="row">
        <div class="col-md-12 bg-light">
          <!-- PaymentCash 看板パネルの生成（コンポーネント化未）-->
          <h3 class="text-info">{{ msg }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 bg-light">
          <div class="card-group">
            <!-- ProductShowCase 商品棚の生成-->
            <div v-for="showcaseSetting in showcaseSettings" :key="showcaseSetting.id">
              <ProductShowCase
                :showcaseSetting="showcaseSetting"
                ref="refProductShowCase"
                @checkout="onCheckoutProduct"
                @updateStock="onUpdateStock"
              />
            </div>
          </div>
        </div>
        <div class="col-md bg-light clearfix">
          <!-- PaymentCash 情報パネルの生成（コンポーネント化未）-->
          <div class="card mt-1 mb-1 ml-1 float-right" style="width: 18rem;">
            <div v-if="!isActive">
              <h2 class="text-danger">営業中止</h2>
            </div>
            <div v-else>
              <h2 class="text-success">営業中</h2>
            </div>
            <p class="text-left mt-0 mb-0 ml-2">総在庫数 {{ totalStockCount }} 本</p>
            <p class="text-left mt-0 mb-0 ml-2">総販売数 {{ totalSoldCount }} 本</p>
            <p
              class="text-left mt-0 mb-0 ml-2"
            >売上高 {{ amount.toLocaleString('ja-JP', {"style":"currency", "currency":"JPY"}) }}</p>
          </div>
          <div class="card mt-1 mb-1 ml-1 float-right" style="width: 18rem;">
            <!-- PaymentCash 現金支払機の生成-->
            <PaymentCash
              @updatechargeTotal="onUpdatechargeTotal"
              @cashbackAll="onUashbackAll"
              ref="refPaymentCash"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md bg-light">
          <!-- PaymentCash 取出口の生成-->
          <Outlet ref="refOutlet" />
        </div>
      </div>
    </div>

    <!-- 未実装：メンテナンスパネル-->
    <!-- 未実装：当たり！ルーレット-->
    <!-- 未実装：ICカード決裁向けの支払機-->
    <!-- 未実装：テンキーパネルによる購入-->
    <!-- 未実装：災害時の無償提供-->

    <!-- デバッグメッセージ -->
    <p class="alert alert-success" role="alert">{{ message }}</p>
  </div>
</template>

<script>
import ProductShowCase from "./ProductShowCase.vue";
import PaymentCash from "./PaymentCash.vue";
import Outlet from "./Outlet.vue";

export default {
  name: "Vender",
  props: {
    msg: String
  },
  components: {
    ProductShowCase,
    PaymentCash,
    Outlet
  },
  created: function() {
    this.message = null;
    this.totalStockCount = 0;
    this.totalSoldCount = 0;
    this.amount = 0;
    this.isActive = false;
  },
  data: () => {
    return {
      //自動販売機の初期設定
      //Todo:サイズ、在庫上限、温度表示設定はあとでチェック処理を実装
      showcaseSettings: [
        {
          id: 1,
          view_name: "-",
          size: 350,
          maximumStock: 10,
          hot_or_cool: "hot"
        },
        {
          id: 2,
          view_name: "-",
          size: 350,
          maximumStock: 10,
          hot_or_cool: "hot"
        },
        {
          id: 3,
          view_name: "-",
          size: 500,
          maximumStock: 10,
          hot_or_cool: "hot"
        },
        {
          id: 4,
          view_name: "-",
          size: 500,
          maximumStock: 10,
          hot_or_cool: "hot"
        },
        {
          id: 5,
          view_name: "-",
          size: 350,
          maximumStock: 10,
          hot_or_cool: "cool"
        },
        {
          id: 6,
          view_name: "-",
          size: 350,
          maximumStock: 10,
          hot_or_cool: "cool"
        },
        {
          id: 7,
          view_name: "-",
          size: 500,
          maximumStock: 10,
          hot_or_cool: "cool"
        },
        {
          id: 8,
          view_name: "-",
          size: 500,
          maximumStock: 10,
          hot_or_cool: "cool"
        }
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
      }
    };
  },
  methods: {
    //商品補充
    supplyProduct: function(product_showcase_id, product) {
      this.message = "Venderより：supplyProduct called 1" + product.name;

      //指定された商品棚に補充（商品棚制約はNoCheck）
      this.$refs.refProductShowCase.forEach(function(obj) {
        if (obj.showcaseSetting.id == product_showcase_id) {
          obj.supplyProduct(product);
        }
      });

      this.message = "Venderより：商品が補充されました";
    },

    //電源ON
    switchOn: function() {
      //現金支払機のスイッチをオンにする
      this.$refs.refPaymentCash.switchOn();

      //自動販売機のスイッチをオンにする
      this.isActive = true;

      this.message = "Venderより：電源ONされました";
    },

    //電源OFF
    switchOff: function() {
      //現金支払機のスイッチをオフにする
      this.$refs.refPaymentCash.switchOff();

      //自動販売機のスイッチをオフにする
      this.isActive = false;

      this.message = "Venderより：電源OFFされました";
    },

    //イベント：ProductShowCase 在庫数量更新
    onUpdateStock: function(currentStock) {
      this.message =
        "ProductShowCaseより：在庫が補充されました =>" + currentStock;
      //総在庫数を更新
      this.totalStockCount += currentStock;
    },

    //イベント：ProductShowCase 購入ボタン押下
    onCheckoutProduct: function(product) {
      this.message = "ProductShowCaseより：購入されました =>" + product.name;
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
      if (this.totalStockCount == 0) {
        this.$refs.refPaymentCash.switchOff();
        this.isActive = false;
      }
    },

    //イベント：PaymentCash 現金投入
    onUpdatechargeTotal: function(total) {
      this.message = "PaymentCashより：投入金額が更新されました =>" + total;
      //すべての商品棚に投入金額合計を通知
      this.$refs.refProductShowCase.forEach(function(obj) {
        obj.updateTotal(total);
      });
    },

    //イベント：PaymentCash おつり・返金
    onCashbackAll: function(total) {
      this.message = "PaymentCashより：返金されました =>" + total;
      //すべての商品棚に投入金額合計を通知
      this.$refs.refProductShowCase.forEach(function(obj) {
        obj.updateTotal(total);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
