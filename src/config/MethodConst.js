
const methodinfo = {
  /*
     *
     * 公共模块相关接口
     *
     */
//  登录
  login: '/PUB/sysempno/login',
  // 修改密码
  modifypassword: '/PUB/sysempno/modifypassword',
  // 根据工号获取酒店信息
  getempnohotellist: '/PUB/sysempno/getempnohotellist',
  // 获取工号信息列表
  getempnolist: '/PUB/sysempno/getempnolist',
  // 获取工号详情
  getempnoinfo: '/PUB/sysempno/getempnoinfo',
  // 获取站点信息
  getpcidstatus: '/PUB/station/getpcidstatus',
  // 获取基础代码列表
  getbasecodelist: '/PUB/pubcode/getbasecodelist',
  // 批量更新基础代码
  updatebasecodes: '/PUB/pubcode/updatebasecodes',
  // 删除基础代码
  deletebasecode: '/PUB/pubcode/deletebasecode',
  // 获取系统代码列表
  getsystemcode: '/PUB/pubcode/getsystemcode',
  // 获取系统参数
  getsysoption: '/PUB/sysoption/getsysoption',
  // 获取系统参数列表
  getsysoptionlist: '/PUB/sysoption/getsysoptionlist',
  // 获取销售员列表
  getsaleidlist: '/PUB/saleid/getsaleidlist',
// 获取酒店信息列表
  gethotellist: '/PUB/hotelid/gethotellist',
  // 获取酒店编号查询条件
  getcond: '/PUB/hotelid/getcond',
  // 获取岗位列表
  getdeptlist: '/PUB/authfunction/getdeptlist',
// 获取角色列表
  getjoblist: '/PUB/authfunction/getjoblist',
// 修改工号信息
  modifyempnoinfo: '/PUB/sysempno/modifyempnoinfo',


  /*
 SC业务相关接口
 */
  /*
 宴会相关
 */
  // 获取宴会预订列表
  getcateringlist: '/SC/reserve/sccatering/getcateringlist',
  // 获取历史宴会预订列表
  gethistorycateringlist: '/SC/reserve/sccatering/gethistorycateringlist',
  // 更新宴会订单状态
  updatecateringsta: '/SC/reserve/sccatering/updatecateringsta',
  // 获取宴会订单信息
  getcateringinfo: '/SC/reserve/sccatering/getcateringinfo',
  // 获取历史宴会订单信息
  gethistorycateringinfo: '/SC/reserve/sccatering/gethistorycateringinfo',
  // 保存宴会订单
  updatecatering: '/SC/reserve/sccatering/updatecatering',
  // 新增宴会订单
  newcatering: '/SC/reserve/sccatering/newcatering',
  /*
 事务相关
 */
  // 获取宴会事务
  getevent: '/SC/reserve/scevent/getevent',
  // 获取宴会事务列表
  geteventlist: '/SC/reserve/scevent/geteventlist',
  // 获取历史宴会事务列表
  getheventlist: '/SC/reserve/scevent/getheventlist',
  // 更新事务
  updateevent: '/SC/reserve/scevent/updateevent',
  // 取消事务
  cancelevent: '/SC/reserve/scevent/cancelevent',
  // 事务校验
  checkevent: '/SC/reserve/scevent/checkevent',
  // 批量新增事务
  newbatchevent: '/SC/reserve/scevent/newbatchevent',
  // 获取宴会事务预测收入
  geteventincome: '/SC/reserve/scevent/geteventincome',
  // 获取酒店事务类型构成
  geteventtypecompose: '/SC/reserve/scevent/geteventtypecompose',
  // 同步宴会事务
  syncSCEvent: '/SC/reserve/scevent/syncscevent',
  /*
 场地相关
 */
  // 获取酒店会场排行情况
  getplacerankinfo: '/SC/reserve/scplace/getplacerankinfo',
  // 获取酒店会场出租数情况
  getplacerentinfo: '/SC/reserve/scplace/getplacerentinfo',
  // 获取酒店场地列表
  getplacelist: '/SC/reserve/scplace/getplacelist',
  // 获取酒店场地从属包含信息列表
  gettoplacelist: '/SC/reserve/scplace/gettoplacelist',
  // 获取酒店营业点列表
  getpccodelist: '/SC/reserve/scplace/getpccodelist',
  // 获取酒店场地占用详情
  getplaceusedinfo: '/SC/reserve/scplace/getplaceusedinfo',
  // 获取酒店空闲场地列表
  getunuseplacelist: '/SC/reserve/scplace/getunuseplacelist',
  // 获取场地扩展信息列表
  getplaceexpandinfo: '/SC/reserve/scplace/getplaceexpandinfo',
  /*
 项目相关
 */
  // 获取酒店项目列表
  getitemlist: '/SC/reserve/scitem/getitemlist',
  // 获取项目类别列表
  getitemclasslist: '/SC/reserve/scitem/getitemclasslist',
  // 获取事务项目列表
  geteventitemlist: '/SC/reserve/scitem/geteventitemlist',
  // 新增事务项目
  addeventitem: '/SC/reserve/scitem/addeventitem',
  // 更新事务项目
  updateeventitem: '/SC/reserve/scitem/updateeventitem',
  // 转移事务项目
  sendeventitem: '/SC/reserve/scitem/sendeventitem',
  // 复制事务项目
  copyeventitem: '/SC/reserve/scitem/copyeventitem',
  // 删除事务项目
  deleteeventitem: '/SC/reserve/scitem/deleteeventitem',
  /*
 备注相关
 */
  // 获取宴会备注详情
  getscnoteinfo: '/SC/reserve/scnotes/getscnoteinfo',
  // 获取宴会备注数量
  getscnotecounts: '/SC/reserve/scnotes/getscnotecounts',
  // 获取宴会备注列表
  getscnotelist: '/SC/reserve/scnotes/getscnotelist',
  // 更新宴会备注
  updatescnoteinfo: '/SC/reserve/scnotes/updatescnoteinfo',
  // 新建宴会备注
  newscnoteinfo: '/SC/reserve/scnotes/newscnoteinfo',
  /*
 销售活动相关
 */
  // 获取销售活动列表
  getguestdiarylist: '/SC/reserve/scdiary/getguestdiarylist',
  // 获取销售活动详情
  getguestdiary: '/SC/reserve/scdiary/getguestdiary',
  // 保存更新销售活动内容
  saveorupdateguestdiary: '/SC/reserve/scdiary/saveorupdateguestdiary',
  // 按天获取销售活动列表
  getguestdiarybymonthlist: '/SC/reserve/scdiary/getguestdiarybymonthlist',
  // 更新销售批示
  updatememorandum: '/SC/reserve/scdiary/updatememorandum',
  /*
 代码维护相关
 */
  // 新增营业点
  newpccode: '/SC/reserve/scplacemaint/newpccode',
  // 批量更新场地信息
  updateplaces: '/SC/reserve/scplacemaint/updateplaces',
  // 更新酒店营业点
  updatepccode: '/SC/reserve/scplacemaint/updatepccode',
  // 删除酒店营业点
  deletepccode: '/SC/reserve/scplacemaint/deletepccode',
  // 删除酒店场地信息
  deleteplace: '/SC/reserve/scplacemaint/deleteplace',
  // 新增项目类别
  savescitemclass: '/SC/reserve/scitemmaint/savescitemclass',
  // 更新项目类别
  updatescitemclass: '/SC/reserve/scitemmaint/updatescitemclass',
  // 批量更新项目
  savescitemlist: '/SC/reserve/scitemmaint/savescitemlist',
  // 删除项目类别
  deletescitemclass: '/SC/reserve/scitemmaint/deletescitemclass',
  // 删除项目
  deletescitem: '/SC/reserve/scitemmaint/deletescitem',
  /*
 接口相关
 */
  // 主单同步
  syncSCCatering: '/SC/interface/sctopms/syncSCCatering',
  // 获取主单预留信息
  getMasterRsvsrc: '/SC/interface/sctopms/getMasterRsvsrc',
  /*
 档案
 */
  // 档案查询
  getProfiles: '/SC/interface/sctoguest/getProfiles',
  /*
 系统相关接口
 */
  auth: '/userauth',
  getloginhotellist: '/getloginhotellist',

  url :'http://172.10.60.61:8083/'
}
module.exports = exports = methodinfo
