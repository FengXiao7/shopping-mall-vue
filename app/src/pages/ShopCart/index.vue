<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.skuId"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @change="updateChecked(cartInfo.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="`${cartInfo.imgUrl}`" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              style="cursor: pointer"
              class="mins"
              @click="hander('minus', cartInfo, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="`${cartInfo.skuNum}`"
              minnum="1"
              class="itxt"
              @change="hander('change', cartInfo, $event.target.value * 1)"
            />
            <a
              style="cursor: pointer"
              class="plus"
              @click="hander('plus', cartInfo, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              @click="deleteCart(cartInfo.skuId)"
              style="cursor: pointer"
              class="sindelet"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @change="updateAllCartIsChecked"
          :disabled="isDisabled"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllselected">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  data() {
    return {
      isMinus: false,
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("shopCart", ["cartList"]),
    //这个才是我们想要的购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //计算总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((cartInfo) => {
        sum += cartInfo.skuNum * cartInfo.skuPrice;
      });
      return sum;
    },
    //是否全选
    isAllChecked() {
      if (this.cartInfoList.length == 0) {
        return false;
      }
      //cartInfoList里每一项的isChecked都为1就返回true，否则false
      return this.cartInfoList.every((cartInfo) => cartInfo.isChecked == 1);
    },
    //全选按钮可否选
    isDisabled(){
      return this.cartInfoList.length==0?true:false
    }
  },
  methods: {
    //获取购物车
    getData() {
      this.$store.dispatch("shopCart/getCartList");
    },
    //改变产品数量
    //type有三种，对应+,-和直接输入; cartInfo商品信息，disNum相对改变数目
    hander: throttle(async function (type, cartInfo, disNum) {
      //该标志位为false时，不必发送请求
      let flag = true;
      switch (type) {
        //直接加最简单
        case "plus":
          break;
        case "minus":
          if (cartInfo.skuNum <= 1) {
            //小于1不发请求
            flag = false;
          }
          break;
        case "change":
          if (isNaN(disNum) || disNum < 0) {
            //负数和非数字不发请求,但是要再次获取购物车数据
            flag = false;
            this.getData();
          } else {
            //要考虑小数
            disNum = parseInt(disNum) - cartInfo.skuNum;
          }
          break;
      }
      try {
        if (flag) {
          //修改成功后，要再次获取购物车数据
          await this.$store.dispatch("detail/AddOrUpdateShopCart", {
            skuId: cartInfo.skuId,
            skuNum: disNum,
          });
          this.getData();
        }
      } catch (error) {
        alert(error.message);
      }
    }, 500),
    //删除购物车商品
    async deleteCart(skuId) {
      try {
        await this.$store.dispatch("shopCart/deleteCart", skuId);
        //删除成功后再次更新购物车数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改购物车产品状态
    async updateChecked(skuId, event) {
      //注意这里要和接口文档一致，选了就传1，没选传0
      //event.target.checked是布尔值，要转换一下
      let isChecked = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("shopCart/updateChartChecked", {
          skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除所有选中的商品
    async deleteAllselected() {
      try {
        await this.$store.dispatch("shopCart/deleteAllselected");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改全部产品状态
    async updateAllCartIsChecked() {
      let isChecked = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch(
          "shopCart/updateAllCartIsChecked",
          isChecked
        );
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>