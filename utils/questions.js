/**
 * MBTI人格测试题库
 * 包含：标准版93题、快速版20题、趣味测试15题
 */

// MBTI 维度说明
// E/I - 外向/内向
// S/N - 感觉/直觉  
// T/F - 思考/情感
// J/P - 判断/知觉

/**
 * 题目选项
 * value: 选项分值 (1-5)
 * dimension: 对应维度
 * direction: +1表示正向计分，-1表示反向计分
 */
const options = [
  { text: '非常不同意', value: 1, label: 'A' },
  { text: '不同意', value: 2, label: 'B' },
  { text: '中立', value: 3, label: 'C' },
  { text: '同意', value: 4, label: 'D' },
  { text: '非常同意', value: 5, label: 'E' }
]

// MBTI 标准版 93题
const mbtiFullQuestions = [
  // ===== E/I 维度 (约23题) =====
  {
    id: 1,
    dimension: 'EI',
    text: '在社交聚会中，我通常是主动与人交谈的那个人',
    options: options
  },
  {
    id: 2,
    dimension: 'EI',
    text: '我更喜欢独自工作而不是团队协作',
    options: options
  },
  {
    id: 3,
    dimension: 'EI',
    text: '我很容易和陌生人打开话题',
    options: options
  },
  {
    id: 4,
    dimension: 'EI',
    text: '独处时我会感到精力充沛',
    options: options
  },
  {
    id: 5,
    dimension: 'EI',
    text: '我倾向于在行动前先思考',
    options: options
  },
  {
    id: 6,
    dimension: 'EI',
    text: '我喜欢同时处理多个任务',
    options: options
  },
  {
    id: 7,
    dimension: 'EI',
    text: '我很容易感到无聊如果长时间没有刺激',
    options: options
  },
  {
    id: 8,
    dimension: 'EI',
    text: '我倾向于先把想法说出来再思考',
    options: options
  },
  {
    id: 9,
    dimension: 'EI',
    text: '我更喜欢小群体深度交流而不是大派对',
    options: options
  },
  {
    id: 10,
    dimension: 'EI',
    text: '被人关注让我感到兴奋而不是紧张',
    options: options
  },
  {
    id: 11,
    dimension: 'EI',
    text: '我需要时间来恢复精力，因为社交让我疲惫',
    options: options
  },
  {
    id: 12,
    dimension: 'EI',
    text: '我善于发起项目或活动',
    options: options
  },
  {
    id: 13,
    dimension: 'EI',
    text: '一个人的夜晚有时比派对更吸引我',
    options: options
  },
  {
    id: 14,
    dimension: 'EI',
    text: '我倾向于边做边想，而不是先想后做',
    options: options
  },
  {
    id: 15,
    dimension: 'EI',
    text: '我喜欢即兴发挥而不是严格按照计划行事',
    options: options
  },
  
  // ===== S/N 维度 (约23题) =====
  {
    id: 16,
    dimension: 'SN',
    text: '我更关注现实可行的细节而不是抽象理论',
    options: options
  },
  {
    id: 17,
    dimension: 'SN',
    text: '我喜欢尝试新想法和新方式',
    options: options
  },
  {
    id: 18,
    dimension: 'SN',
    text: '我容易注意到环境中的细节变化',
    options: options
  },
  {
    id: 19,
    dimension: 'SN',
    text: '我更相信经验而不是直觉',
    options: options
  },
  {
    id: 20,
    dimension: 'SN',
    text: '我容易被抽象概念吸引',
    options: options
  },
  {
    id: 21,
    dimension: 'SN',
    text: '我更喜欢具体明确的指示而不是模糊的指引',
    options: options
  },
  {
    id: 22,
    dimension: 'SN',
    text: '我经常思考未来的可能性',
    options: options
  },
  {
    id: 23,
    dimension: 'SN',
    text: '我擅长记忆事实和细节',
    options: options
  },
  {
    id: 24,
    dimension: 'SN',
    text: '我更喜欢务实的问题解决方法',
    options: options
  },
  {
    id: 25,
    dimension: 'SN',
    text: '我容易被隐喻和象征所吸引',
    options: options
  },
  {
    id: 26,
    dimension: 'SN',
    text: '我更看重实际成果而不是过程体验',
    options: options
  },
  {
    id: 27,
    dimension: 'SN',
    text: '我相信"第六感"有时候是准确的',
    options: options
  },
  {
    id: 28,
    dimension: 'SN',
    text: '我容易注意到事物运作方式的规律',
    options: options
  },
  {
    id: 29,
    dimension: 'SN',
    text: '我更喜欢学习已验证的方法而不是创新',
    options: options
  },
  {
    id: 30,
    dimension: 'SN',
    text: '我经常思考人生的意义和可能性',
    options: options
  },
  
  // ===== T/F 维度 (约23题) =====
  {
    id: 31,
    dimension: 'TF',
    text: '做决定时，我更看重逻辑而不是人情',
    options: options
  },
  {
    id: 32,
    dimension: 'TF',
    text: '我很容易被他人的情感所感染',
    options: options
  },
  {
    id: 33,
    dimension: 'TF',
    text: '我倾向于坦诚表达自己的想法，即使可能伤害他人',
    options: options
  },
  {
    id: 34,
    dimension: 'TF',
    text: '我更愿意给人第二次机会',
    options: options
  },
  {
    id: 35,
    dimension: 'TF',
    text: '在争论中，我更关心真相而不是谁对谁错',
    options: options
  },
  {
    id: 36,
    dimension: 'TF',
    text: '我经常需要考虑他人的感受来做出决定',
    options: options
  },
  {
    id: 37,
    dimension: 'TF',
    text: '我倾向于客观评价人和事',
    options: options
  },
  {
    id: 38,
    dimension: 'TF',
    text: '我很难对他人说"不"',
    options: options
  },
  {
    id: 39,
    dimension: 'TF',
    text: '我更重视公平而不是仁慈',
    options: options
  },
  {
    id: 40,
    dimension: 'TF',
    text: '我容易被别人的故事所感动',
    options: options
  },
  {
    id: 41,
    dimension: 'TF',
    text: '我倾向于用因果关系来解释事情',
    options: options
  },
  {
    id: 42,
    dimension: 'TF',
    text: '我更愿意理解他人的立场而不是争辩',
    options: options
  },
  {
    id: 43,
    dimension: 'TF',
    text: '我为自己的理性而自豪',
    options: options
  },
  {
    id: 44,
    dimension: 'TF',
    text: '我善于察觉他人的情绪变化',
    options: options
  },
  {
    id: 45,
    dimension: 'TF',
    text: '我更看重效率而不是完美的执行',
    options: options
  },
  
  // ===== J/P 维度 (约23题) =====
  {
    id: 46,
    dimension: 'JP',
    text: '我喜欢提前计划并遵守日程',
    options: options
  },
  {
    id: 47,
    dimension: 'JP',
    text: '我更喜欢随性而为而不是固定日程',
    options: options
  },
  {
    id: 48,
    dimension: 'JP',
    text: '我经常列清单并按优先级完成任务',
    options: options
  },
  {
    id: 49,
    dimension: 'JP',
    text: '截止日期的压力通常能激发我的创造力',
    options: options
  },
  {
    id: 50,
    dimension: 'JP',
    text: '我倾向于让事情自然发展而不是强行控制',
    options: options
  },
  {
    id: 51,
    dimension: 'JP',
    text: '我无法忍受混乱和不确定性',
    options: options
  },
  {
    id: 52,
    dimension: 'JP',
    text: '我喜欢把选项保留到最后再做决定',
    options: options
  },
  {
    id: 53,
    dimension: 'JP',
    text: '我倾向于完成任务后再享受娱乐',
    options: options
  },
  {
    id: 54,
    dimension: 'JP',
    text: '我享受有突发事件打破日常计划',
    options: options
  },
  {
    id: 55,
    dimension: 'JP',
    text: '我更喜欢有明确目标的工作',
    options: options
  },
  {
    id: 56,
    dimension: 'JP',
    text: '我能够轻松适应计划的变化',
    options: options
  },
  {
    id: 57,
    dimension: 'JP',
    text: '我希望生活有更多的结构和秩序',
    options: options
  },
  {
    id: 58,
    dimension: 'JP',
    text: '我更喜欢开放结局的故事而不是确定结局',
    options: options
  },
  {
    id: 59,
    dimension: 'JP',
    text: '我总是试图提前预判并做好准备',
    options: options
  },
  {
    id: 60,
    dimension: 'JP',
    text: '我更愿意说"到时候再说"而不是现在就决定',
    options: options
  },
  
  // ===== 补充题目（继续4个维度各3题，共12题凑够93题） =====
  
  // E/I 补充
  {
    id: 61,
    dimension: 'EI',
    text: '我很容易在人群中成为焦点',
    options: options
  },
  {
    id: 62,
    dimension: 'EI',
    text: '我倾向于先听后说',
    options: options
  },
  {
    id: 63,
    dimension: 'EI',
    text: '我会主动联系朋友而不是等待他们联系我',
    options: options
  },
  
  // S/N 补充
  {
    id: 64,
    dimension: 'SN',
    text: '我更容易被具体例子而不是抽象概念说服',
    options: options
  },
  {
    id: 65,
    dimension: 'SN',
    text: '我经常思考事物背后的深层含义',
    options: options
  },
  {
    id: 66,
    dimension: 'SN',
    text: '我更看重创新性想法而不是实用性',
    options: options
  },
  
  // T/F 补充
  {
    id: 67,
    dimension: 'TF',
    text: '我倾向于用分析来理解问题而不是感受',
    options: options
  },
  {
    id: 68,
    dimension: 'TF',
    text: '我更容易被理性论证而不是情感诉求说服',
    options: options
  },
  {
    id: 69,
    dimension: 'TF',
    text: '我认为对就是对，错就是错，没有中间地带',
    options: options
  },
  
  // J/P 补充
  {
    id: 70,
    dimension: 'JP',
    text: '我倾向于井井有条地安排生活',
    options: options
  },
  {
    id: 71,
    dimension: 'JP',
    text: '我更喜欢有所准备而不是即兴发挥',
    options: options
  },
  {
    id: 72,
    dimension: 'JP',
    text: '我喜欢同时开始多个项目而不是一次做一个',
    options: options
  },
  
  // ===== 继续增加题目（凑足93题） =====
  {
    id: 73,
    dimension: 'EI',
    text: '我觉得社交是必要的能量来源',
    options: options
  },
  {
    id: 74,
    dimension: 'EI',
    text: '我倾向于独自解决问题',
    options: options
  },
  {
    id: 75,
    dimension: 'EI',
    text: '我享受在人群中发表观点',
    options: options
  },
  {
    id: 76,
    dimension: 'SN',
    text: '我更关注此时此刻而不是未来可能性',
    options: options
  },
  {
    id: 77,
    dimension: 'SN',
    text: '我容易被新鲜事物所吸引',
    options: options
  },
  {
    id: 78,
    dimension: 'SN',
    text: '我相信灵感和直觉',
    options: options
  },
  {
    id: 79,
    dimension: 'TF',
    text: '做决定时，我优先考虑逻辑后果',
    options: options
  },
  {
    id: 80,
    dimension: 'TF',
    text: '我倾向于避免冲突和对抗',
    options: options
  },
  {
    id: 81,
    dimension: 'TF',
    text: '我更在乎别人怎么看待我的决定',
    options: options
  },
  {
    id: 82,
    dimension: 'JP',
    text: '我会严格执行计划，不轻易改变',
    options: options
  },
  {
    id: 83,
    dimension: 'JP',
    text: '我享受探索未知的乐趣',
    options: options
  },
  {
    id: 84,
    dimension: 'JP',
    text: '我倾向于推迟决定直到最后一刻',
    options: options
  },
  {
    id: 85,
    dimension: 'EI',
    text: '我善于在会议上引导讨论方向',
    options: options
  },
  {
    id: 86,
    dimension: 'EI',
    text: '我更喜欢书面交流而不是面对面沟通',
    options: options
  },
  {
    id: 87,
    dimension: 'SN',
    text: '我倾向于遵循传统方法而不是尝试新方法',
    options: options
  },
  {
    id: 88,
    dimension: 'SN',
    text: '我容易被创意和想象所打动',
    options: options
  },
  {
    id: 89,
    dimension: 'TF',
    text: '我倾向于隐藏自己的情感',
    options: options
  },
  {
    id: 90,
    dimension: 'TF',
    text: '我善于调解他人之间的矛盾',
    options: options
  },
  {
    id: 91,
    dimension: 'JP',
    text: '我喜欢提前很久做计划',
    options: options
  },
  {
    id: 92,
    dimension: 'JP',
    text: '我接受不确定性作为生活的一部分',
    options: options
  },
  {
    id: 93,
    dimension: 'EI',
    text: '我经常主动发起社交活动',
    options: options
  }
]

