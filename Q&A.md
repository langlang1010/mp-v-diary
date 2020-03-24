# Q&A

### 如何运行整个项目？
1. 本人可以确保代码无误，无文件缺失。
2. 后端服务源码地址: [https://github.com/langlang1010/mp-v-diary-serve](https://github.com/langlang1010/mp-v-diary-serve).
后端服务的需要资源如下： `JDK 1.8+ `,`MySQL 5.6+`, `Redis 5.0+`，`Tomcat 8.5+`
3. 如果希望在自己电脑上运行整个项目，使用微信官方提供的 `微信开发工具`时需要设置不进行域名校验。
4. 如果希望部署在云服务器上时，则需要购买域名，并在 `微信公众平台` 配置合法域名。
5. 配置文件修改：
    * 后端需要修改 `application.yml` 文件，进行相关配置。
    * 前端需要修改 `config.js` 文件，进行相关配置。
  
额，总体来说是一个不难但是繁琐的过程，需要稍微熟悉java, MySQL, Redis 等。
如果有遇到什么问题，请 [Issue](https://github.com/langlang1010/mp-v-diary/issues) 反馈。

