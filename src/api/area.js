import { requestApi } from '../util/network'

//
export const getAreaTree =
    () =>
      requestApi(
        '/Area/area_app',
        'POST',
        {
        }
      )
export const getAreaTree1=
    () =>
      requestApi(
        '/Area/area_app1',
        'POST',
        {
        }
      )
export const getAreaList =
    () =>
      requestApi(
        '/Area/area_list',
        'POST',
        {
        }
      )
export const getAreaList1 =
    () =>
      requestApi(
        '/Area/area_list1',
        'POST',
        {
        }
      )