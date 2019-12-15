$(function(){
  function buildHTML(message){
    console.log(message);
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="message">
      <div class="upper-message">
      <div class="upper-message__user-name">
      
      </div>
      <div class="upper-message__date">
      
      </div>
      </div>
      <div class="lower-message">
      <p class="lower-message__content">
      
      </p>
      <img class="lower-message__image" src="${message.image}" alt="Arrow top">
      </div>
      </div>`
    }
     else {
      var html = `<div class="message">
      <div class="upper-message">
      <div class="upper-message__user-name">
      
      </div>
      <div class="upper-message__date">
      
      </div>
      </div>
      <div class="lower-message">
      <p class="lower-message__content">
      
      </p>
      </div>
      </div>`//メッセージに画像が含まれない場合のHTMLを作る
    }
    return html
  }
  
  
  $(".new_message").on("submit", function(e){
    e.preventDefault()
 
    var url = $("#new_message").attr("action");
    formData = new FormData(this);
    $.ajax({
      url:  url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__group').append(html);
      $('.main_chat__group').animate({ scrollTop: $('.main_chat__group')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
})

