/* globals jQuery */

(function($) {
  /*
   * Grettings 
   */

  console.log('Hello! Do you want website like this? You are lucky this website is completly free checkout my github repo https://github.com/singerxt/musician-portfolio');

  var navigation = {
    config: {
      $nav: $('.portfolio-navigation'),
      $logo: $('.portfolio-navigation .logo'),
      $items: $('.portfolio-navigation li a'),
      $sections: {
        home: $('.portfolio-header'),
        watch: $('.portfolio-videos'),
        listen: $('.portfolio-listen'),
        contact: $('.portfolio-contact')
      }
    },

    bindClickEvent: function () {
      var $window = $(window),
          that = this,
          $body = $('html,body'),
          posY;

      this.config.$items.on('click', function (e) {
        e.preventDefault();
        posY = that.config.$sections[this.dataset.section].position().top;
        $body.animate({scrollTop:posY}, '500');
      });
    },

    bindScrollEvent: function () {
      var $window = $(window),
          that = this;

      $window.on('scroll', function () {
        if(this.scrollY === 0) {
          that.config.$nav.removeClass('active');
        } else {
          that.config.$nav.addClass('active');
        }

        if(this.scrollY > window.innerHeight * 0.5) {
          that.config.$logo.addClass('show');
        } else {
          that.config.$logo.removeClass('show');
        }
      });
    },

    init: function () {
      this.bindScrollEvent();
      this.bindClickEvent();
    }
  };

  navigation.init();

  /*
   * Scripts for header
   */

  var header = {

    bindScrollEvent: function () {
      window.onscroll = this.parallaxEffect.bind(this);
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
      this.config.header.css('background', 'initial');
    },

    bindResizeEvent: function () {
      window.onresize = this.setHeight.bind(this);
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

      this.config.video.on('click', function (e) {
        e.preventDefault();
        iframeSrc = $(this).find('a').attr('href');
        that.config.iframe.attr('src', iframeSrc);
        that.config.poput.show();
      });
    },

    bindEscClick: function () {
      var that = this;

      document.onkeyup = function (e) {
        if(e.keyCode === 27) {
          that.config.poput.click();
        }
      };
    },

    bindPoputClickEvent: function () {
      var that = this;
      this.config.poput.on('click', function () {
        this.style.display = 'none';
        that.config.iframe.attr('src', '');
      });
    },

    config: {
      video: $('.video'),
      iframe: $('.video-poput iframe'),
      poput: $('.video-poput'),
      videoContainer: $('.videos-list'),
      track: $('.videos-track'),
      wayPoints: [],
      currentIndex: 0,
      controls: $('.controls a'),
      slidesToShow: function () {
        var mobile = 1,
            tablet = 3,
            desktop = 4;
        if (window.innerWidth <= 639) {
          return mobile;
        } else if (window.innerWidth > 639 && window.innerWidth <= 1024) {
          return tablet;
        } else if (window.innerWidth > 1024) {
          return desktop;
        }
      }
    },

    bindTouchEvent: function () {
      var that= this;

      this.config.videoContainer.swipe({
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
          if(direction === 'right') {
            that.goLeft();
          } else {
            that.goRight();
          }
        },
        excludedElements: ''
      });
    },

    bindResizeEvent: function () {
      var $window = $(window),
          that = this;

      $window.on('resize', function () {
        that.setTrackWidth();
        that.goToSlide(0);
      });
    },

    setTrackWidth: function () {
      var howMuchSlides = this.config.video.length,
          divider = this.config.slidesToShow(),
          slideWidth = parseInt(window.innerWidth / divider,10),
          trackHeight = $('.video').height();

      this.config.video.css('width', slideWidth);
      this.config.track.css({
        'width': slideWidth * howMuchSlides,
        'height': trackHeight,
        'overflow': 'hidden'
      });

      this.setWayPoints(slideWidth);
    },

    setWayPoints: function (slideWidth) {
      var total = 0;
      this.config.wayPoints = [];

      for(var i = 0; i < this.config.video.length; i++) {
        total += slideWidth;
        this.config.wayPoints.push(total - slideWidth);
      }
    },

    goToSlide: function (index) {
      var waypoint = this.config.wayPoints[index];
      this.config.currentIndex = index;
      this.config.track.css({
        '-webkit-transform': 'translate3d(-' + waypoint + 'px,0,0)',
        '-moz-transform': 'translate3d(-' + waypoint + 'px,0,0)',
        'transform': 'translate3d(-' + waypoint + 'px,0,0)'
      });
    },

    goRight: function () {
      var maxIndex = this.config.wayPoints.length - this.config.slidesToShow(),
          index = (this.config.currentIndex + 1 > maxIndex) ? maxIndex : this.config.currentIndex + 1;
      this.goToSlide(index);
    },

    goLeft: function () {
      var index = (this.config.currentIndex <= 0) ? this.config.currentIndex : this.config.currentIndex - 1;
      this.goToSlide(index);
    },

    bindControls: function () {
      var that = this;
      this.config.controls.on('click', function (e) {
        e.preventDefault();
        if(this.dataset.dir === 'right') {
          that.goRight();
        } else {
          that.goLeft();
        }
      });
    },

    initRotator: function () {
      this.bindResizeEvent();
      this.setTrackWidth();
      this.bindControls();
      this.bindTouchEvent();
    },

    init: function() {
      this.bindVideoClickEvent();
      this.bindPoputClickEvent();
      this.bindEscClick();
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
      this.config.iframe.attr('height', 600);
    },

    clearActive: function () {
      this.config.scLink.parent().removeClass('active');
    },

    bindClickEvent: function () {
      var src,
          that = this;
      this.config.scLink.on('click', function (e) {
        e.preventDefault();
        that.clearActive();
        this.parentNode.className = 'active';
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