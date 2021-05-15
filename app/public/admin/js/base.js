/* eslint-disable no-undef */
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
    editNum(el, model, attr, id) {
      const val = $(el).html();
      const input = $("<input value='' />");
      // 把input放在sapn里面
      $(el).html(input);
      // 让input获取焦点  给input赋值
      $(input).trigger('focus').val(val);


      // 点击input的时候阻止冒泡
      $(input).click(function() {
        return false;
      });
      // 鼠标离开的时候给sapn赋值
      $(input).blur(function() {
        const num = $(this).val();
        $(el).html(num);
        $.get('/admin/common/editNum', { model, attr, id, num }, function(data) {
          console.log(data);
        });

      });


    },
  });
});
