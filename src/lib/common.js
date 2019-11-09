import $ from "jquery"
$.extend({
  isNotEmpty: function isNotEmpty(obj) {
    return !$.isEmpty(obj);
  },
  isEmpty: function isEmpty(obj) {
    if (obj == 'undefined') {
      return true;
    } else if (obj == null) {
      return true;
    } else if (obj === '') {
      return true;
    } else if (obj === 'null') {
      return true;
    } else {
      return false;
    }
  }
});

String.prototype.contains = function(str) {
  return this.indexOf(str) != -1;
};
/**
 * 数组删除指定对象
 * @param val
 */
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
Array.prototype.pushAll = function(resouce) {
  var arr = this;
  resouce.forEach(function(item) {
    arr.push(item);
  });
};
