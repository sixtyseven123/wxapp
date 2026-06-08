/**
 * 通用工具函数
 */

/**
 * 格式化日期时间
 * @param {Date|number} date - 日期或时间戳
 * @param {string} format - 格式字符串
 * @returns {string}
 */
function formatTime(date, format = 'YYYY-MM-DD HH:mm') {
  const d = typeof date === 'number' ? new Date(date) : date
  const year = d.getFullYear()
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
}

/**
 * 格式化时长
 * @param {number} ms - 毫秒数
 * @returns {string}
 */
function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * 深拷贝对象
 * @param {Object} obj - 原对象
 * @returns {Object}
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  
  const cloned = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  return cloned
}

/**
 * 防抖函数
 * @param {Function} fn - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function}
 */
function debounce(fn, delay = 300) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param {Function} fn - 要节流的函数
 * @param {number} delay - 间隔时间（毫秒）
 * @returns {Function}
 */
function throttle(fn, delay = 300) {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

/**
 * 显示加载提示
 * @param {string} title - 提示文字
 * @param {boolean} mask - 是否显示遮罩
 */
function showLoading(title = '加载中...', mask = true) {
  wx.showLoading({
    title,
    mask
  })
}

/**
 * 隐藏加载提示
 */
function hideLoading() {
  wx.hideLoading()
}

/**
 * 显示成功提示
 * @param {string} title - 提示文字
 */
function showSuccess(title = '成功') {
  wx.showToast({
    title,
    icon: 'success',
    duration: 1500
  })
}

/**
 * 显示错误提示
 * @param {string} title - 提示文字
 */
function showError(title = '出错了') {
  wx.showToast({
    title,
    icon: 'none',
    duration: 2000
  })
}

/**
 * 显示确认对话框
 * @param {Object} options - 配置选项
 * @returns {Promise}
 */
function showConfirm(options) {
  return new Promise((resolve) => {
    wx.showModal({
      title: options.title || '提示',
      content: options.content || '',
      confirmText: options.confirmText || '确定',
      cancelText: options.cancelText || '取消',
      confirmColor: options.confirmColor || '#7B68EE',
      success: (res) => {
        resolve(res.confirm)
      }
    })
  })
}

/**
 * 获取页面实例
 * @param {string} url - 页面路径
 * @returns {Object|null}
 */
function getPageInstance(url) {
  const pages = getCurrentPages()
  const mainPage = pages.find(p => p.route.includes(url.split('?')[0]))
  return mainPage || null
}

/**
 * 生成唯一ID
 * @returns {string}
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

module.exports = {
  formatTime,
  formatDuration,
  deepClone,
  debounce,
  throttle,
  showLoading,
  hideLoading,
  showSuccess,
  showError,
  showConfirm,
  getPageInstance,
  generateId
}