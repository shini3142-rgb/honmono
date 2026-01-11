document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("mapSwitch");
  if (!toggle) return;

  const isModern = location.pathname.includes("modern");

  // 現在ページに応じてトグル状態を同期
  toggle.checked = isModern;

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      // 現代マップへ
      location.href = "modern.html";
    } else {
      // 江戸マップへ
      location.href = "edo.html";
    }
  });
});
