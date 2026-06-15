const app = getApp()
const cloud = require('../../cloud/cloud.js')

Page({
  data: {
    history: [],
    loading: false,
    cloudAvailable: false
  },
  
  onShow() {
    this.loadHistory()
  },
  
  // 加载历史记录
  async loadHistory() {
    this.setData({ loading: true })
    
    // 先加载本地历史
    const localHistory = app.globalData.testHistory || []
    
    // 尝试从云端加载
    try {
      const res = await cloud.getCloudHistory(50)
      if (res.success && res.data && res.data.length > 0) {
        // 合并云端数据，去重
        const cloudRecords = res.data.map(record => ({
          ...record,
          time: record.createTime ? new Date(record.createTime).getTime() : Date.now()
        }))
        
        // 使用云端数据作为主要数据源
        this.setData({ 
          history: this.formatHistory(cloudRecords),
          cloudAvailable: true,
          loading: false
        })
        
        // 同步到本地
        app.saveHistory(cloudRecords)
        return
      }
    } catch (e) {
      console.error('从云端加载历史失败:', e)
    }
    
    // 使用本地数据
    this.setData({ 
      history: this.formatHistory(localHistory),
      loading: false
    })
  },
  
  // 格式化历史记录
  formatHistory(history) {
    return history.map(item => {
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