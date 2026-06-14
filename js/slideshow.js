document.addEventListener('DOMContentLoaded', function () {
  var track = document.querySelector('.slideshow__track');
  var section = document.querySelector('.slideshow');

  if (!track || !section) return;

  var slides = Array.from(track.children);
  var gap = 24;
  var scrollPos = 0;
  var animationId = null;
  var isVisible = false;
  var speed = 1;

  // Clone slides for seamless infinite loop
  slides.forEach(function (slide) {
    var clone = slide.cloneNode(true);
    track.appendChild(clone);
  });

  function getSetWidth() {
    if (slides.length === 0) return 0;
    return slides.reduce(function (total, slide) {
      return total + slide.offsetWidth + gap;
    }, 0);
  }

  function animateScroll() {
    if (!isVisible) {
      animationId = null;
      return;
    }

    scrollPos += speed;

    var setWidth = getSetWidth();
    if (setWidth > 0 && scrollPos >= setWidth) {
      scrollPos -= setWidth;
    }

    track.style.transform = 'translateX(-' + scrollPos + 'px)';
    animationId = requestAnimationFrame(animateScroll);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        isVisible = true;
        if (!animationId) {
          animationId = requestAnimationFrame(animateScroll);
        }
      } else {
        isVisible = false;
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }
    });
  }, { threshold: 0.1 });

  observer.observe(section);
});