// MBTI 快速版 20题
const mbtiQuickQuestions = [
  {
    id: 1,
    dimension: 'EI',
    text: '在社交场合，我通常是主动与人交谈的那个人',
    options: options
  },
  {
    id: 2,
    dimension: 'EI',
    text: '独处时我会感到精力充沛',
    options: options
  },
  {
    id: 3,
    dimension: 'SN',
    text: '我更关注现实可行的细节而不是抽象理论',
    options: options
  },
  {
    id: 4,
    dimension: 'SN',
    text: '我喜欢尝试新想法和新方式',
    options: options
  },
  {
    id: 5,
    dimension: 'TF',
    text: '做决定时，我更看重逻辑而不是人情',
    options: options
  },
  {
    id: 6,
    dimension: 'TF',
    text: '我很容易被他人的情感所感染',
    options: options
  },
  {
    id: 7,
    dimension: 'JP',
    text: '我喜欢提前计划并遵守日程',
    options: options
  },
  {
    id: 8,
    dimension: 'JP',
    text: '我更喜欢随性而为而不是固定日程',
    options: options
  },
  {
    id: 9,
    dimension: 'EI',
    text: '我很容易和陌生人打开话题',
    options: options
  },
  {
    id: 10,
    dimension: 'SN',
    text: '我容易注意到环境中的细节变化',
    options: options
  },
  {
    id: 11,
    dimension: 'TF',
    text: '我倾向于坦诚表达自己的想法，即使可能伤害他人',
    options: options
  },
  {
    id: 12,
    dimension: 'JP',
    text: '我经常列清单并按优先级完成任务',
    options: options
  },
  {
    id: 13,
    dimension: 'EI',
    text: '我需要时间来恢复精力，因为社交让我疲惫',
    options: options
  },
  {
    id: 14,
    dimension: 'SN',
    text: '我更喜欢务实的问题解决方法',
    options: options
  },
  {
    id: 15,
    dimension: 'TF',
    text: '我经常需要考虑他人的感受来做出决定',
    options: options
  },
  {
    id: 16,
    dimension: 'JP',
    text: '我倾向于让事情自然发展而不是强行控制',
    options: options
  },
  {
    id: 17,
    dimension: 'EI',
    text: '我善于发起项目或活动',
    options: options
  },
  {
    id: 18,
    dimension: 'SN',
    text: '我相信"第六感"有时候是准确的',
    options: options
  },
  {
    id: 19,
    dimension: 'TF',
    text: '我倾向于客观评价人和事',
    options: options
  },
  {
    id: 20,
    dimension: 'JP',
    text: '我无法忍受混乱和不确定性',
    options: options
  }
]

