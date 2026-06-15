/**
 * 云开发配置文件
 * 使用微信云开发，免服务器
 */

// 云开发环境ID
const CLOUD_ENV = 'cloud1-d4gzz9udge5b86e5e' // 云环境ID

// 云数据库集合名称
const COLLECTIONS = {
  TEST_RECORDS: 'test_records',  // 测试记录
  USER_STATS: 'user_stats',      // 用户统计
  GLOBAL_STATS: 'global_stats'   // 全局统计
}

/**
 * 初始化云开发
 */
function initCloud() {
  if (wx.cloud) {
    wx.cloud.init({
      env: CLOUD_ENV,
      traceUser: true
    })
  }
}

/**
 * 获取云数据库引用
 */
function getDB() {
  return wx.cloud.database({
    env: CLOUD_ENV
  })
}

/**
 * 调用云函数保存测试记录
 * @param {Object} record - 测试记录
 * @returns {Promise}
 */
async function saveTestRecord(record) {
  try {
    const res = await wx.cloud.callFunction({
      name: 'saveRecord',
      data: {
        type: record.type,
        result: record.result,
        usedTime: record.usedTime,
        score: record.score || {}
      }
    })
    
    if (res.result && res.result.success) {
      return { success: true, recordId: res.result.recordId }
    } else {
      return { success: false, error: res.result?.error || '保存失败' }
    }
  } catch (e) {
    console.error('调用云函数保存记录失败', e)
    // 降级：直接保存到数据库
    return saveTestRecordFallback(record)
  }
}

/**
 * 降级方案：直接保存到数据库
 */
async function saveTestRecordFallback(record) {
  try {
    const db = getDB()
    const res = await db.collection(COLLECTIONS.TEST_RECORDS).add({
      data: {
        type: record.type,
        result: record.result,
        usedTime: record.usedTime,
        score: record.score || {},
        createTime: db.serverDate(),
        // 小程序端add操作会自动添加_openid字段
      }
    })
    console.log('降级方案保存成功:', res._id)
    return { success: true, recordId: res._id }
  } catch (e) {
    console.error('保存云记录失败', e)
    // 如果权限错误，尝试使用匿名ID
    if (e.errMsg && e.errMsg.includes('permission')) {
      console.log('权限不足，尝试使用匿名保存')
      return saveTestRecordAnonymous(record)
    }
    return { success: false, error: e }
  }
}

/**
 * 匿名保存方案（当权限不足时使用）
 */
async function saveTestRecordAnonymous(record) {
  try {
    const db = getDB()
    const res = await db.collection(COLLECTIONS.TEST_RECORDS).add({
      data: {
        type: record.type,
        result: record.result,
        usedTime: record.usedTime,
        score: record.score || {},
        createTime: db.serverDate(),
        _openid: getAnonymousId() // 使用匿名ID
      }
    })
    console.log('匿名保存成功:', res._id)
    return { success: true, recordId: res._id }
  } catch (e) {
    console.error('匿名保存失败', e)
    return { success: false, error: e }
  }
}

/**
 * 调用云函数获取用户历史记录
 * @param {number} limit - 获取数量
 * @param {number} skip - 跳过数量
 * @returns {Promise}
 */
async function getCloudHistory(limit = 50, skip = 0) {
  try {
    const res = await wx.cloud.callFunction({
      name: 'getUserHistory',
      data: { limit, skip }
    })
    
    if (res.result && res.result.success) {
      return { 
        success: true, 
        data: res.result.records,
        stats: res.result.stats
      }
    } else {
      return { success: false, error: res.result?.error || '获取失败' }
    }
  } catch (e) {
    console.error('调用云函数获取历史失败', e)
    // 降级：直接查询数据库
    return getCloudHistoryFallback(limit)
  }
}

/**
 * 降级方案：直接查询数据库
 */
async function getCloudHistoryFallback(limit = 50) {
  try {
    const db = getDB()
    const res = await db.collection(COLLECTIONS.TEST_RECORDS)
      .orderBy('createTime', 'desc')
      .limit(limit)
      .get()
    return { success: true, data: res.data }
  } catch (e) {
    console.error('获取云记录失败', e)
    return { success: false, error: e }
  }
}

/**
 * 获取全局统计数据
 * @returns {Promise}
 */
async function getGlobalStats() {
  try {
    const res = await wx.cloud.callFunction({
      name: 'getGlobalStats',
      data: {}
    })
    
    if (res.result && res.result.success) {
      return { success: true, stats: res.result.stats }
    } else {
      return { success: false, error: res.result?.error || '获取失败' }
    }
  } catch (e) {
    console.error('获取全局统计失败', e)
    return { success: false, error: e }
  }
}

/**
 * 生成匿名ID（基于设备信息，不包含个人敏感信息）
 */
function getAnonymousId() {
  try {
    const systemInfo = wx.getSystemInfoSync()
    const seed = systemInfo.brand + systemInfo.model + systemInfo.platform
    // 简单的哈希函数
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return 'ANON_' + Math.abs(hash).toString(36)
  } catch (e) {
    return 'ANON_' + Date.now().toString(36)
  }
}

/**
 * 检查云开发是否可用
 */
function isCloudAvailable() {
  return typeof wx !== 'undefined' && wx.cloud && typeof wx.cloud.callFunction === 'function'
}

module.exports = {
  CLOUD_ENV,
  COLLECTIONS,
  initCloud,
  getDB,
  saveTestRecord,
  getCloudHistory,
  getGlobalStats,
  getAnonymousId,
  isCloudAvailable
}