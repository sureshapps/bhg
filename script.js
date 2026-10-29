const color = {
  teal2: '#ffffff',
  teal: '#9b9ba6',
  dark: '#0f0026',
  red: '#ffffff',
  light: '#d9d9e0' };


const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function introAnimation() {
  const duration = 4;


  const easeOutElastic = Elastic.easeOut.config(1, 1);
  const section = this.$refs.header;
  const button = this.$el.querySelector('#header button');

  // Set the section opacity low, so that it doenst visully load with a hop/skip
  TweenMax.set([section, '#header', '.gui'], { autoAlpha: 0 });

  // Sort tics from the middle -> to outside
  const sortTics = selector => {
    const tics = Array.from(document.querySelectorAll(selector));
    return {
      left: tics.filter((tic, i) => i < tics.length / 2).reverse(),
      right: tics.filter((tic, i) => i > (tics.length - 1) / 2) };

  };
  const ticsT = sortTics('.ui-tics.t .tic');
  const ticsB = sortTics('.ui-tics.b .tic');
  const borderXF = $('.gui .border-x.f');
  const borderXL = $('.gui .border-x.l');
  const textBox = $$('.ui-text .t-o');
  const textBoxTitleL = $$('.ui-text.l h5');
  const textBoxTitleR = $$('.ui-text.r h5');
  const curvedBorder = $('.ui-border-v2.t');

  new TimelineMax({
    onComplete: () => document.body.classList.add('intro-anim-complete') }).

  delay(1).
  set('body', { opacity: 1 })
  // Turn the opacity back up
  .add(_ => TweenMax.set([section, '#header', '.gui'], { autoAlpha: 1 })).
  set('.gui .border-vert .dot', { autoAlpha: 0 }, 0).

  from('.gui .border-horz', duration, {
    scaleX: 0,
    ease: easeOutElastic },
  0).
  from(borderXF, duration, {
    rotation: '90deg',
    scaleX: 0,
    ease: easeOutElastic,
    onComplete() {
      borderXF.style = null;
    } },
  0).
  from(borderXL, duration, {
    rotation: '-90deg',
    scaleX: 0,
    ease: easeOutElastic,
    onComplete() {
      borderXL.style = null;
    } },
  0).

  from('.gui .border-vert', duration, {
    scaleY: 0,
    ease: easeOutElastic },
  0).
  fromTo('#header .ui-box', duration * 0.1, {
    autoAlpha: 0 },
  {
    autoAlpha: 1,
    ease: easeOutElastic },
  0).
  staggerFromTo(ticsT.left, duration, {
    visibility: 'hidden' },
  {
    visibility: 'visible',
    ease: easeOutElastic },
  0.05, 0).
  staggerFromTo(ticsT.right, duration, {
    visibility: 'hidden' },
  {
    visibility: 'visible',
    ease: easeOutElastic },
  0.05, 0).

  staggerFromTo(ticsB.left, duration, {
    visibility: 'hidden' },
  {
    visibility: 'visible',
    ease: easeOutElastic },
  0.05, 0).
  staggerFromTo(ticsB.right, duration, {
    visibility: 'hidden' },
  {
    visibility: 'visible',
    ease: easeOutElastic },
  0.05, 0).

  fromTo('#header .ui-fx', duration, {
    top: '40%',
    right: '40%',
    bottom: '40%',
    left: '40%' },
  {
    top: '0%',
    right: '0%',
    bottom: '0%',
    left: '0%',
    ease: easeOutElastic },
  0).
  set('.gui .ui-border', { transition: 'none' }, 0).
  fromTo('.gui .ui-border', duration, {
    height: 0 },
  {
    height: '80vh',
    ease: easeOutElastic,
    onComplete() {
      resetStyle('.gui .ui-border');
    } },
  0).

  from('.ui-inner-border', duration / 4, {
    autoAlpha: 0,
    ease: easeOutElastic },
  0).

  fromTo('.ui-fx .ui-inner-border', duration, {
    height: 0 },
  {
    height: '80%',
    ease: easeOutElastic },
  0).

  fromTo(['#header .ui-inner-border.t', '#header .ui-inner-border.b'], duration, {
    width: 0,
    borderWidth: '0px' },
  {
    width: '40vw',
    borderWidth: '3px',
    ease: easeOutElastic },
  0).

  from(curvedBorder, duration, {
    y: -40 },
  0.4)

  // Caps, Borders, Details
  .to('.gui .border-vert .dot', duration / 2, {
    autoAlpha: 1,
    ease: RoughEase.ease.config({
      points: 200,
      strength: 4,
      clamp: true,
      randomize: true }) },

  duration * 0.66).
  fromTo(['.gui .cap'], duration, {
    opacity: 0 },
  {
    opacity: 1,
    ease: RoughEase.ease.config({
      points: 200,
      strength: 4,
      clamp: true,
      randomize: true }) },

  duration * 0.66).
  fromTo(['.gui .batt'], duration, {
    opacity: 0 },
  {
    opacity: 1,
    ease: RoughEase.ease.config({
      points: 100,
      strength: 3,
      clamp: true,
      randomize: true }) },

  duration * 0.66).
  fromTo(['#header .ui-corner'], duration, {
    opacity: 0 },
  {
    opacity: 1,
    ease: RoughEase.ease.config({
      points: 100,
      strength: 2,
      clamp: true,
      randomize: true }) },

  duration * 0.66)

  // Left and Right, Top, Bottom Batts in Header
  .from(['.ui-batts.l .batt', '.ui-batts.r .batt'], duration / 2, {
    width: 0,
    ease: easeOutElastic },
  duration / 2).
  from(['.ui-batts.t .batt', '.ui-batts.b .batt'], duration / 2, {
    height: 0,
    ease: easeOutElastic },
  duration / 2)

  // Circles
  .staggerFromTo('.gui .ui-circles.l .circle', duration / 2, {
    visibility: 'hidden',
    ease: Power4.easeInOut },
  {
    visibility: 'visible',
    ease: Power4.easeOut,
    onComplete() {
      resetStyle('.gui .ui-circles.l .circle');
    } },
  0.1, duration * 0.66).
  staggerFromTo('.gui .ui-circles.r .circle', duration / 2, {
    visibility: 'hidden',
    ease: Power4.easeInOut },
  {
    visibility: 'visible',
    ease: Power4.easeOut,
    onComplete() {
      resetStyle('.gui .ui-circles.r .circle');
    } },
  0.1, duration * 0.66)

  // UI-Text 
  .add('textBox', duration * 0.66).
  staggerFromTo(textBox, 5, {
    height: 0 },
  {
    height: 100,
    repeat: -1,
    repeatDelay: 3,
    yoyo: true,
    ease: Sine.easeOut },
  4, 'textBox').
  fromTo([textBoxTitleL, textBoxTitleR], 1, {
    autoAlpha: 0 },
  {
    autoAlpha: 1,
    ease: Sine.easeOut },
  'textBox').
  to(textBoxTitleL, 2, {
    text: 'Status: Ready',
    repeat: -1,
    repeatDelay: 5,
    yoyo: true,
    ease: Sine.easeOut },
  'textBox').
  to(textBoxTitleR, 2.4, {
    text: 'LETS GO',
    repeat: -1,
    repeatDelay: 5,
    yoyo: true,
    ease: Sine.easeOut },
  'textBox')

  //button
  .from(button, 0.3, {
    autoAlpha: 0 },
  2).
  from(button, 1, {
    scale: 1.5,
    autoAlpha: 0,
    ease: easeOutElastic,
    onComplete() {
      button.style = null;
    } },
  2);
}


