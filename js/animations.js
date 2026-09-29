/* =========================================================
   VELORA — CINEMATIC SCROLL ENGINE
   GSAP + ScrollTrigger
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   HERO INTRO
   ========================================================= */

const heroTimeline = gsap.timeline({
    defaults: {
        ease: "power4.out"
    }
});

heroTimeline
    .to(".hero-content > *", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.12
    })
    .from(".scroll-indicator", {
        opacity: 0,
        y: 20,
        duration: 1
    }, "-=0.5");

/* =========================================================
   HERO — CINEMATIC CAMERA MOVEMENT
   ========================================================= */

const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero-bg");
const heroContent = document.querySelector(".hero-content");

if (hero && heroBg && heroContent) {

    const heroScroll = gsap.timeline({
        scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            pin: false
        }
    });

    heroScroll
        .to(heroBg, {
            scale: 1.22,
            yPercent: 10,
            ease: "none"
        }, 0)

        .to(heroContent, {
            yPercent: -22,
            scale: 0.94,
            opacity: 0.15,
            ease: "none"
        }, 0)

        .to(".hero-overlay", {
            opacity: 0.72,
            ease: "none"
        }, 0);
}


/* =========================================================
   HERO TEXT MOVEMENT
   ========================================================= */

gsap.to(".hero-content", {
    yPercent: -25,
    opacity: 0.15,
    ease: "none",

    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});


/* =========================================================
   INTRO REVEAL
   ========================================================= */

gsap.to(".intro-number", {
    opacity: 1,
    y: 0,
    duration: 1,

    scrollTrigger: {
        trigger: ".intro",
        start: "top 70%"
    }
});

gsap.to(".intro-text", {
    opacity: 1,
    y: 0,
    duration: 1.3,
    ease: "power4.out",

    scrollTrigger: {
        trigger: ".intro",
        start: "top 65%"
    }
});


/* =========================================================
   COLLECTION HEADING
   ========================================================= */

gsap.from(".section-heading", {
    opacity: 0,
    y: 100,
    duration: 1.2,
    ease: "power4.out",

    scrollTrigger: {
        trigger: ".collection",
        start: "top 70%"
    }
});


/* =========================================================
   PRODUCT CARD REVEAL
   ========================================================= */

gsap.from(".fashion-card", {
    opacity: 0,
    y: 100,
    rotateX: 8,
    duration: 1.2,
    stagger: 0.18,
    ease: "power4.out",

    scrollTrigger: {
        trigger: ".collection-grid",
        start: "top 75%"
    }
});


/* =========================================================
   PRODUCT IMAGE PARALLAX
   ========================================================= */

gsap.utils.toArray(".fashion-image").forEach((image) => {

    gsap.fromTo(
        image,
        {
            scale: 1.12
        },
        {
            scale: 1,
            ease: "none",

            scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        }
    );

});


/* =========================================================
   VELORA — IMMERSIVE 3-IMAGE RUNWAY
   ========================================================= */

const runway = document.querySelector(".runway");
const runwayContent = document.querySelector(".runway-content");

if (runway && runwayContent) {

    const runwayImages = [
    "images/editorial/runway1.png",
    "images/editorial/runway2.png",
    "images/editorial/runway3.png"
];

    /* Create cinematic image layers */

    const runwayMedia = document.createElement("div");
    runwayMedia.className = "runway-media";

    runwayImages.forEach((src, index) => {

        const layer = document.createElement("div");

        layer.className = "runway-image-layer";

        layer.style.backgroundImage = `url("${src}")`;
        layer.style.opacity = index === 0 ? "1" : "0";

        runwayMedia.appendChild(layer);

    });

    runway.insertBefore(runwayMedia, runway.firstChild);


    const layers = gsap.utils.toArray(".runway-image-layer");


    /* Initial image */

    gsap.set(layers, {
        scale: 1.12
    });


    /* Cinematic scrolling */

    const runwayTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: runway,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5
        }
    });


    /* IMAGE 1 → IMAGE 2 */

    runwayTimeline
        .to(layers[0], {
            scale: 1,
            opacity: 1,
            ease: "none"
        }, 0)

        .to(layers[0], {
            scale: 0.92,
            opacity: 0,
            ease: "none"
        }, 0.28)

        .to(layers[1], {
            scale: 1,
            opacity: 1,
            ease: "none"
        }, 0.28);


    /* IMAGE 2 → IMAGE 3 */

    runwayTimeline
        .to(layers[1], {
            scale: 0.92,
            opacity: 0,
            ease: "none"
        }, 0.62)

        .to(layers[2], {
            scale: 1,
            opacity: 1,
            ease: "none"
        }, 0.62);


    /* Runway text movement */

    gsap.fromTo(
        runwayContent,
        {
            y: 100,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",

            scrollTrigger: {
                trigger: runway,
                start: "top 70%"
            }
        }
    );


    /* Text slowly moves while scrolling */

    gsap.to(runwayContent, {
        yPercent: -20,
        scale: 0.92,
        ease: "none",

        scrollTrigger: {
            trigger: runway,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5
        }
    });

}

/* =========================================================
   FINAL SECTION
   ========================================================= */

gsap.to(".final-section > *", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power4.out",

    scrollTrigger: {
        trigger: ".final-section",
        start: "top 65%"
    }
});


/* =========================================================
   REFRESH SCROLLTRIGGER
   ========================================================= */

window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});
/* =========================================================
   VELORA — CINEMATIC HERO EXIT
   ========================================================= */

gsap.to(".hero-bg", {
    scale: 1.25,
    yPercent: 12,
    ease: "none",

    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
    }
});


gsap.to(".hero-content", {
    yPercent: -35,
    opacity: 0,
    scale: 0.92,
    ease: "none",

    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "70% top",
        scrub: 1
    }
});


/* =========================================================
   STORY REVEAL
   ========================================================= */

gsap.from(".intro-text", {
    opacity: 0,
    y: 100,
    rotateX: 8,
    duration: 1.4,
    ease: "power4.out",

    scrollTrigger: {
        trigger: ".intro",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});


gsap.from(".intro-number", {
    opacity: 0,
    x: -80,
    duration: 1.2,
    ease: "power4.out",

    scrollTrigger: {
        trigger: ".intro",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});