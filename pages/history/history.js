const app = getApp()

Page({
  data: {
    history: []
  },
  
  onShow() {
    this.loadHistory()
  },
  
  // 加载历史记录
  loadHistory() {
    const app = getApp()
    const history = app.globalData.testHistory || []
    
    // 格式化时间
    const formattedHistory = history.map(item => {
      const date = new Date(item.time)
      const now = new Date()
      const diff = now - date
      
      let timeStr = ''
      if (diff < 60000) {
        timeStr = '刚刚'
      } else if (diff < 3600000) {
        timeStr = `${Math.floor(diff / 60000)} 分钟前`
      } else if (diff < 86400000) {
        timeStr = `${Math.floor(diff / 3600000)} 小时前`
      } else if (diff < 604800000) {
        timeStr = `${Math.floor(diff / 86400000)} 天前`
      } else {
        timeStr = `${date.getMonth() + 1}月${date.getDate()}日`
      }
      
      return {
        ...item,
        timeStr
      }
    })
    
    this.setData({ history: formattedHistory })
  },
  
  // 查看结果
  viewResult(e) {
    const index = e.currentTarget.dataset.index
    const app = getApp()
    
    // 将该记录移到最前（临时）
    const history = app.globalData.testHistory || []
    const record = history[index]
    
    // 跳转到结果页（会读取最新记录）
    wx.redirectTo({
      url: '/pages/result/result'
    })
  },
  
  // 跳转测试
  goToTest() {
    wx.navigateTo({ url: '/pages/index/index' })
  },
  
  // 显示清除确认
  showClearConfirm() {
    wx.showModal({
      title: '清除记录',
      content: '确定要清除所有测试记录吗？此操作不可恢复。',
      confirmText: '清除',
      cancelText: '取消',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          this.clearAllHistory()
        }
      }
    })
  },
  
  // 清除所有历史记录
  clearAllHistory() {
    const app = getApp()
    app.clearAllData()
    this.setData({ history: [] })
    wx.showToast({
      title: '已清除',
      icon: 'success'
    })
  }
})