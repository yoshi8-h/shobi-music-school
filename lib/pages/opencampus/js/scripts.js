/* swiper (スワイパー) topics セクション */
// const topicsSwiper = new Swiper("#js-topics-swiper", {
//   loop: true,

//   slidesPerView: 'auto', // スライドの幅をCSSで指定
//   spaceBetween: 10,
//   centeredSlides: true,  // アクティブなスライドが中央に。
//   initialSlide: 1,  // 最初のスライドを指定 (インデックス番号のため0から始まる)

//   grabCursor: true,  // PCでホバー時にマウスカーソルを「掴む」マークに。

//   autoplay: {
//     delay: 4000,  // 2.5秒おきにスライド
//     disableOnInteraction: false,  // ユーザーがスライダーを手動で操作した場合でも自動再生を一時停止せず、自動再生が継続されるように設定。
//   },
//   speed: 600,  // 0.6秒かけてスライド



// // 『矢印』と『ページネーション』は、id指定してJSで指定する事で動作する。

//   // Navigation arrows（矢印のオプション指定）
//   navigation: {
//     nextEl: '#js-topics-next',
//     prevEl: '#js-topics-prev',
//   },

//   // ページネーション
//   pagination: {
//     el: '#js-topics-pagination',
//     clickable: true, // ページネーションの丸(ドット)をクリックしてもスライド可能に。
//   },

// });



/* swiper (スワイパー) topics セクション */
// スライドが画面内に収まる枚数のときはスライド機能をOFFに。かつ、それらのスライドを画面中央寄せに。
// 画面内に収まらない枚数のときはスライド機能をONに。
document.addEventListener('DOMContentLoaded', function() {
  const swiperContainer = document.querySelector("#js-topics-swiper");
  const slides = swiperContainer.querySelectorAll(".swiper-slide");
  const nextButton = document.querySelector("#js-topics-next");
  const prevButton = document.querySelector("#js-topics-prev");
  const pagination = document.querySelector("#js-topics-pagination");
  const topicsMiddle = document.querySelector(".topics__middle");
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
// 『閉じるボタン(×アイコン)』を押した時だけでなく、モーダルの外枠をクリックした時もモーダルが閉じるように実装。

// モーダルを開く処理
document.querySelectorAll(".js-modal-open").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    var modal = document.querySelector("#js-topics-modal-" + modalNumber);
    modal.showModal();
    modal.classList.add("is-visible");  // クラスを追加してアニメーションを適用
    document.documentElement.classList.add("is-fixed");

    // モーダルの枠外をクリックした時の処理を追加
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModal(modal);  // 『closeModal(modal)』関数を実行
      }
    });
  });
});

// モーダルを閉じる処理
document.querySelectorAll(".js-modal-close").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    var modal = document.querySelector("#js-topics-modal-" + modalNumber);
    closeModal(modal);  // 『closeModal(modal)』関数を実行
  });
});

// モーダルを閉じる共通処理 (『closeModal(modal)』関数を定義)
function closeModal(modal) {
  modal.classList.remove("is-visible");  // クラスを削除してアニメーションを適用
  // アニメーションが終わるのを待ってからモーダルを閉じる
  setTimeout(function() {
    modal.close();
  }, 300);  // アニメーションの時間と同じに設定
  document.documentElement.classList.remove("is-fixed");
}


/* -------------------------------------------------------------------------------- */
/* アコーディオン (qa セクション) */
// jQuery
jQuery(".js-accordion").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).parent().hasClass("is-open")) {
    jQuery(this).parent().removeClass("is-open");
    jQuery(this).next().slideUp();
  } else {
    jQuery(this).parent().addClass("is-open");
    jQuery(this).next().slideDown();
  }
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



/* ================================================================================ */
/*  アニメーション  */
/* ================================================================================ */
/* 複数枚のカード(要素)を時差でフワッと下から出現 (左から順番に時差で) */
// 今回は『FV』に使っている為、読み込み時間を考慮して『delay』で0.4秒遅らせて発火。

