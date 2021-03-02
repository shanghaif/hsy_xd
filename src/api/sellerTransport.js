import { requestApi } from '../util/network'
// 获取售卖地区
export const getTransportList =
    () =>
      requestApi(
        '/Sellertransport/transport_list',
        'POST',
        {
        },
        'seller'
      )
// 售卖地区编辑
export const editTransport =
    (transport_id) =>
      requestApi(
        '/Sellertransport/edit_transport',
        'POST',
        {
          transport_id: transport_id
        },
        'seller'
      )
// 售卖地区保存
export const saveTransport =
    (transport, transport_extend) =>
      requestApi(
        '/Sellertransport/save_transport',
        'POST',
        Object.assign(
          transport,
          { transport_extend: transport_extend }),
        'seller'
      )
// 删除售卖地区
export const delTransport =
    (transport_id) =>
      requestApi(
        '/Sellertransport/del_transport',
        'POST',
        {
          transport_id: transport_id
        },
        'seller'
      )
