const app = getApp()
const cloud = require('../../cloud/cloud.js')

Page({
  data: {
    history: [],
    loading: false,
    cloudAvailable: false,
    filterType: 'all',
    dateRange: 'all'
  },

  onShow() {
    this.loadHistory()
  },

  // 加载历史记录
  async loadHistory() {
    this.setData({ loading: true })

    const options = this.getFilterOptions()

    try {
      const res = await cloud.getCloudHistory(options)
      if (res.success && res.data && res.data.length > 0) {
        const cloudRecords = res.data.map(record => ({
          ...record,
          time: record.createTime ? new Date(record.createTime).getTime() : Date.now()
        }))
        
        // 应用本地筛选
        const filteredRecords = this.filterHistoryLocal(cloudRecords)
        
        this.setData({ 
          history: this.formatHistory(filteredRecords),
          cloudAvailable: true,
          loading: false
        })
        
        app.saveHistory(cloudRecords)
        return
      }
    } catch (e) {
      console.error('从云端加载历史失败，使用本地数据:', e)
    }

    // 使用本地数据并应用筛选
    const localHistory = app.globalData.testHistory || []
    const filteredLocal = this.filterHistoryLocal(localHistory)
    this.setData({ 
      history: this.formatHistory(filteredLocal),
      loading: false
    })
  },

  // 获取筛选选项
  getFilterOptions() {
    const options = {
      limit: 50,
      filterType: this.data.filterType === 'all' ? undefined : this.data.filterType
    }

    const now = Date.now()
    let startDate = undefined
    let endDate = undefined

    switch (this.data.dateRange) {
      case 'today':
        // 使用兼容iOS的日期格式
        const today = new Date()
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
        endDate = now
        break
      case 'week':
        startDate = now - 7 * 24 * 60 * 60 * 1000
        endDate = now
        break
      case 'month':
        startDate = now - 30 * 24 * 60 * 60 * 1000
        endDate = now
        break
    }

    if (startDate) options.startDate = startDate
    if (endDate) options.endDate = endDate

    return options
  },

  // 获取本地筛选参数（用于降级方案）
  getLocalFilterParams() {
    return {
      filterType: this.data.filterType,
      dateRange: this.data.dateRange
    }
  },

  // 本地筛选历史记录
  filterHistoryLocal(history) {
    let filtered = [...history]
    
    // 按类型筛选
    if (this.data.filterType !== 'all') {
      filtered = filtered.filter(item => item.type === this.data.filterType)
    }
    
    // 按日期筛选
    const now = Date.now()
    let startDate = undefined
    
    switch (this.data.dateRange) {
      case 'today': {
        const today = new Date()
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
        break
      }
      case 'week': {
        // 获取本周一的开始时间
        const today = new Date()
        const dayOfWeek = today.getDay() || 7 // 周日为0，转为7
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek + 1).getTime()
        break
      }
      case 'month': {
        // 获取本月第一天的开始时间
        const today = new Date()
        startDate = new Date(today.getFullYear(), today.getMonth(), 1).getTime()
        break
      }
    }
    
    if (startDate) {
      filtered = filtered.filter(item => {
        // 获取记录的时间戳，处理多种时间格式
        let itemTime = 0
        
        // 优先使用 createTime（云端返回的日期对象）
        if (item.createTime) {
          if (typeof item.createTime === 'object' && item.createTime.$date) {
            // MongoDB日期格式
            itemTime = item.createTime.$date
          } else if (typeof item.createTime === 'number') {
            // 时间戳格式
            itemTime = item.createTime
          } else {
            // 字符串格式或其他
            const parsed = new Date(item.createTime)
            itemTime = isNaN(parsed.getTime()) ? 0 : parsed.getTime()
          }
        } else if (item.time) {
          // 本地时间字段
          itemTime = typeof item.time === 'number' ? item.time : new Date(item.time).getTime()
        }
        
        return itemTime >= startDate
      })
    }
    
    return filtered
  },

  // 设置类型筛选
  setFilterType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({ filterType: type })
    this.loadHistory()
  },

  // 设置日期范围筛选
  setDateRange(e) {
    const range = e.currentTarget.dataset.range
    this.setData({ dateRange: range })
    this.loadHistory()
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
    const record = this.data.history[index]
    
    app.globalData.currentTest = record
    wx.redirectTo({
      url: '/pages/result/result'
    })
  },

  // 跳转测试
  goToTest() {
    wx.navigateTo({ url: '/pages/index/index' })
  },

  // 显示删除确认
  showDeleteConfirm(e) {
    const index = e.currentTarget.dataset.index
    const record = this.data.history[index]
    
    wx.showModal({
      title: '删除记录',
      content: '确定要删除这条测试记录吗？此操作不可恢复。',
      confirmText: '删除',
      cancelText: '取消',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          this.deleteRecord(index, record)
        }
      }
    })
  },

  // 删除记录
  async deleteRecord(index, record) {
    console.log('deleteRecord called:', { index, recordId: record._id })
    
    // 如果有云端ID，调用云函数删除
    if (record._id) {
      wx.showLoading({ title: '删除中...' })
      try {
        const res = await cloud.deleteTestRecord(record._id)
        wx.hideLoading()

        if (res.success) {
          wx.showToast({ title: '删除成功', icon: 'success' })
          // 无论云端是否成功，都重新加载数据（确保本地和云端同步）
          this.loadHistory()
        } else {
          console.error('删除失败:', res.error)
          wx.showToast({ title: res.error || '删除失败', icon: 'none' })
        }
      } catch (e) {
        wx.hideLoading()
        console.error('删除异常:', e)
        // 云函数调用失败，尝试本地删除
        this.deleteLocalRecord(index)
      }
    } else {
      // 本地记录，直接从本地删除
      this.deleteLocalRecord(index)
    }
  },

  // 本地删除记录
  deleteLocalRecord(index) {
    const history = this.data.history.filter((_, i) => i !== index)
    this.setData({ history })
    app.saveHistory(history)
    wx.showToast({ title: '删除成功', icon: 'success' })
  },

  // 显示清除所有确认
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
    app.clearAllData()
    this.setData({ history: [] })
    wx.showToast({
      title: '已清除',
      icon: 'success'
    })
  }
})