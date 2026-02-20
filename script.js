const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.12;
  document.querySelector('.hero')?.style.setProperty('transform', `translateY(${y * -0.12}px)`);
});
