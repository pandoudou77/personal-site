import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, EnvelopeSimple, Heart, StarFour, TiktokLogo, X } from "@phosphor-icons/react";

const EMAIL = "2335525249@qq.com";

const PROJECTS = [
  {
    index: "01",
    title: "房地产销售助手",
    category: "AI 产品探索",
    summary: "一个正在持续打磨的 AI 产品尝试，探索如何帮助房地产销售更高效地整理信息、理解客户需求并推进沟通。",
    status: "持续迭代中",
    problem: "真实用户场景和问题证据将在项目材料整理完成后补充。",
    role: "产品构思 · 需求探索 · 原型验证",
  },
  {
    index: "02",
    title: "个人展示网站",
    category: "个人品牌与独立开发",
    summary: "从内容梳理、视觉方向到前端实现，记录我如何把一个模糊想法逐步做成可访问、可迭代的个人产品。",
    status: "正在建设",
    problem: "如何在一个页面中同时完成个人介绍、项目展示与求职沟通。",
    role: "内容梳理 · 视觉方向 · 前端实现",
  },
  {
    index: "03",
    title: "即将公开",
    category: "COMING NEXT",
    summary: "新的想法正在形成。等它足够清晰、也真正开始被验证之后，再把过程放到这里。",
    status: "整理中",
    comingSoon: true,
  },
];

const LAMP_GLINTS = [
  { x: 3, y: 18, delay: 180, size: 8 },
  { x: 18, y: 126, delay: 440, size: 7 },
  { x: 39, y: 72, delay: 680, size: 9 },
  { x: 55, y: 166, delay: 300, size: 7 },
  { x: 72, y: 104, delay: 820, size: 8 },
  { x: 88, y: 148, delay: 560, size: 9 },
  { x: 96, y: 50, delay: 740, size: 7 },
];

function Brand({ onHome }) {
  return (
    <a className="brand" href="/#top" onClick={onHome} aria-label="高嘉勤个人网站首页">
      <strong>高</strong><span>嘉勤</span><i aria-hidden="true" />
    </a>
  );
}

function Header({ onContact, contactPage = false }) {
  return (
    <header className={`site-header ${contactPage ? "contact-header" : ""}`}>
      <Brand />
      <nav aria-label="主导航">
        <a href="/#top">首页</a>
        <a href="/#projects">项目</a>
        <a href="/#about">关于我</a>
        <button type="button" onClick={onContact}>联系我</button>
      </nav>
    </header>
  );
}

function DouyinPlaceholder() {
  return (
    <div className="qr-placeholder" aria-label="抖音二维码占位图">
      <TiktokLogo aria-hidden="true" />
      <span>二维码稍后补充</span>
    </div>
  );
}

function ContactDialog({ mode, onClose }) {
  const dialogRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!mode) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("dialog-open");
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("dialog-open");
    };
  }, [mode, onClose]);

  if (!mode) return null;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const input = document.createElement("textarea");
      input.value = EMAIL;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="contact-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        ref={dialogRef}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="dialog-close" type="button" onClick={onClose} aria-label="关闭">
          <X />
        </button>
        {mode === "email" ? (
          <>
            <span className="dialog-icon"><EnvelopeSimple /></span>
            <p className="dialog-kicker">EMAIL</p>
            <h2 id="dialog-title">通过邮箱找到我</h2>
            <p className="dialog-email">{EMAIL}</p>
            <button className="copy-button" type="button" onClick={copyEmail}>
              {copied ? <><Check /> 已复制</> : "复制邮箱"}
            </button>
          </>
        ) : (
          <>
            <span className="dialog-icon"><TiktokLogo /></span>
            <p className="dialog-kicker">DOUYIN</p>
            <h2 id="dialog-title">在抖音找到我</h2>
            <DouyinPlaceholder />
            <p className="dialog-note">正式二维码将在下一版替换。</p>
          </>
        )}
      </div>
    </div>
  );
}

function SocialButtons({ onOpen }) {
  return (
    <div className="social-buttons" aria-label="联系方式">
      <button type="button" onClick={() => onOpen("email")} aria-label="查看邮箱">
        <EnvelopeSimple />
      </button>
      <button type="button" onClick={() => onOpen("douyin")} aria-label="查看抖音二维码">
        <TiktokLogo />
      </button>
    </div>
  );
}

