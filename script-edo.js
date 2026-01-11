// ================================
// script-edo.js 完全統合版
// ================================
(function () {

  // =====================================
  // 東海道 宿場（ルート用）
  // =====================================
  const tokaidoStations = [
   { name: "神田八丁堀", pos: { lat: 35.67823, lng: 139.78103 } },
    { name: "高輪", pos: { lat: 35.62854, lng: 139.73949 } },
    { name: "品川宿", pos: { lat: 35.62847, lng: 139.73876 } },
    { name: "川崎宿", pos: { lat: 35.53003, lng: 139.70259 } },
    { name: "保土ヶ谷宿", pos: { lat: 35.47376, lng: 139.61717 } },
    { name: "戸塚宿", pos: { lat: 35.43229, lng: 139.53106 } },
    { name: "藤沢宿", pos: { lat: 35.34642, lng: 139.48793 } },
    { name: "平塚宿", pos: { lat: 35.32679, lng: 139.34249 } },
    { name: "大磯宿", pos: { lat: 35.31934, lng: 139.26874 } },
    { name: "小田原宿", pos: { lat: 35.25517, lng: 139.15583 } },
    { name: "箱根宿", pos: { lat: 35.23900, lng: 139.10545 } },
    { name: "三島宿", pos: { lat: 35.12030, lng: 138.91762 } },
    { name: "吉原宿", pos: { lat: 35.17536, lng: 138.63398 } },
    { name: "蒲原宿", pos: { lat: 35.109174, lng: 138.550781 } },
    { name: "由比宿", pos: { lat: 35.01429, lng: 138.48185 } },
    { name: "江尻宿（静岡）", pos: { lat: 34.97583, lng: 138.38988 } },
    { name: "府中宿", pos: { lat: 34.975278, lng: 138.378056 } },
    { name: "浜松宿", pos: { lat: 34.71083, lng: 137.72663 } },
    { name: "新居宿", pos: { lat: 34.69411, lng: 137.569444 } },
    { name: "吉田宿", pos: { lat: 34.76939, lng: 137.43964 } },
    { name: "藤川宿", pos: { lat: 34.89754, lng: 137.22564 } },
    { name: "岡崎宿", pos: { lat: 34.95053, lng: 137.17337 } },
    { name: "池鯉鮒宿", pos: { lat: 34.93240, lng: 137.05097 } },
    { name: "鳴海宿", pos: { lat: 35.01390, lng: 136.92834 } },
    { name: "有松", pos: { lat: 35.06739461394284, lng: 136.9702588068189 } },
    { name: "宮宿（熱田）", pos: { lat: 35.12032, lng: 136.90749 } },
    { name: "桑名宿", pos: { lat: 35.02081, lng: 136.61195 } },
    { name: "四日市宿", pos: { lat: 34.96585, lng: 136.64170 } },
    { name: "追分", pos: { lat: 34.90482, lng: 136.60021 } },
    { name: "マーク湾", pos: { lat: 34.733917, lng: 136.510750 } },
    { name: "マーク通", pos: { lat: 34.5980778, lng: 136.4949493408203 } },
    { name: "伊勢神宮（内宮）", pos: { lat: 34.45611, lng: 136.72414 } }
  ];

  // =====================================
  // ピン（クリック用）
  // =====================================
  const edoPins = [
    {
      name: "伊勢神宮",
      pos: { lat: 34.45611, lng: 136.72414 },
      link: "pages/edo-ise.html"
    },
    {
      name: "四日市宿",
      pos: { lat: 34.96585, lng: 136.64170 },
      link: "pages/edo-yokka.html"
    },
    {
      name: "岡崎宿",
      pos: { lat: 34.95053, lng: 137.17337 },
      link: "pages/edo-oka.html"
    },
    {
      name: "二川宿",
      pos: { lat: 34.82145, lng: 137.59808 },
      link: "pages/edo-nika.html"
    },
    {
      name: "府中宿",
      pos: { lat: 34.975278, lng: 138.378056 },
      link: "pages/edo-huch.html"
    },
    {
      name: "蒲原宿",
      pos: { lat: 35.109174, lng: 138.550781 },
      link: "pages/edo-kaba.html"
    },
    {
      name: "小田原宿",
      pos: { lat: 35.25517, lng: 139.15583 },
      link: "pages/edo-oda.html"
    },
    {
      name: "川崎宿",
      pos: { lat: 35.53003, lng: 139.70259 },
      link: "pages/edo-kawa.html"
    },
    {
      name: "日本橋",
      pos: { lat: 35.6841, lng: 139.7745 },
      link: "pages/edo-jap.html"
    }
  ];

  // =====================================
  // 緯度経度配列に変換
  // =====================================
  function toLatLngArray(stations) {
    return stations.map(s => s.pos);
  }

  // =====================================
  // Directions を分割取得
  // =====================================
  function buildRoute(map, points, callback) {
    const service = new google.maps.DirectionsService();
    const MAX = 8;
    let path = [];
    let i = 0;

    function next() {
      if (i >= points.length - 1) {
        callback(path);
        return;
      }

      const origin = points[i];
      const j = Math.min(i + MAX + 1, points.length - 1);
      const destination = points[j];

      const waypoints = [];
      for (let k = i + 1; k < j; k++) {
        waypoints.push({ location: points[k], stopover: true });
      }

      service.route({
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.WALKING
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
        } else {
          alert("経路取得失敗：" + status);
        }
      });
    }
    next();
  }



  // =====================================
  // 初期化（★ここだけ）
  // =====================================
  window.initMapEdo = function () {

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 35.0, lng: 138.0 },
      zoom: 7,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#efe5c7" }] },
        { featureType: "water", stylers: [{ color: "#a7b8b0" }] },
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] }
      ]
    });

    // --- ガイド線（簡易） ---
    new google.maps.Polyline({
      map,
      path: toLatLngArray(tokaidoStations),
      strokeColor: "#b08c5a",
      strokeWeight: 3,
      strokeOpacity: 0.6
    });

    // --- ピン配置 ---
    edoPins.forEach(p => {
      const marker = new google.maps.Marker({
        position: p.pos,
        map,
        title: p.name,
        label: {
          text: p.name,
          color: "#6b3e2e",
          fontSize: "13px",
          fontWeight: "bold"
        }
      });

      marker.addListener("click", () => {
        location.href = p.link;
      });
    });


    // --- トグル ---
    const mapSwitch = document.getElementById("mapSwitch");
    if (mapSwitch) {
      mapSwitch.checked = false;
      mapSwitch.addEventListener("change", () => {
        location.href = "modern.html";
      });
    }
  };

})();
