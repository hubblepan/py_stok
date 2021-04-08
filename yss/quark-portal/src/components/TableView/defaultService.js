import request from '@/utils/request';

const init = function (url) {
  if (!url.base.endsWith('/')) {
    url.base = url.base + '/';
  }
  initUrl('detail', url);
  initUrl('del', url);
  initUrl('save', url);
  initUrl('update', url);
  initUrl('query', url);
  initUrl('check', url);
  initUrl('uncheck', url);
  initUrl('export', url);
  initUrl('import', url);
};

const initUrl = function (key, url) {
  if (!url[key]) {
    url[key] = url.base + key;
  }
};

export default function defaultService (url) {
  init(url);
  return {
    detail: function (params) {
      return request
        .get(url['detail'], {
          params,
        })
    },
    del: function (param) {
      return request(url['del'], param);
    },
    save: function (param) {
      return request(url['save'], param);
    },
    update: function (param) {
      return request(url['update'], param);
    },
    query: function (params) {
      return request
        .get(url['query'], {
          params,
        })
    },
    add: function (params) {
      return request
        .get(url['add'], {
          params,
        })
    },
    check: function (param) {
      return request(url['check'], param);
    },
    uncheck: function (param) {
      return request(url['uncheck'], param);
    },
    export: function (param) {
      return request(url['export'], param);
    },
    import: function (param) {
      return request(url['import'], param);
    },
  };
}
