import { requestApi } from '../util/network'

// 获取浏览历史列表
export const getBrowseList =
    (params) =>
        requestApi(
            '/membergoodsbrowse/browse_list',
            'POST',
            {
                page: params.page,
                per_page: params.per_page
            },
            'member'
        )
// 清空浏览历史
export const clearallBrowse =
    (arrivalnotice_id) =>
        requestApi(
            '/membergoodsbrowse/browse_clearall',
            'POST',
            {
            },
            'member'
        )
