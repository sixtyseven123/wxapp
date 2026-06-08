const app = getApp()

Page({
  data: {
    showAd: false
  },
  
  onLoad() {
    // 检查是否显示广告（根据流量主配置）
    this.checkAdConfig()
  },
  
  onShow() {},
  
  // 检查广告配置
  checkAdConfig() {
    // 可根据实际流量主配置决定是否显示
    // this.setData({ showAd: true })
  },
  
  // 开始测试
  startTest(e) {
    const testType = e.currentTarget.dataset.type
    let url = ''
    
    switch (testType) {
      case 'mbti_full':
        url = '/pages/guide/guide?type=mbti_full&title=MBTI标准版&count=93'
        break
      case 'mbti_quick':
        url = '/pages/guide/guide?type=mbti_quick&title=MBTI快速版&count=20'
        break
      case 'fun':
        url = '/pages/guide/guide?type=fun&title=趣味人格测试&count=15'
        break
    }
    
    wx.navigateTo({ url })
  },
  
  // 跳转历史记录
  goToHistory() {
    wx.navigateTo({ url: '/pages/history/history' })
  },
  
  // 跳转关于页面
  goToAbout() {
    wx.navigateTo({ url: '/pages/about/about' })
  },
  
  // 显示隐私政策
  showPrivacy() {
    wx.showModal({
      title: '隐私政策',
      content: '人格实验室尊重并保护用户隐私。\n\n1. 我们不会收集您的个人敏感信息\n2. 答题数据仅在本地计算\n3. 云端仅存储匿名化的测试结果\n4. 您可随时清除本地所有数据\n\n如有任何问题，请联系我们。',
      showCancel: false,
      confirmText: '我知道了'
    })
  },
  
  // 广告加载成功
  adLoad() {
    console.log('广告加载成功')
  },
  
  // 广告加载失败
  adError(e) {
    console.log('广告加载失败', e)
    this.setData({ showAd: false })
  },
  
  onShareAppMessage() {
    return {
      title: '人格实验室 - 2分钟看懂自己',
      path: '/pages/index/index',
      imageUrl: '/assets/images/share.png'
    }
  }
})