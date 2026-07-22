/**
 * scripts.js — Comportement frontend
 * Site de Mariage
 */

$(document).ready(function () {

    /* =========================================================================
       Menu mobile
    ========================================================================= */
    $('.nav-toggle').on('click', function () {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        return false;
    });

    // Ferme le menu quand on clique sur un lien
    $('.header-nav li a').on('click', function () {
        $('.nav-toggle').removeClass('active');
        $('.header-nav').removeClass('open');
    });

    /* =========================================================================
       Navigation fixe au scroll
    ========================================================================= */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() >= 20) {
            $('section.navigation').addClass('fixed');
        } else {
            $('section.navigation').removeClass('fixed');
        }
    });

    /* =========================================================================
       Scroll fluide vers les ancres
    ========================================================================= */
    $('a[href*="#"]:not([href="#"])').on('click', function () {
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
            location.hostname === this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 80
                }, 1200);
                return false;
            }
        }
    });

    /* =========================================================================
       Animations au scroll (Waypoints via Intersection Observer)
    ========================================================================= */
    var animClasses = {
        wp1: 'animated fadeInUp',
        wp2: 'animated fadeInLeft',
        wp3: 'animated fadeInRight',
        wp4: 'animated fadeInLeft',
        wp5: 'animated fadeInRight',
        wp6: 'animated fadeInLeft',
        wp7: 'animated fadeInUp'
    };

    function onScroll() {
        var windowBottom = $(window).scrollTop() + $(window).height();
        $.each(animClasses, function (cls, anim) {
            $('.' + cls + ':not(.animated)').each(function () {
                if ($(this).offset().top < windowBottom - 60) {
                    $(this).addClass(anim.split(' ')[1]);
                    $(this).removeClass(cls);
                }
            });
        });
    }

    $(window).on('scroll', onScroll);
    onScroll(); // Lancer une fois au chargement

    /* =========================================================================
       Fancybox (galerie)
    ========================================================================= */
    if ($.fn.fancybox) {
        $('.fancybox').fancybox({ padding: 4 });
    }

    /* =========================================================================
       Toggle Map Content
    ========================================================================= */
    $('#btn-show-map').on('click', function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });
    $('#btn-show-content').on('click', function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });

    /* =========================================================================
       Countdown
    ========================================================================= */
    var weddingDate = new Date('2025-06-14T15:00:00'); // ← Mettre la vraie date

    function updateCountdown() {
        var now  = new Date();
        var diff = weddingDate - now;

        if (diff <= 0) {
            $('#countdown').html('<p style="color:var(--accent);font-size:22px">C\'est aujourd\'hui ! ♥</p>');
            return;
        }

        var days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        $('#days').text(String(days).padStart(2, '0'));
        $('#hours').text(String(hours).padStart(2, '0'));
        $('#minutes').text(String(minutes).padStart(2, '0'));
        $('#seconds').text(String(seconds).padStart(2, '0'));
    }

    if ($('#countdown').length) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    /* =========================================================================
       Vidéo YouTube background
    ========================================================================= */
    if ($.fn.YTPlayer && $('#bgndVideo').length) {
        $('#bgndVideo').YTPlayer();
    }

    /* =========================================================================
       Validation et soumission du formulaire RSVP
    ========================================================================= */
    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();

        var name      = $('[name="name"]').val().trim();
        var email     = $('[name="email"]').val().trim();
        var guests    = $('[name="guests"]').val().trim();
        var code      = $('#invite_code').val().trim();

        // Validation simple
        if (!name || !email || !guests || !code) {
            showAlert('danger', '<strong>Erreur :</strong> Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Vérification email (RFC 5322 simplifié)
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!emailRegex.test(email)) {
            showAlert('danger', '<strong>Erreur :</strong> Adresse email invalide.');
            return;
        }

        showAlert('info', '<strong>Un instant…</strong> Enregistrement de votre réponse.');

        var data = $(this).serialize();

        $.post($(this).attr('action'), data)
            .done(function (response) {
                if (response && response.result === 'error') {
                    showAlert('danger', '<strong>Erreur :</strong> ' + response.message);
                } else {
                    $('#alert-wrapper').html('');
                    $('#rsvp-modal').modal('show');
                    $('#rsvp-form')[0].reset();
                }
            })
            .fail(function () {
                showAlert('danger', '<strong>Désolé :</strong> Une erreur serveur est survenue. Réessayez ou contactez-nous directement.');
            });
    });

});

/* =========================================================================
   Google Maps
========================================================================= */
function initMap() {
    var venue = { lat: 48.8566, lng: 2.3522 }; // ← Mettre les coordonnées GPS du lieu
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: venue,
        scrollwheel: false,
        styles: [
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            { featureType: 'transit', stylers: [{ visibility: 'off' }] }
        ]
    });

    new google.maps.Marker({
        position: venue,
        map: map,
        title: 'Notre lieu de mariage'
    });
}

/* =========================================================================
   Helpers
========================================================================= */
function showAlert(type, message) {
    $('#alert-wrapper').html(
        '<div class="alert alert-' + type + '" role="alert">' +
        message +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button>' +
        '</div>'
    );
}
