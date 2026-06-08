import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface HeroProps {
  /** Fade title + body copy out while the hero video scrubs on scroll */
  fadeOnScroll?: boolean;
}

const Hero = ({ fadeOnScroll = true }: HeroProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    if (!heroRef.current || !titleRef.current) return;

    const heroSplit = new SplitText(titleRef.current, {
      type: "chars,words",
    });

    const paraSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    heroSplit.chars.forEach((char) => char.classList.add("hero-text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
    });

    gsap.from(paraSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.2,
      stagger: 0.08,
      delay: 0.8,
    });

    const scrollDistance = isMobile ? "+=140%" : "+=180%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: scrollDistance,
        scrub: true,
        pin: true,
      },
    });

    if (fadeOnScroll && bodyRef.current) {
      tl.to(
        [titleRef.current, bodyRef.current],
        {
          autoAlpha: 0,
          y: -28,
          filter: "blur(6px)",
          ease: "power2.inOut",
          duration: 3,
        },
        0,
      );
    }

    const video = videoRef.current;
    if (video) {
      const scrubVideo = () => {
        tl.to(
          video,
          { currentTime: video.duration, ease: "none", duration: 1 },
          0,
        );
      };

      if (video.readyState >= 1) {
        scrubVideo();
      } else {
        video.addEventListener("loadedmetadata", scrubVideo, { once: true });
      }
    }

    return () => {
      heroSplit.revert();
      paraSplit.revert();
    };
  }, [isMobile, fadeOnScroll]);

  return (
    <section id="hero" ref={heroRef}>
      <h1 ref={titleRef} className="title">
        RateLock
      </h1>

      <div ref={bodyRef} className="body">
        <div className="content">
          <div className="hero-left hidden md:block">
            <p className="hero-label">Architect for Infinite Scale</p>
            <p className="subtitle hero-tagline">
              Created by
              <span>RajKumar</span>
            </p>
          </div>

          <div className="view-content">
            <p className="subtitle hero-description">
              Deploy mission-critical rate limiting and traffic orchestration at
              the edge. Engineered for the next generation of high-availability
              AI infrastructure.
            </p>

            <a href="#get-started">Get Started →</a>
          </div>
        </div>
      </div>

      <div className="hero-video">
        <video
          ref={videoRef}
          src="/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
};

export default Hero;
