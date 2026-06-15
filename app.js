App({
  globalData: {
    userInfo: null,
    openid: '',
    testHistory: [],
    currentTest: null
  },
  
  onLaunch() {
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: 'cloud1-d4gzz9udge5b86e5e', // 云环境ID
        traceUser: true
      })
    }
    
    // 从本地缓存加载历史记录
    this.loadHistory()
    
    // 检查系统深色模式
    const systemInfo = wx.getSystemInfoSync()
    this.globalData.systemInfo = systemInfo
    this.globalData.isDarkMode = false
  },
  
  loadHistory() {
    try {
      const history = wx.getStorageSync('testHistory')
      if (history) {
        this.globalData.testHistory = history
      }
    } catch (e) {
      console.error('加载历史记录失败', e)
    }
  },
  
  saveHistory(history) {
    this.globalData.testHistory = history
    try {
      wx.setStorageSync('testHistory', history)
    } catch (e) {
      console.error('保存历史记录失败', e)
    }
  },
  
  addHistory(record) {
    const history = this.globalData.testHistory || []
    history.unshift(record)
    // 最多保存50条记录
    if (history.length > 50) {
      history.pop()
    }
    this.saveHistory(history)
  },
  
  clearAllData() {
    this.globalData.testHistory = []
    this.globalData.currentTest = null
    try {
      wx.removeStorageSync('testHistory')
      wx.removeStorageSync('currentTest')
    } catch (e) {
      console.error('清除数据失败', e)
    }
  }
})