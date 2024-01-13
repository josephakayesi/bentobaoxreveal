const bento = document.querySelector(".bento"),
  bentoBoxes = bento.querySelectorAll(".bento_box"),
  bentoBoxesSpan = bento.querySelectorAll(".bento_box_text > span"),
  bentoIntro = bento.querySelectorAll(".bento_intro > .bento_intro_row > h1");

const init = () => {
  gsap.set(bentoBoxes, { scaleY: 0, transformOrigin: "bottom" });
  gsap.set(bentoBoxesSpan, { y: "110%" });

  splitText();
};

const splitText = () => {
  Splitting({
    target: bentoIntro,
    by: "chars",
    key: null,
  });

  gsap.set(".bento_intro .char", { y: "100%" });

  animateIntro();
};

const animateIntro = () => {
  gsap
    .timeline({
      defaults: {
        duration: 1.6,
        ease: "expo.inOut",
        stagger: 0.02,
      },
    })
    .to(".bento_intro .char", {
      y: "0",
      onComplete: () => {
        animateBoxes();
      },
    })
    .to(".bento_intro .char", {
      y: "-100%",
      onComplete: () => {
        // Removes 'bento_intro' element from the DOM when event is triggered
        document.querySelector(".bento_intro").remove();
      },
    });
};

const animateBoxes = () => {
  gsap
    .timeline()
    .to(bentoBoxes, {
      duration: 1.6,
      scaleY: "100%",
      ease: "expo.inOut",
      stagger: 0.05,
      onComplete: () => {
        addEventListeners();
      },
    })
    .to(
      bentoBoxesSpan,
      {
        duration: 1.6,
        y: "0",
        ease: "expo.out",
      },
      1
    );
};

const animateInnerText = (dataSpan) => {
  gsap
    .timeline({
      defaults: {
        duration: 0.32,
      },
    })
    .to(dataSpan, {
      y: "-100%",
      ease: "expo.in",
      overwrite: true,
    })
    .set(dataSpan, { y: "100%" })
    .to(dataSpan, { y: "0", ease: "expo.out" });
};

const addEventListeners = () => {
  bentoBoxes.forEach((box) => {
    box.addEventListener("mouseenter", (e) => {
      const dataSpan = e.target.children[0].children[0];

      e.target.classList.add("active");
      animateInnerText(dataSpan);
    });
  });

  bentoBoxes.forEach((box) => {
    box.addEventListener("mouseout", (e) => {
      e.target.classList.remove("active");
    });
  });
};

init();
