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
  const recordId = event.recordId

  if (!recordId) {
    return {
      success: false,
      error: '缺少记录ID'
    }
  }

  try {
    // 先查询记录，验证所有权
    const recordRes = await db.collection('test_records')
      .doc(recordId)
      .get()

    if (!recordRes.data || recordRes.data._openid !== openid) {
      return {
        success: false,
        error: '无权操作此记录'
      }
    }

    // 删除记录
    await db.collection('test_records')
      .doc(recordId)
      .remove()

    // 更新用户统计
    const statsRes = await db.collection('user_stats')
      .where({ _openid: openid })
      .get()

    if (statsRes.data.length > 0) {
      const existingStats = statsRes.data[0]
      const updateData = {
        totalTests: Math.max(0, existingStats.totalTests - 1),
        updateTime: db.serverDate()
      }

      // 根据测试类型更新对应计数
      const deletedType = recordRes.data.type
      if (deletedType === 'mbti_full') {
        updateData.mbtiFullCount = Math.max(0, existingStats.mbtiFullCount - 1)
      } else if (deletedType === 'mbti_quick') {
        updateData.mbtiQuickCount = Math.max(0, existingStats.mbtiQuickCount - 1)
      } else if (deletedType === 'fun') {
        updateData.funTestCount = Math.max(0, existingStats.funTestCount - 1)
      }

      await db.collection('user_stats')
        .doc(existingStats._id)
        .update({ data: updateData })
    }

    return {
      success: true,
      message: '删除成功'
    }
  } catch (err) {
    console.error('删除记录失败:', err)
    return {
      success: false,
      error: err.message || err
    }
  }
}