function Hero({ onOpen, heroRef }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero-copy">
        <p className="hello">你好，我是</p>
        <h1 id="hero-title">高嘉勤。</h1>
        <p className="hero-statement">在学习 AI，<br />也在尝试把想法做成产品</p>
      </div>

      <div className="portrait-scene" aria-label="高嘉勤个人插画">
        <div className="portrait-circle">
          <img
            src="/assets/gao-jiaqin-portrait.png"
            alt="高嘉勤的个人插画肖像"
            width="1368"
            height="2048"
            fetchPriority="high"
          />
        </div>
      </div>

      <p className="hero-note">好奇地学习，<br />认真地把每个想法向前推进一点。</p>

      <aside className="job-card" aria-label="当前求职状态">
        <span className="status-dot" aria-hidden="true" />
        <div>
          <small>当前状态 / AVAILABLE</small>
          <strong>正在寻找 AI 产品经理机会</strong>
          <p>同时开放独立项目合作</p>
        </div>
      </aside>

      <SocialButtons onOpen={onOpen} />
      <a className="scroll-cue" href="#projects">向下看项目 <span aria-hidden="true">↓</span></a>
    </section>
  );
}

function ProjectVisualPlaceholder({ label, order }) {
  return (
    <div className="project-visual-placeholder" aria-label={`${label}，待补充真实项目截图`}>
      <span>VISUAL {order}</span>
      <div>
        <strong>{label}</strong>
        <small>待补充真实项目截图</small>
      </div>
    </div>
  );
}

