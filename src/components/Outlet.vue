<template>
  <div class="overflow-auto">
    <!-- Outlet 取出口の生成-->
    <p class="mt-1 mb-1">取出口</p>
    <!-- Outlet 取り出された商品の生成-->
    <div class="card-group">
      <div v-for="boughtProduct in boughtProducts" :key="boughtProduct.id">
        <div class="card" style="width: 3rem;">
          <img class="mx-auto d-block" :src="boughtProduct.image" width="25" height="60" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Outlet",
  props: {},
  //コンポーネントの data オプションは関数でなければなりません。
  //各インスタンスが返されるデータオブジェクトの独立したコピーを保持できるためです:
  data: () => {
    return {
      boughtProducts: []
    };
  },
  methods: {
    //上位コンポーネントより：購入済商品の排出指示
    addOutlet: function(product) {
      this.boughtProducts.push(product);
    },
    //上位コンポーネントより：取出口から購入済商品を取り出す指示 Todo:未実装
    // checkOutAll: function() {
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
