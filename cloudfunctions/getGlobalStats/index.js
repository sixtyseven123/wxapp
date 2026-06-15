// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取全局统计
    const globalRes = await db.collection('global_stats')
      .doc('global')
      .get()
    
    if (!globalRes.data) {
      return {
        success: true,
        stats: {
          totalTests: 0,
          typeDistribution: {},
          updateTime: null
        }
      }
    }
    
    // 计算人格类型排名
    const typeDistribution = globalRes.data.typeDistribution || {}
    const sortedTypes = Object.entries(typeDistribution)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({ type, count }))
    
    return {
      success: true,
      stats: {
        totalTests: globalRes.data.totalTests,
        typeDistribution: typeDistribution,
        sortedTypes: sortedTypes,
        updateTime: globalRes.data.updateTime
      }
    }
  } catch (err) {
    console.error('获取全局统计失败:', err)
    return {
      success: false,
      error: err.message || err,
      stats: null
    }
  }
}