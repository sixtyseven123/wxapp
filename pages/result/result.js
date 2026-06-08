const app = getApp()

Page({
  data: {
    result: {},
    isFun: false,
    showDimensions: true,
    testTypeName: '',
    usedTime: '',
    history: []
  },
  
  onLoad() {
    this.loadResult()
  },
  
  onReady() {
    // 绘制雷达图
    if (!this.data.isFun) {
      setTimeout(() => {
        this.drawRadarChart()
      }, 500)
    }
  },
  
  // 加载结果数据
  loadResult() {
    const app = getApp()
    const history = app.globalData.testHistory || []
    
    if (history.length === 0) {
      // 没有历史记录，跳转首页
      wx.showToast({
        title: '没有测试记录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateTo({ url: '/pages/index/index' })
      }, 1500)
      return
    }
    
    // 获取最新一条记录
    const latestRecord = history[0]
    const { result, type, time, usedTime } = latestRecord
    
    // 确定测试类型名称
    let typeName = ''
    switch (type) {
      case 'mbti_full':
        typeName = 'MBTI标准版'
        break
      case 'mbti_quick':
        typeName = 'MBTI快速版'
        break
      case 'fun':
        typeName = '趣味人格测试'
        break
    }
    
    this.setData({
      result: result,
      isFun: type === 'fun',
      showDimensions: type !== 'fun',
      testTypeName: typeName,
      usedTime: usedTime || '--:--',
      history: history
    })
    
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: type === 'fun' ? '趣味测试结果' : '测试结果'
    })
  },
  
  // 绘制雷达图
  drawRadarChart() {
    const result = this.data.result
    if (!result.percent) return
    
    const query = wx.createSelectorQuery()
    query.select('#radarCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) return
        
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = 300 * dpr
        canvas.height = 300 * dpr
        ctx.scale(dpr, dpr)
        
        const centerX = 150
        const centerY = 150
        const radius = 100
        
        // 四个维度数据
        const dimensions = [
          { name: 'E/I', value: result.percent.E / 100 },
          { name: 'S/N', value: result.percent.N / 100 },
          { name: 'T/F', value: result.percent.F / 100 },
          { name: 'J/P', value: result.percent.P / 100 }
        ]
        
        // 绘制背景网格
        ctx.strokeStyle = '#E8E8F0'
        ctx.lineWidth = 1
        
        for (let i = 1; i <= 4; i++) {
          const r = (radius / 4) * i
          ctx.beginPath()
          for (let j = 0; j < 4; j++) {
            const angle = (Math.PI / 2) * j - Math.PI / 4
            const x = centerX + r * Math.cos(angle)
            const y = centerY + r * Math.sin(angle)
            if (j === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.closePath()
          ctx.stroke()
        }
        
        // 绘制轴线
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI / 2) * i - Math.PI / 4
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(
            centerX + radius * Math.cos(angle),
            centerY + radius * Math.sin(angle)
          )
          ctx.stroke()
        }
        
        // 绘制数据区域
        ctx.beginPath()
        ctx.fillStyle = 'rgba(123, 104, 238, 0.3)'
        ctx.strokeStyle = '#7B68EE'
        ctx.lineWidth = 2
        
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI / 2) * i - Math.PI / 4
          const value = dimensions[i].value
          const x = centerX + radius * value * Math.cos(angle)
          const y = centerY + radius * value * Math.sin(angle)
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        
        // 绘制数据点
        ctx.fillStyle = '#7B68EE'
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI / 2) * i - Math.PI / 4
          const value = dimensions[i].value
          const x = centerX + radius * value * Math.cos(angle)
          const y = centerY + radius * value * Math.sin(angle)
          ctx.beginPath()
          ctx.arc(x, y, 5, 0, 2 * Math.PI)
          ctx.fill()
        }
        
        // 绘制标签
        ctx.font = '12px sans-serif'
        ctx.fillStyle = '#666666'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const labels = ['外向', '直觉', '情感', '知觉']
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI / 2) * i - Math.PI / 4
          const x = centerX + (radius + 25) * Math.cos(angle)
          const y = centerY + (radius + 25) * Math.sin(angle)
          ctx.fillText(labels[i], x, y)
        }
      })
  },
  
  // 保存结果
  saveResult() {
    wx.showToast({
      title: '结果已保存',
      icon: 'success'
    })
  },
  
  // 分享结果
  shareResult() {
    const result = this.data.result
    let shareText = ''
    
    if (this.data.isFun) {
      shareText = `我在人格实验室做了趣味测试，结果是"${result.funTag}"！${result.funEmoji}\n\n${result.funTitle}\n${result.funDesc}`
    } else {
      shareText = `我在人格实验室做了MBTI测试，结果是${result.type}${result.name}！${result.icon}\n\n${result.slogan}\n\n你也来试试吧～`
    }
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    
    wx.eventCenter.trigger('shareResult', { text: shareText })
  },
  
  onShareAppMessage() {
    const result = this.data.result
    let title = ''
    
    if (this.data.isFun) {
      title = `我的趣味人格是"${result.funTag}"，你来试试？`
    } else {
      title = `我的MBTI是${result.type}，2分钟看懂自己！`
    }
    
    return {
      title: title,
      path: '/pages/index/index',
      imageUrl: '/assets/images/share.png'
    }
  },
  
  onShareTimeline() {
    const result = this.data.result
    return {
      title: this.data.isFun 
        ? `我的趣味人格是"${result.funTag}"` 
        : `我的MBTI是${result.type}，你也来测试一下吧！`
    }
  },
  
  // 重新测试
  retest() {
    wx.showModal({
      title: '重新测试',
      content: '确定要重新测试吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack()
        }
      }
    })
  }
})