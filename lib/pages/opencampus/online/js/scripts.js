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
// 今回は単数だが、『オンライン OPEN CAMPUS』の部分に使用

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

