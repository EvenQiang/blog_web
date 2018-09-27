import request from '@/plugins/request'

export function fetchList(query) {
  return request({
    url: '/api/pi/getList',
    method: 'get',
    params: query
  })
}

export function fetchPiDetail(id) {
  return request({
    url: '/api/pi/getDetail',
    method: 'get',
    params: {
      id
    }
  })
}