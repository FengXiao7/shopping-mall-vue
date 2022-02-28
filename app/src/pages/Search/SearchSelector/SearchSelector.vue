<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <!-- 品牌 -->
        <ul
          class="logo-list"
          v-for="(trademark, index) in trademarkList"
          :key="trademark.tmId"
          @click="clickTradeMark(trademark)"
          style="cursor: pointer"
        >
          <li>{{ trademark.tmName }}</li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!-- 售卖属性 -->
    <div
      class="type-wrap"
      v-for="(attrs, index) in attrsList"
      :key="attrs.attrId"
    >
      <!-- 具体的售卖属性:比如运行内存 -->
      <div class="fl key">{{ attrs.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="(attrValue, index) in attrs.attrValueList" :key="index">
            <!-- 具体属性：比如8G,16G -->
            <a
              @click="attrInfo(attrs.attrId, attrValue, attrs.attrName)"
              style="cursor: pointer"
              >{{ attrValue }}</a
            >
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SearchSelector",
  computed: {
    ...mapGetters("search", ["trademarkList"]),
    ...mapGetters("search", ["attrsList"]),
  },
  methods: {
    //点击品牌，子给父传品牌过去，父亲重新发一个新的请求
    //注意1：这个地方要用父组件search发请求，因为父组件封装了参数searchParams
    //注意2：参数trademark是一个对象，有id和tmName
    //注意3：子给父传信息用$bus和自定义事件都行($bus本质上也是自定义事件),这里我们用自定义事件
    clickTradeMark(trademark) {
      this.$emit("tradeMarkInfo", trademark);
    },
    attrInfo(attrId, attrValue, attrName) {
      // console.log(attrId, attrValue, attrName);
      this.$emit("attrInfo",attrId,attrValue,attrName)
    },
  },
};
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>