/**
 * MBTI人格结果数据
 * 包含16种人格类型的详细解读
 */

// 16种MBTI人格类型数据
const mbtiTypes = {
  'INTJ': {
    name: '建筑师',
    slogan: '想象力丰富，逻辑缜密的战略家',
    icon: '🏗️',
    colors: ['#4A90D9', '#2C5F9E'],
    dimensions: {
      EI: { E: 25, I: 75 },
      SN: { S: 30, N: 70 },
      TF: { T: 80, F: 20 },
      JP: { J: 75, P: 25 }
    },
    strengths: [
      '战略思维能力强，善于制定长期计划',
      '独立自主，不依赖他人',
      '追求知识和真理，学习能力强',
      '对自己和他人都要求很高',
      '能够客观理性地分析问题'
    ],
    weaknesses: [
      '有时过于挑剔和批判',
      '不善于表达情感',
      '可能显得冷漠或疏离',
      '难以理解他人的情感需求',
      '对不按逻辑的事物缺乏耐心'
    ],
    careers: [
      '科学家/研究员',
      '工程师/建筑师',
      '律师/法官',
      '企业战略顾问',
      '教授/学者',
      'IT架构师'
    ],
    social: [
      '你更喜欢独处或与少数志同道合的人交流',
      '在社交场合中，你通常观察多于发言',
      '你欣赏直接、高效的沟通方式',
      '建立深厚友谊需要很长时间，但一旦建立就很牢固'
    ],
    relationship: [
      '你需要一个能够理解你思维方式的伴侣',
      '表达感情对你来说需要刻意练习',
      '尊重彼此的独立空间是关键',
      '尝试更多表达赞赏和感谢'
    ],
    celebrities: ['埃隆·马斯克', '杰拉尔德·福特', '斯蒂芬妮·梅尔'],
    characters: ['夏洛克·福尔摩斯', '毁灭博士', '布雷克·莫尔斯']
  },
  
  'INTP': {
    name: '逻辑学家',
    slogan: '好奇且理性的思想探索者',
    icon: '🔬',
    colors: ['#6B8E23', '#556B2F'],
    dimensions: {
      EI: { E: 20, I: 80 },
      SN: { S: 25, N: 75 },
      TF: { T: 75, F: 25 },
      JP: { J: 30, P: 70 }
    },
    strengths: [
      '逻辑思维卓越，分析能力强',
      '极具创造力和想象力',
      '求知欲强，喜欢探索',
      '客观公正，不受情感影响',
      '能够看到问题的本质'
    ],
    weaknesses: [
      '过于追求理论，忽视实践',
      '难以坚持完成任务',
      '社交能力较弱',
      '有时过于挑剔或刻薄',
      '容易沉浸在自己的思考中'
    ],
    careers: [
      '哲学家/思想家',
      '计算机科学家',
      '数学家',
      '物理学家',
      '金融分析师',
      '作家/编剧'
    ],
    social: [
      '你享受深入的思想交流而非表面寒暄',
      '社交对你来说是消耗能量的事情',
      '你倾向于有少数几个知心朋友',
      '你不太在意社会规范和礼仪'
    ],
    relationship: [
      '你需要空间来思考和探索',
      '表达情感不是你的强项',
      '理解对方的情感需求需要学习',
      '试着更主动地表达关心'
    ],
    celebrities: ['阿尔伯特·爱因斯坦', '艾萨克·牛顿', '查尔斯·达尔文'],
    characters: ['谢尔顿·库珀', '弗兰肯斯坦博士', '布鲁斯·班纳']
  },
  
  'ENTJ': {
    name: '指挥官',
    slogan: '大胆果断的领导者',
    icon: '⚔️',
    colors: ['#C41E3A', '#8B0000'],
    dimensions: {
      EI: { E: 75, I: 25 },
      SN: { S: 35, N: 65 },
      TF: { T: 80, F: 20 },
      JP: { J: 80, P: 20 }
    },
    strengths: [
      '天生的领导者，有强大的气场',
      '决策果断，善于把握机会',
      '战略思维，擅长规划',
      '自信且有感染力',
      '追求效率和成果'
    ],
    weaknesses: [
      '可能显得咄咄逼人',
      '不善处理情感问题',
      '控制欲较强',
      '难以接受批评',
      '有时过于强势'
    ],
    careers: [
      'CEO/企业家',
      '律师',
      '政治家',
      '管理咨询顾问',
      '军官',
      '投资银行家'
    ],
    social: [
      '你在社交场合中如鱼得水',
      '你善于激励和引导他人',
      '你喜欢主导谈话方向',
      '你的人脉广泛，影响力强'
    ],
    relationship: [
      '你需要有能力的伴侣',
      '学会倾听和尊重很重要',
      '不要总是试图控制一切',
      '尝试欣赏过程而不仅仅是结果'
    ],
    celebrities: ['史蒂夫·乔布斯', '拿破仑·波拿巴', '玛格丽特·撒切尔'],
    characters: ['托尼·史塔克', '汉尼拔·莱克特', '瑟曦·兰尼斯特']
  },
  
  'ENTP': {
    name: '辩论家',
    slogan: '聪明好奇的发明家',
    icon: '💡',
    colors: ['#FF6B35', '#FF4500'],
    dimensions: {
      EI: { E: 70, I: 30 },
      SN: { S: 25, N: 75 },
      TF: { T: 60, F: 40 },
      JP: { J: 35, P: 65 }
    },
    strengths: [
      '思维敏捷，善于创新',
      '口才出色，能言善辩',
      '适应能力强，灵活变通',
      '善于发现问题',
      '充满魅力和幽默感'
    ],
    weaknesses: [
      '难以坚持完成一件事',
      '喜欢争论但不顾后果',
      '可能显得不够认真',
      '有时过于好辩',
      '难以接受传统观念'
    ],
    careers: [
      '企业家/创业者',
      '律师',
      '记者/主持人',
      '咨询顾问',
      '发明家',
      '营销策划'
    ],
    social: [
      '你是派对的灵魂人物',
      '你喜欢智识上的挑战和辩论',
      '你善于结交各类朋友',
      '你讨厌无聊和沉闷'
    ],
    relationship: [
      '你需要能跟上你思维节奏的伴侣',
      '学会专注和承诺很重要',
      '避免为了辩论而伤害感情',
      '尝试更认真地对待承诺'
    ],
    celebrities: ['马克·吐温', '托马斯·爱迪生', '本杰明·富兰克林'],
    characters: ['小罗伯特·唐尼', '杰克·斯派洛', '月光侠']
  },
  
  'INFJ': {
    name: '提倡者',
    slogan: '安静而坚定的理想主义者',
    icon: '🎨',
    colors: ['#8B008B', '#9932CC'],
    dimensions: {
      EI: { E: 25, I: 75 },
      SN: { S: 25, N: 75 },
      TF: { T: 25, F: 75 },
      JP: { J: 60, P: 40 }
    },
    strengths: [
      '洞察力强，能感知他人情感',
      '有坚定的价值观和原则',
      '忠诚且值得信赖',
      '富有想象力和创造力',
      '善于激励和启发他人'
    ],
    weaknesses: [
      '过于理想主义',
      '不善于处理冲突',
      '过度迎合他人需求',
      '难以接受负面反馈',
      '可能隐藏真实情感'
    ],
    careers: [
      '心理咨询师',
      '社会工作者',
      '作家/诗人',
      '教师',
      '人力资源经理',
      '非营利组织领袖'
    ],
    social: [
      '你更倾向于深度对话而非闲聊',
      '你有几个非常亲密的朋友',
      '你善于感知他人的情绪和需求',
      '你不喜欢冲突和对抗'
    ],
    relationship: [
      '你需要深度的情感连接',
      '学会设定界限很重要',
      '不要总是牺牲自己满足他人',
      '你的理想主义需要接地气'
    ],
    celebrities: ['马丁·路德·金', '纳尔逊·曼德拉', '孔子'],
    characters: ['邓布利多', '约翰·纳什教授', '安杰丽卡']
  },
  
  'INFP': {
    name: '调停者',
    slogan: '浪漫善良的理想主义者',
    icon: '🌈',
    colors: ['#9370DB', '#BA55D3'],
    dimensions: {
      EI: { E: 20, I: 80 },
      SN: { S: 25, N: 75 },
      TF: { T: 20, F: 80 },
      JP: { J: 35, P: 65 }
    },
    strengths: [
      '同理心强，理解他人',
      '有创造力和艺术气质',
      '理想主义者，追求意义',
      '适应力强，灵活变通',
      '善于倾听'
    ],
    weaknesses: [
      '过于理想化',
      '难以接受现实',
      '不善处理冲突',
      '容易自我否定',
      '难以拒绝他人'
    ],
    careers: [
      '作家/诗人',
      '艺术家',
      '心理咨询师',
      '翻译',
      '社会学家',
      '图书馆员'
    ],
    social: [
      '你是很好的倾听者',
      '你喜欢有意义的深度对话',
      '你有时会感到与世界格格不入',
      '你对人际关系有很高的期待'
    ],
    relationship: [
      '你需要灵魂层面的连接',
      '学会面对冲突而不是逃避',
      '不要让理想阻碍现实中的幸福',
      '你值得被爱，不要总是自我牺牲'
    ],
    celebrities: ['威廉·莎士比亚', '约翰·列依', '戴安娜王妃'],
    characters: ['哈姆雷特', '洛依·潘德拉贡', '佛雷德里希']
  },
  
  'ENFJ': {
    name: '主人公',
    slogan: '富有感染力的领袖',
    icon: '✨',
    colors: ['#FF69B4', '#FF1493'],
    dimensions: {
      EI: { E: 70, I: 30 },
      SN: { S: 30, N: 70 },
      TF: { T: 25, F: 75 },
      JP: { J: 60, P: 40 }
    },
    strengths: [
      '极富感染力和说服力',
      '善于理解和帮助他人',
      '有领导魅力',
      '热情洋溢，积极向上',
      '善于协调和沟通'
    ],
    weaknesses: [
      '可能过于理想化',
      '难以对他人说"不"',
      '需要不断获得认可',
      '忽视自己的需求',
      '可能显得做作'
    ],
    careers: [
      '教师/培训师',
      '心理咨询师',
      '人力资源经理',
      '演员/主持人',
      '政治家',
      '神职人员'
    ],
    social: [
      '你是天生的领导者',
      '你善于发现他人的潜力',
      '你总是乐于帮助他人',
      '你在人群中很受欢迎'
    ],
    relationship: [
      '你需要在关系中感到被需要',
      '学会照顾自己而不是总顾及他人',
      '不要为了取悦他人而失去自我',
      '你的热情需要有所节制'
    ],
    celebrities: ['巴拉克·奥巴马', '马尔科姆·X', '尼尔·唐纳德·沃尔什'],
    characters: ['奥巴马总统', '乔纳斯兄弟', '米歇尔·奥巴马']
  },
  
  'ENFP': {
    name: '竞选者',
    slogan: '热情洋溢的创意者',
    icon: '🎭',
    colors: ['#FF6B6B', '#EE5A5A'],
    dimensions: {
      EI: { E: 70, I: 30 },
      SN: { S: 25, N: 75 },
      TF: { T: 25, F: 75 },
      JP: { J: 35, P: 65 }
    },
    strengths: [
      '热情且富有感染力',
      '创造力惊人',
      '社交能力强',
      '洞察力强',
      '适应力强，灵活'
    ],
    weaknesses: [
      '难以专注',
      '情绪波动大',
      '计划性差',
      '容易逃避问题',
      '过于追求新鲜感'
    ],
    careers: [
      '演员/艺术家',
      '记者',
      '广告创意',
      '心理咨询师',
      '旅游从业者',
      '社会活动家'
    ],
    social: [
      '你是人群中的焦点',
      '你善于发现每个人的独特之处',
      '你喜欢鼓励和赞美他人',
      '你讨厌规则和束缚'
    ],
    relationship: [
      '你需要充满激情的伴侣',
      '学会处理平淡期的关系',
      '不要害怕承诺',
      '试着更专注和耐心'
    ],
    celebrities: ['罗宾·威廉姆斯', '金·凯瑞', '威尔·法瑞尔'],
    characters: ['小飞侠彼得·潘', '泰德·莫斯科维茨', '安妮·弗兰克']
  },
  
  'ISTJ': {
    name: '物流师',
    slogan: '严谨负责的执行者',
    icon: '📋',
    colors: ['#2F4F4F', '#1C3A3A'],
    dimensions: {
      EI: { E: 20, I: 80 },
      SN: { S: 70, N: 30 },
      TF: { T: 70, F: 30 },
      JP: { J: 80, P: 20 }
    },
    strengths: [
      '责任感强，值得信赖',
      '做事有条理',
      '脚踏实地',
      '守规矩，重承诺',
      '善于组织和管理'
    ],
    weaknesses: [
      '不善变通',
      '难以接受新观念',
      '可能过于挑剔',
      '不善于表达情感',
      '难以理解抽象概念'
    ],
    careers: [
      '会计/审计',
      '律师/法官',
      '医生',
      '军人/警察',
      '政府官员',
      '银行职员'
    ],
    social: [
      '你是最可靠的朋友',
      '你言出必行，值得信赖',
      '你更喜欢小型聚会',
      '你不太擅长闲聊'
    ],
    relationship: [
      '你需要一个稳定的伴侣',
      '学着表达爱意而不只是责任',
      '接受变化和新事物',
      '不要总是压抑情感'
    ],
    celebrities: ['乔治·华盛顿', '阿诺德·施瓦辛格', '艾米·波勒'],
    characters: ['戴立·夏普', '杰米·兰尼斯特', '沃尔特·怀特']
  },
  
  'ISFJ': {
    name: '守护者',
    slogan: '温暖体贴的照顾者',
    icon: '🛡️',
    colors: ['#556B2F', '#6B8E23'],
    dimensions: {
      EI: { E: 20, I: 80 },
      SN: { S: 70, N: 30 },
      TF: { T: 25, F: 75 },
      JP: { J: 75, P: 25 }
    },
    strengths: [
      '忠诚且有奉献精神',
      '善于照顾他人',
      '细心周到',
      '吃苦耐劳',
      '记忆力好'
    ],
    weaknesses: [
      '不善于改变',
      '忽视自己需求',
      '难以接受批评',
      '过度谦虚',
      '可能过于担忧'
    ],
    careers: [
      '护士',
      '教师',
      '图书管理员',
      '社工',
      '行政人员',
      '客户服务'
    ],
    social: [
      '你是默默付出的人',
      '你记住每个人的重要日期',
      '你不喜欢成为焦点',
      '你总是尽力帮助他人'
    ],
    relationship: [
      '你通过行动表达爱意',
      '学会表达自己的需求',
      '不要总是把自己放在最后',
      '你的付出需要被认可'
    ],
    celebrities: ['碧昂丝', '斯嘉丽·约翰逊', ' Lady Gaga'],
    characters: ['山姆·威尔·塔利', '内维尔·朗巴顿', '比尼·斯托尔']
  },
  
  'ESTJ': {
    name: '总经理',
    slogan: '务实高效的管理者',
    icon: '🏢',
    colors: ['#4682B4', '#4169E1'],
    dimensions: {
      EI: { E: 70, I: 30 },
      SN: { S: 70, N: 30 },
      TF: { T: 75, F: 25 },
      JP: { J: 80, P: 20 }
    },
    strengths: [
      '组织能力强',
      '执行力强',
      '责任感强',
      '注重效率和成果',
      '诚实正直'
    ],
    weaknesses: [
      '不够灵活',
      '不善于想象',
      '可能显得强硬',
      '不善于情感沟通',
      '缺乏耐心'
    ],
    careers: [
      '企业高管',
      '军官',
      '法官',
      '房地产经纪人',
      '保险经纪人',
      '项目经理'
    ],
    social: [
      '你是天生的组织者',
      '你注重规矩和秩序',
      '你承担很多社会责任',
      '你是可靠的领导者'
    ],
    relationship: [
      '你通过行动照顾家庭',
      '学着更温柔地表达',
      '尊重他人的感受',
      '不要总是控制一切'
    ],
    celebrities: ['朱镕基', '迈克尔·斯科特', '朱莉娅·罗伯茨'],
    characters: ['泰温·兰尼斯特', '加里森·凯勒', '多萝西娅·贝恩斯']
  },
  
  'ESFJ': {
    name: '供给者',
    slogan: '热情慷慨的东道主',
    icon: '🎉',
    colors: ['#FFB6C1', '#FF69B4'],
    dimensions: {
      EI: { E: 70, I: 30 },
      SN: { S: 70, N: 30 },
      TF: { T: 25, F: 75 },
      JP: { J: 75, P: 25 }
    },
    strengths: [
      '善于社交，人缘好',
      '热情友好，乐于助人',
      '有责任感',
      '善于组织活动',
      '注重细节和实际'
    ],
    weaknesses: [
      '过于在意他人看法',
      '难以接受冲突',
      '过度迎合',
      '难以说"不"',
      '可能显得肤浅'
    ],
    careers: [
      '护士',
      '教师',
      '人力资源',
      '旅游从业者',
      '零售商',
      '公关专员'
    ],
    social: [
      '你是派对的组织者',
      '你善于记住每个人的喜好',
      '你喜欢照顾和帮助他人',
      '你渴望被认可和欣赏'
    ],
    relationship: [
      '你在关系中付出很多',
      '需要学会表达负面情绪',
      '不要为了取悦他人失去自我',
      '你值得被同样对待'
    ],
    celebrities: ['泰勒·斯威夫特', '珍妮弗·洛佩兹', '奥普拉·温弗瑞'],
    characters: ['卡罗尔·布拉德肖', '萨莉·鲍尔斯', '考特尼·考克斯']
  },
  
  'ISTP': {
    name: '鉴赏家',
    slogan: '理性务实的工匠',
    icon: '🔧',
    colors: ['#708090', '#2F4F4F'],
    dimensions: {
      EI: { E: 25, I: 75 },
      SN: { S: 65, N: 35 },
      TF: { T: 70, F: 30 },
      JP: { J: 30, P: 70 }
    },
    strengths: [
      '动手能力强',
      '逻辑清晰',
      '善于分析问题',
      '冷静理性',
      '适应力强'
    ],
    weaknesses: [
      '不善表达情感',
      '难以理解他人感受',
      '冒险精神过强',
      '缺乏耐心',
      '不善于规划'
    ],
    careers: [
      '工程师',
      '机械师',
      '飞行员',
      '运动员',
      '黑客/安全专家',
      '消防员'
    ],
    social: [
      '你更喜欢行动而非言语',
      '你通过共同活动建立友谊',
      '你需要独立空间',
      '你不喜欢过度社交'
    ],
    relationship: [
      '你用行动而非言语表达',
      '学着更多分享感受',
      '不要总是保持距离',
      '学会承诺和陪伴'
    ],
    celebrities: ['克林特·伊斯特伍德', '布鲁斯·李', '汤姆·克鲁斯'],
    characters: ['印第安纳·琼斯', '詹姆斯·邦德', '麦克白']
  },
  
  'ISFP': {
    name: '探险家',
    slogan: '自由浪漫的艺术家',
    icon: '🎨',
    colors: ['#DDA0DD', '#BA55D3'],
    dimensions: {
      EI: { E: 25, I: 75 },
      SN: { S: 55, N: 45 },
      TF: { T: 25, F: 75 },
      JP: { J: 25, P: 75 }
    },
    strengths: [
      '艺术气质浓厚',
      '善于发现美',
      '温柔善良',
      '适应力强',
      '观察力敏锐'
    ],
    weaknesses: [
      '难以做决定',
      '逃避冲突',
      '难以坚持',
      '过度敏感',
      '不善于规划'
    ],
    careers: [
      '艺术家',
      '设计师',
      '摄影师',
      '音乐家',
      '厨师',
      '兽医'
    ],
    social: [
      '你安静但富有魅力',
      '你享受当下的美好',
      '你需要私人空间',
      '你不喜欢冲突'
    ],
    relationship: [
      '你通过小动作表达爱意',
      '学着面对困难而非逃避',
      '不要总是压抑自己需求',
      '你的艺术需要被表达'
    ],
    celebrities: ['迈克尔·杰克逊', '鲍勃·迪伦', '奥黛丽·赫本'],
    characters: ['阿什利·温赖特', '伊莎贝拉·斯旺', '克莱奥·费雷拉']
  },
  
  'ESTP': {
    name: '企业家',
    slogan: '精力充沛的行动派',
    icon: '🚀',
    colors: ['#FF8C00', '#FFA500'],
    dimensions: {
      EI: { E: 75, I: 25 },
      SN: { S: 65, N: 35 },
      TF: { T: 60, F: 40 },
      JP: { J: 30, P: 70 }
    },
    strengths: [
      '善于社交',
      '行动力强',
      '务实且实际',
      '善于解决问题',
      '有冒险精神'
    ],
    weaknesses: [
      '缺乏长期规划',
      '不耐烦',
      '冲动',
      '不善读书',
      '可能粗心'
    ],
    careers: [
      '企业家',
      '推销员',
      '经纪人',
      '警察',
      '消防员',
      '记者'
    ],
    social: [
      '你是社交场合的焦点',
      '你喜欢即时反馈',
      '你善于观察环境',
      '你讨厌无聊'
    ],
    relationship: [
      '你享受当下的快乐',
      '学着考虑未来',
      '不要总是冲动行事',
      '学着倾听和关注他人'
    ],
    celebrities: ['唐纳德·特朗普', '马达', '切·格瓦拉'],
    characters: ['印第安纳·琼斯', '汉·索罗', '伊桑·亨特']
  },
  
  'ESFP': {
    name: '表演者',
    slogan: '活泼热情的娱乐者',
    icon: '🎪',
    colors: ['#FFD700', '#FFA500'],
    dimensions: {
      EI: { E: 80, I: 20 },
      SN: { S: 60, N: 40 },
      TF: { T: 25, F: 75 },
      JP: { J: 25, P: 75 }
    },
    strengths: [
      '充满活力',
      '善于表演',
      '社交能力强',
      '乐观积极',
      '有感染力'
    ],
    weaknesses: [
      '难以专注',
      '不喜欢规则',
      '冲动消费',
      '害怕孤独',
      '缺乏计划'
    ],
    careers: [
      '演员',
      '主持人',
      '销售',
      '公关专员',
      '旅游从业者',
      '咖啡师'
    ],
    social: [
      '你是派对的生命力',
      '你喜欢成为焦点',
      '你善于活跃气氛',
      '你讨厌无聊和规则'
    ],
    relationship: [
      '你需要在关系中感到快乐',
      '学着面对问题而不是逃避',
      '不要为了迎合失去自我',
      '尝试更认真对待承诺'
    ],
    celebrities: ['玛丽莲·梦露', '威尔·史密斯', '用户界面设计师'],
    characters: ['罗恩·韦斯莱', '菲比·布菲', '彼得·奎克']
  }
}

