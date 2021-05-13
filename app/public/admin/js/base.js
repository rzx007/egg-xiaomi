/*
 * @Author: rzx007
 * @Date: 2021-05-07 22:53:10
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-13 14:23:50
 * @FilePath: \init\app\public\admin\js\base.js
 * @Description: Do not edit
 */


// eslint-disable-next-line strict
$(function() {
  $('.aside h4').click(function() {
    //		$(this).toggleClass('active');
    $(this).siblings('ul').slideToggle();
  });
  $.extend({
    changeStatus(el, model, attr, id, value) {
      $.get('/admin/common/changeStatus', { model, attr, id, value }, function(data) {
        if (data.success) {
          if (el.src.indexOf('yes') !== -1) {
            el.src = '/admin/admin/images/no.gif';
          } else {
            el.src = '/admin/admin/images/yes.gif';
          }
        }
      });
    },
  });
});
