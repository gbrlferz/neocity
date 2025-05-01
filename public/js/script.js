document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');

  carousel.addEventListener('wheel', function(e) {
    e.preventDefault();
    this.scrollLeft += e.deltaY * 2;
  });
});
