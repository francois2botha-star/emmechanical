const revealItems = document.querySelectorAll('.reveal');
const bookingForms = document.querySelectorAll('[data-booking-form]');
const navElements = document.querySelectorAll('.nav');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealItems.forEach((item, index) => {
  const delay = item.closest('.stagger') ? index % 4 : 0;
  item.style.transitionDelay = `${delay * 80}ms`;
  observer.observe(item);
});

bookingForms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const issue = (data.get('issue') || data.get('message') || '').toString().trim();
    const vehicle = (data.get('vehicle') || '').toString().trim();
    const service = (data.get('service') || '').toString().trim();
    const subject = encodeURIComponent('Booking Request - Whaleberg motor repairs n services');
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nVehicle: ${vehicle}\nService: ${service}\nIssue: ${issue}`
    );

    window.location.href = `mailto:Whalebergmotors@gmail.com?subject=${subject}&body=${body}`;
  });
});

navElements.forEach((nav) => {
  const toggle = nav.querySelector('.menu-toggle');
  const navLinks = nav.querySelector('.nav-links');
  if (!toggle || !navLinks) {
    return;
  }

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('is-open', !expanded);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

const currentPage = document.body.dataset.page || 'index';
const currentHash = window.location.hash;

document.querySelectorAll('.nav-links a').forEach((link) => {
  const href = link.getAttribute('href') || '';
  let isActive = false;

  if (currentPage === 'index') {
    if (!currentHash && href === 'index.html#top') {
      isActive = true;
    } else if (currentHash && href === `index.html${currentHash}`) {
      isActive = true;
    }
  }

  if (currentPage === 'services' && href === 'services.html') {
    isActive = true;
  }

  if (currentPage === 'contact' && href === 'contact.html') {
    isActive = true;
  }

  link.classList.toggle('active', isActive);
});
