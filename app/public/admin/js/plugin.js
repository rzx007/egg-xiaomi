/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
/*
 * @Author: rzx007
 * @Date: 2021-05-13 14:05:29
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-16 17:58:09
 * @FilePath: \init\app\public\admin\js\plugin.js
 * @Description: jQuery插件简单开发
 */
// eslint-disable-next-line strict
(function($, window, document, undefined) {
  // 定义Beautifier的构造函数
  const Beautifier = function(ele, opt) {
    this.$element = ele;
    this.defaults = {
      color: 'red',
      fontSize: '12px',
      textDecoration: 'none',
    };
    this.options = $.extend({}, this.defaults, opt);
  };
  // 定义Beautifier的方法
  Beautifier.prototype = {
    beautify() {
      return this.$element.css({
        color: this.options.color,
        fontSize: this.options.fontSize,
        textDecoration: this.options.textDecoration,
      });
    },
  };
  // 在插件中使用Beautifier对象
  $.fn.myPlugin = function(options) {
    // 创建Beautifier的实体
    const beautifier = new Beautifier(this, options);
    // 调用其方法
    return beautifier.beautify();
  };
})(jQuery, window, document);

/*
使用
$(selector).myPlugin()
*/
