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
  const updateData = event.updateData

  if (!recordId) {
    return {
      success: false,
      error: '缺少记录ID'
    }
  }

  if (!updateData || typeof updateData !== 'object') {
    return {
      success: false,
      error: '更新数据格式错误'
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

    // 过滤不允许更新的字段
    const allowedFields = ['result', 'score', 'usedTime']
    const filteredData = {}
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        filteredData[key] = updateData[key]
      }
    }

    if (Object.keys(filteredData).length === 0) {
      return {
        success: false,
        error: '没有可更新的字段'
      }
    }

    filteredData.updateTime = db.serverDate()

    // 更新记录
    await db.collection('test_records')
      .doc(recordId)
      .update({ data: filteredData })

    return {
      success: true,
      message: '更新成功'
    }
  } catch (err) {
    console.error('更新记录失败:', err)
    return {
      success: false,
      error: err.message || err
    }
  }
}