"use strict";
document.addEventListener("DOMContentLoaded", function () {

    $(function ($) {

      // card slider 
      let testimonialSlider = document.querySelector('.card-slider');
      if(testimonialSlider){
        
        const swiper = new Swiper(testimonialSlider, {
          loop: true,
          effect: "cards",
          allowTouchMove: true,
          grabCursor: true,
          navigation: {
            nextEl: '.portfolio-section .ara-prev',
          },
        });

        $('.front').on('click', function () {
          swiper.allowTouchMove = !swiper.allowTouchMove;
          swiper.update();
        });

      }

      // other-projects-carousel
      let otherProjectsCarousel = document.querySelector('.other-projects-carousel');
      let otherProjectsBtn = document.querySelector('.other-projects-btn');
      if(otherProjectsCarousel){
        const swiper = new Swiper(otherProjectsCarousel, {
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          spaceBetween: 24,
          slidesPerView: 1,
          paginationClickable: true,
          navigation: {
            nextEl: otherProjectsBtn.querySelector('.ara-next'),
            prevEl: otherProjectsBtn.querySelector('.ara-prev'),
          },
          breakpoints: {
            575: {
                slidesPerView: 2,
            },
          }
        });
      }

      /* Splitting init */
      Splitting();

    });
});