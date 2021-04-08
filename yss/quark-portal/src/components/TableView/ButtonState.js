export default class ButtonState {
  constructor(params) {
    this.init(params);
  }

  init(params) {}

  isDisable(data, fields) {
    let flag = false;
    Object.keys(fields).forEach((key) => {
      let value = fields[key];
      if (data[key] === value) {
        flag = true;
      }
    });
    return flag;
  }
  copy(data) {
    if (data && data.length === 1) {
      return this.isDisable(data[0], { checkState: 1, auditState: 1 });
    }
    return true;
  }
  edit(data) {
    if (data && data.length === 1) {
      return this.isDisable(data[0], { checkState: 1, auditState: 1 });
    }
    return true;
  }
  deletes(data) {
    if (data && data.length > 0) {
      return !data.some((row) => {
        return this.isDisable(row, { checkState: 0, auditState: 0 });
      });
    }
    return true;
  }
  check(data) {
    if (data && data.length > 0) {
      return !data.some((row) => {
        return this.isDisable(row, { checkState: 0, auditState: 0 });
      });
    }
    return true;
  }
  uncheck(data) {
    if (data && data.length > 0) {
      return !data.some((row) => {
        return this.isDisable(row, { checkState: 1, auditState: 1 });
      });
    }
    return true;
  }
}
