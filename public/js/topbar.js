fetch('/topbar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('topbar').innerHTML = html;

    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.topbar a');

    links.forEach(link => {
      link.classList.remove('active');
      const linkPath = new URL(link.href).pathname;

      // Handle homepage special case
      if (currentPath === '/' && linkPath.endsWith('/index.html')) {
        link.classList.add('active');
      }
      else if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  });
