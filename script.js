document.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline();

  tl.fromTo('.video-container',
    { 
      y: '100%',
    },
    { 
      y: 0, 
      duration: 1.2, 
      ease: 'power2.out'
    }
  );
  
  tl.fromTo('.video-container',
    { 
      clipPath: 'polygon(30% 30%, 70% 30%, 70% 70%, 30% 70%)',
    },
    { 
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1, 
      ease: 'power2.in'
    }, '-=0.5'
  );

  tl.add(() => {
    const split = new SplitText('.title', { type: 'lines' });

    gsap.set('.title', { visibility: 'visible' });

    gsap.from(split.lines, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });
  });
  
});