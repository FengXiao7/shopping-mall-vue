module.exports={
  //打包生成map文件
  productionSourceMap:false,
    //关闭eslint检查
    lintOnSave:false,
    //配置代理
    devServer: {
        proxy: {
          "/api": {
            target: "http://gmall-h5-api.atguigu.cn",
          },
        },
      },
}