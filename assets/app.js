/**
 * MAISON ALULA | دار العُلا للعطور النادرة
 * Global Application Core: Cart State, Drawer Controller, Bilingual & Currency Engine
 */

(function() {
  'use strict';

  // State
  let currentLang = localStorage.getItem('maison_lang') || 'ar';
  let currentCurrency = localStorage.getItem('maison_currency') || 'SAR';

  // Currency Conversion Rates (Base: SAR)
  const CURRENCY_RATES = {
    SAR: { symbol: 'SAR', rate: 1, symbolAr: 'ر.س' },
    USD: { symbol: '$', rate: 0.267, symbolAr: '$' },
    EUR: { symbol: '€', rate: 0.245, symbolAr: '€' }
  };

  // Translations Dictionary
  const I18N = {
    ar: {
      brandTitle: 'MAISON ALULA',
      brandSubtitle: 'دار العُلا للعطور النادرة والمقتنيات الحسية',
      announcement: 'طقم استكشاف عطري مجاني وختم شمعي نحاسي مع كل طلب — شحن سريع ومجاني',
      navLookbook: 'الرئيسية',
      navBoutique: 'المقتنيات العطرية',
      navAtelier: 'معمل التركيب الحصري',
      navJournal: 'مجلة العُلا',
      navCheckout: 'إتمام الطلب',
      bagTitle: 'سلة المقتنيات',
      bagEmpty: 'سلة المقتنيات فارغة حالياً',
      bagEmptySub: 'تفضل بزيارة البوتيك لاكتشاف إبداعات الدار أو تركيب عطرك الخاص في المعمل',
      subtotal: 'المجموع الفرعي',
      vatIncluded: 'شامل ضريبة القيمة المضافة والشحن الملكي السريع',
      btnCheckout: 'متابعة الدفع وحجز الطرد',
      btnContinue: 'مواصلة التسوق',
      addToBag: 'إضافة للمقتنيات',
      quickView: 'نظرة سريعة',
      addedToast: 'تمت إضافة القطعة بنجاح إلى مقتنياتك',
      cartCountLabel: 'المقتنيات',
      bespokeFormula: 'تركيبة خاصة مصممة في المعمل',
      sar: 'ر.س',
      close: 'إغلاق',
      readEssay: 'قراءة المقال كاملاً'
    },
    en: {
      brandTitle: 'MAISON ALULA',
      brandSubtitle: 'Haute Parfumerie & Bespoke Scent Atelier',
      announcement: 'Complimentary Olfactory Discovery Set & Hand-Stamped Wax Seal with Every Order — Worldwide Courier',
      navLookbook: 'Manifesto',
      navBoutique: 'The Boutique',
      navAtelier: 'Bespoke Atelier',
      navJournal: 'Sensory Journal',
      navCheckout: 'Checkout',
      bagTitle: 'Shopping Bag',
      bagEmpty: 'Your shopping bag is currently empty',
      bagEmptySub: 'Explore our catalog of extraits or compose a bespoke formula in our atelier.',
      subtotal: 'Subtotal',
      vatIncluded: 'Includes luxury packaging, VAT & worldwide courier',
      btnCheckout: 'Proceed to Secure Checkout',
      btnContinue: 'Continue Exploring',
      addToBag: 'Add to Bag',
      quickView: 'Quick View',
      addedToast: 'Added to your bespoke collection',
      cartCountLabel: 'Bag',
      bespokeFormula: 'Bespoke Atelier Formulation',
      sar: 'SAR',
      close: 'Close',
      readEssay: 'Read Full Essay'
    }
  };

  // --- CART MANAGEMENT (LocalStorage) ---
  function getCart() {
    try {
      const data = localStorage.getItem('maison_cart');
      return data ? JSON.parse(data) : [];
    } catch(e) {
      console.error('Error reading cart', e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem('maison_cart', JSON.stringify(cart));
      updateCartUI();
    } catch(e) {
      console.error('Error saving cart', e);
    }
  }

  function addToBag(item) {
    const cart = getCart();
    
    // Check if duplicate standard item
    if (!item.isBespoke) {
      const existingIdx = cart.findIndex(i => i.id === item.id && i.size === item.size);
      if (existingIdx > -1) {
        cart[existingIdx].qty += (item.qty || 1);
      } else {
        cart.push({ ...item, qty: item.qty || 1 });
      }
    } else {
      // Bespoke items are always unique entries
      cart.push({ ...item, qty: item.qty || 1 });
    }

    saveCart(cart);
    showToast(I18N[currentLang].addedToast);
    openBagDrawer();
  }

  function removeFromBag(index) {
    const cart = getCart();
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      saveCart(cart);
    }
  }

  function updateItemQty(index, delta) {
    const cart = getCart();
    if (cart[index]) {
      cart[index].qty += delta;
      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }
      saveCart(cart);
    }
  }

  function formatPrice(amountInSAR) {
    const curr = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES.SAR;
    const converted = amountInSAR * curr.rate;
    
    if (currentCurrency === 'SAR') {
      return `${Math.round(converted).toLocaleString()} ${currentLang === 'ar' ? 'ر.س' : 'SAR'}`;
    } else if (currentCurrency === 'USD') {
      return `$${Math.round(converted).toLocaleString()}`;
    } else {
      return `€${Math.round(converted).toLocaleString()}`;
    }
  }

  // --- UI CONTROLLERS ---
  function openBagDrawer() {
    const drawer = document.getElementById('bagDrawer');
    const overlay = document.getElementById('bagOverlay');
    if (drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderDrawerContent();
    }
  }

  function closeBagDrawer() {
    const drawer = document.getElementById('bagDrawer');
    const overlay = document.getElementById('bagOverlay');
    if (drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function renderDrawerContent() {
    const bodyEl = document.getElementById('bagDrawerBody');
    const subtotalEl = document.getElementById('bagSubtotal');
    if (!bodyEl) return;

    const cart = getCart();
    let subtotal = 0;

    if (cart.length === 0) {
      bodyEl.innerHTML = `
        <div class="bag-empty-state">
          <div class="bag-empty-icon">✧</div>
          <div class="bag-empty-text">${I18N[currentLang].bagEmpty}</div>
          <p style="font-size: 0.85rem; color: var(--ink-faint); margin-bottom: 24px;">${I18N[currentLang].bagEmptySub}</p>
          <a href="collections.html" class="btn-primary" style="padding: 10px 20px; font-size: 0.8rem;">
            ${currentLang === 'ar' ? 'استكشف المجموعة العطرية' : 'Explore Collections'}
          </a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = formatPrice(0);
      return;
    }

    let html = '';
    cart.forEach((item, index) => {
      const itemPrice = item.price * item.qty;
      subtotal += itemPrice;

      const name = currentLang === 'ar' ? (item.name_ar || item.name) : (item.name_en || item.name);
      const sub = currentLang === 'ar' ? (item.subtitle_ar || '') : (item.subtitle_en || '');

      let thumbSvg = '';
      if (item.isBespoke) {
        thumbSvg = generateBottleSvg(item.bottleColor || '#9A5B32', '#C5A059', item.clientName || 'CUSTOM', 'BESPOKE');
      } else {
        thumbSvg = generateBottleSvg(item.svgColor || '#9A5B32', item.svgCap || '#C5A059', item.name_en || 'MAISON', 'FLACON');
      }

      html += `
        <div class="cart-item-row">
          <div class="cart-item-thumb">
            ${thumbSvg}
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${name}</h4>
            ${item.isBespoke ? `<div class="cart-item-badge-bespoke">✧ ${I18N[currentLang].bespokeFormula} (${item.concentration || 'Extrait 35%'})</div>` : ''}
            <div class="cart-item-subtitle">${item.size ? item.size + ' — ' : ''}${sub}</div>
            <div class="cart-item-meta">
              <div class="cart-item-qty">
                <button type="button" onclick="MaisonApp.updateQty(${index}, -1)">−</button>
                <span>${item.qty}</span>
                <button type="button" onclick="MaisonApp.updateQty(${index}, 1)">+</button>
              </div>
              <div class="cart-item-price">${formatPrice(itemPrice)}</div>
            </div>
            <button type="button" class="cart-item-remove" onclick="MaisonApp.removeItem(${index})">
              ${currentLang === 'ar' ? 'حذف من المقتنيات' : 'Remove'}
            </button>
          </div>
        </div>
      `;
    });

    bodyEl.innerHTML = html;
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  }

  function updateCartUI() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    const badges = document.querySelectorAll('.bag-count');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-block' : 'inline-block';
    });

    renderDrawerContent();

    // If on checkout page, notify checkout renderer
    if (window.renderCheckoutItems) {
      window.renderCheckoutItems();
    }
  }

  function showToast(message) {
    let toast = document.getElementById('maisonToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'maisonToast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✧</span> <span>${message}</span>`;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  // --- BILINGUAL & CURRENCY ENGINE ---
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('maison_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update Language Toggle Button Labels
    const langBtns = document.querySelectorAll('.btn-lang-toggle');
    langBtns.forEach(btn => {
      btn.textContent = lang === 'ar' ? 'English (EN)' : 'العربية (AR)';
    });

    // Update dynamic text elements
    applyTranslations();
    updateCartUI();

    // Trigger page-specific re-renders if available
    if (window.onMaisonLanguageChanged) {
      window.onMaisonLanguageChanged(lang);
    }
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'ar' ? 'en' : 'ar');
  }

  function setCurrency(curr) {
    currentCurrency = curr;
    localStorage.setItem('maison_currency', curr);
    const currBtns = document.querySelectorAll('.btn-currency-toggle');
    currBtns.forEach(btn => btn.textContent = curr);
    updateCartUI();
    if (window.onMaisonCurrencyChanged) {
      window.onMaisonCurrencyChanged(curr);
    }
  }

  function cycleCurrency() {
    const currencies = ['SAR', 'USD', 'EUR'];
    const nextIdx = (currencies.indexOf(currentCurrency) + 1) % currencies.length;
    setCurrency(currencies[nextIdx]);
  }

  function applyTranslations() {
    const dict = I18N[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Handle bilingual attributes
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = currentLang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });
  }

  // --- GLOBAL HEADER & FOOTER INJECTOR OR INITIALIZER ---
  function initApp() {
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    // Attach Bag Drawer Close Events
    const closeBtn = document.getElementById('bagCloseBtn');
    const overlay = document.getElementById('bagOverlay');
    if (closeBtn) closeBtn.addEventListener('click', closeBagDrawer);
    if (overlay) overlay.addEventListener('click', closeBagDrawer);

    // Attach Open Bag Drawer buttons
    document.querySelectorAll('.btn-bag-drawer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openBagDrawer();
      });
    });

    // Attach Lang & Currency buttons
    document.querySelectorAll('.btn-lang-toggle').forEach(btn => {
      btn.addEventListener('click', toggleLanguage);
      btn.textContent = currentLang === 'ar' ? 'English (EN)' : 'العربية (AR)';
    });

    document.querySelectorAll('.btn-currency-toggle').forEach(btn => {
      btn.addEventListener('click', cycleCurrency);
      btn.textContent = currentCurrency;
    });

    applyTranslations();
    updateCartUI();
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  // Global namespace
  window.MaisonApp = {
    addToBag,
    removeFromBag,
    updateQty: updateItemQty,
    openBag: openBagDrawer,
    closeBag: closeBagDrawer,
    setLanguage,
    toggleLanguage,
    setCurrency,
    formatPrice,
    getCart,
    getLang: () => currentLang,
    getCurrency: () => currentCurrency,
    I18N: () => I18N[currentLang],
    showToast
  };

})();
