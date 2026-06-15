// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  
  try {
    // 保存测试记录
    const recordData = {
      type: event.type,
      result: event.result,
      usedTime: event.usedTime,
      score: event.score || {},
      createTime: db.serverDate(),
      _openid: openid
    }
    
    const recordRes = await db.collection('test_records').add({
      data: recordData
    })
    
    // 更新用户统计
    const userStatsRes = await db.collection('user_stats')
      .where({ _openid: openid })
      .get()
    
    if (userStatsRes.data.length > 0) {
      // 已有记录，更新
      const existingStats = userStatsRes.data[0]
      const updateData = {
        totalTests: existingStats.totalTests + 1,
        lastTestTime: db.serverDate(),
        updateTime: db.serverDate()
      }
      
      // 根据测试类型更新对应计数
      if (event.type === 'mbti_full') {
        updateData.mbtiFullCount = existingStats.mbtiFullCount + 1
      } else if (event.type === 'mbti_quick') {
        updateData.mbtiQuickCount = existingStats.mbtiQuickCount + 1
      } else if (event.type === 'fun') {
        updateData.funTestCount = existingStats.funTestCount + 1
      }
      
      await db.collection('user_stats')
        .doc(existingStats._id)
        .update({ data: updateData })
    } else {
      // 新用户，创建统计记录
      const newStats = {
        _openid: openid,
        totalTests: 1,
        mbtiFullCount: event.type === 'mbti_full' ? 1 : 0,
        mbtiQuickCount: event.type === 'mbti_quick' ? 1 : 0,
        funTestCount: event.type === 'fun' ? 1 : 0,
        lastTestTime: db.serverDate(),
        createTime: db.serverDate(),
        updateTime: db.serverDate()
      }
      
      await db.collection('user_stats').add({ data: newStats })
    }
    
    // 更新全局统计
    await updateGlobalStats(event.type, event.result.type)
    
    return {
      success: true,
      recordId: recordRes._id,
      openid: openid
    }
  } catch (err) {
    console.error('保存记录失败:', err)
    return {
      success: false,
      error: err.message || err
    }
  }
}

// 更新全局统计
async function updateGlobalStats(testType, mbtiType) {
  try {
    const globalRes = await db.collection('global_stats')
      .doc('global')
      .get()
    
    if (globalRes.data && globalRes.data.length > 0) {
      const globalData = globalRes.data[0]
      const typeDistribution = globalData.typeDistribution || {}
      
      // 更新人格类型分布
      if (mbtiType && testType !== 'fun') {
        typeDistribution[mbtiType] = (typeDistribution[mbtiType] || 0) + 1
      }
      
      await db.collection('global_stats')
        .doc('global')
        .update({
          data: {
            totalTests: globalData.totalTests + 1,
            typeDistribution: typeDistribution,
            updateTime: db.serverDate()
          }
        })
    } else {
      // 初始化全局统计
      const typeDistribution = {}
      if (mbtiType && testType !== 'fun') {
        typeDistribution[mbtiType] = 1
      }
      
      await db.collection('global_stats').add({
        data: {
          _id: 'global',
          totalTests: 1,
          typeDistribution: typeDistribution,
          updateTime: db.serverDate()
        }
      })
    }
  } catch (err) {
    console.error('更新全局统计失败:', err)
  }
}