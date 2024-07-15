/* swiper (スワイパー) topics セクション */
// スライドが画面内に収まる枚数のときはスライド機能をOFFに。かつ、それらのスライドを画面中央寄せに。
// 画面内に収まらない枚数のときはスライド機能をONに。
document.addEventListener('DOMContentLoaded', function() {
  const swiperContainer = document.querySelector("#js-topics-swiper");
  const slides = swiperContainer.querySelectorAll(".swiper-slide");
  const nextButton = document.querySelector("#js-topics-next");
  const prevButton = document.querySelector("#js-topics-prev");
  const pagination = document.querySelector("#js-topics-pagination");
  const topicsMiddle = document.querySelector(".topics2__middle");  // 学科ページ用のクラス名を指定。(TOPページと少し異なる)
  const topicsCards = document.querySelector(".cards");  // TOPページと学科ページ共通
  const swiper = document.querySelector(".swiper");  // TOPページと学科ページ共通

  function initSwiper() {
    return new Swiper("#js-topics-swiper", {
      loop: true,
      slidesPerView: 'auto', // スライドの幅をCSSで指定
      spaceBetween: 10,
      centeredSlides: true,  // アクティブなスライドが中央に。
      initialSlide: 1,  // 最初のスライドを指定 (インデックス番号のため0から始まる)
      // loopAdditionalSlides: 1, // 無限ループさせる場合に複製するスライド数

      grabCursor: true,  // PCでホバー時にマウスカーソルを「掴む」マークに。

      autoplay: {
        delay: 4000,  // 4秒おきにスライド
        disableOnInteraction: false,  // ユーザーがスライダーを手動で操作した場合でも自動再生を一時停止せず、自動再生が継続されるように設定。
      },
      speed: 600,  // 0.6秒かけてスライド

      navigation: {
        nextEl: '#js-topics-next',
        prevEl: '#js-topics-prev',
      },

      pagination: {
        el: '#js-topics-pagination',
        clickable: true, // ページネーションの丸(ドット)をクリックしてもスライド可能に。
      },
    });
  }

  function updateSwiper() {
    const swiperWidth = swiperContainer.clientWidth;
    let totalSlidesWidth = 0;

    slides.forEach(slide => {
      totalSlidesWidth += slide.clientWidth + 10; // スライド幅にspaceBetweenの値を加える
    });

    if (totalSlidesWidth <= swiperWidth) {
      // スライド機能をオフ
      nextButton.style.display = 'none';
      prevButton.style.display = 'none';
      pagination.style.display = 'none';
      topicsMiddle.classList.add('is-not-enough-slide'); // 『is-not-enough-slide』クラスを追加して、それらのスライドを画面中央寄せに。
      topicsCards.classList.add('is-not-enough-slide'); // 『is-not-enough-slide』クラスを追加して、gapを付与。(SP時にのみCSSで指定、定義済み)
      swiper.classList.add('is-not-enough-slide'); // 『is-not-enough-slide』クラスを追加して、widthをfit-contentにし、中央寄せに。(SP時にのみCSSで指定、定義済み)
      if (topicsSwiper) {
        topicsSwiper.destroy(true, true);
        topicsSwiper = null;
      }
    } else {
      // スライド機能をオン
      nextButton.style.display = 'block';
      prevButton.style.display = 'block';
      pagination.style.display = 'block';
      topicsMiddle.classList.remove('is-not-enough-slide'); // クラスを削除
      topicsCards.classList.remove('is-not-enough-slide'); // クラスを削除
      swiper.classList.remove('is-not-enough-slide'); // クラスを削除
      if (!topicsSwiper) {
        topicsSwiper = initSwiper();
      }
    }
  }

  let topicsSwiper = initSwiper();
  updateSwiper();
  window.addEventListener('resize', updateSwiper);
});


/* -------------------------------------------------------------------------------- */
/* モーダル (topicsセクション) */
// 開閉の際のアニメーションも付与。

// モーダルを開く処理
document.querySelectorAll(".js-modal-open").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    var modal = document.querySelector("#js-topics-modal-" + modalNumber);
    modal.showModal();
    modal.classList.add("is-visible");  // クラスを追加してアニメーションを適用
    document.documentElement.classList.add("is-fixed");
  });
});

// モーダルを閉じる処理
document.querySelectorAll(".js-modal-close").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    var modal = document.querySelector("#js-topics-modal-" + modalNumber);
    modal.classList.remove("is-visible");  // クラスを削除してアニメーションを適用
    // アニメーションが終わるのを待ってからモーダルを閉じる
    setTimeout(function() {
      modal.close();
    }, 300);  // アニメーションの時間と同じに設定
    document.documentElement.classList.remove("is-fixed");
  });
});




/* モーダル (全日程) */
// 開閉の際のアニメーションも付与。

// モーダルを開く処理
document.querySelectorAll(".js-date-modal-open").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    var modal = document.querySelector("#js-date-modal-" + modalNumber);
    modal.showModal();
    modal.classList.add("is-visible");  // クラスを追加してアニメーションを適用
    document.documentElement.classList.add("is-fixed");
  });
});

// モーダルを閉じる処理
document.querySelectorAll(".js-date-modal-close").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    var modal = document.querySelector("#js-date-modal-" + modalNumber);
    modal.classList.remove("is-visible");  // クラスを削除してアニメーションを適用
    // アニメーションが終わるのを待ってからモーダルを閉じる
    setTimeout(function() {
      modal.close();
    }, 300);  // アニメーションの時間と同じに設定
    document.documentElement.classList.remove("is-fixed");
  });
});


/* -------------------------------------------------------------------------------- */
// トップへ戻るボタン
// 画面を少し(今回は100px)スクロールした時に表示 (通常は非表示)
// かつ、footerには被らない位置でSTOPするように

const pageTop = document.querySelector("#js-top-btn");
const footer = document.querySelector("footer");

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.scrollHeight;
  const footerHeight = footer.offsetHeight;

  if (scrollY > 100) {  // 100px
    pageTop.classList.add("is-show");

    // フッターに被らないように調整
    if (scrollY + windowHeight > bodyHeight - footerHeight) {
      pageTop.style.bottom = `${scrollY + windowHeight - (bodyHeight - footerHeight) + 10}px`;  // footerより10px上の位置で止める
    } else {
      pageTop.style.bottom = '40px';  // footerに近くない場合は、画面の下から40pxの位置に固定。
    }
  } else {
    pageTop.classList.remove("is-show");
  }
});
