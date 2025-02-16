/*navigation*/
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const ul = nav.querySelector("ul");
  const underline = nav.querySelector(".underline");
  const items = ul.querySelectorAll("a li"); // <a> 内の <li> を取得

  // 現在のページURLを取得
  const currentPage = window.location.pathname;

  function moveUnderline(element) {
    const rect = element.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    underline.style.width = `${rect.width}px`;
    underline.style.transform = `translateX(${rect.left - navRect.left}px)`;
  }

  // 現在のURLに対応するリンクを探し、activeクラスを付与
  let activeItem = null;
  items.forEach(item => {
    const link = item.parentElement; // <li> の親 <a>
    const href = new URL(link.href).pathname;

    if (currentPage === href) {
      item.classList.add("active");
      activeItem = item;
    }
  });

  // 初期設定：アクティブな項目に下線を移動
  if (activeItem) {
    moveUnderline(activeItem);
  }

  // 各項目にクリックイベントを付与
  items.forEach(item => {
    const link = item.parentElement; // <li> の親 <a>
    link.addEventListener("click", () => {
      ul.querySelector(".active")?.classList.remove("active");
      item.classList.add("active");
      moveUnderline(item);
    });
  });
});
