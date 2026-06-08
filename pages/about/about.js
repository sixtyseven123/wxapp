const app = getApp()

Page({
  data: {
    showModal: false,
    modalTitle: '',
    modalContent: ''
  },
  
  // 内容数据
  contents: {
    agreement: {
      title: '用户协议',
      content: `人格实验室用户协议

欢迎使用人格实验室（以下简称"本小程序"）。请您仔细阅读以下条款，如果您使用本小程序，表示您已同意本协议。

一、服务说明
人格实验室为用户提供MBTI人格测试及相关趣味测试服务，测试结果仅供参考，不构成任何专业建议。

二、使用规则
1. 您应按照测试指引如实作答
2. 禁止使用本小程序进行任何违法活动
3. 禁止对本小程序进行反向工程、反编译等操作
4. 禁止传播虚假或有害信息

三、测试结果
1. 测试结果基于用户自述数据，可能存在局限性
2. 本小程序不对测试结果的准确性做任何承诺
3. 如需专业心理评估，请咨询专业机构

四、知识产权
本小程序所有内容，包括但不限于题目、结果文案、界面设计等，均受知识产权保护。

五、修改与终止
我们保留随时修改或终止服务的权利，恕不另行通知。

六、争议解决
本协议的解释和执行均适用中华人民共和国法律。`
    },
    privacy: {
      title: '隐私政策',
      content: `人格实验室隐私政策

我们非常重视您的隐私和个人信息保护。

一、信息收集
1. 我们仅收集您主动提交的测试答案
2. 我们不收集您的真实姓名、手机号、身份证号等个人敏感信息
3. 测试过程中的选择数据仅在本地处理，不会上传至服务器

二、信息使用
1. 测试答案仅用于计算本次测试结果
2. 测试结果（匿名化）可能用于改善服务质量
3. 我们不会将您的个人信息出售或转让给第三方

三、信息存储
1. 测试记录存储在您的设备本地
2. 如您使用云同步功能，数据将加密存储在微信云服务器
3. 您可随时通过"清除所有数据"功能删除本地数据

四、信息共享
1. 我们不会与任何第三方共享您的个人信息
2. 测试结果以匿名形式存储，不包含可识别您身份的信息

五、您的权利
1. 您有权随时查看本地存储的测试记录
2. 您有权随时清除所有本地数据
3. 您有权拒绝使用云同步功能

六、儿童隐私
本小程序不面向14周岁以下儿童，我们不会故意收集儿童信息。

七、联系我们
如您对隐私政策有任何疑问，请通过页面底部联系方式联系我们。`
    },
    about: {
      title: '关于我们',
      content: `关于人格实验室

人格实验室是一款专业的人格测试小程序，致力于为用户提供准确、有趣的人格分析服务。

我们的理念：
让每个人都能通过科学的人格测试，了解真实的自己。

我们的测试：
1. MBTI标准版（93题）
   采用国际通用的MBTI-M量表，涵盖四个维度全面分析
   
2. MBTI快速版（20题）
   精简版测试，快速了解大致人格类型
   
3. 趣味人格测试（15题）
   轻松有趣的测试，生成专属人格标签

我们的特点：
- 专业：基于经典心理学理论
- 准确：多维度交叉验证
- 有趣：轻松幽默的解读
- 安全：隐私优先，不强制授权

版本信息：
版本号：1.0.0
更新日期：2024年

联系我们：
如有任何问题或建议，欢迎反馈。`
    }
  },
  
  onLoad(options) {
    // 如果有section参数，直接显示对应内容
    if (options.section && this.contents[options.section]) {
      setTimeout(() => {
        this.showContent({ currentTarget: { dataset: { type: options.section } } })
      }, 100)
    }
  },
  
  // 显示内容
  showContent(e) {
    const type = e.currentTarget.dataset.type
    const content = this.contents[type]
    
    if (content) {
      this.setData({
        showModal: true,
        modalTitle: content.title,
        modalContent: content.content
      })
    }
  },
  
  // 关闭弹窗
  closeModal() {
    this.setData({
      showModal: false
    })
  },
  
  // 联系我们
  contactUs() {
    wx.showModal({
      title: '联系我们',
      content: '如有任何问题或建议，请通过以下方式联系我们：\n\n邮箱：support@personalitylab.com\n\n我们会在1-3个工作日内回复您。',
      showCancel: false,
      confirmText: '我知道了'
    })
  },
  
  // 清除所有数据
  clearData() {
    wx.showModal({
      title: '清除数据',
      content: '确定要清除所有本地数据吗？此操作不可恢复。',
      confirmText: '清除',
      cancelText: '取消',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          app.clearAllData()
          wx.showToast({
            title: '已清除',
            icon: 'success'
          })
        }
      }
    })
  }
})