/* globals jQuery */

(function($) {
  
  /*
   * Scripts for header
   */

  var header = {

    bindScrollEvent: function () {
      var $window = $(window),
          that = this;

      $window.on('scroll', function () {
        that.parallaxEffect();
      });
    },

    parallaxEffect: function () {
      var posY,
          parallaxEffect = 0.45,
          $window = $(window);

      posY = $window.scrollTop() * parallaxEffect;
      this.config.headerParallax.css({
        '-webkit-transform': 'translate3d(0,' + posY  + 'px,0)',
        '-moz-transform': 'translate3d(0,' + posY + 'px,0)',
        'transform': 'translate3d(0,' + posY + 'px,0)'
      });
    },

    setHeight: function () {
      this.config.header.height(window.innerHeight);
    },

    bindResizeEvent: function () {
      var $window = $(window),
          that = this;

      $window.on('resize', function () {
        that.setHeight();
      });
    },

    runVideo: function () {
      this.config.header.vide({
        mp4: 'images/backgroundvideo/kulesza_800.mp4',
        webm: 'images/backgroundvideo/kulesza_800.webm',
        //ogv: ''
        poster: 'images/backgroundvideo/kulesza_800.jpg'
      });
    },

    config: {
      header: $('.portfolio-header'),
      headerParallax: $('.portfolio-header-parallax')
    },

    init: function () {
      this.runVideo();
      this.setHeight();
      this.bindResizeEvent();
      this.bindScrollEvent();
    }
  };

  header.init();
  
  /*
   * END scripts header
   */
  
  /*
   * Videos configuration
   */
  var videos = {
    
    bindVideoClickEvent: function () {
      var iframeSrc,
          that = this;

      this.config.video.on('click', function () {
        iframeSrc = $(this).find('a').attr('href');
        that.config.iframe.attr('src', iframeSrc);
        that.config.poput.show();
      });
    },

    bindPoputClickEvent: function () {
      this.config.poput.on('click', function () {
        this.style.display = 'none';
      });
    },

    config: {
      video: $('.video'),
      iframe: $('.video-poput iframe'),
      poput: $('.video-poput'),
      videoContainer: $('.videos-list')
    },
    
    initRotator: function () {

    },
    
    init: function() {
      this.bindVideoClickEvent();
      this.bindPoputClickEvent();
      this.initRotator();
    }
  };

  videos.init();
  
  /*
   * SoundCloud configuration
   */
  
  var soundCloud = {
    initFirst: function () {
      this.config.scLink.first().click();
    },

    clearActive: function () {
      this.config.scLink.removeClass('active');
    },

    bindClickEvent: function () {
      var src,
          that = this;
      this.config.scLink.on('click', function (e) {
        e.preventDefault();
        that.clearActive();
        this.className = 'active';
        src = this.getAttribute('href');
        that.config.iframe.attr('src', src);
      });
    },

    config: {
      scLink: $('.portfolio-soundcloud-list a'),
      iframe: $('.portfolio-playlist iframe')
    },

    init: function () {
      this.bindClickEvent();
      this.initFirst();
    }
  };
  
  soundCloud.init();
})(jQuery);