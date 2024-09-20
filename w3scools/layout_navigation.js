// layout_navigation.js
document.querySelectorAll('.topnav a').forEach(function (link) {
  link.addEventListener('mouseover', function () {
    this.style.backgroundColor = '#ddd';
    this.style.color = 'black';
  });

  link.addEventListener('mouseout', function () {
    this.style.backgroundColor = '#333';
    this.style.color = '#f2f2f2';
  });
});