// 趣味人格测试结果
const funResults = {
  'AAAA': {
    tag: '社交蝴蝶',
    emoji: '🦋',
    title: '你是人群中最闪亮的星！',
    desc: '你的精力来源是与人互动，离开人群你就像手机没电一样。你是天生的社交达人，走到哪都能成为焦点。',
    harsh: '你表面上朋友遍天下，其实大多数只是点赞之交，深夜失眠时连个能打电话的人都没有。',
    suggestion: '试着培养几个深度关系，而不是只有广度。'
  },
  'AAAB': {
    tag: '理性达人',
    emoji: '🤖',
    title: '你的大脑是个超级计算机！',
    desc: '你用逻辑而不是情绪做决定，你相信因果关系而不是第六感。你是朋友圈里的"问题解决者"。',
    harsh: '别人找你倾诉烦恼，你却开始分析对方的逻辑漏洞，然后成功让对方更烦了。',
    suggestion: '有时候道理讲多了，情商就显得余额不足。'
  },
  'AAAC': {
    tag: '计划大师',
    emoji: '📅',
    title: '你是时间管理的大师！',
    desc: '你的日程表精确到分钟，待办事项永远井井有条。你相信计划让你更自由。',
    harsh: '你的人生按部就班，但偶尔也会好奇：如果不计划，会发生什么？答案是：不知道，因为你从来没试过。',
    suggestion: '偶尔来一场说走就走的旅行，体验一下失控的感觉。'
  },
  'AAAD': {
    tag: '独行侠',
    emoji: '🦉',
    title: '你的内心是个丰富的宇宙！',
    desc: '你享受独处的时光，在安静中你会更有创造力。你不需要外界刺激来激发灵感。',
    harsh: '你的朋友很少，但每一个都是被你"过滤"过的——问题是你的过滤网可能太密了。',
    suggestion: '试着偶尔走出舒适区，你会发现世界没那么可怕。'
  },
  'AABA': {
    tag: '正义使者',
    emoji: '⚖️',
    title: '你是行走的道德指南针！',
    desc: '你对对错分得清清楚楚，不喜欢灰色地带。你相信公平公正，是朋友眼中的"包青天"。',
    harsh: '有时候你太较真了，让周围的人很有压力。毕竟不是所有事情都需要分出对错。',
    suggestion: '学会接受"灰色地带"，世界会温柔很多。'
  },
  'ABAA': {
    tag: '吃货本货',
    emoji: '🍜',
    title: '你的胃是你灵魂的窗口！',
    desc: '你的人生哲学是"吃饱了才有力气减肥"，你愿意为了美食等位两小时。',
    harsh: '你嘴上说减肥，身体却很诚实地点了第二份主食。',
    suggestion: '下次说减肥之前，先把外卖APP卸载了。'
  },
  'ABBA': {
    tag: '纠结本人',
    emoji: '🤔',
    title: '选择困难症是你的终身标签！',
    desc: '从今天吃什么到人生大事，你都要想很久。你总觉得下一个选择会更好。',
    harsh: '你的人生在纠结中度过，买个奶茶都能纠结十分钟，最后选了第一个。',
    suggestion: '下次直接选第一个，你会发现其实都差不多。'
  },
  'BBBB': {
    tag: '佛系青年',
    emoji: '🧘',
    title: '你是当代陶渊明！',
    desc: '你的口头禅是"都行""可以""没关系"。你追求内心的平静，不争不抢。',
    harsh: '你所谓的佛系，不过是不想努力的借口。你的"与世无争"只是因为懒得争取。',
    suggestion: '有时候还是要有点欲望的，不然和咸鱼有什么区别？'
  },
  'BBCC': {
    tag: '好奇宝宝',
    emoji: '🐱',
    title: '你是个行走的"为什么"！',
    desc: '你对世界充满好奇，什么都想尝试。你的人生哲学是"体验派"。',
    harsh: '你的问题很多，但答案往往用过就忘。你的好奇心和你的三分钟热度是完美搭配。',
    suggestion: '试着对一个领域深入研究，而不是永远浅尝辄止。'
  },
  'CAAA': {
    tag: '工作狂人',
    emoji: '💼',
    title: '你是新时代的拼命三郎！',
    desc: '你不允许自己浪费时间，你相信努力就会成功。你的人生字典里没有"摸鱼"二字。',
    harsh: '你忙到没时间花钱，没时间享受，等你反应过来，人生已经过完了。',
    suggestion: '偶尔也要停下来闻闻路边的花香。'
  },
  'CCCD': {
    tag: '深夜哲学家',
    emoji: '🌙',
    title: '你是凌晨三点的思考者！',
    desc: '你一到晚上就开始思考人生，想很多有的没的。白天你是普通人，晚上你是尼采。',
    harsh: '你的想太多和你的不行动是完美组合。想了一万遍的人生，还是在原地踏步。',
    suggestion: '想太多会秃的，不如先睡一觉。'
  },
  'DAAA': {
    tag: '躺平达人',
    emoji: '🛋️',
    title: '你是当代陶渊明2.0！',
    desc: '你的人生格言是"能躺着绝不坐着"。你追求简单的生活，不想内卷。',
    harsh: '你的躺平只是因为懒得努力，你美其名曰"低欲望社会"，其实就是懒。',
    suggestion: '偶尔也要起来伸伸腿，不然真的会“躺废”。'
  },
  'DDAA': {
    tag: '手机奴隶',
    emoji: '📱',
    title: '你是数字时代的原住民！',
    desc: '你手机不离手，刷手机是你每天花时间最多的事情。你绝对不能接受手机没电。',
    harsh: '你手机里的世界很精彩，但现实中的你越来越社恐。你在朋友圈很活跃，现实中却很孤独。',
    suggestion: '试着放下手机一天，你会发现世界没那么依赖手机。'
  },
  'ADAD': {
    tag: '情绪过山车',
    emoji: '🎢',
    title: '你的情绪比天气预报还难测！',
    desc: '你情绪丰富，感受力强。你可能是艺术家或创意工作者，因为普通人承受不住这种波动。',
    harsh: '你身边的人每天都在猜你的心情，今天晴不代表明天不暴雨。',
    suggestion: '学点情绪管理，不然朋友会被你吓跑的。'
  },
  'DCBA': {
    tag: '完美主义者',
    emoji: '🔍',
    title: '你是精益求精的代言人！',
    desc: '你对自己和别人都有很高的要求，追求完美。你相信细节决定成败。',
    harsh: '你的完美主义让你很累，而且你会把这种压力传递给周围的人。知道吗，60分也很好。',
    suggestion: '有时候不完美才是完美。'
  }
}

