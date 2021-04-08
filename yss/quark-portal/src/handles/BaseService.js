import request from '@/utils/request';

const setUrl = function (key, url) {
  if (!url[key]) {
    url[key] = url.base + key;
  }
  if (url.params) {
    // 使用get
    let queryString = '';
    Object.keys(url.params).map((prop) => {
      queryString += `${prop}=${url.params[prop]}`;
    });
    url[key] = `${url[key]}?${queryString}`;
  }
};
const initUrl = function (url) {
  if (!url.base.endsWith('/')) {
    url.base += '/';
  }
  setUrl('detail', url);
  setUrl('deletes', url);
  setUrl('save', url);
  setUrl('update', url);
  setUrl('query', url);
  setUrl('check', url);
  setUrl('uncheck', url);
  setUrl('export', url);
  setUrl('import', url);
  setUrl('listhead', url);
};

export default class BaseService {
  constructor(url) {
    this.init(url);
  }

  init(url) {
    initUrl(url);
    this.url = url;
  }

  static get(url, params) {
    return request.get(url, {
      params,
    });
  }

  static post(url, data) {
    return request(url, {
      method: 'POST',
      data,
    });
  }

  static request(options) {
    return request(options);
  }

  detail(id) {
    console.log(id);
    return request.get(this.url.detail, {
      params: { id },
    });
  }

  deletes(ids) {
    return request(this.url.deletes, {
      method: 'DELETE',
      data: { ids },
    });
  }

  save(params) {
    return request(this.url.save, {
      method: 'POST',
      data: params,
    });
  }

  update(params) {
    return request(this.url.update, {
      method: 'POST',
      data: params,
    });
  }

  query(data) {
    return request(this.url.query, {
      method: 'POST',
      data,
    });
  }

  add(params) {
    return request.get(this.url.add, {
      params,
    });
  }

  check(ids) {
    return request(this.url.check, {
      method: 'POST',
      data: { ids },
    });
  }

  uncheck(ids) {
    return request(this.url.uncheck, {
      method: 'POST',
      data: { ids },
    });
  }

  export(params) {
    return request(this.url.export, params);
  }

  import(params) {
    return request(this.url.import, {
      method: 'POST',
      data: params,
    });
  }

  listHead(){
    return request(this.url.listhead, {
      method: 'POST',
    });
  }
}
