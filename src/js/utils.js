
export function formatNumBelowTen(num) {
	return num < 10 ? '0' + num : num;
}
export function GetDateStr(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth()+1;//获取当前月份的日期
  var d = dd.getDate();
  return y+"-"+m+"-"+d;
}

