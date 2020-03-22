$(function(){
  function buildPost(message){
    if ( message.image ) {
      var html = `<div class="main-chat__contents__list">
                    <div class="main-chat__contents__list__box">
                    <div class="main-chat__contents__list__box__name">
                      ${message.user_name}
                    </div>
                    <div class="main-chat__contents__list__box__date">
                      ${message.created_at}
                    </div>
                    </div>
                    <div class="main-chat__contents__list__message">
                      ${message.content}
                    <img class="main-chat__contents__list__image" src="${message.image}">
                    </div>
                  </div>`
      return html;
    } else {
      var html = `<div class="main-chat__contents__list">
                    <div class="main-chat__contents__list__box">
                    <div class="main-chat__contents__list__box__name">
                      ${message.user_name}
                    </div>
                    <div class="main-chat__contents__list__box__date">
                      ${message.created_at}
                    </div>
                    </div>
                    <div class="main-chat__contents__list__message">
                      ${message.content}
                    </div>
                  </div>`
      return html;
    }
  }

  $('#new_message').on('submit', function(e){
    console.log("ok!!!!!!!!!!!");
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildPost(message);
      $('.main-chat__contents').append(html);
      $("form")[0].reset();
      $('.main-chat__form__contents__send__btn').prop('disabled', false);
      $('.main-chat__contents').animate({ scrollTop: $('.main-chat__contents')[0].scrollHeight});
    })
    .fail(function(){
      alert('エラー！！！');
    })
  });
});
