(function () {
  const switchEl = document.getElementById("mapSwitch");
  if (!switchEl) return;

  const isEdoPage =
    location.pathname.includes("edo.html") ||
    location.pathname.endsWith("/");

  // 初期状態をページに合わせる
  switchEl.checked = !isEdoPage;

  // 切り替え時の挙動
  switchEl.addEventListener("change", () => {
    if (switchEl.checked) {
      // 現代へ
      location.href = "modern.html";
    } else {
      // 江戸へ
      location.href = "edo.html";
    }
  });
})();