// 补充趣味人格测试结果
const funResultsExtra = {
  'AABB': {
    tag: '社交变色龙',
    emoji: '🦎',
    title: '你能适应任何社交场合！',
    desc: '你善于观察环境并调整自己的行为，在不同的人群中都能如鱼得水。你是真正的社交高手。',
    harsh: '你似乎没有固定的自我，别人看到的你可能只是你想让他们看到的。',
    suggestion: '试着在某些关系中展现真实的自己。'
  },
  'ABAC': {
    tag: '理性浪漫者',
    emoji: '🧠💖',
    title: '你是矛盾的完美结合！',
    desc: '你既有理性的头脑，又有浪漫的心灵。你用逻辑分析爱情，用感性体验生活。',
    harsh: '你经常在理性和感性之间摇摆不定，连自己都不知道想要什么。',
    suggestion: '有时候跟着感觉走也不错。'
  },
  'ACAB': {
    tag: '时间管理大师',
    emoji: '⏰',
    title: '你是效率的化身！',
    desc: '你把时间当作最宝贵的资源，善于规划和执行。你的每一天都过得充实而有意义。',
    harsh: '你把生活过得像行军打仗，连吃饭都要掐着秒表。偶尔放松一下吧。',
    suggestion: '学会享受过程，而不是只关注结果。'
  },
  'BABA': {
    tag: '深度思考者',
    emoji: '🕵️',
    title: '你是行走的思想者！',
    desc: '你喜欢深入思考问题，追求事物的本质。你是朋友中的"智慧担当"。',
    harsh: '你想太多了，有时候简单的事情被你复杂化。行动比思考更重要。',
    suggestion: '想到就去做，不要让想法只停留在脑海里。'
  },
  'BCAA': {
    tag: '冒险探险家',
    emoji: '🧗',
    title: '你是勇敢的冒险者！',
    desc: '你喜欢挑战自己，尝试新事物。你的人生充满了刺激和惊喜。',
    harsh: '你的冒险精神可能让你忽视风险，有时候会让自己陷入困境。',
    suggestion: '勇敢很好，但安全第一。'
  },
  'CBAC': {
    tag: '创意天才',
    emoji: '🎨',
    title: '你是天生的艺术家！',
    desc: '你有无限的创造力和想象力，善于用独特的方式表达自己。',
    harsh: '你的创意很多，但执行力不足，很多想法都胎死腹中。',
    suggestion: '把想法付诸实践，你会发现自己的潜力。'
  },
  'DBDB': {
    tag: '治愈系天使',
    emoji: '👼',
    title: '你是温暖的小太阳！',
    desc: '你善于倾听和安慰他人，是朋友的"心灵港湾"。你的存在让周围变得温暖。',
    harsh: '你总是照顾别人，却忘了照顾自己。你的善意可能被人利用。',
    suggestion: '学会爱自己，才能更好地爱别人。'
  },
  'ADBC': {
    tag: '好奇心宝宝',
    emoji: '🔬',
    title: '你是永远的学习者！',
    desc: '你对世界充满好奇，喜欢学习新知识。你的求知欲让你不断成长。',
    harsh: '你学得多而不精，每个领域都懂一点但都不深入。',
    suggestion: '选择一个领域深耕，你会收获更多。'
  },
  'BDAC': {
    tag: '优雅生活家',
    emoji: '☕',
    title: '你是精致生活的追求者！',
    desc: '你注重生活品质，懂得享受生活。你的每一天都过得优雅而从容。',
    harsh: '你的精致可能有些矫情，让身边的人有压力。',
    suggestion: '偶尔粗糙一下也很可爱。'
  },
  'CADB': {
    tag: '自由灵魂',
    emoji: '🦅',
    title: '你是不受束缚的风！',
    desc: '你追求自由，讨厌约束。你的人生信条是"做自己"。',
    harsh: '你的自由可能伤害到关心你的人，有时候责任也很重要。',
    suggestion: '自由和责任可以并存。'
  }
}

