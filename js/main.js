// 메인 swiper
document.addEventListener("DOMContentLoaded", () => {
  
  const swiperEl = document.querySelector("#Swiper");
  if (!swiperEl) return;

  // Swiper 실행
  const mvSwiper = new Swiper("#Swiper", {
    loop: true,
    speed: 700,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  
  const toggleBtn = document.querySelector(".swiper-toggle");
  if (toggleBtn) {
    let paused = false;

    toggleBtn.addEventListener("click", () => {
      paused = !paused;

      const icon = toggleBtn.querySelector(".ico");

      if (paused) {
        mvSwiper.autoplay.stop();
        toggleBtn.setAttribute("aria-pressed", "true");
        toggleBtn.setAttribute("aria-label", "자동재생 재생");

        if (icon) {
          icon.classList.remove("pause");
          icon.classList.add("play");
        }
      } else {
        mvSwiper.autoplay.start();
        toggleBtn.setAttribute("aria-pressed", "false");
        toggleBtn.setAttribute("aria-label", "자동재생 일시정지");

        if (icon) {
          icon.classList.remove("play");
          icon.classList.add("pause");
        }
      }
    });
  }
});

// 전시공연 탭메뉴
$(function() {
			$('.exhibit_tab button').click(function() {
				var activeTab = $(this).attr('data-tab');
				$('.exhibit_tab button').removeClass('on');
				$('.tabcont').removeClass('on');
				$(this).addClass('on');
				$('#' + activeTab).addClass('on');
			})
		});


// 전시 swiper    
document.addEventListener("DOMContentLoaded", () => {
  const totalEl = document.querySelector("#total_swiper");
  if (!totalEl) return;

  const slides = totalEl.querySelectorAll(".swiper-slide");
  const totalCount = slides.length;
  const curEl = totalEl.querySelector(".exhibit_count .cur");
  const totalElText = totalEl.querySelector(".exhibit_count .total");
  const barFillEl = totalEl.querySelector(".exhibit_bar_fill");
  const prevBtn = totalEl.querySelector(".exhibit_prev");
  const nextBtn = totalEl.querySelector(".exhibit_next");

  // 총 게시물 수 표시
  totalElText.textContent = totalCount;

  let isPaused = false;

  const totalSwiper = new Swiper("#total_swiper", {
    slidesPerView: 4,        //4개 보여줌
    slidesPerGroup: 1,       //1개씩 이동
    spaceBetween: 48,
    speed: 200,
    loop: true,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },

    on: {
      init(swiper) {
        updateUI(swiper);
      },
      slideChange(swiper) {
        updateUI(swiper);
      },
    },
  });

  prevBtn.addEventListener("click", () => totalSwiper.slidePrev());
  nextBtn.addEventListener("click", () => totalSwiper.slideNext());

  // 숫자 + 프로그레스 업데이트
  function updateUI(swiper) {
    const realIndex = swiper.realIndex + 1;
    curEl.textContent = realIndex;

    // progress bar
    const progress = (swiper.realIndex % totalCount + 1) / totalCount;
    barFillEl.style.transform = `scaleX(${progress})`;
  }
});

// 팝업
document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.querySelector("#popup_swiper");
  if (!wrap) return;

  const btnPrev = wrap.querySelector(".news_prev");
  const btnNext = wrap.querySelector(".news_next");
  const toggleBtn = wrap.querySelector(".news_toggle");

  const currentEl = wrap.querySelector(".news_current");
  const totalEl = wrap.querySelector(".news_total");

  let isPaused = false;

  const newsSwiper = new Swiper(wrap, {
    loop: true,
    speed: 700,
    slidesPerView: 1,
    spaceBetween: 0,
    watchOverflow: true,

    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    navigation: {
      prevEl: btnPrev,
      nextEl: btnNext,
    },

    on: {
      init(swiper) {
        const realTotal = wrap.querySelectorAll(
          ".swiper-slide:not(.swiper-slide-duplicate)"
        ).length;

        if (totalEl) totalEl.textContent = String(realTotal).padStart(2, "0");
        if (currentEl)
          currentEl.textContent = String(swiper.realIndex + 1).padStart(2, "0");
      },
      slideChange(swiper) {
        if (currentEl)
          currentEl.textContent = String(swiper.realIndex + 1).padStart(2, "0");
      },
    },
  });

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isPaused = !isPaused;

      if (isPaused) {
        newsSwiper.autoplay.stop();
        toggleBtn.classList.add("play");
      } else {
        newsSwiper.autoplay.start();
        toggleBtn.classList.remove("play");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const space_swiper = new Swiper("#space_swiper", {
    slidesPerView: "auto",  
    slidesPerGroup: 1,       
    spaceBetween: 49,
    loop: true,
  slidesOffsetBefore: 32,
  slidesOffsetAfter: 32,
    speed: 800,
    navigation: {
      prevEl: "#space_swiper .space_prev",
      nextEl: "#space_swiper .space_next",
    },
    // autoplay: {
    //   delay: 4000,
    //   disableOnInteraction: false,
    // },
  });
});

    
