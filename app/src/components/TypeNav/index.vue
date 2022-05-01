<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveshow" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>

        <!-- 三级联动 -->
        <transition
          appear
          name="animate__animated animate__bounce"
          enter-active-class="animate__backInLeft"
          leave-active-class="animate__backOutUp"
          animation-duration:
          200ms
        >
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 多了一条一级数据，删掉 -->
              <!--当currentIndex==index就动态绑定一个cur样式 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList.slice(
                  0,
                  categoryList.length - 2
                )"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-categoryId1="c1.categoryId"
                    style="cursor: pointer"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-categoryId2="c2.categoryId"
                          style="cursor: pointer"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-categoryId3="c3.categoryId"
                            style="cursor: pointer"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
import "animate.css";
export default {
  name: "TypeNav",
  //组件一挂载完毕，就向服务器发送请求
  data() {
    return {
      //存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      //控制一级目录是否展示
      show: true,
    };
  },
  methods: {
    //这种写法在用户快速滑动时，会加剧浏览器负担
    // changeIndex(index){
    //   console.log(index);
    //   this.currentIndex=index
    // },

    //鼠标穿过元素时，把currentIndex置为index
    changeIndex: throttle(async function (index) {
      this.currentIndex = index;
    }, 200),
    //鼠标移除时，把currentIndex置为-1
    leaveshow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //路由跳转到search
    //1.如何确定点击a标签才会跳转
    //2.如何给这些a标签传参，以获取不同路由参数
    goSearch(event) {
      //获取当前事件节点
      let element = event.target;
      //节点有个dataset属性，可以获取节点的自定义属性和自定义值
      let { categoryname, categoryid1, categoryid2, categoryid3 } =
        element.dataset;
      //如果标签上有categoryName肯定是a标签，有categoryid1肯定是一级联动，二三级同理
      // console.log(categoryname);
      //下面我们包装一下编程式导航需要的地址参数，我们用对象的形式包装一下
      let location = { name: "search" };
      let query = { categoryName: categoryname };

      if (categoryname) {
        if (categoryid1) {
          query.category1Id = categoryid1;
        } else if (categoryid2) {
          query.category2Id = categoryid2;
        } else {
          query.category3Id = categoryid3;
        }
      }
      //整理完参数

      location.params = this.$route.params; //这里的params参数用于传递搜索框里的内容
      location.query = query; //query参数用于传递三级联动的内容
      // console.dir(location);
      this.$router.push(location);
    },
    entershow() {
      this.show = true;
    },
  },
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
};
</script>

<style scope lang=less>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /* &:hover {
                            .item-list {
                                display: block;
                            }
                        } */
        }
        /* .item:hover{
                      background: skyblue;
                    } */
        .cur {
          background: skyblue;
        }
      }
    }
  }
}
</style>