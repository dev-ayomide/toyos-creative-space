// Scroll-active sidebar highlighting
(function () {
  var sections = document.querySelectorAll('section[id]');
  var sidebarLinks = document.querySelectorAll('.sidebar__link');

  function onScroll() {
    var scrollY = window.scrollY;
    sections.forEach(function (section) {
      var top    = section.offsetTop - 130;
      var bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        sidebarLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // "Back to Top" link smooth scrolls to top
  var backToTop = document.getElementById('back-to-top-link');
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
