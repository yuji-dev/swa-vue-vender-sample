<template>
  <div class="overflow-auto">

    <!-- Outlet 取出口の生成-->
    <p class="mt-0 mb-0">取出口</p>
    <!-- Outlet 取り出された商品の生成-->
    <div class="card-group">

      <div v-for="boughtProduct in boughtProducts" :key="boughtProduct.id">
        <div class="card" style="width: 3rem;">
          <div class="row no-gutters">
            <div class="col-auto">
              <img :src="boughtProduct.image" width="50" height="60" />
            </div>
            <div class="col">
              <div class="card-block px-2">
                <!-- <p class="badge badge-pill badge-info">{{ boughtProduct.name }}</p> -->
              </div>
            </div>
          </div>
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
    //購入商品の追加
    addOutlet: function(product) {
      this.boughtProducts.push(product);
    },
    //購入商品の取り出し
    checkOutAll: function() {
      this.boughtProducts.pop();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
