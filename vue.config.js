module.exports = {   
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "assets",
    indexPath: "index.html",
    devServer: {
        /* 设置为0.0.0.0则所有的地址均能访问 */
        // host:'localhost',
        port: 8084,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: {
          '/api': {
            /* 目标代理服务器地址 */
            target: 'http://localhost:8082',
            /* 允许跨域 */
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''//请求的时候使用这个api就可以
            }
          },
        },
      },
};  