// 合并趣味测试结果
const allFunResults = { ...funResults, ...funResultsExtra }

// 默认结果（用于没有匹配到精确结果时）
const defaultFunResult = {
  tag: '混合人格',
  emoji: '🔮',
  title: '你是独一无二的复杂体！',
  desc: '你的人格是多种特质的混合，这让你在不同的场合可以展现不同的面向。',
  harsh: '你可能觉得自己很独特，但其实每个人都是独一无二的，所以这也没什么特别的。',
  suggestion: '接受自己的复杂性，这本身就是一种成熟。'
}

/**
 * 根据选项计算MBTI结果
 * @param {Array} answers - 用户答案数组
 * @param {Array} questions - 题目数组
 * @returns {Object} - { type: 'INTJ', scores: { EI: 75, SN: 30, TF: 80, JP: 75 } }
 */
function calculateMBTI(answers, questions) {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  
  answers.forEach((answer, index) => {
    const question = questions[index]
    if (!question) return
    
    const dimension = question.dimension
    const value = answer.value
    
    // E/I维度
    if (dimension === 'EI') {
      // 前半部分偏向E，后半部分偏向I
      if (index < questions.length / 2) {
        scores.E += value
      } else {
        scores.I += value
      }
    }
    // S/N维度
    else if (dimension === 'SN') {
      if (index < questions.length / 2) {
        scores.S += value
      } else {
        scores.N += value
      }
    }
    // T/F维度
    else if (dimension === 'TF') {
      if (index < questions.length / 2) {
        scores.T += value
      } else {
        scores.F += value
      }
    }
    // J/P维度
    else if (dimension === 'JP') {
      if (index < questions.length / 2) {
        scores.J += value
      } else {
        scores.P += value
      }
    }
  })
  
  // 归一化到百分比
  const total = questions.length
  const dimensionPercent = {
    EI: Math.round((scores.I / total) * 100),
    SN: Math.round((scores.N / total) * 100),
    TF: Math.round((scores.F / total) * 100),
    JP: Math.round((scores.P / total) * 100)
  }
  
  // 确定四字母类型
  let type = ''
  type += dimensionPercent.EI >= 50 ? 'I' : 'E'
  type += dimensionPercent.SN >= 50 ? 'N' : 'S'
  type += dimensionPercent.TF >= 50 ? 'F' : 'T'
  type += dimensionPercent.JP >= 50 ? 'P' : 'J'
  
  return {
    type,
    scores: {
      E: scores.E,
      I: scores.I,
      S: scores.S,
      N: scores.N,
      T: scores.T,
      F: scores.F,
      J: scores.J,
      P: scores.P
    },
    percent: {
      E: Math.round((scores.E / total) * 100),
      I: Math.round((scores.I / total) * 100),
      S: Math.round((scores.S / total) * 100),
      N: Math.round((scores.N / total) * 100),
      T: Math.round((scores.T / total) * 100),
      F: Math.round((scores.F / total) * 100),
      J: Math.round((scores.J / total) * 100),
      P: Math.round((scores.P / total) * 100)
    }
  }
}

