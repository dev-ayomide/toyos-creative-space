document.addEventListener('DOMContentLoaded', function () {
  const stack = document.querySelector('.funivity-stack');
  const hint = document.querySelector('.funivity-hint');
  if (!stack) return;

  function toggle() {
    const isUnstacked = stack.classList.toggle('unstacked');
    stack.setAttribute('aria-expanded', String(isUnstacked));
    if (hint) hint.classList.toggle('hidden', isUnstacked);
  }

  stack.addEventListener('click', toggle);

  stack.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});
