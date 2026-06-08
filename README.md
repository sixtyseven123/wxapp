# MBTI人格实验室 - 微信小程序

> 专业、精致、有趣的MBTI人格测试小程序

## 项目结构

```
MBTI人格实验室/
├── app.js                    # 小程序入口
├── app.json                  # 全局配置
├── app.wxss                  # 全局样式
├── project.config.json       # 项目配置文件
├── sitemap.json              # sitemap配置
│
├── cloud/                    # 云开发
│   └── cloud.js              # 云函数封装
│
├── utils/                    # 工具函数
│   ├── questions.js          # 题库（MBTI 93题+20题+趣味15题）
│   ├── personality.js        # 人格结果数据（16种人格详解）
│   └── util.js               # 通用工具函数
│
├── assets/                   # 静态资源
│   ├── icons/               # tabBar图标
│   └── images/              # 图片资源
│
└── pages/                    # 页面
    ├── index/               # 首页
    ├── guide/               # 测试引导页
    ├── test/                # 答题页
    ├── result/              # 结果页
    ├── history/             # 历史记录页
    └── about/               # 关于页
```

## 功能特性

- **MBTI标准版** - 93题完整版，约15分钟，四个维度全面分析
- **MBTI快速版** - 20题精简版，约3分钟，快速定位人格类型
- **趣味人格测试** - 15题轻松测试，生成专属毒舌文案
- **历史记录** - 本地保存，随时回看
- **结果分享** - 生成分享图，好友/朋友圈

## 快速开始

### 1. 打开项目

1. 下载微信开发者工具：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
2. 打开微信开发者工具
3. 点击"导入项目"
4. 选择本项目文件夹
5. 填写AppID（没有可选择"体验版"）

### 2. 配置云开发（可选）

1. 登录微信公众平台：https://mp.weixin.qq.com
2. 开通云开发功能
3. 获取云环境ID
4. 替换 `cloud/cloud.js` 中的 `CLOUD_ENV` 值
5. 在云开发控制台创建集合：
   - `test_records` - 测试记录
   - `user_stats` - 用户统计

### 3. 配置广告（可选）

1. 登录微信公众平台
2. 开通流量主功能
3. 获取广告位ID
4. 在 `pages/index/index.wxml` 中替换 `ad-unit-id`

### 4. 运行项目

1. 点击微信开发者工具中的"编译"
2. 等待编译完成
3. 在模拟器/真机中预览

## 页面说明

### 首页 (pages/index)
- 展示三个测试入口
- 品牌信息和slogan
- 底部功能入口

### 测试引导页 (pages/guide)
- 测试说明和时间预估
- 隐私政策同意
- 开始测试按钮

### 答题页 (pages/test)
- 单题一页显示
- 进度条和计时器
- 上一题/下一题导航
- 答案实时保存

### 结果页 (pages/result)
- MBTI类型展示（雷达图）
- 四维度分析
- 性格优劣势
- 适合职业
- 名人/代表角色
- 结果分享

### 历史记录页 (pages/history)
- 列表展示历史测试
- 时间格式化
- 清除记录功能

### 关于页 (pages/about)
- 用户协议
- 隐私政策
- 联系我们
- 清除数据

## 修改题库/文案

### 修改MBTI题目

编辑 `utils/questions.js` 中的 `mbtiFullQuestions` 或 `mbtiQuickQuestions` 数组：

```javascript
{
  id: 1,           // 题目ID
  dimension: 'EI', // 维度：EI/SN/TF/JP
  text: '题目内容',
  options: [
    { text: '非常不同意', value: 1, label: 'A' },
    { text: '不同意', value: 2, label: 'B' },
    // ...
  ]
}
```

### 修改人格结果

编辑 `utils/personality.js` 中的 `mbtiTypes` 对象：

```javascript
'INTJ': {
  name: '建筑师',           // 人格名称
  slogan: '战略思想家',      // 副标题
  icon: '🏗️',               // 图标
  strengths: [...],          // 性格优势
  weaknesses: [...],         // 性格劣势
  careers: [...],            // 适合职业
  social: [...],              // 社交特点
  celebrities: [...],        // 名人
  characters: [...]          // 代表角色
}
```

### 修改趣味测试结果

编辑 `utils/personality.js` 中的 `funResults` 对象：

```javascript
'AAAA': {
  tag: '社交蝴蝶',           // 人格标签
  emoji: '🦋',              // 表情
  title: '一句话标题',       // 结果标题
  desc: '描述文案',          // 正面描述
  harsh: '毒舌文案',        // 毒舌文案
  suggestion: '建议'         // 真诚建议
}
```

## 云数据库设计

### test_records 集合

```json
{
  "_id": "自动生成",
  "type": "mbti_full",       // 测试类型
  "result": {                // 测试结果
    "type": "INTJ",
    "name": "建筑师",
    ...
  },
  "usedTime": "15:30",       // 用时
  "anonymousId": "ANON_xxx", // 匿名ID
  "createTime": "Date"       // 创建时间
}
```

## 注意事项

1. **隐私合规**：不收集用户敏感信息，答题数据仅本地计算
2. **性能优化**：使用分包加载，优化首屏加载速度
3. **适配兼容**：使用rpx单位，适配各种屏幕尺寸
4. **真机调试**：建议在真机上进行完整测试

## 技术栈

- 微信原生小程序
- WXML + WXSS + JavaScript
- 微信云开发
- 无外部UI依赖

## License

MIT License