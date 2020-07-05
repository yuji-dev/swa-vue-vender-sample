<template>
  <div class="productselectnumberpanel">
    <!-- ProductSelectNumberPanel 商品番号選択ボタンパネルの生成-->
    <p class="mt-1 mb-1">商品番号選択ボタンパネル</p>
    <!-- ProductSelectNumberPanel 商品番号選択ボタンの生成-->
    <div v-if="isActive">
        <div class="btn-group" role="group" aria-label="NumberPanel">
            <button type="button" class="btn btn-primary" v-on:click="pushNumberButton(1)">1</button>
            <button type="button" class="btn btn-primary" v-on:click="pushNumberButton(2)">2</button>
            <button type="button" class="btn btn-primary" v-on:click="pushNumberButton(3)">3</button>
            <button type="button" class="btn btn-primary" v-on:click="pushNumberButton(4)">4</button>    
            <button type="button" class="btn btn-primary" v-on:click="pushNumberButton(5)">5</button>
            <button type="button" class="btn btn-primary" v-on:click="pushNumberButton(6)">6</button>
            <button type="button" class="btn btn-primary" v-on:click="pushNumberButton(7)">7</button>
            <button type="button" class="btn btn-primary" v-on:click="pushNumberButton(8)">8</button>
        </div>
    </div>
    <div v-else>
        <div class="btn-group" role="group" aria-label="NumberPanel">
            <button type="button" class="btn btn-secondary" disabled>1</button>
            <button type="button" class="btn btn-secondary" disabled>2</button>
            <button type="button" class="btn btn-secondary" disabled>3</button>
            <button type="button" class="btn btn-secondary" disabled>4</button>    
            <button type="button" class="btn btn-secondary" disabled>5</button>
            <button type="button" class="btn btn-secondary" disabled>6</button>
            <button type="button" class="btn btn-secondary" disabled>7</button>
            <button type="button" class="btn btn-secondary" disabled>8</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductSelectNumberPanel",
  props: {},
  created: function() {
    this.isActive = false;
  },
  data: () => {
    return {
      isActive: {
        type: Boolean,
        default: false
      }
    };
  },
  methods: {
    //内部：商品番号選択ボタン押下時処理
    pushNumberButton: function(number) {
      //商品番号選択ボタン押下を上位コンポーネントに通知
      this.$emit("pushNumberButton", number);
    },
    //上位コンポーネントより：現金支払機の電源ON指示
    switchOn: function() {
      //現金支払機の電源ON
      this.isActive = true;
    },
    //上位コンポーネントより：現金支払機の電源OFF指示
    switchOff: function() {
      //現金支払機の電源OFF
      this.isActive = false;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
