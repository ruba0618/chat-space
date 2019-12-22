$(function(){
    var buildHTML = function(message) {
      if (message.content && message.image) {
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="upper-message__user-name">` +
              `${message.user_name} ` +
            `</div>` +
            `<div class="upper-message__date">` +
              `${message.created_at}` +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<p class="lower-message__content">` +
              `${message.content}` +
            `</p>` +
            `<img src="` + message.image + `" class="lower-message__image" >` +
          `</div>` +
        `</div>`
      } else if (message.content) {
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="upper-message__user-name">` +
            `${message.user_name} ` +
            `</div>` +
            `<div class="upper-message__date">` +
            `${message.created_at}` +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<p class="lower-message__content">` +
            `${message.content}` +
            `</p>` +
          `</div>` +
        `</div>`
      } else if (message.image) {
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="upper-message__user-name">` +
            `${message.user_name} ` +
            `</div>` +
            `<div class="upper-message__date">` +
            `${message.created_at}`  +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<img src="` + message.image + `" class="lower-message__image" >` +
          `</div>` +
        `</div>`
      };
      return html;
    };

    $(".new_message").on("submit", function(e){
      e.preventDefault()
      var url = $("#new_message").attr("action");
      formData = new FormData(this);
      $.ajax({
        url:  url,  
        type: 'POST',  
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
        })
  
      .done(function(data){
        var html = buildHTML(data);
        $('.main_chat__group').append(html);
        $('.main_chat__group').animate({ scrollTop: $('.main_chat__group')[0].scrollHeight});
        $('form')[0].reset();
        })
  
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      })
      
      .always(function(){
        $('.form__submit').removeAttr('disabled')
      });
    })
  

    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main_chat__group').append(insertHTML);
        $('.main_chat__group').animate({ scrollTop: $('.main_chat__group')[0].scrollHeight});
      })
      .fail(function() {
        alert("受信失敗しました");
      });
      }
    };
    
    setInterval(reloadMessages, 7000);
  });