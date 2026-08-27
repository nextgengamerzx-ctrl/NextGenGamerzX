// NextGen Mobile Auto-Adapter & Fallback Enforcer
(function() {
  function checkAndFixViewport() {
    var w = window.innerWidth;
    if (w <= 900 || ('ontouchstart' in window)) {
      var dot = document.getElementById('cursorDot');
      var ring = document.getElementById('cursorRing');
      if (dot) dot.style.display = 'none';
      if (ring) ring.style.display = 'none';
    }
    var mobileMenu = document.getElementById('mobileMenu');
    var menuToggle = document.getElementById('menuToggle');
    document.addEventListener('click', function(e) {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
          mobileMenu.classList.remove('open');
        }
      }
    });
  }
  window.addEventListener('resize', checkAndFixViewport);
  window.addEventListener('DOMContentLoaded', checkAndFixViewport);
})();