function resetStyle(selector, callback) {
  if (typeof selector === 'string') {
    Array.from(document.querySelectorAll(selector)).forEach((c, i) => c.style = null);
  } else
  {
    if (callback) {
      Array.from(selector).forEach(callback);
    } else
    {
      Array.from(selector).forEach((c, i) => c.style = null);
    }

  }
}

function colorHex(color) {
  return parseInt('0x' + color.replace(/#/g, '').toUpperCase());
}

function spaceStars(scene, farPlane = 1000) {
  const geometry = new THREE.SphereGeometry(1, 1, 1);
  const material = new THREE.PointsMaterial({
    size: 5,
    opacity: 1,
    color: color.teal,
    transparent: true });


  let starQty = 1000;
  for (let i = 0; i < starQty; i++) {
    const starVertex = new THREE.Vector3();
    starVertex.x = Math.random() * farPlane - farPlane * 0.5;
    starVertex.y = Math.random() * farPlane - farPlane * 0.5;
    starVertex.z = Math.random() * farPlane - farPlane * 0.5;
    geometry.vertices.push(starVertex);
  }

  const stars = new THREE.Points(geometry, material);

  scene.add(stars);

  return stars;
}

function spaceWorld(targetElement) {

  let HEIGHT = window.innerHeight;
  let WIDTH = window.innerWidth;
  let aspectRatio = WIDTH / HEIGHT;
  let fieldOfView = 75;
  let nearPlane = 1;
  let farPlane = 5000;
  let mouseX = 0;
  let mouseY = 0;

  const scene = new THREE.Scene({ antialias: true });
  const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
  const renderer = webGLSupport() ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();

  // Add objects to the scene
  // -------------------------------------------------------

  const stars = spaceStars(scene, farPlane);

  init();

  return {
    stars };


  // Initialize and Animate, Functions Hoisted
  // --------------------------------------

  function render(t) {
    stars.rotation.x += (mouseX - stars.rotation.x) * 0.000015;
    stars.rotation.y += (mouseY - stars.rotation.y) * 0.000015;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  function init() {
    targetElement.appendChild(renderer.domElement);

    camera.position.z = 1070 * 3.5;

    renderer.setClearColor(new THREE.Color(colorHex(color.dark)), 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove, false);

    animate();
  }

  function animate(t) {
    requestAnimationFrame(animate);
    render(t);
  }

  function webGLSupport() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')));

    } catch (e) {
      return false;
    }
  }

  function onWindowResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.domElement.style.width = w + 'px';
    renderer.domElement.style.height = h + 'px';
  }

  function onMouseMove(e) {
    let windowHalfX = WIDTH / 2;
    let windowHalfY = HEIGHT / 2;
    mouseX = e.clientX - windowHalfX;
    mouseY = e.clientY - windowHalfY;
  }

}

