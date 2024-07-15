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
