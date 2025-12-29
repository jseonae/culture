// main-visual-swiper.js
document.addEventListener("DOMContentLoaded", () => {
  // Swiper 요소가 없으면 종료
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

  // (선택) 정지/재생 버튼까지 같이 쓸 경우
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
