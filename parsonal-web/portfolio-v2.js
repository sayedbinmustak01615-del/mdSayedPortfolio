/**
 * ULTRA MODERN PORTFOLIO JAVASCRIPT
 * Dark Mode + Language Switcher + CV Download + Animations
 */

// ========== GLOBAL VARIABLES ==========
let currentLang = 'bn';
let currentTheme = 'light';

// ========== DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initTypingAnimation();
  initScrollAnimations();
  initImageUpload();
  initScrollTop();
  initHeaderScroll();
  initCVDownload();
  initSmoothScroll();
  
  console.log('%c✨ Portfolio Loaded Successfully', 'color: #10b981; font-size: 18px; font-weight: bold;');
});

// ========== DARK MODE TOGGLE ==========
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  setTheme(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
  });
}

function setTheme(theme) {
  currentTheme = theme;
  const themeToggle = document.getElementById('themeToggle');
  
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// ========== LANGUAGE SWITCHER ==========
function initLanguage() {
  const langToggle = document.getElementById('langToggle');
  const savedLang = localStorage.getItem('language') || 'bn';
  
  setLanguage(savedLang);
  
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'bn' ? 'en' : 'bn';
    setLanguage(currentLang);
    localStorage.setItem('language', currentLang);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  const langToggle = document.getElementById('langToggle');
  
  // Update toggle button
  langToggle.querySelector('.lang-text').textContent = lang === 'bn' ? 'EN' : 'বং';
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update all translatable elements
  const elements = document.querySelectorAll('[data-bn][data-en]');
  elements.forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = el.getAttribute(`data-${lang}`);
    } else {
      el.textContent = el.getAttribute(`data-${lang}`);
    }
  });
  
  // Update typing animation
  updateTypingAnimation();
}

// ========== TYPING ANIMATION ==========
let typingIndex = 0;
let charIndex = 0;
let typingTimeout;

const typingTexts = {
  bn: [
    'হাফেজ 📖',
    'আলেম 🕌',
    'ওয়েব ডেভেলপার 💻',
    'অফিস ম্যানেজার 📊'
  ],
  en: [
    'Hafez 📖',
    'Alim 🕌',
    'Web Developer 💻',
    'Office Manager 📊'
  ]
};

function initTypingAnimation() {
  updateTypingAnimation();
}

function updateTypingAnimation() {
  clearTimeout(typingTimeout);
  typingIndex = 0;
  charIndex = 0;
  typeText();
}

function typeText() {
  const typingElement = document.querySelector('.typing-text');
  const texts = typingTexts[currentLang];
  const currentText = texts[typingIndex];
  
  if (charIndex < currentText.length) {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingTimeout = setTimeout(typeText, 100);
  } else {
    typingTimeout = setTimeout(deleteText, 2000);
  }
}

function deleteText() {
  const typingElement = document.querySelector('.typing-text');
  const texts = typingTexts[currentLang];
  const currentText = texts[typingIndex];
  
  if (charIndex > 0) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingTimeout = setTimeout(deleteText, 50);
  } else {
    typingIndex = (typingIndex + 1) % texts.length;
    typingTimeout = setTimeout(typeText, 500);
  }
}

// ========== IMAGE UPLOAD ==========
function initImageUpload() {
  const profileImg = document.getElementById('profileImg');
  const profileCircle = document.querySelector('.profile-circle');
  
  // Create file input
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);
  
  // Click to upload
 /* profileCircle.addEventListener('click', () => {
    fileInput.click();
  });*/
  
  // Handle file selection
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showNotification('ছবির সাইজ ৫ এমবি এর কম হতে হবে', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        profileImg.src = event.target.result;
        profileImg.style.objectFit = 'cover';
        
        // Save to localStorage
        try {
          localStorage.setItem('profileImage', event.target.result);
          showNotification('ছবি সফলভাবে আপলোড হয়েছে!', 'success');
        } catch (e) {
          console.warn('Could not save image:', e);
        }
      };
      
      reader.readAsDataURL(file);
    }
  });
  
  // Load saved image
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    profileImg.src = savedImage;
    profileImg.style.objectFit = 'cover';
  }
}

