<template>
  <div>
    <!-- 三级联动 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑  就是带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">x</i>
            </li>
            <!-- 售卖属性面包屑 -->
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-if="isOne"
                      class="iconfont"
                      :class="{
                        'icon-xiangshangjiantou': isAsc,
                        'icon-xiangxiajiantou': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-if="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-xiangshangjiantou': isAsc,
                        'icon-xiangxiajiantou': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
            v-if="attrsList.length!=0"
          />
          <div v-if="attrsList.length==0" >暂无信息！</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        //一级分类
        category1Id: "",
        //二级分类
        category2Id: "",
        //三级分类
        category3Id: "",
        //分类名
        categoryName: "",
        //关键字
        keyword: "",
        //排序  默认综合升序
        order: "1:asc",
        //页号 默认1
        pageNo: 1,
        //每页数据
        pageSize: 3,
        //售卖信息
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  methods: {
    //自定义事件的回调，用于点击品牌传参发请求
    tradeMarkInfo(trademark) {
      //console.log("父组件",trademark);
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //console.log(this.searchParams,"点击品牌传参发请求");
      this.getData();
    },
    //自定义事件的回调，用于点击售卖参数传参发请求
    attrInfo(attrId, attrValue, attrName) {
      let arrayValue = `${attrId}:${attrValue}:${attrName}`;
      //注意props是一个数组，小心点封装数据
      //注意数组内不能有重复元素！
      //只有新元素才能进去！
      if (this.searchParams.props.indexOf(arrayValue) == -1) {
        this.searchParams.props.push(arrayValue);
        // console.log(this.searchParams,"用于点击售卖参数传参发请求");
        this.getData();
      }
    },
    //自定义事件的回调，用于点击分页传参发请求
    getPageNo(pageNo) {
      //console.log(pageNo);
      this.searchParams.pageNo = pageNo;
      //console.log(this.searchParams,"用于点击分页传参发请求");
      this.getData();
    },
    //跳转请求
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    // 删除分类
    removeCategoryName() {
      //面包屑这里，不仅要把商品名置空，还要重新发送一个默认的请求
      //那么我们还需要把3个商品ID置空
      //把他们写成undenfine更好，这样参数就不会带给服务器了，节约资源
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.props = undefined;
      this.searchParams.trademark = undefined;
      //console.log(this.searchParams,"删除分类发送请求");
      this.getData();
      //这里还可以再优化，把地址栏的query也干掉
      //如果有params，就不能删掉params(主要是params里面的keyword)
      //跳转路由来改变地址栏，只不过这里是自己跳自己
      this.$router.push({ name: "search", params: this.$route.params });
    },
    //删除关键字
    removeKeyword() {
      this.searchParams.keyword = undefined;
      //console.log(this.searchParams,"删除关键字发送请求");
      this.getData();
      //触发自定义事件clear
      this.$bus.$emit("clear");
      //改善下地址栏
      this.$router.push({ name: "search", query: this.$route.query });
    },
    //删除品牌
    removeTrademark() {
      this.searchParams.trademark = undefined;
      //console.log(this.searchParams,"删除品牌发送请求");
      this.getData();
    },
    //删除售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      //console.log(this.searchParams,"删除售卖属性发送请求");
      this.getData();
    },
    //改变order
    changeOrder(flag) {
      let originSort = this.searchParams.order.split(":")[1];
      if (originSort == "asc") {
        this.searchParams.order = flag + ":desc";
      } else {
        this.searchParams.order = flag + ":asc";
      }
      //console.log(this.searchParams,"改变order发送请求");
      this.getData();
    },
  },
  //主要用于把路由信息里面的参数信息包装成请求信息
  beforeMount() {
    //复杂的写法
    // this.searchParams.category1Id=this.$route.query.category1Id
    // this.searchParams.category2Id=this.$route.query.category2Id
    // this.searchParams.category3Id=this.$route.query.category3Id
    // this.searchParams.categoryName=this.$route.query.categoryName
    // this.searchParams.keyword=this.$route.params.keyword
    //这个就是把this.$route.query和this.$route.params的键值对转到this.searchParams上
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    //console.log(this.searchParams,"beforeMount");
  },
  mounted() {
    //console.log(this.searchParams,"mounted发送请求");
    this.getData();
  },
  computed: {
    ...mapGetters("search", ["goodsList"]),
    ...mapGetters("search", ["attrsList"]),
    ...mapGetters("search", ["trademarkList"]),
    ...mapGetters("search", ["total"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        //$route里的参数发生变化，再整理一下数据,然后发请求
        //console.log(this.searchParams,"watch发送请求前还未整理参数");
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        //console.log(this.searchParams,"watch发送请求");
        this.getData();

        //我们新的请求发出去后，一定要把3个商品Id置空(对应三级联动)
        this.searchParams.category1Id = "";
        this.searchParams.category2Id = "";
        this.searchParams.category3Id = "";
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

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
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>