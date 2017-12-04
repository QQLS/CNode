
/** 对时间进行格式化 */
export function formatTime(replayDate) {
  const now = (new Date()).valueOf()
  const pre = (new Date(replayDate)).valueOf()
  const offset = Math.floor((now - pre) / 1000)
  if (offset < 60) return offset + '秒前'
  else if (offset < 3600) return Math.floor(offset / 60) + '分钟前'
  else if (offset < 3600 * 24) return Math.floor(offset / 3600) + '小时前'
  else if (offset < 3600 * 24 * 30) return Math.floor(offset / (3600 * 24)) + '天前'
  else if (offset < 3600 * 24 * 30 * 12) return Math.floor(offset / (3600 * 24 * 30)) + '个月前'
  else return Math.floor(offset / (3600 * 24 * 30 * 12)) + '年前'
}

export function storeToken(token) {
  global.accessToken = JSON.stringify(token)
}

export function getToken() {
  return JSON.parse(global.accessToken)
}

export function removeToken() {
  global.accessToken = null
}


