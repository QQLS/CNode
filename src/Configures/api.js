
export const BASE_URL = 'https://cnodejs.org/api/v1';

/** 主题 */
/** 主题首页(ask share job good) */
export const TOPICS = '/topics'
/** 新建主题 */
export const CREATE_TOPICS = '/topics'
/** 编辑主题 */
export const UPDATE_TOPICS = '/topics/update'

/** 主题收藏 */
/** 收藏主题 */
export const COLLECT_TOPICS = '/topic_collect/collect'
/** 取消主题 */
export const CANCEL_TOPICS = '/topic_collect/de_collect'

/** 用户 */
/** 用户详情 */
export const USER_DETAIL = (loginName) => '/user/' + loginName
/** 验证 accessToken 的正确性, 相当于是登录 */
export const LOGIN = '/accesstoken/'
