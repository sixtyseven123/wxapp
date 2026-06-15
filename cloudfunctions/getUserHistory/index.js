// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  
  const limit = event.limit || 20
  const skip = event.skip || 0
  
  try {
    // 获取用户测试历史记录
    const res = await db.collection('test_records')
      .where({ _openid: openid })
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(limit)
      .get()
    
    // 获取用户统计信息
    const statsRes = await db.collection('user_stats')
      .where({ _openid: openid })
      .get()
    
    return {
      success: true,
      records: res.data,
      total: res.data.length,
      stats: statsRes.data[0] || null,
      openid: openid
    }
  } catch (err) {
    console.error('获取历史记录失败:', err)
    return {
      success: false,
      error: err.message || err,
      records: [],
      stats: null
    }
  }
}