/* swiper (スワイパー) campaignセクション */
const topicsSwiper = new Swiper("#js-topics-swiper", {
  loop: true,

  slidesPerView: 'auto', // スライドの幅をCSSで指定
  spaceBetween: 15,
  centeredSlides: true,  // アクティブなスライドが中央に。

  grabCursor: true,  // PCでホバー時にマウスカーソルを「掴む」マークに。

  // breakpoints: {
  //   768: {  // 768px以上の場合 (PC時)
  //     spaceBetween: 15,
  //   },
  // },


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