// 趣味人格测试 15题
const funQuestions = [
  {
    id: 1,
    type: 'tag',
    text: '早上醒来，你的第一反应是？',
    options: [
      { text: '看手机，有没有什么消息', value: 'A' },
      { text: '再睡五分钟...', value: 'B' },
      { text: '想想今天要穿什么', value: 'C' },
      { text: '直接跳起来开始忙', value: 'D' }
    ]
  },
  {
    id: 2,
    type: 'tag',
    text: '排队时你会做什么？',
    options: [
      { text: '刷手机，绝对不能浪费一分钟', value: 'A' },
      { text: '观察周围的人在想什么', value: 'B' },
      { text: '和旁边的人聊天', value: 'C' },
      { text: '发呆放空，享受当下', value: 'D' }
    ]
  },
  {
    id: 3,
    type: 'tag',
    text: '你点的外卖迟迟不到，正确的反应是？',
    options: [
      { text: '疯狂刷新骑手位置', value: 'A' },
      { text: '已经开始写差评腹稿了', value: 'B' },
      { text: '算了，饿着也挺好', value: 'C' },
      { text: '打电话给商家投诉', value: 'D' }
    ]
  },
  {
    id: 4,
    type: 'tag',
    text: '在群里聊天，你一般是？',
    options: [
      { text: '话痨本痨，消息秒回', value: 'A' },
      { text: '看完所有消息，但只挑感兴趣的回', value: 'B' },
      { text: '万年潜水，只看不说话', value: 'C' },
      { text: '专门负责发表情包', value: 'D' }
    ]
  },
  {
    id: 5,
    type: 'tag',
    text: '看到一个人，你第一眼会注意哪里？',
    options: [
      { text: '脸，好不好看', value: 'A' },
      { text: '穿着，有没有品位', value: 'B' },
      { text: '气质，感觉对不对', value: 'C' },
      { text: '鞋子，干不干净', value: 'D' }
    ]
  },
  {
    id: 6,
    type: 'tag',
    text: '你的房间通常是什么样子的？',
    options: [
      { text: '极简风，空无一物', value: 'A' },
      { text: '乱中有序，每样东西都知道在哪', value: 'B' },
      { text: '东西堆成山，但这是我的秩序', value: 'C' },
      { text: '定期断舍离，扔到只剩必需品', value: 'D' }
    ]
  },
  {
    id: 7,
    type: 'tag',
    text: '周末你更喜欢？',
    options: [
      { text: '出门社交，认识新朋友', value: 'A' },
      { text: '在家追剧，谁也别约我', value: 'B' },
      { text: '去健身房/图书馆，假装很上进', value: 'C' },
      { text: '来一场说走就走的旅行', value: 'D' }
    ]
  },
  {
    id: 8,
    type: 'tag',
    text: '你买衣服通常是因为？',
    options: [
      { text: '确实需要，顺便看到就买了', value: 'A' },
      { text: '心情不好，购物治愈', value: 'B' },
      { text: '这件衣服在对我招手，不买会后悔', value: 'C' },
      { text: '衣柜永远少一件衣服', value: 'D' }
    ]
  },
  {
    id: 9,
    type: 'tag',
    text: '朋友向你倾诉烦恼，你的反应是？',
    options: [
      { text: '疯狂共情，一起骂那个人', value: 'A' },
      { text: '分析问题，给出解决方案', value: 'B' },
      { text: '认真倾听，适时点头', value: 'C' },
      { text: '表面安慰，心里在想晚饭吃什么', value: 'D' }
    ]
  },
  {
    id: 10,
    type: 'tag',
    text: '你对自己的评价是？',
    options: [
      { text: '社交达人，人见人爱', value: 'A' },
      { text: '理性达人，逻辑怪物', value: 'B' },
      { text: '佛系达人，与世无争', value: 'C' },
      { text: '宅家达人，能不出门就不出门', value: 'D' }
    ]
  },
  {
    id: 11,
    type: 'tag',
    text: '你做梦通常梦见什么？',
    options: [
      { text: '考试/工作压力场景', value: 'A' },
      { text: '帅哥美女/偶像剧情节', value: 'B' },
      { text: '妖魔鬼怪，追逐逃亡', value: 'C' },
      { text: '几乎不做梦，睡眠质量超好', value: 'D' }
    ]
  },
  {
    id: 12,
    type: 'tag',
    text: '你吃东西更在意？',
    options: [
      { text: '味道好不好吃', value: 'A' },
      { text: '热量高不高，会不会胖', value: 'B' },
      { text: '拍照好不好看，要发朋友圈的', value: 'C' },
      { text: '能吃饱就行，活着就行', value: 'D' }
    ]
  },
  {
    id: 13,
    type: 'tag',
    text: '在餐厅里，你是？',
    options: [
      { text: '点菜前先问服务员推荐', value: 'A' },
      { text: '直接点最贵的那道', value: 'B' },
      { text: '永远点老三样，不踩雷', value: 'C' },
      { text: '看菜单研究半天，最后选了第一个', value: 'D' }
    ]
  },
  {
    id: 14,
    type: 'tag',
    text: '你更害怕失去什么？',
    options: [
      { text: '手机没电/没网', value: 'A' },
      { text: '身边人的认可', value: 'B' },
      { text: '自由选择的权利', value: 'C' },
      { text: '银行卡里的余额', value: 'D' }
    ]
  },
  {
    id: 15,
    type: 'tag',
    text: '有人说你"你怎么这么..."，你最不希望听到什么？',
    options: [
      { text: '你怎么这么内向/闷', value: 'A' },
      { text: '你怎么这么矫情/玻璃心', value: 'B' },
      { text: '你怎么这么懒/不上进', value: 'C' },
      { text: '你怎么这么笨/傻', value: 'D' }
    ]
  }
]

// 导出题库
module.exports = {
  mbtiFullQuestions,
  mbtiQuickQuestions,
  funQuestions,
  
  // 获取题库
  getQuestions(type) {
    switch (type) {
      case 'mbti_full':
        return this.mbtiFullQuestions
      case 'mbti_quick':
        return this.mbtiQuickQuestions
      case 'fun':
        return this.funQuestions
      default:
        return this.mbtiFullQuestions
    }
  }
}