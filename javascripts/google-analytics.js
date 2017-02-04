document.addEventListener("turbolinks:load", function() {
  if(typeof(ga) === 'function') {
    ga('send', 'pageview', location.pathname);
  }
});
