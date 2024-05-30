"use strict";
document.addEventListener("DOMContentLoaded", function () {

  $(function ($) {

    // custom slider
    const mainSection = document.querySelector('.portfolio-section');
    const gridContent = document.querySelector('.grid-content');
    const mainSlide = document.querySelector('.main-slide-wrapper');

    const activeSlide = mainSlide ? mainSlide.querySelector('.swiper-slide-active') : null;

    if (mainSlide && activeSlide) {

      const sectionWidth = activeSlide.clientWidth;
      const screenWidth = screen.width;
      const startScnEnd = (screenWidth - sectionWidth) / 2;
      
      $(activeSlide).each(function() {
        const bgClass = $(this).attr('class').match(/\S*-bg/);
        if (bgClass) {
          const colorWithoutBg = bgClass[0].replace('-bg', '');
          $(':root').css('--after', 'var(--' + colorWithoutBg + ')');
        }
      });
  
      $(document).on('mousemove click', function(event) {
          let mouseX = event.pageX;
          let prevSlide = mainSlide.querySelector('.swiper-slide-prev');
          let nextSlide = mainSlide.querySelector('.swiper-slide-next');
          let activeSlide = mainSlide.querySelector('.swiper-slide-active');

          $(activeSlide).each(function() {
            let bgClass = $(this).attr('class').match(/\S*-bg/);
            if (bgClass) {
              let colorWithoutBg = bgClass[0].replace('-bg', '');
              $(':root').css('--after', 'var(--' + colorWithoutBg + ')');
            }
          });
          let $changeCol = $(".change-col");
          if (!$changeCol.hasClass("popup-active") && $('.main-slide-wrapper').parent().hasClass("active")) {
            if (mouseX < startScnEnd) {
              $(':root').css('--left', 'initial');
              $(':root').css('--right', '50%');
                $(mainSlide).removeClass('midScn endScn');
                $(mainSlide).addClass('startScn');
                $('.desktop-menu-inner').addClass('opacity-0');
                $('.desktop-menu-inner').removeClass('opacity-100');
                $(mainSlide).find('.slider-btn .ara-prev').addClass('active');
                $(prevSlide).each(function() {
                  let bgClass = $(this).attr('class').match(/\S*-bg/);
                  if (bgClass) {
                    let colorWithoutBg = bgClass[0].replace('-bg', '');
                    $(':root').css('--before', 'var(--' + colorWithoutBg + ')');
                  }
                });
            } else if (mouseX < startScnEnd + sectionWidth) {
              $(':root').css('--left', 'initial');
              $(':root').css('--right', 'initial');
                $(mainSlide).removeClass('startScn endScn');
                $(mainSlide).find('.slider-btn .slide-button').removeClass('active');
                $(mainSlide).addClass('midScn');
                $('.desktop-menu-inner').removeClass('opacity-0');
                $('.desktop-menu-inner').addClass('opacity-100');
            } else {
              $(':root').css('--right', 'initial');
              $(':root').css('--left', '50%');
              $(mainSlide).removeClass('startScn midScn');
              $(mainSlide).addClass('endScn');
              $('.desktop-menu-inner').addClass('opacity-0');
              $('.desktop-menu-inner').removeClass('opacity-100');
              $(mainSlide).find('.slider-btn .ara-next').addClass('active');
              $(nextSlide).each(function() {
                let bgClass = $(this).attr('class').match(/\S*-bg/);
                if (bgClass) {
                  let colorWithoutBg = bgClass[0].replace('-bg', '');
                  $(':root').css('--before', 'var(--' + colorWithoutBg + ')');
                }
              });
            }
          }
          if ($(mainSlide).hasClass('midScn')) {
            $(mainSlide).find("button.flip").prop('disabled', false);
          } else {
            $(mainSlide).find("button.flip").prop('disabled', true);
          }
          if ('ontouchstart' in window || navigator.maxTouchPoints) {
              $(mainSlide).removeClass('startScn endScn');
              $(mainSlide).addClass('midScn');
              $('.desktop-menu-inner').removeClass('opacity-0');
              $('.desktop-menu-inner').addClass('opacity-100');
          }
      });
      
      $(mainSlide).find(".slide-button").on('click', function () {
        $(mainSlide).addClass("before-bg");
        setTimeout(function () {
          $(mainSlide).removeClass("before-bg");
        }, 1200);
      });

      $(mainSlide).find(".front, .flip").on('click', function () {
        let isFirefox = typeof InstallTrigger !== 'undefined';
        if (isFirefox) {
            $('.swiper-wrapper').toggleClass('transform-unset');
            $('.swiper-wrapper .single-item').toggleClass('transform-unset');
        }
        let $changeCol = $(".change-col");
        $(this).parents(".main-card").toggleClass("flipped");
        $(".slide-button").toggleClass("cus-z-1");
        $changeCol.toggleClass("col-xl-12 col-lg-12 col-md-12 col-sm-12");
        $(mainSlide).toggleClass("d-block");
        $(".slider-custom").toggleClass("custom-none");
        $('.main-chat-box').scrollTop( $(document).height() );
        if ($changeCol.hasClass("popup-active")) {
            setTimeout(function () {
              $changeCol.removeClass("popup-active");
            }, 800);
        } else {
            $changeCol.addClass("popup-active");
        }
      });

      $(mainSlide).find(".flip").on('click', function () {
        let $changeCol = $(".change-col");
        $changeCol.addClass("active-bg");
        setTimeout(function () {
          $changeCol.removeClass("active-bg");
        }, 800);
      });
  
      // show card
      $('.slide-button.ara-next').on('click', function () {
        document.querySelector('.swiper-slide-active .front').click();
        $(mainSlide).removeClass('endScn');
        $(mainSlide).addClass('midScn');
      });

      // set rainbow animation 
      $(mainSection).find(".nav-item .nav-links").on('click', function () {
        if (!$(this).hasClass("active")) {
          $(mainSection).find(".main-card.flipped .return").click();
          $(".rounder-wrapper").toggleClass("custom-scale");
          $(".slider-custom").toggleClass("custom-none");
          $(".rounder-wrapper").addClass("active-visible");
          setTimeout(function () {
            $(".rounder-wrapper").removeClass("active-visible");
          }, 1600);
        }
      });

      // contact-page-open 
      setTimeout(function () {
        $('.collapse-nodes').on('click', function () {
          if ($($(mainSection).find(".nav-item .grid-apps")).hasClass("active")) {
            $(mainSection).find(".nav-item .nav-links").click();
          }
          if ($(this).parents(".main-card").hasClass("flipped")) {
            document.querySelector(".flipped .flip").click();
          }
          if ($(".change-grid-col").hasClass("popup-grid-active")) {
            document.querySelector(".flipped .flip").click();
          }
          if ($(".sidebar-wrapper").hasClass("active")) {
            document.querySelector(".navbar-close-wrapper button").click();
          }
        });
        $('.contact-us-btn').on('click', function () {
          let targetNode = document.querySelectorAll(".contact-page");
          let lastNodeIndex = targetNode.length - 1;
          targetNode[lastNodeIndex].click();
        });
        $('.blog-page-btn').on('click', function () {
          let targetNode = document.querySelectorAll(".blog-page");
          let lastNodeIndex = targetNode.length - 1;
          targetNode[lastNodeIndex].click();
        });
        $('.about-page-btn').on('click', function () {
          let targetNode = document.querySelectorAll(".about-page");
          let lastNodeIndex = targetNode.length - 1;
          targetNode[lastNodeIndex].click();
        });
        $('.project-page-btn').on('click', function () {
          let targetNode = document.querySelectorAll(".project-page");
          let lastNodeIndex = targetNode.length - 1;
          targetNode[lastNodeIndex].click();
        });
        $('.service-page-btn').on('click', function () {
          let targetNode = document.querySelectorAll(".service-page");
          let lastNodeIndex = targetNode.length - 1;
          targetNode[lastNodeIndex].click();
        });
      }, 1);

      // slide clone 
      const clone = $(mainSlide).find('.swiper-wrapper .swiper-slide').clone();
      clone.appendTo(gridContent);
  
      // grid container
      $(gridContent).find(".front, .flip").on('click', function () {
        let $changeCol = $(".grid-container .change-grid-col");
        $(this).parents(".main-card").toggleClass("flipped");
        $(this).parents(".swiper-slide").toggleClass("item-grid-active");
        $(this).parents(".portfolio-section").toggleClass("overflow-hidden");
        $changeCol.toggleClass("popup-grid-active");
        $("html").animate({ scrollTop: 0 });
      });

    }
  
    // move-btn function 
    $('.move-btn').each(function() {
      let oneItem = $(this).find('.one');
      let twoItem = $(this).find('.two');
      let threeItem = $(this).find('.one.second');
      let fourItem = $(this).find('.two.second');
      $(this).hover(function() {
          let oneWidth = oneItem.outerWidth();
          let twoWidth = twoItem.outerWidth();
          oneItem.css('transform', 'translateX(' + (twoWidth) + 'px)');
          twoItem.css('transform', 'translateX(' + -(oneWidth) + 'px)');
          threeItem.css('transform', 'translateX(' + -(twoWidth) + 'px)');
          fourItem.css('transform', 'translateX(' + (oneWidth) + 'px)');
      }, function() {
          oneItem.css('transform', 'none');
          twoItem.css('transform', 'none');
      });
    });
    
    // preloader
    $("#preloader").delay(300).animate({
      "opacity": "0"
    }, 500, function () {
      $("#preloader").css("display", "none");
    });

    // window on scroll function
    $(window).on("scroll", function () {

      // Odometer Init 
      let windowHeight = $(window).height();
      $('.odometer').children().each(function () {
        if ($(this).isInViewport({ "tolerance": windowHeight, "toleranceForLast": windowHeight, "debug": false })) {
          let section = $(this).closest(".counters");
          section.find(".odometer").each(function () {
            $(this).html($(this).attr("data-odometer-final"));
          });
        }
      });

    });

    // Box Style 
    const targetBtn = document.querySelectorAll('.box-style')
    if (targetBtn) {
      targetBtn.forEach((element) => {
        element.addEventListener('mousemove', (e) => {
          const x = e.offsetX + 'px';
          const y = e.offsetY + 'px';
          element.style.setProperty('--x', x);
          element.style.setProperty('--y', y);
        })
      })
    }

    // magnific-popup
    $('.popup-video').magnificPopup({
      type: 'iframe'
    });

    // gridGallery
    $('.popup_img').magnificPopup({
        type:'image',
        gallery:{
            enabled: true
        }
    });
    
    $(".navbar-toggle-wrapper").on('mouseenter mouseleave', function () {
      $('.sidebar-wrapper').toggleClass('hide-sdfsdfsdf');
    });

    // navbar custom
    $('.navbar-toggle-btn').on('click', function () {
      $('.sidebar-wrapper').toggleClass('active');
      $('.sidebar-menu').toggleClass('active');
      $(this).toggleClass('open');
    });
    $('.menu-item button').on('click', function () {
      $(this).siblings("ul").slideToggle(300);
    });

    // close navbar
    $('.navbar-close-wrapper').on('click', function () {
      document.querySelector('.navbar-toggle-btn').click();
    });

    // Current Year
    $(".currentYear").text(new Date().getFullYear());
    
    // Get the current date and time
    var currentTime = new Date();
    var localTime = currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    var offsetMinutes = currentTime.getTimezoneOffset();
    var offsetHours = Math.abs(offsetMinutes / 60);
    var offsetSign = (offsetMinutes < 0) ? '+' : '-';
    var gmtOffsetString = 'GMT' + offsetSign + offsetHours;
    $(".local-time").text(currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + ', ' + gmtOffsetString);

    // progress-area
    let progressBars = $('.progress-area');
    let observer = new IntersectionObserver(function(progressBars) {
      progressBars.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          let width = $(entry.target).find('.progress-bar').attr('aria-valuenow');
          let count = 0;
          let time = 1000 / width;
          let progressValue = $(entry.target).find('.progress-value');
          setInterval(() => {
            if (count == width) {
              clearInterval();
            } else {
              count += 1;
              $(progressValue).text(count +"%")
            }
          }, time);
          $(entry.target).find('.progress-bar').css({"width": width + "%", "transition": "width 1s linear"});
        }else{
          $(entry.target).find('.progress-bar').css({"width": "0%", "transition": "width 1s linear"});
        }
      });
    });
    progressBars.each(function() {
      observer.observe(this);
    });
    $(window).on('unload', function() {
      observer.disconnect();
    });
    
    // Mouse Follower
    const follower = document.querySelector(".mouse-follower .cursor-outline");
    const dot = document.querySelector(".mouse-follower .cursor-dot");
    window.addEventListener("mousemove", (e) => {
      follower.animate(
        [{
            opacity: 1,
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
            easing: "ease-in-out"
          }],
        {
          duration: 3000,
          fill: "forwards"
        }
      );
      dot.animate(
        [{
            opacity: 1,
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
            easing: "ease-in-out"
          }],
        {
          duration: 1500,
          fill: "forwards"
        }
      );
    });

    // Mouse Follower Hide Function
    $("a, button").on('mouseenter mouseleave', function () {
      $('.mouse-follower').toggleClass('hide-cursor');
    });

    let terElement = $('h1, h2, h3, .display-one, .display-two, .display-three, .display-four, .display-five, .display-six');
    $(terElement).on('mouseenter mouseleave', function () {
      $('.mouse-follower').toggleClass('highlight-cursor-head');
      $(this).toggleClass('highlight-cursor-head');
    });

    // Custom Tabs
    $(".tabLinks .nav-links").each(function () {
      let targetTab = $(this).closest(".singleTab");
      targetTab.find(".tabLinks .nav-links").each(function () {
        let navBtn = targetTab.find(".tabLinks .nav-links");
        navBtn.on('click', function () {
          navBtn.removeClass('active');
          $(this).addClass('active');
          let indexNum = $(this).closest("li").index();
          let tabContent = targetTab.find(".tabContents .tabItem");
          $(tabContent).removeClass('active');
          $(tabContent).eq(indexNum).addClass('active');
        });
      });
    });

    // custom Accordion
    $('.accordion-single .header-area').on('click', function () {
      if ($(this).closest(".accordion-single").hasClass("active")) {
        $(this).closest(".accordion-single").removeClass("active");
        $(this).next(".content-area").slideUp();
      } else {
        $(".accordion-single").removeClass("active");
        $(this).closest(".accordion-single").addClass("active");
        $(".content-area").not($(this).next(".content-area")).slideUp();
        $(this).next(".content-area").slideToggle();
      }
    });

    $(".text-limit").each(function() {
      let textContainer = $(this);
      let maxLength = parseInt(textContainer.attr("text-limit"));
      let text = textContainer.text();
      if (text.length > maxLength) {
        let truncatedText = text.substring(0, maxLength);
        let fullText = text;
        textContainer.empty();
        let textSpan = $('<span class="text-content" style="color: inherit; font-family: inherit; font-size: inherit; font-weight: inherit;"></span>');
        textContainer.append(textSpan);
        textSpan.text(truncatedText);
        let readMoreButton = $('<span class="read-more-button ms-1" style="color: inherit; font-family: inherit; font-size: inherit; font-weight: inherit;">...</span>');
        textContainer.append(readMoreButton);

        textSpan.on('mouseenter', function() {
          textSpan.text(fullText);
          readMoreButton.hide();
        });
        textSpan.on('mouseleave', function() {
          textSpan.text(truncatedText);
          readMoreButton.show();
        });
      }
    });

  });

});