function ProjectsArchive({ sectionRef }) {
  const [activeProject, setActiveProject] = useState("01");
  const hoverTimerRef = useRef(null);
  const projectStreamRef = useRef(null);
  const activeProjectData = PROJECTS.find((project) => project.index === activeProject) ?? PROJECTS[0];

  useEffect(() => {
    return () => {
      window.clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const goToProject = (index) => {
    if (index === activeProject) return;
    setActiveProject(index);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.requestAnimationFrame(() => {
      projectStreamRef.current?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const previewProject = (index) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => goToProject(index), 140);
  };

  const cancelPreview = () => {
    window.clearTimeout(hoverTimerRef.current);
  };

  return (
    <section className="projects-archive" id="projects" aria-labelledby="projects-title" ref={sectionRef}>
      <header className="archive-header">
        <h2 id="projects-title">项目</h2>
        <div className="archive-count" aria-live="polite">
          <strong>{activeProject}</strong><span>/03</span>
        </div>
      </header>

      <div className="archive-layout">
        <aside className="archive-index" aria-label="项目索引">
          <nav>
            {PROJECTS.map((project) => (
              <button
                type="button"
                key={project.index}
                className={activeProject === project.index ? "is-active" : ""}
                onClick={() => goToProject(project.index)}
                onMouseEnter={() => previewProject(project.index)}
                onMouseLeave={cancelPreview}
                aria-current={activeProject === project.index ? "true" : undefined}
              >
                <span>{project.index}</span>{project.title}
              </button>
            ))}
          </nav>
        </aside>

        <div className="project-stream" ref={projectStreamRef} aria-live="polite">
          {activeProjectData.comingSoon ? (
            <article className="project-story project-coming" key={activeProjectData.index}>
              <p className="project-kicker">{activeProjectData.index} / {activeProjectData.category}</p>
              <h3>{activeProjectData.title}</h3>
              <p>{activeProjectData.summary}</p>
              <span>{activeProjectData.status}</span>
            </article>
          ) : (
            <article className="project-story" key={activeProjectData.index}>
              <div className="project-intro">
                <h3>{activeProjectData.title}</h3>
                <p>{activeProjectData.summary}</p>
              </div>

              <div className="project-notes">
                <section>
                  <span>它解决什么问题 / PROBLEM</span>
                  <p>{activeProjectData.problem}</p>
                </section>
                <section>
                  <span>我负责什么 / ROLE</span>
                  <p>{activeProjectData.role}</p>
                </section>
              </div>

              <ProjectVisualPlaceholder label="项目主视觉" order="01" />

              <ProjectVisualPlaceholder label="关键界面与实现过程" order="02" />
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutParticleRain({ active, coverRef }) {
  const canvasRef = useRef(null);
  const starSpriteRef = useRef(null);
  const heartSpriteRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cover = coverRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !cover || !context) return undefined;

    const clearCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      context.clearRect(0, 0, bounds.width, bounds.height);
    };

    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clearCanvas();
      return undefined;
    }

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    let lastFrameAt = performance.now();
    const startedAt = lastFrameAt;
    let nextSpawnAt = startedAt + 280;
    const particles = [];

    const resizeCanvas = () => {
      const bounds = cover.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const createSprite = (node, color) => new Promise((resolve, reject) => {
      if (!node) {
        reject(new Error("Missing particle sprite"));
        return;
      }
      const clone = node.cloneNode(true);
      clone.setAttribute("width", "64");
      clone.setAttribute("height", "64");
      const markup = new XMLSerializer().serializeToString(clone).replaceAll("currentColor", color);
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
    });

    const getEmitterPoint = () => {
      const rail = cover.querySelector(".lamp-curtain-rail");
      const coverBounds = cover.getBoundingClientRect();
      const railBounds = rail?.getBoundingClientRect();
      const progress = 0.05 + Math.random() * 0.9;
      if (!railBounds) {
        return { x: width * (0.58 + progress * 0.35), y: height * 0.08 };
      }
      return {
        x: railBounds.left - coverBounds.left + railBounds.width * progress,
        y: railBounds.top - coverBounds.top + railBounds.height * progress + 4,
      };
    };

    const spawnParticle = (sprites) => {
      const point = getEmitterPoint();
      const isHeart = Math.random() > 0.75;
      const life = 2300 + Math.random() * 1500;
      particles.push({
        x: point.x,
        y: point.y,
        vx: -5 + Math.random() * 10,
        vy: 54 + Math.random() * 34,
        age: 0,
        life,
        size: (isHeart ? 10 : 9) + Math.random() * (isHeart ? 8 : 10),
        phase: Math.random() * Math.PI * 2,
        wobble: 5 + Math.random() * 8,
        rotation: -0.3 + Math.random() * 0.6,
        spin: -0.22 + Math.random() * 0.44,
        type: isHeart ? "heart" : "star",
        sprite: isHeart ? sprites.heart : sprites.star,
        color: isHeart ? "235, 101, 93" : "226, 184, 75",
        trail: [],
      });
    };

    const drawParticle = (particle) => {
      const progress = particle.age / particle.life;
      const fadeIn = Math.min(progress / 0.12, 1);
      const fadeOut = Math.min((1 - progress) / 0.34, 1);
      const lowerFade = Math.min(Math.max((height * 0.52 - particle.y) / (height * 0.16), 0), 1);
      const alpha = Math.min(fadeIn, fadeOut, lowerFade) * (particle.type === "heart" ? 0.72 : 0.82);
      if (alpha <= 0) return;

      if (particle.trail.length > 1) {
        const firstPoint = particle.trail[0];
        const gradient = context.createLinearGradient(firstPoint.x, firstPoint.y, particle.x, particle.y);
        gradient.addColorStop(0, `rgba(${particle.color}, 0)`);
        gradient.addColorStop(0.44, `rgba(${particle.color}, ${alpha * 0.18})`);
        gradient.addColorStop(1, `rgba(${particle.color}, ${alpha * 0.72})`);
        context.save();
        context.beginPath();
        particle.trail.forEach((point, index) => {
          if (index === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        });
        context.lineTo(particle.x, particle.y);
        context.strokeStyle = gradient;
        context.lineWidth = Math.max(1.4, particle.size * 0.34);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.shadowColor = `rgba(${particle.color}, ${alpha * 0.46})`;
        context.shadowBlur = particle.size * 0.72;
        context.stroke();
        context.restore();
      }

      context.save();
      context.globalAlpha = alpha;
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.shadowColor = `rgba(${particle.color}, ${alpha})`;
      context.shadowBlur = particle.size * 0.7;
      context.drawImage(particle.sprite, -particle.size / 2, -particle.size / 2, particle.size, particle.size);
      context.restore();
    };

    const updateParticle = (particle, delta) => {
      particle.age += delta * 1000;
      particle.trail.push({ x: particle.x, y: particle.y });
      if (particle.trail.length > 72) particle.trail.shift();
      particle.vy += 7 * delta;
      particle.x += (particle.vx + Math.sin(particle.age * 0.003 + particle.phase) * particle.wobble) * delta;
      particle.y += particle.vy * delta;
      particle.rotation += particle.spin * delta;
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(cover);
    resizeCanvas();

    Promise.all([
      createSprite(starSpriteRef.current, "#e2b84b"),
      createSprite(heartSpriteRef.current, "#eb655d"),
    ]).then(([star, heart]) => {
      const sprites = { star, heart };

      const animate = (now) => {
        if (!running) return;
        if (document.hidden) {
          lastFrameAt = now;
          frame = window.requestAnimationFrame(animate);
          return;
        }

        const delta = Math.min((now - lastFrameAt) / 1000, 0.034);
        lastFrameAt = now;
        const elapsed = now - startedAt;
        const denseOpening = elapsed < 2500;
        const limit = denseOpening ? 48 : 18;

        if (now >= nextSpawnAt && particles.length < limit) {
          const amount = denseOpening
            ? (Math.random() > 0.34 ? 2 : 1)
            : (Math.random() > 0.86 ? 2 : 1);
          for (let index = 0; index < amount; index += 1) spawnParticle(sprites);
          nextSpawnAt = now + (denseOpening ? 54 + Math.random() * 66 : 170 + Math.random() * 150);
        }

        context.clearRect(0, 0, width, height);
        for (let index = particles.length - 1; index >= 0; index -= 1) {
          const particle = particles[index];
          updateParticle(particle, delta);
          drawParticle(particle);
          if (particle.age >= particle.life || particle.y > height * 0.55) particles.splice(index, 1);
        }
        frame = window.requestAnimationFrame(animate);
      };

      frame = window.requestAnimationFrame(animate);
    }).catch(() => clearCanvas());

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      clearCanvas();
    };
  }, [active, coverRef]);

  return (
    <>
      <canvas className="about-rain-canvas" ref={canvasRef} aria-hidden="true" />
      <span className="particle-sprite-source" aria-hidden="true">
        <StarFour ref={starSpriteRef} weight="fill" />
        <Heart ref={heartSpriteRef} weight="fill" />
      </span>
    </>
  );
}

function AboutJourney({ sectionRef }) {
  const coverRef = useRef(null);
  const titleRef = useRef(null);
  const titleTextRef = useRef(null);
  const particleIdRef = useRef(0);
  const lastParticleAtRef = useRef(0);
  const positionLockRef = useRef(0);
  const [coverVisible, setCoverVisible] = useState(false);
  const [hoveringTitle, setHoveringTitle] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const [dockStyle, setDockStyle] = useState({});

  const title = "从建造空间，到建造产品.";
  const offsets = [
    [-56, -34, -8], [28, 44, 7], [-20, -58, -5], [52, 18, 9],
    [-42, 34, -7], [18, -38, 5], [36, 48, 8], [-30, -22, -6],
    [46, -42, 7], [-52, 12, -9], [24, 54, 6], [-12, -46, -4],
    [54, 28, 8], [-34, 44, -7], [18, -54, 5], [42, 12, 7],
  ];

  useEffect(() => {
    const cover = coverRef.current;
    if (!cover) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.52) {
          setCoverVisible(true);
        } else if (!entry.isIntersecting) {
          setCoverVisible(false);
          setWorkspaceOpen(false);
          setHoveringTitle(false);
          setParticles([]);
        }
      },
      { threshold: [0, 0.52, 0.8] },
    );
    observer.observe(cover);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => window.cancelAnimationFrame(positionLockRef.current), []);

  useEffect(() => {
    const cover = coverRef.current;
    const titleText = titleTextRef.current;
    if (!cover || !titleText) return undefined;

    const updateDockPosition = () => {
      const coverBounds = cover.getBoundingClientRect();
      const naturalWidth = titleText.offsetWidth;
      const naturalHeight = titleText.offsetHeight;
      const compact = coverBounds.width <= 720;
      const targetWidth = compact
        ? Math.min(coverBounds.width - 44, 330)
        : Math.min(coverBounds.width * 0.36, 500);
      const scale = Math.min(Math.max(targetWidth / naturalWidth, 0.24), compact ? 0.7 : 0.48);
      const right = compact ? 22 : Math.max(54, coverBounds.width * 0.045);
      const top = compact ? 78 : 64;
      const targetCenterX = coverBounds.width - right - (naturalWidth * scale) / 2;
      const targetCenterY = top + (naturalHeight * scale) / 2;

      setDockStyle({
        "--dock-x": `${targetCenterX - coverBounds.width / 2}px`,
        "--dock-y": `${targetCenterY - coverBounds.height / 2}px`,
        "--dock-scale": scale,
      });
    };

    updateDockPosition();
    window.addEventListener("resize", updateDockPosition);
    return () => window.removeEventListener("resize", updateDockPosition);
  }, []);

  const addParticles = (clientX, clientY, count = 2, burst = false) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = coverRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = clientX - bounds.left;
    const y = clientY - bounds.top;
    const created = [];
    for (let index = 0; index < count; index += 1) {
      const angle = burst
        ? (Math.PI * 2 * index) / count + Math.random() * 0.5
        : -Math.PI / 2 + (Math.random() - 0.5) * 1.65;
      const distance = burst ? 48 + Math.random() * 100 : 24 + Math.random() * 52;
      created.push({
        id: particleIdRef.current += 1,
        type: Math.random() > 0.72 ? "heart" : "star",
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - (burst ? 12 : 5),
        size: (burst ? 12 : 8) + Math.random() * (burst ? 12 : 9),
        rotation: -24 + Math.random() * 48,
        duration: 720 + Math.random() * 520,
      });
    }
    setParticles((current) => [...current.slice(-54), ...created]);
  };

  const onTitlePointerMove = (event) => {
    if (event.pointerType === "touch") return;
    const now = performance.now();
    if (now - lastParticleAtRef.current < 54) return;
    lastParticleAtRef.current = now;
    addParticles(event.clientX, event.clientY, 2);
  };

  const lockSectionPosition = () => {
    const startedAt = performance.now();
    window.cancelAnimationFrame(positionLockRef.current);
    const keepSectionAligned = () => {
      if (sectionRef.current) window.scrollTo({ top: sectionRef.current.offsetTop, behavior: "auto" });
      if (performance.now() - startedAt < 920) {
        positionLockRef.current = window.requestAnimationFrame(keepSectionAligned);
      }
    };
    positionLockRef.current = window.requestAnimationFrame(keepSectionAligned);
  };

  const onTitlePointerEnter = () => {
    setHoveringTitle(true);
    const titleBounds = titleRef.current?.getBoundingClientRect();
    if (!titleBounds) return;
    addParticles(
      titleBounds.left + titleBounds.width / 2,
      titleBounds.top + titleBounds.height / 2,
      12,
      true,
    );
  };

  const openWorkspace = (event) => {
    event.currentTarget.blur();
    const titleBounds = titleRef.current?.getBoundingClientRect();
    if (titleBounds) {
      addParticles(titleBounds.left + titleBounds.width / 2, titleBounds.top + titleBounds.height / 2, 34, true);
    }
    setHoveringTitle(false);
    setWorkspaceOpen(true);
    lockSectionPosition();
  };

  const closeWorkspace = (event) => {
    event.currentTarget.blur();
    const lampBounds = event.currentTarget.getBoundingClientRect();
    addParticles(
      lampBounds.left + lampBounds.width * 0.52,
      lampBounds.top + Math.min(lampBounds.height * 0.24, 72),
      22,
      true,
    );
    setWorkspaceOpen(false);
    lockSectionPosition();
  };

  return (
    <section className={`about-journey ${workspaceOpen ? "is-workspace-open" : ""}`} id="about" aria-labelledby="about-title" ref={sectionRef}>
      <div className="about-cover" ref={coverRef}>
        <div className="about-particles" aria-hidden="true">
          {particles.map((particle) => {
            const ParticleIcon = particle.type === "heart" ? Heart : StarFour;
            return (
              <span
                className={`about-particle is-${particle.type}`}
                key={particle.id}
                style={{
                  "--particle-x": `${particle.x}px`,
                  "--particle-y": `${particle.y}px`,
                  "--particle-dx": `${particle.dx}px`,
                  "--particle-dy": `${particle.dy}px`,
                  "--particle-size": `${particle.size}px`,
                  "--particle-rotate": `${particle.rotation}deg`,
                  "--particle-duration": `${particle.duration}ms`,
                }}
                onAnimationEnd={() => setParticles((current) => current.filter(({ id }) => id !== particle.id))}
              >
                <ParticleIcon weight="fill" />
              </span>
            );
          })}
        </div>

        <AboutParticleRain active={workspaceOpen && coverVisible} coverRef={coverRef} />

        <article className="about-workspace" id="about-workspace" aria-hidden={!workspaceOpen}>
          <header>
            <h3>我现在</h3>
          </header>
          <dl className="about-now-list">
            <div><dt>正在做</dt><dd>房地产销售助手<br />个人展示网站</dd></div>
            <div><dt>正在学习</dt><dd>AI 产品<br />UI 设计与独立开发</dd></div>
            <div><dt>正在读</dt><dd>《UI设计入门一本就够》</dd></div>
            <div><dt>正在寻找</dt><dd>AI 产品经理机会<br />独立项目合作</dd></div>
          </dl>
        </article>

        <button
          className="about-lamp-curtain"
          type="button"
          onClick={closeWorkspace}
          aria-label="返回第三页标题封面"
          tabIndex={workspaceOpen ? 0 : -1}
          aria-hidden={!workspaceOpen}
        >
          <span className="lamp-curtain-rail" aria-hidden="true" />
          {LAMP_GLINTS.map((glint, index) => (
            <StarFour
              className="lamp-glint"
              weight="fill"
              aria-hidden="true"
              key={`${glint.x}-${glint.y}-${index}`}
              style={{
                "--glint-x": `${glint.x}%`,
                "--glint-y": `${glint.y}px`,
                "--glint-delay": `${glint.delay}ms`,
                "--glint-size": `${glint.size}px`,
              }}
            />
          ))}
        </button>

        <button
          className={`about-title-trigger ${coverVisible ? "is-visible" : ""} ${hoveringTitle ? "is-hovered" : ""} ${workspaceOpen ? "is-docked" : ""}`}
          type="button"
          onPointerEnter={onTitlePointerEnter}
          onPointerLeave={() => setHoveringTitle(false)}
          onPointerMove={onTitlePointerMove}
          onClick={openWorkspace}
          aria-expanded={workspaceOpen}
          aria-controls="about-workspace"
          aria-label="打开我的现在"
          aria-hidden={workspaceOpen}
          tabIndex={workspaceOpen ? -1 : 0}
          ref={titleRef}
          style={dockStyle}
        >
          <span className="about-title-text" id="about-title" aria-label={title} ref={titleTextRef}>
            {Array.from(title).map((character, index) => {
              const [x, y, rotate] = offsets[index % offsets.length];
              return (
                <span
                  className="about-title-character"
                  aria-hidden="true"
                  key={`${character}-${index}`}
                  style={{ "--char-index": index, "--char-x": `${x}px`, "--char-y": `${y}px`, "--char-rotate": `${rotate}deg` }}
                >
                  {character === " " ? "\u00a0" : character}
                </span>
              );
            })}
          </span>
          <span className="about-lamp-line" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function useHeroHandoff(heroRef, projectsRef, aboutRef) {
  useEffect(() => {
    let locked = false;
    let lastWheelAt = 0;
    let returnArmed = false;
    let aboutArmed = false;
    let armExpiryTimer = 0;
    let aboutArmExpiryTimer = 0;
    let bounceTimer = 0;
    let transitionTimer = 0;
    let transitionTarget = 0;
    let transitionMinimumEnd = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const finishTransition = () => {
      window.scrollTo({ top: transitionTarget, behavior: "auto" });
      locked = false;
      lastWheelAt = performance.now();
    };

    const scheduleTransitionFinish = (delay) => {
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(finishTransition, delay);
    };

    const moveTo = (targetTop) => {
      if (locked) return;
      locked = true;
      transitionTarget = targetTop;
      const duration = reducedMotion.matches ? 40 : 680;
      transitionMinimumEnd = performance.now() + duration;
      window.scrollTo({
        top: transitionTarget,
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
      scheduleTransitionFinish(duration);
    };

    const moveToProjects = () => {
      if (!projectsRef.current) return;
      moveTo(projectsRef.current.offsetTop);
    };

    const clearAboutState = () => {
      aboutArmed = false;
      window.clearTimeout(aboutArmExpiryTimer);
    };

    const clearReturnState = () => {
      returnArmed = false;
      window.clearTimeout(armExpiryTimer);
      window.clearTimeout(bounceTimer);
      projectsRef.current?.classList.remove("is-return-armed");
    };

    const showReturnBounce = () => {
      const projects = projectsRef.current;
      if (!projects || reducedMotion.matches) return;
      projects.classList.remove("is-return-armed");
      window.requestAnimationFrame(() => projects.classList.add("is-return-armed"));
      window.clearTimeout(bounceTimer);
      bounceTimer = window.setTimeout(() => projects.classList.remove("is-return-armed"), 420);
    };

    const armReturn = () => {
      returnArmed = true;
      showReturnBounce();
      window.clearTimeout(armExpiryTimer);
      armExpiryTimer = window.setTimeout(clearReturnState, 1200);
    };

    const moveToHero = () => {
      if (!heroRef.current) return;
      clearReturnState();
      clearAboutState();
      moveTo(0);
    };

    const moveToAbout = () => {
      if (!aboutRef.current) return;
      clearReturnState();
      clearAboutState();
      moveTo(aboutRef.current.offsetTop);
    };

    const moveToProjectEnd = () => {
      if (!projectsRef.current || !aboutRef.current) return;
      clearReturnState();
      clearAboutState();
      const projectEnd = Math.max(
        projectsRef.current.offsetTop,
        aboutRef.current.offsetTop - window.innerHeight,
      );
      moveTo(projectEnd);
    };

    const armAbout = () => {
      aboutArmed = true;
      window.clearTimeout(aboutArmExpiryTimer);
      aboutArmExpiryTimer = window.setTimeout(clearAboutState, 1200);
    };

    const onWheel = (event) => {
      if (!heroRef.current || !projectsRef.current || !aboutRef.current) return;

      if (locked) {
        event.preventDefault();
        const remaining = Math.max(transitionMinimumEnd - performance.now(), 0);
        scheduleTransitionFinish(Math.max(remaining, 180));
        return;
      }

      const heroTopBoundary = Math.max(80, heroRef.current.offsetTop + 56);
      if (event.deltaY > 0 && window.scrollY <= heroTopBoundary) {
        event.preventDefault();
        clearReturnState();
        clearAboutState();
        moveToProjects();
        return;
      }

      const projectTop = projectsRef.current.offsetTop;
      const aboutTop = aboutRef.current.offsetTop;
      const inProjects = window.scrollY >= projectTop - 14 && window.scrollY < aboutTop;

      if (event.deltaY > 0 && inProjects) {
        if (returnArmed) clearReturnState();

        const target = event.target;
        const isOverProjectIndex = target instanceof Element && Boolean(target.closest(".archive-index"));
        if (isOverProjectIndex) {
          event.preventDefault();
          moveToAbout();
          return;
        }

        const now = performance.now();
        const isNewGesture = now - lastWheelAt > 220;
        const projectBottom = Math.max(projectTop, aboutTop - window.innerHeight);
        const startedAtProjectBottom = Math.abs(window.scrollY - projectBottom) <= 14;
        const crossesProjectBottom = window.scrollY < projectBottom - 14
          && window.scrollY + event.deltaY >= projectBottom - 14;
        const reachedProjectBottom = Math.abs(window.scrollY - projectBottom) <= 14;
        lastWheelAt = now;

        if (crossesProjectBottom) {
          event.preventDefault();
          clearAboutState();
          window.scrollTo({ top: projectBottom, behavior: "auto" });
          return;
        }

        if (!reachedProjectBottom) {
          if (aboutArmed) clearAboutState();
          return;
        }

        event.preventDefault();
        if (Math.abs(window.scrollY - projectBottom) > 1) {
          window.scrollTo({ top: projectBottom, behavior: "auto" });
        }

        // Reaching the bottom only completes natural reading. Two fresh wheel
        // gestures that start at the boundary are required to enter About.
        if (!isNewGesture || !startedAtProjectBottom) return;
        if (aboutArmed) moveToAbout();
        else armAbout();
        return;
      }

      if (event.deltaY >= 0) {
        if (returnArmed) clearReturnState();
        if (aboutArmed) clearAboutState();
        lastWheelAt = performance.now();
        return;
      }

      if (aboutArmed) clearAboutState();

      const startedAtAboutTop = Math.abs(window.scrollY - aboutTop) <= 14;
      const crossesAboutTop = window.scrollY > aboutTop + 14
        && window.scrollY + event.deltaY <= aboutTop + 14;
      const reachedAboutTop = Math.abs(window.scrollY - aboutTop) <= 14;

      if (crossesAboutTop) {
        event.preventDefault();
        clearReturnState();
        window.scrollTo({ top: aboutTop, behavior: "auto" });
        lastWheelAt = performance.now();
        return;
      }

      if (window.scrollY >= aboutTop - 14) {
        if (!reachedAboutTop) return;
        event.preventDefault();
        if (Math.abs(window.scrollY - aboutTop) > 1) {
          window.scrollTo({ top: aboutTop, behavior: "auto" });
        }

        // The first upward gesture inside About naturally reaches its top.
        // A gesture starting at that boundary snaps to the final Projects view.
        if (startedAtAboutTop) moveToProjectEnd();
        return;
      }

      const now = performance.now();
      const isNewGesture = now - lastWheelAt > 220;
      const startedAtProjectTop = Math.abs(window.scrollY - projectTop) <= 14;
      const crossesProjectTop = window.scrollY > projectTop + 14
        && window.scrollY + event.deltaY <= projectTop + 14;
      const reachedProjectTop = Math.abs(window.scrollY - projectTop) <= 14;
      lastWheelAt = now;

      if (crossesProjectTop) {
        event.preventDefault();
        clearReturnState();
        window.scrollTo({ top: projectTop, behavior: "auto" });
        return;
      }

      if (!reachedProjectTop) {
        if (returnArmed) clearReturnState();
        return;
      }

      event.preventDefault();
      if (Math.abs(window.scrollY - projectTop) > 1) window.scrollTo({ top: projectTop, behavior: "auto" });

      // A gesture that began inside the project first finishes at the boundary.
      // Only a fresh gesture that starts at the boundary counts toward returning.
      if (!isNewGesture || !startedAtProjectTop) return;

      if (returnArmed) moveToHero();
      else armReturn();
    };

    const onWheelCapture = (event) => {
      if (!locked) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const remaining = Math.max(transitionMinimumEnd - performance.now(), 0);
      scheduleTransitionFinish(Math.max(remaining, 180));
    };

    let raf = 0;
    const updateHeroProgress = () => {
      raf = 0;
      const height = heroRef.current?.offsetHeight || window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / height, 0), 1);
      document.documentElement.style.setProperty("--hero-exit", progress.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(updateHeroProgress);
      const projectTop = projectsRef.current?.offsetTop ?? 0;
      const aboutTop = aboutRef.current?.offsetTop ?? Number.POSITIVE_INFINITY;
      const projectBottom = Math.max(projectTop, aboutTop - window.innerHeight);
      if (returnArmed && Math.abs(window.scrollY - projectTop) > 20) clearReturnState();
      if (aboutArmed && Math.abs(window.scrollY - projectBottom) > 20) clearAboutState();
    };

    window.addEventListener("wheel", onWheelCapture, { passive: false, capture: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    updateHeroProgress();
    return () => {
      window.removeEventListener("wheel", onWheelCapture, { capture: true });
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      window.clearTimeout(transitionTimer);
      clearReturnState();
      clearAboutState();
      document.documentElement.style.removeProperty("--hero-exit");
    };
  }, [heroRef, projectsRef, aboutRef]);
}

function HomePage({ onOpen, onContact }) {
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  useHeroHandoff(heroRef, projectsRef, aboutRef);

  return (
    <div className="page-shell">
      <Header onContact={onContact} />
      <main>
        <Hero onOpen={onOpen} heroRef={heroRef} />
        <ProjectsArchive sectionRef={projectsRef} />
        <AboutJourney sectionRef={aboutRef} />
      </main>
      <footer className="home-footer">
        <span>高嘉勤 · GAO JIAQIN</span>
        <button type="button" onClick={onContact}>很高兴认识你，一起聊聊吧 <ArrowRight /></button>
      </footer>
    </div>
  );
}

function ContactPage({ onOpen }) {
  return (
    <div className="contact-page">
      <Header contactPage onContact={() => {}} />
      <main className="contact-page-main">
        <a className="back-home" href="/"><ArrowLeft /> 返回首页</a>
        <p className="contact-page-kicker">CONTACT · GAO JIAQIN</p>
        <h1>很高兴认识你，<br />一起聊聊吧。</h1>
        <p className="contact-page-intro">如果你正在寻找 AI 产品经理，或想一起把一个想法做成产品，欢迎通过下面的方式找到我。</p>
        <ul className="cooperation-list" aria-label="合作方向">
          <li>AI 产品经理机会</li>
          <li>AI 产品共创</li>
          <li>独立项目合作</li>
        </ul>
        <div className="contact-options">
          <button type="button" onClick={() => onOpen("email")}>
            <span><EnvelopeSimple /></span>
            <small>EMAIL</small>
            <strong>{EMAIL}</strong>
            <em>点击复制邮箱</em>
          </button>
          <button type="button" onClick={() => onOpen("douyin")}>
            <span><TiktokLogo /></span>
            <small>DOUYIN</small>
            <strong>抖音</strong>
            <em>点击查看二维码</em>
          </button>
        </div>
      </main>
    </div>
  );
}

function getRoute() {
  return window.location.pathname.replace(/\/+$/, "") === "/contact" ? "contact" : "home";
}

export function App() {
  const [route, setRoute] = useState(getRoute);
  const [dialogMode, setDialogMode] = useState(null);

  useEffect(() => {
    const onPopState = () => setRoute(getRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [route]);

  const openContactPage = () => {
    if (route === "contact") return;
    window.history.pushState({}, "", "/contact");
    setRoute("contact");
  };

  return (
    <>
      {route === "contact" ? (
        <ContactPage onOpen={setDialogMode} />
      ) : (
        <HomePage onOpen={setDialogMode} onContact={openContactPage} />
      )}
      <ContactDialog mode={dialogMode} onClose={() => setDialogMode(null)} />
    </>
  );
}
