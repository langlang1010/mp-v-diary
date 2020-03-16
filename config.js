/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

// 
// const host = 'http://f5a09135a145ae50.natapp.cc';
const host = 'https://smileyan.cn/diary';

const config = {

  // 下面的地址配合云端 Server 工作
  host,
  listDiary: `${host}/diary/list`,

  // 登录地址，用于建立会话
  loginUrl: `${host}/login/wechat/index`,

  // 写日记
  addDiary: `${host}/diary/add`,
  
  // 注册
  registerUrl: `${host}/login/wechat/register`,

  // 更新
  updateDiary: `${host}/diary/update`,

  // 根据日期查询
  listByDate: `${host}/diary/datelist`,
  
  // 删除
  deleteDiary: `${host}/diary/delete`,

  statisticUrl: `${host}/diary/statistic`,

  // 测试的请求地址，用于测试会话
  requestUrl: `https://${host}/testRequest`,


  // 用code换取openId
  openIdUrl: `https://${host}/openid`,

  // 测试的信道服务接口
  tunnelUrl: `https://${host}/tunnel`,

  // 生成支付订单的接口
  paymentUrl: `https://${host}/payment`,

  // 发送模板消息接口
  templateMessageUrl: `https://${host}/templateMessage`,

  // 发送订阅消息接口
  subscribeMessageUrl: `https://${host}/subscribeMessage`,

  // 上传文件接口
  uploadFileUrl: `https://${host}/upload`,

  // 下载示例图片接口
  downloadExampleUrl: `https://${host}/static/weapp.jpg`,

  // 云开发环境 ID
  envId: 'release-b86096',

  // 云开发-存储 示例文件的文件 ID
  demoImageFileId: 'cloud://release-b86096.7265-release-b86096/demo.jpg',
  demoVideoFileId: 'cloud://release-b86096.7265-release-b86096/demo.mp4',
}

module.exports = config
