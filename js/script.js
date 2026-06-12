document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when a link is clicked
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // Basic Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  
  // Trigger once on load
  revealOnScroll();
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var item = this.closest('.faq-item');
    var answer = item.querySelector('.faq-answer');
    var isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(function(i) {
      i.classList.remove('open');
      i.querySelector('.faq-answer').style.display = 'none';
    });
    // Toggle clicked
    if (!isOpen) {
      item.classList.add('open');
      answer.style.display = 'block';
    }
  });
});

// Banner unter der Navbar positionieren – damit Hamburger immer erreichbar ist
(function () {
  function fixBannerPosition() {
    var banner = document.getElementById('personalized-banner');
    if (!banner) return;
    var isVisible = banner.style.display !== 'none' && banner.offsetHeight > 0;
    if (!isVisible) return;
    var navbar = document.querySelector('.navbar, header.header, .header');
    if (!navbar) return;
    var navH = navbar.offsetHeight || 60;
    banner.style.top = navH + 'px';
    banner.style.position = 'fixed';
    banner.style.zIndex = '99998';
    var spacer = document.getElementById('ws-banner-spacer');
    if (spacer) spacer.style.height = (navH + banner.offsetHeight) + 'px';
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixBannerPosition);
  } else {
    fixBannerPosition();
  }
})();
