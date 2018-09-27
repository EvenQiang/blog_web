import request from '@/plugins/request'

export function userSearch(name) {
  return request({
    url: '/user/searchUser',
    method: 'get',
    params: {
      name
    }
  })
}