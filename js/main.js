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


// 전시공연 탭 Swiper (total / culture / faco)
document.addEventListener("DOMContentLoaded", () => {
  // ✅ 각 swiper를 "같은 구조"로 초기화하는 함수
  function initExhibitSwiper(swiperId) {
    const root = document.querySelector(swiperId);
    if (!root) return null;

    const slides = root.querySelectorAll(".swiper-slide");
    const totalCount = slides.length;

    // ✅ 컨트롤은 반드시 root(각 swiper) 안에서만 찾기 (꼬임 방지)
    const curEl = root.querySelector(".exhibit_count .cur");
    const totalElText = root.querySelector(".exhibit_count .total");
    const barFillEl = root.querySelector(".exhibit_bar_fill");
    const prevBtn = root.querySelector(".exhibit_prev");
    const nextBtn = root.querySelector(".exhibit_next");

    // 총 게시물 수 표시
    if (totalElText) totalElText.textContent = totalCount;

    // 숫자 + 프로그레스 업데이트
    function updateUI(swiper) {
      if (!swiper || totalCount === 0) return;

      const realIndex = swiper.realIndex + 1;
      if (curEl) curEl.textContent = realIndex;

      if (barFillEl) {
        const progress = (swiper.realIndex % totalCount + 1) / totalCount;
        barFillEl.style.transform = `scaleX(${progress})`;
      }
    }

    const instance = new Swiper(swiperId, {
      slidesPerView: 4,
      slidesPerGroup: 1,
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

    // prev/next 연결
    if (prevBtn) prevBtn.addEventListener("click", () => instance.slidePrev());
    if (nextBtn) nextBtn.addEventListener("click", () => instance.slideNext());

    return instance;
  }

  // ✅ 3개 swiper 인스턴스 생성 (완전 독립)
  const totalSwiper = initExhibitSwiper("#total_swiper");
  const cultureSwiper = initExhibitSwiper("#culture_swiper");
  const facoSwiper = initExhibitSwiper("#faco_swiper");

  // ✅ 탭 전환 (너 탭 구조: .exhibit_tab button[data-tab="menuX"] / .tabcont#menuX)
  const tabBtns = document.querySelectorAll(".exhibit_tab button[data-tab]");
  const tabConts = document.querySelectorAll(".tabcont");

  // ✅ 탭 눌렀을 때 "항상 1번부터" 시작하도록 리셋
  function resetToFirst(swiper) {
    if (!swiper) return;

    // display:none → block 된 직후엔 폭 계산이 필요해서 update 먼저
    swiper.update();

    // loop가 켜져 있으면 내부 인덱스 정리
    if (swiper.params && swiper.params.loop) {
      swiper.loopFix();
    }

    // "첫 슬라이드"로 즉시 이동 (loop:true에서 가장 안전)
    swiper.slideToLoop(0, 0, false);

    // autoplay 타이머도 새로 시작(= 탭 누를 때마다 처음부터 롤링 느낌)
    if (swiper.autoplay) {
      swiper.autoplay.stop();
      swiper.autoplay.start();
    }
  }

  function stopAutoplay(swiper) {
    if (!swiper || !swiper.autoplay) return;
    swiper.autoplay.stop();
  }

  function activateTab(menuId) {
    // 버튼 on 처리
    tabBtns.forEach((btn) => btn.classList.toggle("on", btn.dataset.tab === menuId));
    // 컨텐츠 on 처리
    tabConts.forEach((cont) => cont.classList.toggle("on", cont.id === menuId));

    // ✅ 다른 탭은 멈추고, 활성 탭만 "첫 슬라이드 + autoplay 리셋"
    stopAutoplay(totalSwiper);
    stopAutoplay(cultureSwiper);
    stopAutoplay(facoSwiper);

    if (menuId === "menu1") resetToFirst(totalSwiper);
    if (menuId === "menu2") resetToFirst(cultureSwiper);
    if (menuId === "menu3") resetToFirst(facoSwiper);
  }

  // 클릭 이벤트
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  // ✅ 페이지 첫 진입 시(현재 on인 탭 기준)도 한번 정리해주면 더 안정적
  const firstOnBtn = document.querySelector(".exhibit_tab button.on[data-tab]");
  if (firstOnBtn) activateTab(firstOnBtn.dataset.tab);
});



// // 전시 swiper    
// document.addEventListener("DOMContentLoaded", () => {
//   const totalEl = document.querySelector("#total_swiper");
//   if (!totalEl) return;

//   const slides = totalEl.querySelectorAll(".swiper-slide");
//   const totalCount = slides.length;
//   const curEl = totalEl.querySelector(".exhibit_count .cur");
//   const totalElText = totalEl.querySelector(".exhibit_count .total");
//   const barFillEl = totalEl.querySelector(".exhibit_bar_fill");
//   const prevBtn = totalEl.querySelector(".exhibit_prev");
//   const nextBtn = totalEl.querySelector(".exhibit_next");

//   // 총 게시물 수 표시
//   totalElText.textContent = totalCount;

//   let isPaused = false;

//   const totalSwiper = new Swiper("#total_swiper", {
//     slidesPerView: 4,        //4개 보여줌
//     slidesPerGroup: 1,       //1개씩 이동
//     spaceBetween: 48,
//     speed: 200,
//     loop: true,

//     autoplay: {
//       delay: 4000,
//       disableOnInteraction: false,
//     },

//     on: {
//       init(swiper) {
//         updateUI(swiper);
//       },
//       slideChange(swiper) {
//         updateUI(swiper);
//       },
//     },
//   });

//   prevBtn.addEventListener("click", () => totalSwiper.slidePrev());
//   nextBtn.addEventListener("click", () => totalSwiper.slideNext());

//   // 숫자 + 프로그레스 업데이트
//   function updateUI(swiper) {
//     const realIndex = swiper.realIndex + 1;
//     curEl.textContent = realIndex;

//     // progress bar
//     const progress = (swiper.realIndex % totalCount + 1) / totalCount;
//     barFillEl.style.transform = `scaleX(${progress})`;
//   }
// });

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

// 공간 swiper

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
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    on: {
      init(swiper) {
        // ✅ 항상 01부터 시작
        swiper.slideToLoop(0, 0, false);
      }
    }
  });
});

    
