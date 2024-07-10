/* swiper (スワイパー) topics セクション */
const topicsSwiper = new Swiper("#js-topics-swiper", {
  loop: true,

  slidesPerView: 'auto', // スライドの幅をCSSで指定
  spaceBetween: 15,
  centeredSlides: true,  // アクティブなスライドが中央に。

  grabCursor: true,  // PCでホバー時にマウスカーソルを「掴む」マークに。



// 『矢印』と『ページネーション』は、id指定してJSで指定する事で動作する。

  // Navigation arrows（矢印のオプション指定）
  navigation: {
    nextEl: '#js-topics-next',
    prevEl: '#js-topics-prev',
  },

  // ページネーション
  pagination: {
    el: '#js-topics-pagination',
  },

});


/* -------------------------------------------------------------------------------- */
/* モーダル (topicsセクション) */

// モーダルを開く処理
document.querySelectorAll(".js-modal-open").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    document.querySelector("#js-topics-modal-" + modalNumber).showModal();
    document.documentElement.classList.add("is-fixed");
  });
});

// モーダルを閉じる処理
document.querySelectorAll(".js-modal-close").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    document.querySelector("#js-topics-modal-" + modalNumber).close();
    document.documentElement.classList.remove("is-fixed");
  });
});




/* モーダル (全日程) */

// モーダルを開く処理
document.querySelectorAll(".js-date-modal-open").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    document.querySelector("#js-date-modal-" + modalNumber).showModal();
    document.documentElement.classList.add("is-fixed");
  });
});

// モーダルを閉じる処理
document.querySelectorAll(".js-date-modal-close").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    document.querySelector("#js-date-modal-" + modalNumber).close();
    document.documentElement.classList.remove("is-fixed");
  });
});


/* -------------------------------------------------------------------------------- */
// トップへ戻るボタン
// 画面を少し(今回は100px)スクロールした時に表示 (通常は非表示)
const pageTop = document.querySelector("#js-top-btn");

window.addEventListener("scroll", function () {
  if (100 < window.scrollY) {  // 100px
    pageTop.classList.add("is-show");
  } else {
    pageTop.classList.remove("is-show");
  }
});