// ========== CV DOWNLOAD ==========
function initCVDownload() {
  //const downloadBtn = document.getElementById('downloadCV');
  const downloadBtnHero = document.getElementById('downloadCVHero');
  
  const downloadCV = () => {
    // Create a simple CV as HTML and convert to PDF-like document
    const cvContent = generateCVContent();
    const blob = new Blob([cvContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Saidul_Islam_Raiyan_CV.html';
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('CV ডাউনলোড হচ্ছে...', 'success');
  };
  
  downloadBtn.addEventListener('click', downloadCV);
  downloadBtnHero.addEventListener('click', downloadCV);
}

function generateCVContent() {
  const lang = currentLang;
  const title = lang === 'bn' ? 'হাফেজ মোঃ সাইদুল ইসলাম রাইয়ান - সিভি' : 'Hafez Md Saidul Islam Raiyan - CV';
  
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Noto Sans Bengali', Arial, sans-serif; padding: 40px; line-height: 1.8; }
    .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #10b981; }
    h1 { color: #10b981; font-size: 32px; margin-bottom: 10px; }
    .tagline { color: #666; font-style: italic; }
    .section { margin: 30px 0; }
    h2 { color: #10b981; font-size: 24px; margin-bottom: 15px; border-left: 4px solid #10b981; padding-left: 10px; }
    .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 15px 0; }
    .skill-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .skill-item { background: #f0f9ff; padding: 10px; border-radius: 5px; }
    .contact { background: #f0f9ff; padding: 20px; border-radius: 10px; margin-top: 20px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>${lang === 'bn' ? 'হাফেজ মোঃ সাইদুল ইসলাম রাইয়ান' : 'Hafez Md Saidul Islam Raiyan'}</h1>
    <p class="tagline">${lang === 'bn' ? 'হাফেজ | আলেম | ওয়েব ডেভেলপার | অফিস ম্যানেজমেন্ট প্রফেশনাল' : 'Hafez | Alim | Web Developer | Office Management Professional'}</p>
    <p class="tagline">"${lang === 'bn' ? 'ইলম, প্রযুক্তি ও দক্ষতার সমন্বয়ে এগিয়ে চলা' : 'Advancing with knowledge, technology and skills'}"</p>
  </div>

  <div class="section">
    <h2>${lang === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Information'}</h2>
    <div class="info-grid">
      <p><strong>${lang === 'bn' ? 'জন্ম:' : 'Born:'}</strong> ${lang === 'bn' ? '৫ই আগস্ট ২০০৫' : 'August 5, 2005'}</p>
      <p><strong>${lang === 'bn' ? 'ঠিকানা:' : 'Address:'}</strong> ${lang === 'bn' ? 'পশ্চিম গাটিয়া ডেঙ্গা, সাতকানিয়া, চট্টগ্রাম' : 'West Gatia Denga, Satkhira, Chittagong'}</p>
      <p><strong>${lang === 'bn' ? 'ফোন:' : 'Phone:'}</strong> 01850-634779</p>
      <p><strong>${lang === 'bn' ? 'ইমেইল:' : 'Email:'}</strong> sayedbinmustak01615@gmail.com</p>
    </div>
  </div>

  <div class="section">
    <h2>${lang === 'bn' ? 'শিক্ষাগত যোগ্যতা' : 'Educational Qualifications'}</h2>
    <p><strong>${lang === 'bn' ? '• কুরআন হেফজ' : '• Quran Memorization'}</strong> - ${lang === 'bn' ? 'শাহ আজম গরি (রহ.) হেফজখানা' : 'Shah Azam Gari Hifz Khana'}</p>
    <p><strong>${lang === 'bn' ? '• মাধ্যমিক শিক্ষা' : '• Secondary Education'}</strong> - ${lang === 'bn' ? 'ডলুকুল নুরিয়া কাসেমুল উলুম মাদ্রাসা' : 'Dolukul Nuria Kasemul Uloom Madrasa'}</p>
    <p><strong>${lang === 'bn' ? '• আলেম ডিগ্রি' : '• Alim Degree'}</strong> - ${lang === 'bn' ? 'আল জামিয়া আল ইসলামিয়া পটিয়া' : 'Al Jamia Al Islamia Patiya'}</p>
  </div>

  <div class="section">
    <h2>${lang === 'bn' ? 'দক্ষতা' : 'Skills'}</h2>
    <div class="skill-list">
      <div class="skill-item">✓ ${lang === 'bn' ? 'হাফেজে কুরআন' : 'Hafez-e-Quran'}</div>
      <div class="skill-item">✓ ${lang === 'bn' ? 'ইসলামি শিক্ষা' : 'Islamic Education'}</div>
      <div class="skill-item">✓ ${lang === 'bn' ? 'ওয়েব ডেভেলপমেন্ট' : 'Web Development'}</div>
      <div class="skill-item">✓ ${lang === 'bn' ? 'অফিস ম্যানেজমেন্ট' : 'Office Management'}</div>
      <div class="skill-item">✓ ${lang === 'bn' ? 'কম্পিউটার দক্ষতা' : 'Computer Skills'}</div>
      <div class="skill-item">✓ ${lang === 'bn' ? 'যোগাযোগ দক্ষতা' : 'Communication Skills'}</div>
    </div>
  </div>

  <div class="section">
    <h2>${lang === 'bn' ? 'লক্ষ্য ও উদ্দেশ্য' : 'Goals & Objectives'}</h2>
    <p>${lang === 'bn' ? 'আমার মূল লক্ষ্য হলো দ্বীনি ইলমের পাশাপাশি আধুনিক প্রযুক্তির জ্ঞানকে কাজে লাগিয়ে মানুষ ও সমাজের জন্য কল্যাণকর কিছু করা। ইসলামিক জ্ঞান ও প্রযুক্তির সমন্বয়ে সুন্দর ও উপকারী উদ্যোগ গ্রহণ করাই আমার ভবিষ্যৎ পরিকল্পনা।' : 'My main goal is to combine Islamic knowledge with modern technology to benefit people and society. My future plan is to create beautiful and useful initiatives combining Islamic knowledge and technology.'}</p>
  </div>

  <div class="contact">
    <h2>${lang === 'bn' ? 'যোগাযোগ' : 'Contact'}</h2>
    <p>📞 <strong>${lang === 'bn' ? 'মোবাইল:' : 'Mobile:'}</strong> 01850-634779</p>
    <p>📧 <strong>${lang === 'bn' ? 'ইমেইল:' : 'Email:'}</strong> sayedbinmustak01615@gmail.com</p>
    <p>📍 <strong>${lang === 'bn' ? 'ঠিকানা:' : 'Address:'}</strong> ${lang === 'bn' ? 'পশ্চিম গাটিয়া ডেঙ্গা, সাতকানিয়া, চট্টগ্রাম, বাংলাদেশ' : 'West Gatia Denga, Satkhira, Chittagong, Bangladesh'}</p>
  </div>
</body>
</html>
  `;
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Animate progress bars
        if (entry.target.classList.contains('skill-card')) {
          const progressBar = entry.target.querySelector('.progress-bar');
          if (progressBar) {
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
              progressBar.style.width = width;
            }, 100);
          }
        }
      }
    });
  }, observerOptions);
  
  // Observe elements
  const elements = document.querySelectorAll(`
    .about-card,
    .timeline-item,
    .skill-card,
    .info-card,
    .social-link
  `);
  
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// ========== HEADER SCROLL EFFECT ==========
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ========== SCROLL TO TOP ==========
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  const bgColor = type === 'success' ? 
    'linear-gradient(135deg, #10b981, #06b6d4)' : 
    'linear-gradient(135deg, #ef4444, #dc2626)';
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 40px;
    background: ${bgColor};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideInRight 0.4s ease;
    font-weight: 600;
    font-size: 15px;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s ease';
    setTimeout(() => {
      notification.remove();
    }, 400);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========== MOBILE MENU ==========
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
}

// ========== EXPORT UTILITIES ==========
window.portfolioV2 = {
  setTheme,
  setLanguage,
  showNotification,
  version: '2.0.0'
};
