export function formatDate(fmt, date) {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }
  return fmt;
}

export function currentDate() {
  return formatDate('yyyy-MM-dd hh:mm:ss', new Date());
}

export function addMinute(minute, date) {
  let time = date.getTime() + minute * 60 * 1000;
  let newDate = new Date();
  newDate.setTime(time);
  return formatDate('yyyy-MM-dd hh:mm:ss', newDate);
}
