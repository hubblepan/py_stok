export default function(Mock) {
  // http://cnine.me/note/FrontEnd/mock-lose-cookies-dbg.html
  Mock.XHR.prototype.__send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) this.custom.xhr.withCredentials = false;
    this.__send.apply(this, arguments);
  };
}
