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
  
  const limit = event.limit || 20
  const skip = event.skip || 0
  const filterType = event.filterType // 筛选类型：'all', 'mbti_full', 'mbti_quick', 'fun'
  const startDate = event.startDate // 开始日期（时间戳）
  const endDate = event.endDate // 结束日期（时间戳）

  try {
    // 构建查询条件
    let query = db.collection('test_records').where({ _openid: openid })

    // 按类型筛选
    if (filterType && filterType !== 'all') {
      query = query.where({ type: filterType })
    }

    // 按日期范围筛选
    if (startDate || endDate) {
      let dateQuery = {}
      if (startDate) {
        dateQuery.createTime = _.gte(new Date(startDate))
      }
      if (endDate) {
        dateQuery.createTime = dateQuery.createTime 
          ? _.and(dateQuery.createTime, _.lte(new Date(endDate)))
          : _.lte(new Date(endDate))
      }
      query = query.where(dateQuery)
    }

    // 获取记录总数（用于分页）
    const countRes = await query.count()
    const total = countRes.total

    // 执行查询
    const res = await query
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
      total: total,
      stats: statsRes.data[0] || null,
      openid: openid
    }
  } catch (err) {
    console.error('获取历史记录失败:', err)
    return {
      success: false,
      error: err.message || err,
      records: [],
      total: 0,
      stats: null
    }
  }
}