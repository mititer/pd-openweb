export const versionIntroduction = [
  {
    version: 0,
    versionName: _l('免费版'),
    sendUserPackageNum: 10,
    yearPrice: 0,
    monthPrice: 0,
    showPurchaseBtn: false,
  },
  {
    version: 1,
    versionName: _l('标准版'),
    sendUserPackageNum: 30,
    yearPrice: 14900,
    monthPrice: 1242,
    showPurchaseBtn: true,
  },
  {
    version: 2,
    versionName: _l('专业版'),
    sendUserPackageNum: 30,
    yearPrice: 29900,
    monthPrice: 2492,
    showPurchaseBtn: true,
  },
  {
    version: 3,
    versionName: _l('旗舰版'),
    sendUserPackageNum: 30,
    yearPrice: 59900,
    monthPrice: 4992,
    showPurchaseBtn: true,
  },
];

const featureData = [
  { className: 'subTitle', subTitle: _l('基础能力') },
  {
    className: 'worksheetCount',
    name: _l('工作表总数'),
    dataTip: _l('所有应用中工作表的总数'),
    value0: _l('100个'),
    value1: _l('100个'),
    value2: _l('不限'),
    value3: _l('不限'),
  },
  {
    className: 'recordCount',
    name: _l('单个工作表最大行数'),
    dataTip: _l('类似于Excel的行数，要管理的数据越多，则需要越多行'),
    value0: _l('1万行'),
    value1: _l('10万行'),
    value2: _l('100万行'),
    value3: _l('不限'),
  },
  {
    className: 'recordAllCount',
    name: _l('工作表行记录总数'),
    dataTip: _l('所有工作表行记录总数（包含关闭应用）'),
    value0: _l('5万行'),
    value1: _l('不限'),
    value2: _l('不限'),
    value3: _l('不限'),
  },
  {
    className: 'workflowExecuteTimes',
    name: _l('工作流执行次数'),
    dataTip: _l('系统每执行一次工作流，则计为一次'),
    value0: _l('1000次/月'),
    value1: _l('20万次/月'),
    value2: _l('40万次/月'),
    value3: _l('80万次/月'),
  },
  {
    className: 'uploadAttachment',
    name: _l('应用附件上传量'),
    dataTip: _l('所有应用中每自然年的文件上传量，包含附件字段、讨论中上传的文件量'),
    value0: _l('2G/年'),
    value1: _l('50G/年'),
    value2: _l('150G/年'),
    value3: _l('300G/月年'),
  },
  {
    className: 'addConditionGraoup',
    name: _l('条件组'),
    dataTip: _l('添加条件组，结合 且/或 条件进行筛选'),
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'basic',
    name: _l('批量导出附件'),
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'customIcon',
    name: _l('自定义图标'),
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'recycle',
    name: _l('回收站'),
    dataTip: _l('应用、应用项、字段、工作流、自定义动作回收站，支持一键恢复/彻底删除回收站内数据'),
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'importAndExport',
    name: _l('应用导入导出'),
    dataTip: _l('通过导入导出，可实现在网络之间快速复制迁移应用和数据'),
    value0: 'basicPng',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'extrermalPortais',
    name: _l('外部门户'),
    dataTip: _l('所有应用中每自然年的外部用户注册量，各版本赠送100人'),
    value0: 'basicPng',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'basic',
    name: _l('协作套件'),
    dataTip: _l('包含动态、任务、日程、知识、消息五大功能'),
    value0: 'basicPng',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  { className: 'subTitle', subTitle: _l('高级') },
  {
    className: 'contactsHidden',
    name: _l('通讯录隐藏'),
    dataTip: _l('通过规则来限制一个用户只能看哪些人和部门'),
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicNo',
    value3: 'basicPng',
  },
  {
    className: 'apiProxy',
    name: _l('API网络代理'),
    dataTip: _l('发送API请求时可以使用您配置的代理服务器'),
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicNo',
    value3: 'basicPng',
  },
  {
    className: 'emcryptData',
    name: _l('数据加密'),
    dataTip: _l(
      '部分字段可设置“数据加密”属性，设置后，数据以密文的形式存储到数据库中，在前端显示和使用时返回为明文，搜索、筛选、排序功能部分将受限',
    ),
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicNo',
    value3: 'basicPng',
  },
  {
    className: 'activityLog',
    name: _l('用户行为日志'),
    dataTip: _l('记录用户的浏览和打印行为，包含访问应用、工作表、自定义页面，浏览工作表记录'),
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicNo',
    value3: 'basicPng',
  },
  {
    className: 'globalVariables',
    name: _l('全局变量'),
    dataTip: '',
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'apiResponse',
    name: _l('封装业务流程API响应'),
    dataTip: _l('封装业务流程（PBP）开启平台API能力后，可以直接响应返回值给请求方，不必使用callbackURL'),
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'node',
    name: _l('代码块节点'),
    dataTip: _l('通过JavaScript或Python语言处理工作流的数据'),
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'push',
    name: _l('界面推送'),
    dataTip: _l('工作流在执行时自动弹出或打开某个页面、数据、视图或链接。'),
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'watermark',
    name: _l('附件（图片）水印'),
    dataTip: '',
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'multiLanguage',
    name: _l('应用多语言'),
    dataTip: '',
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'appBackupRestore',
    name: _l('应用备份/还原'),
    dataTip: '',
    value0: 'basicNo',
    value1: 'basicNo',
    value2: {
      row1: _l('每个应用%0个', 10),
      row2: _l('有效期%0天', 60),
    },
    value3: {
      row1: _l('不限'),
      row2: _l('有效期一年'),
    },
  },
  {
    className: 'appUpgrade',
    name: _l('应用升级'),
    dataTip: '',
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'analysis',
    name: _l('使用分析'),
    dataTip: _l('平台使用情况概览'),
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'userExtension',
    name: _l('用户扩展信息'),
    dataTip: _l(
      '在应用中，管理员可以通过维护用户的扩展业务属性，实现对平台登录用户与工作表中行记录的业务属性进行动态匹配，从而实现用户的扩展属性数据权限',
    ),
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'superSearch',
    name: _l('超级搜索'),
    dataTip: _l('能够一键搜索组织内全部类型的内容'),
    value0: 'basicNo',
    value1: 'basicNo',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'wordPrint',
    name: _l('Word、Excel打印模板'),
    dataTip: _l('通过上传 Word 和 Excel 模板自由定义记录打印的样式'),
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'printPoint',
    name: _l('获取打印文件节点'),
    dataTip: _l(
      '可根据配置的打印模板将记录转为PDF、Word或Excel文件，可以通过新增记录、更新记录或发送邮件节点将文件写入附件',
    ),
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'pageQuickPhoto',
    name: _l('获取页面快照'),
    dataTip: '',
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'apiIntergration',
    name: _l('API集成'),
    dataTip: '',
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'interfaceSearch',
    name: _l('接口查询字段'),
    dataTip: '',
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'intergrationApiNode',
    name: _l('调用已集成API节点'),
    dataTip: '',
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'operationLog',
    name: _l('用户操作日志'),
    dataTip: '',
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'computing',
    name: _l('专属算力'),
    dataTip: _l('可将重要的工作流添加到专属算力中运行，可免受本组织或平台其他组织流程堵塞的影响'),
    value0: 'basicNo',
    value1: _l('可独立购买'),
    value2: _l('可独立购买'),
    value3: _l('可独立购买'),
  },
  { className: 'subTitle', subTitle: _l('数据同步') },
  {
    className: 'syncTaskNum',
    name: _l('数据同步任务数'),
    dataTip: '',
    value0: _l('5个'),
    value1: _l('不限'),
    value2: _l('不限'),
    value3: _l('不限'),
  },
  {
    className: 'syncFuncLimit',
    name: _l('数据同步功能限制'),
    dataTip: _l('ETL:可以在数据同步的过程中对数据进行处理'),
    value0: _l('仅同步'),
    value1: _l('仅同步'),
    value2: _l('仅同步'),
    value3: _l('不限（同步+ETL）'),
  },
  {
    className: 'syncCompution',
    name: _l('数据同步默认算力'),
    dataTip: _l('同步任务的目标写入行数'),
    value0: _l('1万行/月'),
    value1: _l('10万行/月'),
    value2: _l('50万行/月'),
    value3: _l('100万行/月'),
  },
  { className: 'subTitle', subTitle: _l('整合') },
  {
    className: 'ding',
    name: _l('钉钉整合'),
    dataTip: _l('将应用发布到钉钉内使用，可以在钉钉收到应用消息'),
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'weixin',
    name: _l('企业微信整合'),
    dataTip: _l('在企业微信中使用HAP'),
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'feishu',
    name: _l('飞书整合'),
    dataTip: _l('在飞书中使用HAP'),
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  {
    className: 'LDAP',
    name: _l('LDAP/AD整合'),
    dataTip: _l('HAP可与您的LDAP/AD目录进行整合， 终端用户可实现单点登录'),
    value0: 'basicNo',
    value1: 'basicPng',
    value2: 'basicPng',
    value3: 'basicPng',
  },
  { className: 'subTitle', subTitle: _l('增值服务') },
  {
    className: 'userExpand',
    name: _l('用户扩充包'),
    dataTip: '',
    value0: 'basicNo',
    value1: _l('300元/人/年'),
    value2: _l('300元/人/年'),
    value3: _l('300元/人/年'),
  },
  {
    className: 'workflowExpand',
    name: _l('工作流执行数升级包'),
    dataTip: _l('每月工作流执行次数免费额度不足时可购买使用，即时生效。'),
    value0: 'basicNo',
    value1: _l('50元/1万次*剩余月份'),
    value2: _l('50元/1万次*剩余月份'),
    value3: _l('50元/1万次*剩余月份'),
  },
  {
    className: 'workflowExpandByMonth',
    name: _l('工作流执行数单月包'),
    dataTip: _l('当月工作流执行次数额度不足时可购买使用，即时生效。'),
    value0: 'basicNo',
    value1: _l('100元/1万次*本月'),
    value2: _l('100元/1万次*本月'),
    value3: _l('100元/1万次*本月'),
  },
  {
    className: 'dataSyncUpgrade',
    name: _l('数据同步算力升级包'),
    dataTip: _l('每月同步任务的算力额度不足时，可购买使用，立即生效'),
    value0: 'basicNo',
    value1: _l('50元/10万行*剩余月份'),
    value2: _l('50元/10万行*剩余月份'),
    value3: _l('50元/10万行*剩余月份'),
  },
  {
    className: 'dataSyncSigleMouth',
    name: _l('数据同步算力单月包'),
    dataTip: _l('当月同步任务的算力额度不足时，可购买使用，立即生效'),
    value0: 'basicNo',
    value1: _l('100元/10万次*本月'),
    value2: _l('100元/10万次*本月'),
    value3: _l('100元/10万次*本月'),
  },
  {
    className: 'uploadAttachmentExpand',
    name: _l('应用附件上传量扩充包'),
    dataTip: _l('应用中文件上传量不足时可购买使用，即时生效'),
    value0: 'basicNo',
    value1: _l('200元/10G/年'),
    value2: _l('200元/10G/年'),
    value3: _l('200元/10G/年'),
  },
  {
    className: 'extermalPortsisExpand',
    name: _l('外部用户扩充包'),
    dataTip: _l('当外部用户人数额度不足时可购买使用，即时生效'),
    value0: 'basicNo',
    value1: {
      row1: _l('100用户包：500元'),
      row2: _l('1000用户包：1000元'),
      row3: _l('10000用户包：5000元'),
    },
    value2: {
      row1: _l('100用户包：500元'),
      row2: _l('1000用户包：1000元'),
      row3: _l('10000用户包：5000元'),
    },
    value3: {
      row1: _l('100用户包：500元'),
      row2: _l('1000用户包：1000元'),
      row3: _l('10000用户包：5000元'),
    },
  },
];

export const featureDataList = [
  {
    version: -1,
    versionName: '',
    featureData,
  },
  {
    version: 0,
    versionName: _l('免费版'),
    featureData,
  },
  {
    version: 1,
    versionName: _l('标准版'),
    featureData,
  },
  {
    version: 2,
    versionName: _l('专业版'),
    featureData,
  },
  {
    version: 3,
    versionName: _l('旗舰版'),
    featureData,
  },
];

export const payMethodList = [
  {
    type: 'alipayPay',
    text: _l('支付宝付款'),
    icon: 'order-alipay',
    iconColor: 'otherPayColor',
  },
  {
    type: 'wechartPay',
    text: _l('微信支付'),
    icon: 'wechat_pay',
    iconColor: 'wxPayColor',
  },
];
