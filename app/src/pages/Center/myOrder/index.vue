<template>
  <!-- 右侧内容 -->
  <div class="order-right">
    <div class="order-content" v-if="myOrderList.total!=0">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table
          class="order-item"
          v-for="myOrder in myOrderList.records"
          :key="myOrder.id"
        >
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle">
                  支付时间：{{ myOrder.createTime }}　 订单编号：{{
                    myOrder.outTradeNo
                  }}
                  <span class="pull-right delete">
                    <img src="../images/delete.png" />
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart, index) in myOrder.orderDetailList" :key="cart.id">
              <td width="60%">
                <div class="typographic">
                  <img :src="cart.imgUrl" style="width: 100px; height: 100px" />
                  <a href="#" class="block-text">{{ cart.skuName }}} </a>
                  <span>x{{ cart.skuNum }}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td
                :rowspan="myOrder.orderDetailList.length"
                v-if="index == 0"
                width="8%"
                class="center"
              >
                {{ myOrder.consignee }}
              </td>
              <td
                :rowspan="myOrder.orderDetailList.length"
                v-if="index == 0"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>总金额{{ myOrder.totalAmount }}</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td
                :rowspan="myOrder.orderDetailList.length"
                v-if="index == 0"
                width="8%"
                class="center"
              >
                <a href="#" class="btn">{{ myOrder.orderStatusName }} </a>
              </td>
              <td
                :rowspan="myOrder.orderDetailList.length"
                v-if="index == 0"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <Pagination
          :pageNo="page"
          :pageSize="limit"
          :total="myOrderList.total"
          :continues="5"
          @getPageNo="getPageNo"
        />
        <!-- getPageNo是自定义事件相当于v-on 触发在Pagination子组件处 -->
      </div>
    </div>
    <div v-if="myOrderList.total==0">
      你还没有订单！
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "myOrder",
  data() {
    return {
      page: 1,//当前页数
      limit: 3,//每一页显示多少笔订单
      myOrderList: {},
    };
  },
  mounted() {
    this.getMyOrder();
  },
  methods: {
    async getMyOrder() {
      let { page, limit } = this;
      let result = await this.$API.reqMyOrderList(page, limit);
      if (result.code == 200) {
        this.myOrderList = result.data;
      } else {
        alert(result.message);
      }
    //   console.log(result);
    },
    //自定义事件的回调
    getPageNo(page){
        this.page=page
        this.getMyOrder();
    }
  },
};
</script>

<style>
</style>