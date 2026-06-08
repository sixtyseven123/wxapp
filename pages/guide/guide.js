Page({
  data: {
    testType: '',
    testTitle: '',
    testCount: 0,
    testIcon: '📊',
    estimateTime: '',
    agreed: false
  },
  
  onLoad(options) {
    const { type, title, count } = options
    this.setData({
      testType: type,
      testTitle: title || '人格测试',
      testCount: parseInt(count) || 20
    })
    
    // 设置图标
    let icon = '📊'
    let time = ''
    if (type === 'mbti_full') {
      icon = '📊'
      time = '约15分钟'
    } else if (type === 'mbti_quick') {
      icon = '⚡'
      time = '约3分钟'
    } else if (type === 'fun') {
      icon = '🎭'
      time = '约2分钟'
    }
    this.setData({
      testIcon: icon,
      estimateTime: time
    })
    
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: title || '测试引导'
    })
  },
  
  // 返回上一页
  goBack() {
    wx.navigateBack()
  },
  
  // 切换隐私协议勾选状态
  togglePrivacy() {
    this.setData({
      agreed: !this.data.agreed
    })
  },
  
  // 显示隐私政策
  showPrivacy() {
    wx.navigateTo({
      url: '/pages/about/about?section=privacy'
    })
  },
  
  // 显示用户协议
  showAgreement() {
    wx.navigateTo({
      url: '/pages/about/about?section=agreement'
    })
  },
  
  // 开始测试
  startTest() {
    if (!this.data.agreed) {
      wx.showToast({
        title: '请先同意隐私政策',
        icon: 'none'
      })
      return
    }
    
    // 保存当前测试类型到全局
    const app = getApp()
    app.globalData.currentTest = {
      type: this.data.testType,
      title: this.data.testTitle,
      count: this.data.testCount,
      answers: [],
      startTime: Date.now()
    }
    
    // 跳转到答题页
    wx.navigateTo({
      url: `/pages/test/test?type=${this.data.testType}&index=0`
    })
  }
})