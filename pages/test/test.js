const app = getApp()
const questions = require('../../utils/questions.js')
const personality = require('../../utils/personality.js')

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
  calculateAndNavigate() {
    const { testType, answers, questions } = this.data
    
    let result = {}
    
    if (testType === 'fun') {
      // 趣味测试结果
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
      // MBTI测试结果
      const mbtiResult = personality.calculateMBTI(answers, questions)
      const typeData = personality.getMBTIType(mbtiResult.type)
      
      result = {
        type: mbtiResult.type,
        scores: mbtiResult.scores,
        percent: mbtiResult.percent,
        ...typeData
      }
    }
    
    // 保存结果
    const testRecord = {
      type: testType,
      result: result,
      answers: answers,
      time: Date.now(),
      usedTime: this.data.usedTime
    }
    
    // 保存到全局数据
    app.globalData.currentTest = null
    app.addHistory(testRecord)
    
    // 跳转到结果页
    wx.redirectTo({
      url: '/pages/result/result'
    })
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