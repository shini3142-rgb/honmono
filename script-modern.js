(function () {

  // ===== 経路用（全部の駅）=====
       const modernRoutePoints = [
    { name: "伊勢神宮", pos: { lat: 34.45611, lng: 136.72414 } },
    { name: "多気駅", pos: { lat: 34.5079, lng: 136.5353 } },
    { name: "松阪駅", pos: { lat: 34.5770, lng: 136.5281 } },
    { name: "津駅", pos: { lat: 34.7347, lng: 136.5086 } },
    { name: "鈴鹿駅", pos: { lat: 34.8815, lng: 136.5849 } },
    { name: "富田浜駅", pos: { lat: 34.9914, lng: 136.6412 } },
    { name: "朝日駅", pos: { lat: 35.0355, lng: 136.6677 } },
    { name: "桑名駅", pos: { lat: 35.0622, lng: 136.6833 } },
    { name: "長島駅", pos: { lat: 35.0867, lng: 136.7747 } },
    { name: "弥富駅", pos: { lat: 35.1161, lng: 136.7274 } },
    { name: "蟹江駅", pos: { lat: 35.1348, lng: 136.7856 } },
    { name: "金山駅", pos: { lat: 35.1429, lng: 136.9006 } },
    { name: "大府駅", pos: { lat: 35.0197, lng: 136.9481 } },
    { name: "刈谷駅", pos: { lat: 34.9916, lng: 136.9933 } },
    { name: "安城駅", pos: { lat: 34.9584, lng: 137.0806 } },
    { name: "岡崎駅", pos: { lat: 34.9551, lng: 137.1569 } },
    { name: "蒲郡駅", pos: { lat: 34.8265, lng: 137.2321 } },
    { name: "豊橋駅", pos: { lat: 34.7627, lng: 137.3826 } },
    { name: "浜松駅", pos: { lat: 34.7037, lng: 137.7341 } },
    { name: "磐田駅", pos: { lat: 34.7174, lng: 137.8516 } },
    { name: "掛川駅", pos: { lat: 34.7697, lng: 138.0150 } },
    { name: "静岡駅", pos: { lat: 34.9717, lng: 138.3889 } },
    { name: "清水駅", pos: { lat: 35.0253, lng: 138.4885 } },
    { name: "富士駅", pos: { lat: 35.1613, lng: 138.6769 } },
    { name: "沼津駅", pos: { lat: 35.0956, lng: 138.8601 } },
    { name: "三島駅", pos: { lat: 35.1265, lng: 138.9114 } },
    { name: "熱海駅", pos: { lat: 35.1035, lng: 139.0778 } },
    { name: "小田原駅", pos: { lat: 35.2550, lng: 139.1556 } },
    { name: "藤沢駅", pos: { lat: 35.3386, lng: 139.4876 } },
    { name: "横浜駅", pos: { lat: 35.4659, lng: 139.6227 } },
    { name: "川崎駅", pos: { lat: 35.5310, lng: 139.6969 } },
    { name: "品川駅", pos: { lat: 35.6285, lng: 139.7388 } },
    { name: "東京駅", pos: { lat: 35.6812, lng: 139.7671 } },
    { name: "日本橋", pos: { lat: 35.6841, lng: 139.7745 } }
  ];

  // ===== ピン用 =====
  const modernPins = [
    { name: "伊勢神宮", pos: { lat: 34.45611, lng: 136.72414 } },
    { name: "四日市駅", pos: { lat: 34.967067, lng: 136.618575 } },
    { name: "岡崎駅", pos: { lat: 34.9551, lng: 137.1569 } },
    { name: "有松駅", pos: { lat:　35.06756307885016, lng:　136.97141179904855 } },
    { name: "二川駅", pos: { lat: 34.7175, lng: 137.6375 } },
    { name: "新居駅", pos: { lat: 34.69411, lng: 137.569444 } },
    { name: "静岡駅", pos: { lat: 34.9717, lng: 138.3889 } },
    { name: "新蒲原駅", pos: { lat: 35.109174, lng: 138.550781 } },
    { name: "小田原駅", pos: { lat: 35.2550, lng: 139.1556 } },
    { name: "川崎駅", pos: { lat: 35.5310, lng: 139.6969 } },
    { name: "日本橋", pos: { lat: 35.6841, lng: 139.7745 } }
  ];

  // ===== 経路描画 =====
  function buildRoute(map, points) {
    const service = new google.maps.DirectionsService();
    let path = [];
    let i = 0;
    const MAX = 8;

    function next() {
      if (i >= points.length - 1) {
        new google.maps.Polyline({
          map,
          path,
          strokeColor: "#0018caff",
          strokeWeight: 4
        });
        return;
      }

      const j = Math.min(i + MAX + 1, points.length - 1);

      service.route({
        origin: points[i].pos,
        destination: points[j].pos,
        waypoints: points.slice(i + 1, j).map(p => ({ location: p.pos })),
        travelMode: google.maps.TravelMode.DRIVING
      }, (res, status) => {
        if (status === "OK") {
          const p = res.routes[0].overview_path.map(v => ({
            lat: v.lat(),
            lng: v.lng()
          }));
          if (path.length) p.shift();
          path.push(...p);
          i = j;
          setTimeout(next, 300);
        }
      });
    }
    next();
  }

  // ===== 初期化 =====
  window.initMapModern = function () {

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 35.0, lng: 138.0 },
      zoom: 7,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });

    // 経路
    buildRoute(map, modernRoutePoints);

    // ===== ピン + ラベル =====
    modernPins.forEach(p => {
      const marker = new google.maps.Marker({
        position: p.pos,
        map,
        title: p.name,
        label: {
          text: p.name,
          color: "#000000ff",
          fontSize: "13px",
          fontWeight: "bold"
        },
      });
      marker.addListener("click", () => {
    if (p.name === "伊勢神宮") {
      window.location.href = "pages/modern-ise.html";
    }
    if (p.name === "四日市駅") {
      window.location.href = "pages/modern-yokka.html";
    }
    if (p.name === "二川駅") {
      window.location.href = "pages/modern-nika.html";
    }
    if (p.name === "岡崎駅") {
      window.location.href = "pages/modern-oka.html";
    }
    if (p.name === "有松駅") {
      window.location.href = "pages/modern-arimatu.html";
    }
    if (p.name === "新居駅") {
      window.location.href = "pages/modern-ari.html";
    }
    if (p.name === "静岡駅") {
      window.location.href = "pages/modern-hama.html";
    }
    if (p.name === "新蒲原駅") {
      window.location.href = "pages/modern-kaba.html";
    }
    if (p.name === "小田原駅") {
      window.location.href = "pages/modern-oda.html";
    }
    if (p.name === "川崎駅") {
      window.location.href = "pages/modern-kawa.html";
    }
    if (p.name === "日本橋") {
      window.location.href = "pages/modern-jap.html";
    }
  });


      // ページ遷移
      if (p.link) {
        marker.addListener("click", () => {
          window.location.href = p.link;
        });
      }
    });
  };

})();



