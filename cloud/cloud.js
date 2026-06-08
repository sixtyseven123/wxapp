/**
 * 云开发配置文件
 * 使用微信云开发，免服务器
 */

// 云开发环境ID
const CLOUD_ENV = 'your-env-id' // 替换为你的云环境ID

// 云数据库集合名称
const COLLECTIONS = {
  TEST_RECORDS: 'test_records',  // 测试记录
  USER_STATS: 'user_stats'       // 用户统计
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
 * 保存测试记录到云端
 * @param {Object} record - 测试记录
 * @returns {Promise}
 */
async function saveTestRecord(record) {
  try {
    const db = getDB()
    await db.collection(COLLECTIONS.TEST_RECORDS).add({
      data: {
        type: record.type,
        result: record.result,
        usedTime: record.usedTime,
        createTime: db.serverDate(),
        // 匿名ID，不包含用户敏感信息
        anonymousId: getAnonymousId()
      }
    })
    return { success: true }
  } catch (e) {
    console.error('保存云记录失败', e)
    return { success: false, error: e }
  }
}

/**
 * 获取历史记录（从云端）
 * @param {number} limit - 获取数量
 * @returns {Promise}
 */
async function getCloudHistory(limit = 50) {
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
 * 生成匿名ID（基于设备信息，不包含个人敏感信息）
 */
function getAnonymousId() {
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
}

/**
 * 上报用户统计数据（匿名）
 * @param {Object} stats - 统计数据
 */
async function reportStats(stats) {
  try {
    const db = getDB()
    await db.collection(COLLECTIONS.USER_STATS).add({
      data: {
        ...stats,
        anonymousId: getAnonymousId(),
        createTime: db.serverDate()
      }
    })
  } catch (e) {
    console.error('上报统计失败', e)
  }
}

module.exports = {
  CLOUD_ENV,
  COLLECTIONS,
  initCloud,
  getDB,
  saveTestRecord,
  getCloudHistory,
  getAnonymousId,
  reportStats
}