document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (!mobileMenuToggle || !mobileNav) {
        return;
    }

    mobileMenuToggle.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');

        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function(event) {
        if (!mobileMenuToggle.contains(event.target) && !mobileNav.contains(event.target)) {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

window.addEventListener('resize', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuToggle && mobileNav && window.innerWidth > 768) {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
});