// ---------- S U R E S H chrome morph (GSAP) ----------
// One chrome shape morphs S → U → R → E → S → H, then a light comet paints the full word SURESH.
function sureshTitle() {
  const D = window.SURESH_SHAPES;
  const mount = document.getElementById('sureshMount');
  if (!D || !mount) return;

  const [W, H] = D.vb;
  const cx = W / 2, cy = D.base - D.cap / 2;
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wordPaths = (extra) => D.word.map(d => `<path d="${d}" ${extra}/>`).join('');

  mount.innerHTML = `
  <svg id="sureshSvg" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="sChrome" x1="0" y1="0" x2="1" y2=".8"><stop stop-color="#11141d"/><stop offset=".08" stop-color="#f5fbff"/><stop offset=".16" stop-color="#8297be"/><stop offset=".25" stop-color="#fff"/><stop offset=".42" stop-color="#b5c7ff"/><stop offset=".49" stop-color="#f7fbff"/><stop offset=".51" stop-color="#303842"/><stop offset=".55" stop-color="#d7e3ff"/><stop offset=".72" stop-color="#788dd0"/><stop offset=".89" stop-color="#faffff"/><stop offset="1" stop-color="#384255"/></linearGradient>
      <linearGradient id="sEdge"><stop stop-color="#f4faff"/><stop offset=".3" stop-color="#6a7484"/><stop offset=".5" stop-color="#fff"/><stop offset=".8" stop-color="#a2b6f8"/><stop offset="1" stop-color="#fff"/></linearGradient>
      <linearGradient id="sSheen" gradientUnits="userSpaceOnUse" gradientTransform="skewX(-20)" x1="-500" y1="0" x2="-100" y2="0"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <filter id="sGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7"/></filter>
      <filter id="sBevel" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/><feSpecularLighting in="blur" surfaceScale="12" specularConstant="1.3" specularExponent="32" lighting-color="#ffffff" result="light"><fePointLight x="${W * 0.35}" y="40" z="200"/></feSpecularLighting><feComposite in="light" in2="SourceAlpha" operator="in" result="shine"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="shine"/></feMerge></filter>
      <mask id="sMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect id="sMaskRect" x="0" y="0" width="0" height="${H}" fill="#fff"/></mask>
    </defs>
    <g id="sLetter">
      <path id="sShadow" fill="none" stroke="#637dc7" stroke-width="18" opacity=".18" filter="url(#sGlow)" fill-rule="evenodd"/>
      <path id="sShape" fill="url(#sChrome)" fill-rule="evenodd" stroke="url(#sEdge)" stroke-width="7" stroke-linejoin="round" filter="url(#sBevel)"/>
      <path id="sOutline" fill="none" stroke="#fff" stroke-width="1" opacity=".6"/>
    </g>
    <g mask="url(#sMask)"><g filter="url(#sBevel)">${wordPaths('fill="url(#sChrome)" stroke="url(#sEdge)" stroke-width="5" stroke-linejoin="round"')}</g></g>
    <g id="sSheenG" opacity="0">${wordPaths('fill="url(#sSheen)"')}</g>
    <g id="sComet" opacity="0"><circle r="32" fill="#a3bbff" filter="url(#sGlow)" opacity=".8"/><circle r="5" fill="#fff"/><path d="M-45 0H45M0-45V45" stroke="#fff" stroke-width="1.5"/><path d="M-19-19 19 19M-19 19 19-19" stroke="#c3d4ff"/></g>
    <g id="sStars" fill="#fff"></g>
  </svg>`;

  const $s = id => document.getElementById(id);
  const letterEls = [$s('sShadow'), $s('sShape'), $s('sOutline')];
  const st = D.stages;

  // Interpolate two matching point lists (outer outline + counter) into one even-odd path.
  function draw(a, b, t) {
    let d = '';
    const ring = (A, B) => {
      for (let i = 0; i < A.length; i += 2) {
        d += (i ? 'L' : 'M') + (A[i] + (B[i] - A[i]) * t).toFixed(1) + ' ' + (A[i + 1] + (B[i + 1] - A[i + 1]) * t).toFixed(1);
      }
      d += 'Z';
    };
    ring(a.o, b.o);ring(a.h, b.h);
    letterEls.forEach(p => p.setAttribute('d', d));
  }
  draw(st[0], st[0], 0);

  function startSheen() {
    if (reduced) return;
    TweenMax.set('#sSheenG', { opacity: 1 });
    TweenMax.fromTo('#sSheen', 1.6, { attr: { x1: -500, x2: -100 } }, { attr: { x1: W + 100, x2: W + 500 }, ease: Power2.easeInOut, repeat: -1, repeatDelay: 4.5 });
  }

  // Reduced motion: show the finished word straight away.
  if (reduced) {
    $s('sMaskRect').setAttribute('width', W);
    $s('sLetter').style.display = 'none';
    return;
  }

  const origin = `${cx} ${cy}`;
  const m = { t: 0 };
  TweenMax.set('#sLetter', { autoAlpha: 0, svgOrigin: origin });
  TweenMax.set('#sComet', { x: 0, y: cy });

  const tl = new TimelineMax({ delay: 1.4, onComplete: startSheen });
  tl.fromTo('#sLetter', 1.2, { autoAlpha: 0, scale: 0.72 }, { autoAlpha: 1, scale: 1, ease: Expo.easeOut }, 0);

  for (let i = 1; i < 6; i++) {
    const t = 1.5 + (i - 1) * 1.65, a = st[i - 1], b = st[i];
    tl.fromTo(m, 1.1, { t: 0 }, { t: 1, ease: Power3.easeInOut, onUpdate: () => draw(a, b, m.t) }, t);
    tl.to('#sLetter', 0.5, { rotation: i % 2 ? -3 : 3, ease: Sine.easeInOut, yoyo: true, repeat: 1 }, t);
  }

  // Reveal: the chrome shape shrinks away while a comet paints the full word left → right.
  const end = 10.25, sweep = 3.2;
  tl.to('#sLetter', 0.8, { scale: 0.42, autoAlpha: 0, ease: Power3.easeIn }, end - 0.6);
  tl.to('#sComet', 0.2, { autoAlpha: 1 }, end);
  tl.to('#sMaskRect', sweep, { attr: { width: W }, ease: Linear.easeNone }, end);
  tl.fromTo('#sComet', sweep, { x: 0 }, { x: W, ease: Linear.easeNone }, end);
  tl.to('#sComet', 0.4, { autoAlpha: 0 }, end + sweep - 0.3);

  // Little sparkles as the word completes.
  const starsG = $s('sStars');
  [0.12, 0.38, 0.62, 0.88].forEach((f, i) => {
    const x = W * f, y = D.base - D.cap * (i % 2 ? 0.2 : 0.8);
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    star.setAttribute('d', `M${x - 20} ${y}Q${x} ${y} ${x} ${y - 25}Q${x} ${y} ${x + 20} ${y}Q${x} ${y} ${x} ${y + 25}Q${x} ${y} ${x - 20} ${y}`);
    starsG.appendChild(star);
    TweenMax.set(star, { opacity: 0, svgOrigin: `${x} ${y}` });
    tl.to(star, 0.35, { opacity: 0.9, scale: 1.4, yoyo: true, repeat: 1 }, end + sweep - 0.5 + i * 0.24);
  });
}

new Vue({
  el: "#app",
  mounted() {
    introAnimation.call(this);
    sureshTitle();
    spaceWorld(document.getElementById('starfield'));
  } });