<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startAndEndPage.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startAndEndPage.start > 2">···</button>

    <!-- 中 -->
    <button
      v-for="(page, index) in startAndEndPage.end"
      :key="index"
      v-if="page >= startAndEndPage.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startAndEndPage.end < totalPage - 1">···</button>
    <button
      v-if="startAndEndPage.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>
    <input type="number" placeholder="输入页数" ref="EnterPage" min="1" :max="totalPage">
    <button class="sui-btn btn-xlarge btn-danger" @click="go($refs.EnterPage.value)">前往</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //连续页码的起始页和终止页
    startAndEndPage() {
      // 先定义两个变量
      let start = 0,
        end = 0;
      //非正常现象1：连续页比总页数多
      if (this.continues > this.totalPage) {
        (start = 1), (end = this.totalPage);
      } else {
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        // 非正常现象2：start出现非正数
        if (start < 1) {
          (start = 1), (end = this.continues);
        }
        // 非正常现象3：end>总页数
        if (end > this.totalPage) {
          (end = this.totalPage), (start = this.totalPage - this.continues + 1);
        }
      }
      return { start, end };
    },
  },
  methods: {
    go(page){
      if(page>this.totalPage){
        alert("输入页数不能大于总页数！")
      }else{
        // console.log(jjjjjjjjj);
        this.$emit('getPageNo',page*1)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  input {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
  };
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
 
}
</style>

