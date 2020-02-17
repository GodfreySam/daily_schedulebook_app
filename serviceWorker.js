const staticDsrApp = "daily-schedule-reminder-app-v1";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/fontawesome-free-5.11.2-web/css/all.css",
  "/bootstrap-4.3.1-dist/css/bootstrap.min.css",
  "/jquery/jquery.js",
  "/bootstrap-4.3.1-dist/js/bootstrap.min.js",
  "/js/app.js",
  "/js/menu.js",
  "/js/reminder.js"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDsrApp).then(cache => {
      cache.addAll(assets)
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})