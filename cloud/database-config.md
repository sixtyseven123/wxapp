# 微信小程序云开发数据库配置

## 一、集合列表

### 1. test_records（测试记录表）
**用途**：存储用户的测试记录数据

**字段结构**：
| 字段名 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| _id | String | 自动 | 记录ID |
| _openid | String | 自动 | 用户OpenID |
| type | String | 是 | 测试类型：mbti_full / mbti_quick / fun |
| result | Object | 是 | 测试结果对象 |
| score | Object | 否 | 得分详情 |
| usedTime | String | 是 | 用时 |
| answers | Array | 否 | 答题记录 |
| createTime | Date | 是 | 创建时间 |

**权限设置**：
- 读取：仅创建者可读
- 写入：仅创建者可写
- 适用场景：保护用户隐私，用户只能访问自己的测试记录

**索引配置**：
| 索引名称 | 字段 | 类型 | 说明 |
|---------|------|-----|------|
| openid_idx | _openid | 单字段索引 | 加速用户记录查询 |
| createTime_idx | createTime | 单字段索引 | 加速时间排序查询 |
| type_idx | type | 单字段索引 | 加速类型筛选 |

---

### 2. user_stats（用户统计表）
**用途**：存储用户的测试统计信息

**字段结构**：
| 字段名 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| _id | String | 自动 | 记录ID |
| _openid | String | 是 | 用户OpenID |
| totalTests | Number | 是 | 总测试次数 |
| mbtiFullCount | Number | 是 | MBTI标准版次数 |
| mbtiQuickCount | Number | 是 | MBTI快速版次数 |
| funTestCount | Number | 是 | 趣味测试次数 |
| lastTestTime | Date | 是 | 最后测试时间 |
| createTime | Date | 是 | 创建时间 |
| updateTime | Date | 是 | 更新时间 |

**权限设置**：
- 读取：仅创建者可读
- 写入：仅创建者可写

**索引配置**：
| 索引名称 | 字段 | 类型 | 说明 |
|---------|------|-----|------|
| openid_unique | _openid | 唯一索引 | 保证每个用户只有一条统计记录 |

---

### 3. global_stats（全局统计表）
**用途**：存储整个应用的全局统计数据

**字段结构**：
| 字段名 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| _id | String | 是 | 固定为 "global" |
| totalTests | Number | 是 | 全局总测试次数 |
| typeDistribution | Object | 是 | 人格类型分布 { "INTJ": 100, "INFJ": 80, ... } |
| updateTime | Date | 是 | 更新时间 |

**权限设置**：
- 读取：所有人可读
- 写入：仅管理员可写（使用云函数权限控制）

**索引配置**：
| 索引名称 | 字段 | 类型 | 说明 |
|---------|------|-----|------|
| primary | _id | 主键 | 唯一标识 |

---

## 二、云函数配置

### 云函数列表
| 云函数名 | 功能 | 文件路径 |
|---------|------|---------|
| saveRecord | 保存测试记录 | cloudfunctions/saveRecord/ |
| getUserHistory | 获取用户历史（支持筛选） | cloudfunctions/getUserHistory/ |
| getGlobalStats | 获取全局统计 | cloudfunctions/getGlobalStats/ |
| deleteRecord | 删除测试记录 | cloudfunctions/deleteRecord/ |
| updateRecord | 更新测试记录 | cloudfunctions/updateRecord/ |

### 云函数权限
- 所有云函数使用 **管理员权限** 运行
- 通过 `wxContext.OPENID` 验证用户身份
- 确保数据隔离，用户只能操作自己的数据

---

## 三、数据库初始化步骤

### 在微信开发者工具中操作：

1. **打开云开发控制台**
   - 点击左侧 "云开发" 按钮

2. **创建集合**
   - 进入 "数据库" -> "集合管理"
   - 依次创建：`test_records`、`user_stats`、`global_stats`

3. **设置权限**
   - 对 `test_records` 设置权限：仅创建者可读写
   - 对 `user_stats` 设置权限：仅创建者可读写
   - 对 `global_stats` 设置权限：所有人可读，仅管理员可写

4. **创建索引**
   - 在每个集合的 "索引管理" 中添加上述索引

5. **初始化全局统计**
   ```javascript
   // 在云函数或控制台执行
   db.collection('global_stats').add({
     data: {
       _id: 'global',
       totalTests: 0,
       typeDistribution: {},
       updateTime: db.serverDate()
     }
   })
   ```

---

## 四、云环境信息

- **云环境ID**: `cloud1-d4gzz9udge5b86e5e`
- **小程序APPID**: `wxbef08d72600b4d24`（从 project.config.json 获取）

---

## 五、安全注意事项

1. **数据隔离**：通过 `_openid` 字段确保用户只能访问自己的数据
2. **权限控制**：使用云函数进行数据操作，避免直接在客户端操作数据库
3. **输入验证**：在云函数中对输入参数进行验证，防止恶意数据
4. **敏感信息**：不存储用户敏感信息（如手机号、身份证号等）
5. **日志记录**：在云函数中记录关键操作日志，便于排查问题