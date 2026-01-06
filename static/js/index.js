window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    }

    // Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    bulmaSlider.attach();

    // Add click handlers to play individual videos
    $('.lazy-video').on('click', function(e) {
        var video = this;
        console.log('Video clicked, paused:', video.paused);
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
        e.stopPropagation();
    });

    // Try autoplay immediately since videos have autoplay attribute
    console.log('Page loaded, attempting autoplay...');
    setTimeout(function() {
        $('.lazy-video').each(function(index) {
            var video = this;
            console.log('Attempting autoplay for video', index);
            var promise = video.play();

            if (promise !== undefined) {
                promise.then(function() {
                    console.log('Video', index, 'autoplayed successfully!');
                }).catch(function(error) {
                    console.log('Video', index, 'autoplay blocked:', error.message);
                    console.log('User will need to scroll or click to start videos');
                });
            }
        });
    }, 500);

    // Backup: Try autoplay on first CLICK or TOUCH (scroll doesn't work for security)
    var hasTriedBackup = false;
    $(document).one('click touchstart mousedown', function(e) {
        console.log('First user click/touch detected:', e.type);
        if (!hasTriedBackup) {
            hasTriedBackup = true;
            console.log('Trying to play all videos after user interaction...');
            $('.lazy-video').each(function(index) {
                console.log('Playing video', index);
                this.play().catch(function(e) {
                    console.log('Still blocked:', e.message);
                });
            });
        }
    });

    // Tab functionality
    $('.tabs li').on('click', function() {
        var tab = $(this).data('tab');

        // Update tab active state
        $('.tabs li').removeClass('is-active');
        $(this).addClass('is-active');

        // Update tab content
        $('.tab-pane').removeClass('is-active');
        $('#' + tab).addClass('is-active');
    });

    // Sticky navigation
    var heroHeight = $('.hero-white').outerHeight();
    var navbar = $('.nav-sticky');

    $(window).scroll(function() {
        if ($(window).scrollTop() > heroHeight) {
            navbar.addClass('visible');
        } else {
            navbar.removeClass('visible');
        }
    });

    // Smooth scroll for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if(target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

})
