<template>
  <div class="card" style="width: 16rem;">

    <h2 class="text-danger">{{ chargeTotal.toLocaleString('ja-JP', {"style":"currency", "currency":"JPY"}) }}</h2>

    <div v-if="isActive">
      <div class="btn-group" role="group" aria-label="coin">
        <button class="btn btn-primary" v-on:click="chargeMoney(10)">10円</button>
        <button class="btn btn-primary" v-on:click="chargeMoney(50)">50円</button>
        <button class="btn btn-primary" v-on:click="chargeMoney(100)">100円</button>
        <button class="btn btn-primary" v-on:click="chargeMoney(500)">500円</button>
        <button class="btn btn-primary" v-on:click="chargeMoney(1000)">1,000円</button>
      </div>
    </div>
    <div v-else>
      <div class="btn-group" role="group" aria-label="coin">
        <button class="btn btn-secondary" disabled>10円</button>
        <button class="btn btn-secondary" disabled>50円</button>
        <button class="btn btn-secondary" disabled>100円</button>
        <button class="btn btn-secondary" disabled>500円</button>
        <button class="btn btn-secondary" disabled>1,000円</button>
      </div>
    </div>

    <div v-if="chargeTotal == 0">
      <button  class="btn btn-outline-secondary  btn-block  rounded-pill" disabled>おつり・返却</button>
    </div>
    <div v-else>
      <button  class="btn btn-outline-success  btn-block  rounded-pill" v-on:click="cashbackAll()">おつり・返却</button>
    </div>

    <p>返却口 {{ returnTotal.toLocaleString('ja-JP', {"style":"currency", "currency":"JPY"}) }}</p>

    <!-- ICカード決済向けのコンポーネントは別途考える-->
  </div>
</template>

<script>
export default {
  name: "PaymentCash",
  props: {
  },
  created: function() {
    this.chargeTotal = 0;
    this.returnTotal = 0;
    this.isActive = false;
  },
  //コンポーネントの data オプションは関数でなければなりません。
  //各インスタンスが返されるデータオブジェクトの独立したコピーを保持できるためです:
  data: () => {
    return {
      // 投入金額合計
      chargeTotal: {
        type: Number,
        default: 0
      },
      returnTotal: {
        type: Number,
        default: 0
      },
      // 投入硬貨枚数(10円)
      chargeCount_10yen: {
        type: Number,
        default: 0
      },
      // 投入硬貨枚数(50円)
      chargeCount_50yen: {
        type: Number,
        default: 0
      },
      // 投入硬貨枚数(100円)
      chargeCount_100yen: {
        type: Number,
        default: 0
      },
      // 投入硬貨枚数(500円)
      chargeCount_500yen: {
        type: Number,
        default: 0
      },
      // 紙幣硬貨枚数(1000円)
      chargeCount_1000yen: {
        type: Number,
        default: 0
      },
      isActive: {
        type: Boolean,
        default: false
      },
       //おつり管理は未実装
    };
  },
  methods: {
    //現金支払機の電源ON
    switchOn: function() {
      //現金支払機の電源ON
      this.isActive = true;
    },
    //現金支払機の電源OFF
    switchOff: function() {
      //現金支払機の電源OFF
      this.isActive = false;
    },

    // 現金投入
    chargeMoney: function(charge) {
      //投入金額合計を更新
      this.chargeTotal += charge;
      //投入金額を上位コンポーネントに通知
      this.$emit('updatechargeTotal', this.chargeTotal)
      //通貨別の管理は未実装
    },

    // おつり・返金
    cashbackAll: function() {
      //返却口に返金
      this.returnTotal = this.chargeTotal;
      //投入金額合計をリセット
      this.chargeTotal = 0;
      //おつり・返金イベントを上位コンポーネントに通知
      this.$emit('cashbackAll', this.chargeTotal)
    },

    // 請求
    spendMoney: function(price) {
      //投入金額合計を更新
      this.chargeTotal -= price;
      //投入金額合計を上位コンポーネントに通知
      this.$emit('updatechargeTotal', this.chargeTotal)
      //通貨別の管理は未実装
    },

    
  }
};
//イベント名はケバブケース(kebab-case)を使うことを推奨
//https://jp.vuejs.org/v2/guide/components-custom-events.html
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
