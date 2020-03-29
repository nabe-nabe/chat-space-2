$(function(){
  function buildPost(message){
    if ( message.image ) {
      var html = `<div class="main-chat__contents__list" data-message-id="${message.id}">
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
      var html = `<div class="main-chat__contents__list" data-message-id="${message.id}">
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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.main-chat__contents__list:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if(messages.length !== 0) {
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main-chat__contents').append(insertHTML);
        $('.main-chat__contents').animate({ scrollTop: $('.main-chat__contents')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html =
      `<div class="main-chat__contents__list" data-message-id="${message.id}">
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
          <img src="${message.image}" class="main-chat__contents__list__image">
        </div>
      </div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html =
      `<div class="main-chat__contents__list" data-message-id="${message.id}">
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
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html =
      `<div class="main-chat__contents__list" data-message-id="${message.id}">
        <div class="main-chat__contents__list__box">
          <div class="main-chat__contents__list__box__name">
            message.user_name +
          </div>
          <div class="main-chat__contents__list__box__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__contents__list__message">
          <img src="${message.image}" class="main-chat__contents__list__image" >
        </div>
      </div>`
    };
    return html;
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 3000);
  }
});
