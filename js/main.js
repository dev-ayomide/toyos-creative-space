// Lagos Live Clock
function updateLagosTime() {
  const now = new Date();
  const lagosTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' })
  );
  const hours = lagosTime.getHours();
  const minutes = lagosTime.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  const timeEl = document.getElementById('lagos-time');
  if (timeEl) {
    timeEl.textContent = h + ':' + minutes + ampm;
  }
}
updateLagosTime();
setInterval(updateLagosTime, 1000);

// Back to Land scroll
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll indicator — smooth scroll to projects (home page only)
var scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
  });
}

// Nav scroll background
document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    });
  }

  // Mobile Menu
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu__close');

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Close when clicking outside the panel
    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // Copy email button
    var copyBtn = mobileMenu.querySelector('.mobile-menu__copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var email = copyBtn.getAttribute('data-copy');
        navigator.clipboard.writeText(email).then(function () {
          var orig = copyBtn.innerHTML;
          copyBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13l4 4L19 7" stroke="#7D52F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          setTimeout(function () { copyBtn.innerHTML = orig; }, 1500);
        });
      });
    }
  }

  // Footer underwater animations
  (function initFooterAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var sea = document.querySelector('.footer-sea');
    if (!sea) return;

    // Bubbles: stagger with negative delays so they start mid-cycle on load
    var bubbles = sea.querySelectorAll('.footer-sea__bubble');
    bubbles.forEach(function(bubble, i) {
      var duration  = 8 + ((i * 13 + 5) % 10) * 0.6;
      var baseDelay = (i / bubbles.length) * 20;
      var jitter    = ((i * 7 + 3) % 5) * 0.7;
      bubble.style.animationName           = 'bubble-rise';
      bubble.style.animationDuration       = duration.toFixed(1) + 's';
      bubble.style.animationDelay          = '-' + (baseDelay + jitter).toFixed(1) + 's';
      bubble.style.animationTimingFunction = 'ease-in-out';
      bubble.style.animationIterationCount = 'infinite';
      bubble.style.willChange              = 'transform, opacity';
    });

    // Seaweed + tall branch corals sway from their base
    var swayEls = sea.querySelectorAll(
      '.footer-sea__el[src*="seaweed"], ' +
      '.footer-sea__el[src*="green-coral"], ' +
      '.footer-sea__el[src*="yellow coral"], ' +
      '.footer-sea__el[src*="orange coral"]'
    );
    swayEls.forEach(function(el, i) {
      var duration = (5 + ((i * 11 + 2) % 20) * 0.1).toFixed(1) + 's';
      var delay    = (i * 1.3).toFixed(1) + 's';
      el.classList.add('footer-sea__el--sway');
      el.style.animationDuration = duration;
      el.style.animationDelay    = delay;
    });
  })();
});
