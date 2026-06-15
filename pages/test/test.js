const app = getApp()
const questions = require('../../utils/questions.js')
const personality = require('../../utils/personality.js')
const cloud = require('../../cloud/cloud.js')

Page({
  data: {
    testType: '',
    testTypeName: '',
    isFunTest: false,
    totalQuestions: 0,
    currentIndex: 0,
    currentQuestion: {},
    questions: [],
    answers: [],
    selectedIndex: -1,
    progressPercent: 0,
    isFinished: false,
    showTimeHint: true,
    usedTime: '0:00',
    startTime: null,
    timer: null
  },
  
  onLoad(options) {
    const { type, index } = options
    this.initTest(type, parseInt(index) || 0)
  },
  
  onShow() {
    // 启动计时器
    this.startTimer()
  },
  
  onHide() {
    this.stopTimer()
  },
  
  onUnload() {
    this.stopTimer()
  },
  
  // 初始化测试
  initTest(type, startIndex = 0) {
    let typeName = ''
    let isFun = false
    
    switch (type) {
      case 'mbti_full':
        typeName = 'MBTI标准版'
        break
      case 'mbti_quick':
        typeName = 'MBTI快速版'
        break
      case 'fun':
        typeName = '趣味测试'
        isFun = true
        break
    }
    
    const questionList = questions.getQuestions(type)
    
    this.setData({
      testType: type,
      testTypeName: typeName,
      isFunTest: isFun,
      totalQuestions: questionList.length,
      currentIndex: startIndex,
      currentQuestion: questionList[startIndex],
      questions: questionList,
      answers: new Array(questionList.length).fill(null),
      progressPercent: ((startIndex + 1) / questionList.length) * 100,
      startTime: Date.now()
    })
    
    // 更新导航栏标题
    wx.setNavigationBarTitle({
      title: typeName
    })
  },
  
  // 选择选项
  selectOption(e) {
    const index = e.currentTarget.dataset.index
    const currentAnswer = this.data.answers[this.data.currentIndex]
    
    // 检查答题速度（防作弊）
    if (currentAnswer === null) {
      this.checkAnswerSpeed()
    }
    
    this.setData({
      selectedIndex: index
    })
    
    // 保存答案
    const answers = this.data.answers
    const question = this.data.currentQuestion
    answers[this.data.currentIndex] = {
      value: question.options[index].value,
      label: question.options[index].label || question.options[index].value
    }
    this.setData({ answers })
  },
  
  // 上一题
  prevQuestion() {
    if (this.data.currentIndex > 0) {
      const newIndex = this.data.currentIndex - 1
      this.goToQuestion(newIndex)
    }
  },
  
  // 下一题
  nextQuestion() {
    if (this.data.selectedIndex === -1) {
      wx.showToast({
        title: '请先选择一个选项',
        icon: 'none'
      })
      return
    }
    
    if (this.data.currentIndex < this.data.totalQuestions - 1) {
      const newIndex = this.data.currentIndex + 1
      this.goToQuestion(newIndex)
    } else {
      this.finishTest()
    }
  },
  
  // 跳转到指定题目
  goToQuestion(index) {
    const question = this.data.questions[index]
    const answer = this.data.answers[index]
    
    // 找到对应的选项索引
    let selectedIndex = -1
    if (answer) {
      const options = question.options
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === answer.value || options[i].label === answer.label) {
          selectedIndex = i
          break
        }
      }
    }
    
    this.setData({
      currentIndex: index,
      currentQuestion: question,
      selectedIndex: selectedIndex,
      progressPercent: ((index + 1) / this.data.totalQuestions) * 100
    })
  },
  
  // 检查答题速度
  checkAnswerSpeed() {
    const now = Date.now()
    const timeDiff = now - (this.lastAnswerTime || now)
    this.lastAnswerTime = now
    
    // 如果答题时间少于1秒，提示
    if (timeDiff < 1000 && this.data.answers.filter(a => a !== null).length > 3) {
      wx.showToast({
        title: '请凭第一感觉作答哦～',
        icon: 'none',
        duration: 1500
      })
    }
  },
  
  // 完成测试
  finishTest() {
    this.stopTimer()
    this.setData({ isFinished: true })
    
    // 计算结果
    setTimeout(() => {
      this.calculateAndNavigate()
    }, 1500)
  },
  
  // 计算结果并跳转
  async calculateAndNavigate() {
    console.log('===== 开始计算结果 =====')
    const { testType, answers, questions } = this.data
    
    console.log('测试类型:', testType)
    console.log('答题数量:', answers.length)
    console.log('题目数量:', questions.length)
    
    let result = {}
    let score = {}
    
    if (testType === 'fun') {
      console.log('计算趣味测试结果...')
      const funResult = personality.calculateFunResult(answers)
      result = {
        type: 'FUN',
        funTag: funResult.tag,
        funEmoji: funResult.emoji,
        funTitle: funResult.title,
        funDesc: funResult.desc,
        funHarsh: funResult.harsh,
        funSuggestion: funResult.suggestion
      }
    } else {
      console.log('计算MBTI测试结果...')
      const mbtiResult = personality.calculateMBTI(answers, questions)
      const typeData = personality.getMBTIType(mbtiResult.type)
      
      result = {
        type: mbtiResult.type,
        scores: mbtiResult.scores,
        percent: mbtiResult.percent,
        ...typeData
      }
      score = mbtiResult.scores
    }
    
    const testRecord = {
      type: testType,
      result: result,
      answers: answers,
      time: Date.now(),
      usedTime: this.data.usedTime,
      score: score
    }
    
    console.log('测试记录已创建:', JSON.stringify(testRecord, null, 2))
    
    app.globalData.currentTest = null
    app.addHistory(testRecord)
    
    console.log('开始调用 saveToCloud...')
    // 等待云端保存完成再跳转
    await this.saveToCloud(testRecord)
    console.log('saveToCloud 调用完成')
    
    console.log('跳转到结果页...')
    wx.redirectTo({
      url: '/pages/result/result'
    })
    console.log('===== 计算结果完成 =====')
  },
  
  // 保存到云端
  async saveToCloud(record) {
    console.log('===== 开始保存到云端 =====')
    console.log('保存的数据:', JSON.stringify(record, null, 2))
    try {
      // 调用云函数保存记录
      console.log('正在调用云函数 saveTestRecord...')
      const res = await cloud.saveTestRecord({
        type: record.type,
        result: record.result,
        usedTime: record.usedTime,
        score: record.score
      })
      
      if (res.success) {
        console.log('云端保存成功:', res.recordId)
      } else {
        console.error('云端保存失败:', res.error)
      }
    } catch (e) {
      console.error('保存到云端异常:', e)
    }
    console.log('===== 保存到云端结束 =====')
  },
  
  // 返回
  goBack() {
    wx.showModal({
      title: '提示',
      content: '确定要退出测试吗？退出后进度将不会保存。',
      confirmText: '退出',
      cancelText: '继续答题',
      success: (res) => {
        if (res.confirm) {
          this.stopTimer()
          wx.navigateBack()
        }
      }
    })
  },
  
  // 启动计时器
  startTimer() {
    if (this.data.timer) return
    
    this.data.startTime = Date.now()
    this.data.timer = setInterval(() => {
      const elapsed = Date.now() - this.data.startTime
      const minutes = Math.floor(elapsed / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)
      this.setData({
        usedTime: `${minutes}:${seconds.toString().padStart(2, '0')}`
      })
    }, 1000)
  },
  
  // 停止计时器
  stopTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer)
      this.data.timer = null
    }
  }
})