document.addEventListener('DOMContentLoaded', function() {

  // ページ内の全てのカードコンテナ(複数枚カードのコンテナ。PC時にトリガーとなる要素)を取得
  const cardContainers = document.querySelectorAll(".js-cards-fadeInUp-trigger");

  cardContainers.forEach(container => {
    const cards = container.querySelectorAll(".js-card-fadeInUp");  // そのコンテナ内のカードを全て取得
    gsap.fromTo(cards, {y:40, autoAlpha:0}, {y:0, autoAlpha:1, delay:.4, stagger:.13, scrollTrigger:{
        trigger: container,
        start: 'center bottom',
        // markers:{
        //   startColor: "white",
        // },
      }
    });
  });

});


/* -------------------------------------------------------------------------------- */
/* 連続ポップアップアニメーション (若干の時間差で複数要素が連続的に現れるアニメーション) */
// 今回は単数だが、『参加型 OPEN CAMPUS』の部分に使用

window.addEventListener('DOMContentLoaded', function() {
  gsap.utils.toArray('.js-popUps').forEach(function(element){
    let targets = element.querySelectorAll(':scope > *');// ※擬似クラス『:scope』
    gsap.fromTo(targets,{scale:.9,autoAlpha:0},{scale:1,autoAlpha:1,
      ease:"back.out(1.7)",  // 少しバウンドするようなアニメーション → ease:"back.out(1.7)" で再現
      stagger:.05,
      scrollTrigger:{
        trigger:element,
        start:'top 60%',
        // markers:true,
      }
    });
  })
})


/* -------------------------------------------------------------------------------- */
/* １つの要素をフワッと下から出現 */
document.addEventListener('DOMContentLoaded', function() {
  const fadeInUps = document.querySelectorAll(".js-fadeInUp");  // ページ内の、このアニメーションをさせたい全ての要素を取得

  fadeInUps.forEach(item => {
    gsap.fromTo(item, {y:20, autoAlpha:0}, {y:0, autoAlpha:1, scrollTrigger:{
        trigger: item,
        start: 'top 90%',
        // markers:{
        //   startColor: "green",
        // },
      }
    });
  });

});


/* -------------------------------------------------------------------------------- */
/* 連続して縮小されて表示されるアニメーション (若干の時間差で複数要素が連続的に現れるアニメーション) */
// subjectセクションで使用。(複数の学科)
// SP時に初期値が大きいと横スクロールする原因になるため、SP時はPC時より少し小さい状態からアニメーション開始

window.addEventListener('DOMContentLoaded', function() {
  gsap.utils.toArray('.js-BigToSmalls').forEach(function(element){

    const mm = gsap.matchMedia();
    let targets = element.querySelectorAll(':scope > *');// ※擬似クラス『:scope』

    // 769px以上のとき (PC)  // 今回は768ではなく769以上がPC
    mm.add('(min-width:769px)', function() {
      gsap.fromTo(targets,{scale:1.5,autoAlpha:0},{scale:1,autoAlpha:1,
        stagger:.07,
        scrollTrigger:{
          trigger:element,
          start:'top 70%',
          // markers:true,
        }
      });
    });

    // 768px以下のとき (SP)  // 今回は767ではなく768以下がSP
    mm.add('(max-width:768px)', function() {
      gsap.fromTo(targets,{scale:1.2,autoAlpha:0},{scale:1,autoAlpha:1,
        stagger:.07,
        scrollTrigger:{
          trigger:element,
          start:'top 70%',
          // markers:true,
        }
      });
    });

  })
})


/* -------------------------------------------------------------------------------- */
/* 複数枚のカードを時差でフワッと下から出現 (ver.2) (左から順番に時差で) */
// → ※上で、同じアニメーションを『FV』ようにカスタマイズして使ってしまっているから、ほぼ同じ動きだが別のアニメーションとして定義。

document.addEventListener('DOMContentLoaded', function() {

  // ページ内の全てのカードコンテナ(複数枚カードのコンテナ。PC時にトリガーとなる要素)を取得
  const cardContainers2 = document.querySelectorAll(".js-cards-fadeInUp-trigger-2");

  cardContainers2.forEach(container => {
    const cards = container.querySelectorAll(".js-card-fadeInUp");  // そのコンテナ内のカードを全て取得
    gsap.fromTo(cards, {y:40, autoAlpha:0}, {y:0, autoAlpha:1, stagger:.09, scrollTrigger:{
        trigger: container,
        start: 'center bottom',
        // markers:{
        //   startColor: "white",
        // },
      }
    });
  });

});

