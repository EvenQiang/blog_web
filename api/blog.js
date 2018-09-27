import request from '@/plugins/request'

export function fetchList(query) {
  return request({
    url: '/api/blog/getList',
    method: 'get',
    params: query
  })
}

export function fetchBlogDetail(id) {
  return request({
    url: '/api/blog/getDetail',
    method: 'get',
    params: {
      id
    }
  })
}