/**
 * 计算趣味测试结果
 * @param {Array} answers - 用户答案数组
 * @returns {Object} - 趣味测试结果
 */
function calculateFunResult(answers) {
  // 统计各选项数量
  const counts = { A: 0, B: 0, C: 0, D: 0 }
  answers.forEach(answer => {
    if (answer.value && counts.hasOwnProperty(answer.value)) {
      counts[answer.value]++
    }
  })
  
  // 生成key
  const sortedCounts = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(item => item[0])
  
  // 尝试匹配精确结果
  let key = sortedCounts.join('')
  if (allFunResults[key]) {
    return allFunResults[key]
  }
  
  // 尝试前缀匹配
  for (let len = 4; len > 0; len--) {
    const prefix = key.substring(0, len)
    const match = Object.keys(allFunResults).find(k => k.startsWith(prefix))
    if (match) {
      return allFunResults[match]
    }
  }
  
  return defaultFunResult
}

/**
 * 获取MBTI类型详细数据
 * @param {String} type - MBTI类型如 'INTJ'
 * @returns {Object} - 类型详细数据
 */
function getMBTIType(type) {
  return mbtiTypes[type] || null
}

module.exports = {
  mbtiTypes,
  funResults,
  defaultFunResult,
  calculateMBTI,
  calculateFunResult,
  getMBTIType
}