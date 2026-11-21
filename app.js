(() => {
  'use strict';

  const APP_VERSION = '2.1.5';
  const STORAGE_KEY = 'pickupboard_pwa_state_v1';
  const GA_MEASUREMENT_ID = 'G-YZ4YGHVGPW';
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=de.kuczek.pickupboard';

  // Exact 1:1 color & config definitions from Android BoardConfig.kt
  const THEMES = {
    AIRPORT_YELLOW: {
      id: 'AIRPORT_YELLOW',
      slug: 'airport',
      titleKey: 'theme_airport_title',
      descKey: 'theme_airport_desc',
      bg: '#FFD600',
      text: '#000000',
      secondary: '#222222',
      accent: '#000000',
      isChalkboard: false
    },
    OLED_DARK: {
      id: 'OLED_DARK',
      slug: 'oled',
      titleKey: 'theme_oled_title',
      descKey: 'theme_oled_desc',
      bg: '#000000',
      text: '#FFFFFF',
      secondary: '#B0B0B0',
      accent: '#FFD600',
      isChalkboard: false
    },
    DAYLIGHT_WHITE: {
      id: 'DAYLIGHT_WHITE',
      slug: 'daylight',
      titleKey: 'theme_daylight_title',
      descKey: 'theme_daylight_desc',
      bg: '#FFFFFF',
      text: '#000000',
      secondary: '#555555',
      accent: '#000000',
      isChalkboard: false
    },
    NIGHT_MODE: {
      id: 'NIGHT_MODE',
      slug: 'night',
      titleKey: 'theme_night_title',
      descKey: 'theme_night_desc',
      bg: '#0A0A0A',
      text: '#FFB300',
      secondary: '#FFCC80',
      accent: '#FF9800',
      isChalkboard: false
    },
    CHALKBOARD: {
      id: 'CHALKBOARD',
      slug: 'chalkboard',
      titleKey: 'theme_chalkboard_title',
      descKey: 'theme_chalkboard_desc',
      bg: '#1E382B',
      text: '#F7F7F0',
      secondary: '#D4E0D7',
      accent: '#D4A373',
      isChalkboard: true
    }
  };

  const FONTS = {
    ROBOTO_BOLD: {
      id: 'ROBOTO_BOLD',
      titleKey: 'font_standard_bold',
      family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Roboto", "Segoe UI", sans-serif',
      weight: '700'
    },
    HEAVY_BLOCK: {
      id: 'HEAVY_BLOCK',
      titleKey: 'font_heavy_block',
      family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Roboto", "Segoe UI", sans-serif',
      weight: '900'
    },
    MONOSPACE: {
      id: 'MONOSPACE',
      titleKey: 'font_monospace',
      family: 'ui-monospace, "SF Mono", "Roboto Mono", Menlo, Consolas, monospace',
      weight: '700'
    },
    SERIF_BOLD: {
      id: 'SERIF_BOLD',
      titleKey: 'font_serif_bold',
      family: '"New York", Georgia, "Times New Roman", serif',
      weight: '700'
    }
  };

  const LINE_MODES = [
    { id: 'AUTO', slug: 'auto', titleKey: 'line_mode_auto' },
    { id: 'ONE_LINE', slug: '1', titleKey: 'line_mode_one' },
    { id: 'TWO_LINES', slug: '2', titleKey: 'line_mode_two' },
    { id: 'THREE_LINES', slug: '3', titleKey: 'line_mode_three' }
  ];

  const LOGO_TYPES = [
    { id: 'NONE', titleKey: 'logo_none' },
    { id: 'TAXI', titleKey: 'logo_taxi' },
    { id: 'AIRPORT', titleKey: 'logo_airport' },
    { id: 'VIP_STAR', titleKey: 'logo_vip' },
    { id: 'HOTEL', titleKey: 'logo_hotel' }
  ];

  const LOGO_SVGS = {
    TAXI: '<svg class="board-logo-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>',
    AIRPORT: '<svg class="board-logo-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
    VIP_STAR: '<svg class="board-logo-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
    HOTEL: '<svg class="board-logo-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>'
  };

  // Default state
  const DEFAULT_STATE = {
    passengerName: '',
    subDetails: '',
    colorTheme: 'AIRPORT_YELLOW',
    isNightMode: false,
    fontChoice: 'ROBOTO_BOLD',
    lineMode: 'AUTO',
    logoType: 'NONE',
    customLogoDataUrl: null,
    keepScreenAwake: true,
    history: [],
    language: 'auto',
    analyticsEnabled: true
  };

  let state = loadState();
  let isBoardActive = false;
  let isSettingsOpen = false;
  let wakeLockSentinel = null;
  let hintTimeout = null;
  let toastTimeout = null;
  let deferredInstallPrompt = null;
  let lastTouchEndTime = 0;
  let boardOpenedAtMs = null;
  let activeBoardName = '';
  let activeBoardSub = '';

  // Offscreen canvas for exact, ultra-fast text width measurement
  const measureCanvas = document.createElement('canvas');
  const measureCtx = measureCanvas.getContext('2d');

  // DOM Elements
  const el = {
    metaThemeColor: document.getElementById('meta-theme-color'),
    inputView: document.getElementById('input-view'),
    themeBadge: document.getElementById('theme-badge'),
    themeBadgeLabel: document.getElementById('theme-badge-label'),
    inputPassenger: document.getElementById('input-passenger'),
    inputSubDetails: document.getElementById('input-subdetails'),
    btnClearPassenger: document.getElementById('btn-clear-passenger'),
    btnClearSubDetails: document.getElementById('btn-clear-subdetails'),
    mainLineChips: document.getElementById('main-line-chips'),
    btnShowBoard: document.getElementById('btn-show-board'),
    historySection: document.getElementById('history-section'),
    historyList: document.getElementById('history-list'),
    platformCard: document.getElementById('platform-card'),
    platformCardText: document.getElementById('platform-card-text'),
    btnInstallPwa: document.getElementById('btn-install-pwa'),
    linkPlayStoreCard: document.getElementById('link-play-store-card'),
    mainFooterVersion: document.getElementById('main-footer-version'),
    btnOpenSettings: document.getElementById('btn-open-settings'),
    btnShareLinkTop: document.getElementById('btn-share-link-top'),

    // Board overlay
    boardView: document.getElementById('board-view'),
    boardFrame: document.getElementById('board-frame'),
    boardTop: document.getElementById('board-top'),
    boardCenter: document.getElementById('board-center'),
    boardMainText: document.getElementById('board-main-text'),
    boardBottom: document.getElementById('board-bottom'),
    boardHintPill: document.getElementById('board-hint-pill'),

    // Settings sheet
    settingsOverlay: document.getElementById('settings-overlay'),
    btnCloseSettings: document.getElementById('btn-close-settings'),
    toggleWakeLock: document.getElementById('toggle-wakelock'),
    iconWakeLock: document.getElementById('icon-wakelock'),
    descWakeLock: document.getElementById('desc-wakelock'),
    toggleNightMode: document.getElementById('toggle-nightmode'),
    iconNightMode: document.getElementById('icon-nightmode'),
    descNightMode: document.getElementById('desc-nightmode'),
    settingsThemeList: document.getElementById('settings-theme-list'),
    settingsFontChips: document.getElementById('settings-font-chips'),
    settingsLineChips: document.getElementById('settings-line-chips'),
    settingsLogoChips: document.getElementById('settings-logo-chips'),
    inputLogoFile: document.getElementById('input-logo-file'),
    btnUploadLogo: document.getElementById('btn-upload-logo'),
    labelUploadLogo: document.getElementById('label-upload-logo'),
    selectLanguage: document.getElementById('select-language'),
    btnShareMagicLink: document.getElementById('btn-share-magic-link'),
    btnShareApp: document.getElementById('btn-share-app'),
    linkPlayStoreSettings: document.getElementById('link-play-store-settings'),
    toggleAnalytics: document.getElementById('toggle-analytics'),
    iconAnalytics: document.getElementById('icon-analytics'),
    descAnalytics: document.getElementById('desc-analytics'),
    sheetFooterVersion: document.getElementById('sheet-footer-version'),

    toast: document.getElementById('toast')
  };

  /* ========================================================================
     State & Persistence
     ======================================================================== */

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_STATE };
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_STATE,
        ...parsed,
        colorTheme: THEMES[parsed.colorTheme] ? parsed.colorTheme : DEFAULT_STATE.colorTheme,
        fontChoice: FONTS[parsed.fontChoice] ? parsed.fontChoice : DEFAULT_STATE.fontChoice,
        lineMode: LINE_MODES.some((m) => m.id === parsed.lineMode) ? parsed.lineMode : DEFAULT_STATE.lineMode,
        history: Array.isArray(parsed.history) ? parsed.history.slice(0, 5) : []
      };
    } catch {
      return { ...DEFAULT_STATE };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // If custom logo exceeds quota, strip logo and retry
      try {
        const fallback = { ...state, customLogoDataUrl: null };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
      } catch {
        // Ignore storage errors in private browsing
      }
    }
  }

  /* ========================================================================
     Localization (21 Languages synced from Android strings.xml)
     ======================================================================== */

  function resolveLanguageCode() {
    const available = window.PICKUP_I18N || {};
    if (state.language && state.language !== 'auto' && available[state.language]) {
      return state.language;
    }
    const candidates = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || 'en'];
    for (const lang of candidates) {
      const base = String(lang).toLowerCase().split(/[-_]/)[0];
      if (base === 'in' && available.id) return 'id';
      if (available[base]) return base;
    }
    return 'en';
  }

  function t(key) {
    const code = resolveLanguageCode();
    const dict = (window.PICKUP_I18N && window.PICKUP_I18N[code]) || {};
    const en = (window.PICKUP_I18N && window.PICKUP_I18N.en) || {};
    return dict[key] || en[key] || key;
  }

  function applyLocalization() {
    const code = resolveLanguageCode();
    document.documentElement.lang = code;
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    document.title = `${t('app_name')} – PWA`;

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (key) node.textContent = t(key);
    });

    el.inputPassenger.placeholder = t('passenger_placeholder');
    el.inputSubDetails.placeholder = t('subdetails_placeholder');
    el.btnOpenSettings.setAttribute('aria-label', t('cd_settings'));
    el.btnOpenSettings.title = t('cd_settings');
    el.btnShareLinkTop.setAttribute('aria-label', t('btn_share_magic_link'));
    el.btnShareLinkTop.title = t('btn_share_magic_link');
    el.btnClearPassenger.setAttribute('aria-label', t('cd_clear'));
    el.btnClearSubDetails.setAttribute('aria-label', t('cd_clear'));
    el.btnCloseSettings.setAttribute('aria-label', t('btn_close'));

    el.mainFooterVersion.textContent = `${t('app_title')} • Version ${APP_VERSION} (PWA)`;
    el.sheetFooterVersion.textContent = `${t('app_title')} • Version ${APP_VERSION} (PWA)`;

    renderLanguageOptions();
    renderUI();
    updatePlatformCard();
  }

  function renderLanguageOptions() {
    const langs = window.PICKUP_LANGUAGES || [];
    el.selectLanguage.innerHTML = '';

    const autoOpt = document.createElement('option');
    autoOpt.value = 'auto';
    autoOpt.textContent = t('language_auto');
    el.selectLanguage.appendChild(autoOpt);

    langs.forEach((lang) => {
      const opt = document.createElement('option');
      opt.value = lang.code;
      opt.textContent = lang.name;
      el.selectLanguage.appendChild(opt);
    });

    el.selectLanguage.value = state.language || 'auto';
  }

  /* ========================================================================
     1:1 Port of Android AutoSizingText.kt (Binary Search, Zero Mid-Word Break)
     ======================================================================== */

  function getCandidates(words, lineMode) {
    if (!words.length) return [''];
    if (words.length === 1) return [words[0]];

    const oneLine = words.join(' ');
    const mid = Math.floor((words.length + 1) / 2);
    const twoLines = `${words.slice(0, mid).join(' ')}\n${words.slice(mid).join(' ')}`;

    const makeThreeLines = () => {
      if (words.length === 2) return `${words[0]}\n${words[1]}`;
      const chunk = Math.floor((words.length + 2) / 3);
      const l1 = words.slice(0, chunk).join(' ');
      const l2 = words.slice(chunk, chunk * 2).join(' ');
      const l3 = words.slice(chunk * 2).join(' ');
      return [l1, l2, l3].filter(Boolean).join('\n');
    };

    switch (lineMode) {
      case 'ONE_LINE':
        return [oneLine];
      case 'TWO_LINES':
        return [twoLines];
      case 'THREE_LINES':
        return [makeThreeLines()];
      case 'AUTO':
      default: {
        const list = [oneLine, twoLines];
        if (words.length >= 3) list.push(makeThreeLines());
        return list;
      }
    }
  }

  function findMaxFontSizePx(candidate, maxWidth, maxHeight, fontFamily, fontWeight) {
    const lines = candidate.split('\n');
    const lineHeightFactor = 1.08;
    // Slight safety margin so wide glyphs / italics never clip at container edges
    const safeWidth = maxWidth * 0.96;
    const safeHeight = maxHeight * 0.94;

    let low = 14;
    let high = Math.min(Math.max(safeHeight, 32), 480);
    let bestFit = low;

    for (let i = 0; i < 12; i++) {
      const mid = (low + high) / 2;
      measureCtx.font = `${fontWeight} ${mid}px ${fontFamily}`;

      let fitsWidth = true;
      for (const line of lines) {
        const metrics = measureCtx.measureText(line);
        const measuredWidth = Math.max(
          metrics.width,
          (metrics.actualBoundingBoxLeft || 0) + (metrics.actualBoundingBoxRight || 0)
        );
        if (measuredWidth > safeWidth) {
          fitsWidth = false;
          break;
        }
      }

      const totalHeight = lines.length * mid * lineHeightFactor;
      const fitsHeight = totalHeight <= safeHeight;

      if (fitsWidth && fitsHeight) {
        bestFit = mid;
        low = mid + 0.5;
      } else {
        high = mid - 0.5;
      }
    }

    return bestFit;
  }

  function fitAutoSizingText(targetEl, containerEl, rawText, fontFamily, fontWeight, lineMode) {
    const clean = (rawText || '').trim();
    if (!clean) {
      targetEl.textContent = '';
      return;
    }

    const rect = containerEl.getBoundingClientRect();
    const maxWidth = rect.width;
    const maxHeight = rect.height;
    if (maxWidth <= 0 || maxHeight <= 0) return;

    const words = clean.split(/\s+/).filter(Boolean);
    const candidates = getCandidates(words, lineMode);

    let winningText = candidates[0];
    let bestSize = 14;

    for (const cand of candidates) {
      const size = findMaxFontSizePx(cand, maxWidth, maxHeight, fontFamily, fontWeight);
      if (size > bestSize) {
        bestSize = size;
        winningText = cand;
      }
    }

    targetEl.textContent = winningText;
    targetEl.style.fontFamily = fontFamily;
    targetEl.style.fontWeight = fontWeight;
    targetEl.style.fontSize = `${Math.max(14, bestSize)}px`;

    // Final DOM overflow guard (protects against platform font kerning variances)
    let guard = 0;
    let currentSize = Math.max(14, bestSize);
    while (
      guard < 8 &&
      currentSize > 14 &&
      (targetEl.scrollWidth > maxWidth || targetEl.scrollHeight > maxHeight)
    ) {
      currentSize *= 0.94;
      targetEl.style.fontSize = `${currentSize}px`;
      guard++;
    }
  }

  /* ========================================================================
     UI Rendering
     ======================================================================== */

  function updateMetaThemeColor() {
    if (isBoardActive) {
      el.metaThemeColor.setAttribute('content', THEMES[state.colorTheme].bg);
    } else {
      el.metaThemeColor.setAttribute('content', state.isNightMode ? '#1A1B1F' : '#FFD600');
    }
  }

  function renderUI() {
    document.body.classList.toggle('dark-mode', state.isNightMode);
    updateMetaThemeColor();

    // Sync inputs
    if (el.inputPassenger.value !== state.passengerName) {
      el.inputPassenger.value = state.passengerName;
    }
    if (el.inputSubDetails.value !== state.subDetails) {
      el.inputSubDetails.value = state.subDetails;
    }
    el.btnClearPassenger.classList.toggle('hidden', !state.passengerName);
    el.btnClearSubDetails.classList.toggle('hidden', !state.subDetails);

    // Active Theme Badge
    const theme = THEMES[state.colorTheme];
    el.themeBadge.style.backgroundColor = theme.bg;
    el.themeBadge.style.color = theme.text;
    const themeLabelFormat = t('theme_label_format');
    el.themeBadgeLabel.textContent = themeLabelFormat.replace('%1$s', t(theme.titleKey));
    const badgeAction = el.themeBadge.querySelector('.theme-badge-action');
    if (badgeAction) badgeAction.style.color = theme.secondary;

    // Main Line Chips
    renderLineChips(el.mainLineChips);

    // History Chips
    renderHistory();

    // Settings Sheet controls
    el.toggleWakeLock.checked = state.keepScreenAwake;
    el.iconWakeLock.classList.toggle('active', state.keepScreenAwake);
    el.descWakeLock.textContent = state.keepScreenAwake ? t('wake_lock_on') : t('wake_lock_off');

    el.toggleNightMode.checked = state.isNightMode;
    el.iconNightMode.classList.toggle('active', state.isNightMode);
    el.descNightMode.textContent = state.isNightMode ? t('night_mode_on') : t('night_mode_off');

    const analyticsOn = state.analyticsEnabled !== false;
    el.toggleAnalytics.checked = analyticsOn;
    el.iconAnalytics.classList.toggle('active', analyticsOn);
    el.descAnalytics.textContent = analyticsOn ? t('analytics_consent_on') : t('analytics_consent_off');

    renderThemeList();
    renderFontChips();
    renderLineChips(el.settingsLineChips);
    renderLogoChips();

    el.labelUploadLogo.textContent =
      state.logoType === 'CUSTOM_GALLERY' && state.customLogoDataUrl
        ? t('btn_custom_logo_change')
        : t('btn_custom_logo_upload');

    if (isBoardActive) {
      renderBoardContent();
    }
  }

  function renderLineChips(container) {
    container.innerHTML = '';
    LINE_MODES.forEach((mode) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `chip${state.lineMode === mode.id ? ' selected' : ''}`;
      btn.textContent = t(mode.titleKey);
      btn.addEventListener('click', () => {
        state.lineMode = mode.id;
        saveState();
        renderUI();
      });
      container.appendChild(btn);
    });
  }

  function renderThemeList() {
    el.settingsThemeList.innerHTML = '';
    Object.values(THEMES).forEach((theme) => {
      const selected = state.colorTheme === theme.id;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `theme-item${selected ? ' selected' : ''}`;
      btn.innerHTML = `
        <span class="theme-item-left">
          <span class="theme-swatch" style="background:${theme.bg};color:${theme.text};">Aa</span>
          <span>
            <div class="theme-item-title">${escapeHtml(t(theme.titleKey))}</div>
            <div class="theme-item-desc">${escapeHtml(t(theme.descKey))}</div>
          </span>
        </span>
        ${selected ? '<svg class="theme-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>' : ''}
      `;
      btn.addEventListener('click', () => {
        state.colorTheme = theme.id;
        saveState();
        trackEvent('theme_selected', { color_theme: theme.id });
        renderUI();
      });
      el.settingsThemeList.appendChild(btn);
    });
  }

  function renderFontChips() {
    el.settingsFontChips.innerHTML = '';
    Object.values(FONTS).forEach((font) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `chip${state.fontChoice === font.id ? ' selected' : ''}`;
      btn.textContent = t(font.titleKey);
      btn.style.fontFamily = font.family;
      btn.style.fontWeight = font.weight;
      btn.addEventListener('click', () => {
        state.fontChoice = font.id;
        saveState();
        renderUI();
      });
      el.settingsFontChips.appendChild(btn);
    });
  }

  function renderLogoChips() {
    el.settingsLogoChips.innerHTML = '';
    LOGO_TYPES.forEach((logo) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `chip${state.logoType === logo.id ? ' selected' : ''}`;
      btn.textContent = t(logo.titleKey);
      btn.addEventListener('click', () => {
        state.logoType = logo.id;
        saveState();
        renderUI();
      });
      el.settingsLogoChips.appendChild(btn);
    });
  }

  function renderHistory() {
    if (!state.history.length) {
      el.historySection.classList.add('hidden');
      el.historyList.innerHTML = '';
      return;
    }

    el.historySection.classList.remove('hidden');
    el.historyList.innerHTML = '';

    state.history.forEach((entry) => {
      const parts = entry.split('|||');
      const name = parts[0] || '';
      const sub = parts[1] || '';
      const label = sub ? `${name} • ${sub}` : name;

      const wrap = document.createElement('div');
      wrap.className = 'history-chip';

      const mainBtn = document.createElement('button');
      mainBtn.type = 'button';
      mainBtn.className = 'history-chip-main';
      mainBtn.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
        <span class="history-chip-text">${escapeHtml(label)}</span>
      `;
      mainBtn.addEventListener('click', () => {
        state.passengerName = name;
        state.subDetails = sub;
        saveState();
        renderUI();
      });

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'history-chip-del';
      delBtn.setAttribute('aria-label', t('cd_clear'));
      delBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
      delBtn.addEventListener('click', () => {
        state.history = state.history.filter((item) => item !== entry);
        saveState();
        renderUI();
      });

      wrap.appendChild(mainBtn);
      wrap.appendChild(delBtn);
      el.historyList.appendChild(wrap);
    });
  }

  /* ========================================================================
     Fullscreen Board Logic
     ======================================================================== */

  function saveToHistory(name, sub) {
    const safeName = name.replace(/\|\|\||;;;/g, ' ').trim();
    const safeSub = sub.replace(/\|\|\||;;;/g, ' ').trim();
    if (!safeName) return;

    const filtered = state.history.filter((item) => item.split('|||')[0] !== safeName);
    const encoded = safeSub ? `${safeName}|||${safeSub}` : safeName;
    state.history = [encoded, ...filtered].slice(0, 5);
  }

  function renderBoardContent() {
    const theme = THEMES[state.colorTheme];
    const font = FONTS[state.fontChoice];

    const name = state.passengerName.trim();
    const sub = state.subDetails.trim();
    const isDemoPreview = !name && !sub;

    const effectiveMainText = name || sub || t('demo_passenger_name');
    const effectiveSubDetails = name ? sub : '';

    const hasCustomLogo = state.logoType === 'CUSTOM_GALLERY' && !!state.customLogoDataUrl;
    const hasBuiltInLogo = state.logoType !== 'NONE' && state.logoType !== 'CUSTOM_GALLERY' && !!LOGO_SVGS[state.logoType];
    const hasAnyLogo = hasCustomLogo || hasBuiltInLogo;

    const bottomText = isDemoPreview
      ? t('demo_board_hint')
      : (hasAnyLogo && effectiveSubDetails ? effectiveSubDetails : '');

    // Theme surface
    el.boardView.style.backgroundColor = theme.bg;
    el.boardView.classList.toggle('chalkboard', theme.isChalkboard);

    // Top Header
    el.boardTop.className = 'board-top';
    el.boardTop.innerHTML = '';
    el.boardTop.style.color = theme.accent;

    let topSubEl = null;
    if (hasCustomLogo) {
      el.boardTop.classList.add('has-custom-logo');
      const img = document.createElement('img');
      img.className = 'board-custom-logo';
      img.src = state.customLogoDataUrl;
      img.alt = t('logo_custom');
      el.boardTop.appendChild(img);
    } else if (hasBuiltInLogo) {
      el.boardTop.classList.add('has-icon');
      el.boardTop.innerHTML = LOGO_SVGS[state.logoType];
    } else if (effectiveSubDetails) {
      el.boardTop.classList.add('has-sub');
      topSubEl = document.createElement('div');
      topSubEl.className = 'auto-text';
      topSubEl.style.color = theme.secondary;
      el.boardTop.appendChild(topSubEl);
    }

    // Bottom Footer
    el.boardBottom.className = 'board-bottom';
    el.boardBottom.innerHTML = '';
    let bottomTextEl = null;
    if (bottomText) {
      el.boardBottom.classList.add('has-text');
      bottomTextEl = document.createElement('div');
      bottomTextEl.className = 'auto-text';
      bottomTextEl.style.color = theme.secondary;
      el.boardBottom.appendChild(bottomTextEl);
    }

    // Main center text color
    el.boardMainText.style.color = theme.text;

    // Measure & fit on next animation frame after layout settles
    requestAnimationFrame(() => {
      if (!isBoardActive) return;
      if (topSubEl) {
        fitAutoSizingText(topSubEl, el.boardTop, effectiveSubDetails, font.family, '600', 'ONE_LINE');
      }
      fitAutoSizingText(el.boardMainText, el.boardCenter, effectiveMainText, font.family, font.weight, state.lineMode);
      if (bottomTextEl) {
        fitAutoSizingText(bottomTextEl, el.boardBottom, bottomText, font.family, '600', 'ONE_LINE');
      }
    });

    return { isDemoPreview };
  }

  function openBoard(fromPopstate = false, viaMagicLink = false) {
    if (isSettingsOpen) closeSettings(true);

    const name = state.passengerName.trim();
    const sub = state.subDetails.trim();
    if (name) {
      saveToHistory(name, sub);
      saveState();
      renderHistory();
    }

    const cleanName = name;
    const cleanSub = sub;
    const isDemoPreview = !cleanName && !cleanSub;
    const wordCount = cleanName ? cleanName.split(/\s+/).filter(Boolean).length : 0;

    activeBoardName = cleanName;
    activeBoardSub = cleanSub;
    boardOpenedAtMs = Date.now();

    trackEvent('board_shown', {
      color_theme: state.colorTheme,
      line_mode: state.lineMode,
      font_choice: state.fontChoice,
      logo_type: state.logoType,
      night_mode: state.isNightMode ? 'on' : 'off',
      has_sub_details: cleanSub ? 'true' : 'false',
      word_count: wordCount,
      is_demo_preview: isDemoPreview ? 'true' : 'false',
      main_text_type: classifyMainTextType(cleanName, isDemoPreview),
      main_script: isDemoPreview ? 'none' : classifyScript(cleanName || cleanSub),
      main_length_bucket: classifyLengthBucket(cleanName),
      sub_text_type: classifySubTextType(cleanSub),
      sub_length_bucket: classifyLengthBucket(cleanSub),
      display_mode: isStandalonePwa() ? 'standalone' : 'browser',
      via_magic_link: viaMagicLink ? 'true' : 'false'
    });
    trackScreenView('BoardScreen');

    // Dismiss mobile virtual keyboard
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }

    isBoardActive = true;
    document.body.classList.add('board-open');
    el.boardView.classList.remove('hidden');
    updateMetaThemeColor();

    if (!fromPopstate) {
      try {
        history.pushState({ pickupBoard: 'board' }, '');
      } catch {
        // Ignore history restrictions
      }
    }

    renderBoardContent();

    // Request Screen Wake Lock (keeps iPhone/iPad/Android screen on)
    if (state.keepScreenAwake) {
      acquireWakeLock();
    }

    // Request native fullscreen where supported (Android Chrome / Desktop)
    requestBrowserFullscreen();

    // Show temporary "Double-tap to close" pill unless in demo preview (where bottom text instructs double-tap)
    clearTimeout(hintTimeout);
    if (!isDemoPreview) {
      el.boardHintPill.classList.add('visible');
      hintTimeout = setTimeout(() => {
        el.boardHintPill.classList.remove('visible');
      }, 2800);
    } else {
      el.boardHintPill.classList.remove('visible');
    }
  }

  function flushBoardClosed(closeReason) {
    if (boardOpenedAtMs === null) return;
    const durationSeconds = Math.max(0, Math.floor((Date.now() - boardOpenedAtMs) / 1000));
    boardOpenedAtMs = null;

    const cleanName = activeBoardName.trim();
    const cleanSub = activeBoardSub.trim();
    const isDemoPreview = !cleanName && !cleanSub;

    trackEvent('board_closed', {
      duration_seconds: durationSeconds,
      duration_bucket: classifyDurationBucket(durationSeconds),
      close_reason: closeReason,
      is_demo_preview: isDemoPreview ? 'true' : 'false',
      color_theme: state.colorTheme,
      line_mode: state.lineMode,
      has_sub_details: cleanSub ? 'true' : 'false',
      main_text_type: classifyMainTextType(cleanName, isDemoPreview),
      sub_text_type: classifySubTextType(cleanSub)
    });
  }

  function closeBoard(fromPopstate = false) {
    if (!isBoardActive) return;
    flushBoardClosed('user_close');
    isBoardActive = false;
    clearTimeout(hintTimeout);

    el.boardHintPill.classList.remove('visible');
    el.boardView.classList.add('hidden');
    document.body.classList.remove('board-open');
    updateMetaThemeColor();

    releaseWakeLock();
    exitBrowserFullscreen();
    trackScreenView('InputScreen');

    if (!fromPopstate && history.state && history.state.pickupBoard === 'board') {
      try {
        history.back();
      } catch {
        // Ignore
      }
    }
  }

  /* ========================================================================
     Wake Lock & Fullscreen APIs
     ======================================================================== */

  async function acquireWakeLock() {
    if (!('wakeLock' in navigator)) return;
    try {
      if (wakeLockSentinel) return;
      wakeLockSentinel = await navigator.wakeLock.request('screen');
      wakeLockSentinel.addEventListener('release', () => {
        wakeLockSentinel = null;
      });
    } catch {
      // Silently ignore if low-battery mode or platform restricts wake lock
    }
  }

  async function releaseWakeLock() {
    if (!wakeLockSentinel) return;
    try {
      await wakeLockSentinel.release();
    } catch {
      // Ignore
    } finally {
      wakeLockSentinel = null;
    }
  }

  function requestBrowserFullscreen() {
    const docEl = document.documentElement;
    const req = docEl.requestFullscreen || docEl.webkitRequestFullscreen;
    if (typeof req === 'function' && !document.fullscreenElement && !document.webkitFullscreenElement) {
      try {
        const res = req.call(docEl);
        if (res && typeof res.catch === 'function') res.catch(() => {});
      } catch {
        // iOS Safari does not support Fullscreen API on iPhone; standalone PWA already runs fullscreen
      }
    }
  }

  function exitBrowserFullscreen() {
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (typeof exit === 'function' && (document.fullscreenElement || document.webkitFullscreenElement)) {
      try {
        const res = exit.call(document);
        if (res && typeof res.catch === 'function') res.catch(() => {});
      } catch {
        // Ignore
      }
    }
  }

  /* ========================================================================
     Settings Bottom Sheet
     ======================================================================== */

  function openSettings() {
    isSettingsOpen = true;
    el.settingsOverlay.classList.add('open');
    el.settingsOverlay.setAttribute('aria-hidden', 'false');
    trackScreenView('SettingsSheet');
    try {
      history.pushState({ pickupBoard: 'settings' }, '');
    } catch {
      // Ignore
    }
  }

  function closeSettings(fromPopstate = false) {
    if (!isSettingsOpen) return;
    isSettingsOpen = false;
    el.settingsOverlay.classList.remove('open');
    el.settingsOverlay.setAttribute('aria-hidden', 'true');
    if (!fromPopstate && history.state && history.state.pickupBoard === 'settings') {
      try {
        history.back();
      } catch {
        // Ignore
      }
    }
  }

  /* ========================================================================
     Custom Company Logo Upload (Canvas downscaled to max 512px)
     ======================================================================== */

  function handleLogoFileUpload(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 512;
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        if (w > maxDim || h > maxDim) {
          const scale = Math.min(maxDim / w, maxDim / h);
          w = Math.max(1, Math.round(w * scale));
          h = Math.max(1, Math.round(h * scale));
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/png');
        state.customLogoDataUrl = dataUrl;
        state.logoType = 'CUSTOM_GALLERY';
        saveState();
        renderUI();
        showToast(t('logo_saved'));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  /* ========================================================================
     Magic Board Links & Sharing
     ======================================================================== */

  function buildMagicBoardUrl() {
    const url = new URL(window.location.href.split('?')[0]);
    const name = state.passengerName.trim() || t('demo_passenger_name');
    const sub = state.subDetails.trim();
    url.searchParams.set('name', name);
    if (sub) url.searchParams.set('sub', sub);
    if (state.colorTheme !== 'AIRPORT_YELLOW') {
      url.searchParams.set('theme', THEMES[state.colorTheme].slug);
    }
    const lineObj = LINE_MODES.find((m) => m.id === state.lineMode);
    if (lineObj && lineObj.slug !== 'auto') {
      url.searchParams.set('lines', lineObj.slug);
    }
    url.searchParams.set('show', '1');
    return url.toString();
  }

  async function shareTextOrCopy(title, text, url, copiedToast) {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }
    const payload = url ? `${text ? text + ' ' : ''}${url}` : text;
    try {
      await navigator.clipboard.writeText(payload);
      showToast(copiedToast);
    } catch {
      window.prompt(title, payload);
    }
  }

  function applyUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    if (!params.toString()) return false;

    const name = params.get('name') || params.get('passenger');
    const sub = params.get('sub') || params.get('flight') || params.get('company');
    const themeSlug = (params.get('theme') || '').toLowerCase();
    const linesSlug = (params.get('lines') || '').toLowerCase();
    const shouldShow = params.get('show') === '1' || params.get('board') === '1';

    if (name !== null) state.passengerName = name;
    if (sub !== null) state.subDetails = sub;

    if (themeSlug) {
      const matchedTheme = Object.values(THEMES).find(
        (item) => item.slug === themeSlug || item.id.toLowerCase() === themeSlug
      );
      if (matchedTheme) state.colorTheme = matchedTheme.id;
    }

    if (linesSlug) {
      const matchedLine = LINE_MODES.find(
        (m) => m.slug === linesSlug || m.id.toLowerCase() === linesSlug
      );
      if (matchedLine) state.lineMode = matchedLine.id;
    }

    saveState();
    return shouldShow;
  }

  /* ========================================================================
     Platform Detection (iOS Safari Install Tip / PWA Install / Android Play)
     ======================================================================== */

  function isStandalonePwa() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.navigator.standalone === true
    );
  }

  function updatePlatformCard() {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);
    const standalone = isStandalonePwa();

    el.btnInstallPwa.classList.add('hidden');
    el.linkPlayStoreCard.classList.add('hidden');

    if (deferredInstallPrompt && !standalone) {
      el.platformCard.classList.remove('hidden');
      el.platformCardText.textContent = isAndroid ? t('android_play_hint') : t('app_name');
      el.btnInstallPwa.classList.remove('hidden');
      if (isAndroid) el.linkPlayStoreCard.classList.remove('hidden');
      return;
    }

    if (isIOS && !standalone) {
      el.platformCard.classList.remove('hidden');
      el.platformCardText.textContent = t('ios_install_hint');
      return;
    }

    if (isAndroid && !standalone) {
      el.platformCard.classList.remove('hidden');
      el.platformCardText.textContent = t('android_play_hint');
      el.linkPlayStoreCard.classList.remove('hidden');
      return;
    }

    el.platformCard.classList.add('hidden');
  }

  /* ========================================================================
     Google Analytics 4 & Consent Mode v2 (G-YZ4YGHVGPW)
     ======================================================================== */

  const TITLE_PREFIX_REGEX = /^(mr|mrs|ms|miss|dr|prof|herr|frau|sir|lady|mme|monsieur|madame|sig|sr|sra)\.?(\s|$)/i;
  const COMPANY_LIKE_REGEX = /\b(gmbh|ag|kg|ltd|llc|inc|corp|co|sarl|sas|spa|bv|nv|hotel|resort|vip|taxi|transfer|shuttle|limousine|limo|chauffeur|group|bank|airlines|airport|tours|travel|events)\b/i;
  const FLIGHT_NUMBER_REGEX = /\b([a-z]{2}|[a-z]\d|\d[a-z])\s*-?\s*\d{1,4}[a-z]?\b/i;
  const TIME_OR_GATE_REGEX = /\b(\d{1,2}:\d{2}|gate\s*[a-z0-9]+|terminal\s*[a-z0-9]+|t[1-5]\b|arrival|ankunft)\b/i;

  function classifyLengthBucket(text) {
    const len = (text || '').length;
    if (len === 0) return '0';
    if (len <= 8) return '1-8';
    if (len <= 15) return '9-15';
    if (len <= 25) return '16-25';
    return '26+';
  }

  function classifyDurationBucket(seconds) {
    if (seconds < 10) return '0-10s';
    if (seconds < 60) return '10-60s';
    if (seconds < 300) return '1-5m';
    if (seconds < 600) return '5-10m';
    if (seconds < 1200) return '10-20m';
    if (seconds < 1800) return '20-30m';
    return '30m+';
  }

  function classifyMainTextType(mainText, isDemoPreview) {
    if (isDemoPreview || !mainText) return 'empty_demo';
    if (TITLE_PREFIX_REGEX.test(mainText)) return 'title_prefix';
    if (COMPANY_LIKE_REGEX.test(mainText)) return 'company_like';
    const words = mainText.split(/\s+/).filter(Boolean).length;
    if (words === 0) return 'empty_demo';
    if (words === 1) return 'single_word';
    if (words === 2) return 'two_words';
    return 'three_plus_words';
  }

  function classifyScript(text) {
    let latin = 0;
    let arabic = 0;
    let cyrillic = 0;
    let cjk = 0;
    let other = 0;
    for (const ch of (text || '')) {
      const code = ch.codePointAt(0);
      if ((code >= 0x0041 && code <= 0x005A) || (code >= 0x0061 && code <= 0x007A) || (code >= 0x00C0 && code <= 0x024F) || (code >= 0x1E00 && code <= 0x1EFF)) {
        latin++;
      } else if ((code >= 0x0600 && code <= 0x06FF) || (code >= 0x0750 && code <= 0x077F) || (code >= 0x08A0 && code <= 0x08FF)) {
        arabic++;
      } else if (code >= 0x0400 && code <= 0x04FF) {
        cyrillic++;
      } else if ((code >= 0x4E00 && code <= 0x9FFF) || (code >= 0x3040 && code <= 0x30FF) || (code >= 0xAC00 && code <= 0xD7AF)) {
        cjk++;
      } else if (/\p{L}/u.test(ch)) {
        other++;
      }
    }
    const maxCount = Math.max(latin, arabic, cyrillic, cjk, other);
    if (maxCount === 0) return 'none';
    if (maxCount === latin) return 'latin';
    if (maxCount === arabic) return 'arabic';
    if (maxCount === cyrillic) return 'cyrillic';
    if (maxCount === cjk) return 'cjk';
    return 'other';
  }

  function classifySubTextType(subText) {
    if (!subText) return 'none';
    if (FLIGHT_NUMBER_REGEX.test(subText)) return 'flight_number';
    if (TIME_OR_GATE_REGEX.test(subText)) return 'time_or_gate';
    return 'text_note';
  }

  function applyWebAnalyticsConsent(enabled) {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = !enabled;
    if (typeof window.gtag === 'function') {
      const consent = enabled ? 'granted' : 'denied';
      window.gtag('consent', 'update', {
        analytics_storage: consent,
        ad_storage: consent,
        ad_user_data: consent,
        ad_personalization: consent
      });
    }
  }

  function trackEvent(eventName, params = {}) {
    if (state.analyticsEnabled === false) return;
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', eventName, params);
      } catch {
        // Ignore analytics errors offline
      }
    }
  }

  function trackScreenView(screenName) {
    trackEvent('screen_view', {
      screen_name: screenName,
      app_name: 'PickupBoard PWA'
    });
  }

  /* ========================================================================
     Helpers & Toast
     ======================================================================== */

  function showToast(message) {
    clearTimeout(toastTimeout);
    el.toast.textContent = message;
    el.toast.classList.add('visible');
    toastTimeout = setTimeout(() => {
      el.toast.classList.remove('visible');
    }, 2400);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ========================================================================
     Event Listeners
     ======================================================================== */

  function bindEvents() {
    el.inputPassenger.addEventListener('input', (e) => {
      state.passengerName = e.target.value;
      el.btnClearPassenger.classList.toggle('hidden', !state.passengerName);
      saveState();
    });

    el.inputSubDetails.addEventListener('input', (e) => {
      state.subDetails = e.target.value;
      el.btnClearSubDetails.classList.toggle('hidden', !state.subDetails);
      saveState();
    });

    el.inputPassenger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        openBoard();
      }
    });

    el.inputSubDetails.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        openBoard();
      }
    });

    el.btnClearPassenger.addEventListener('click', () => {
      state.passengerName = '';
      el.inputPassenger.value = '';
      el.btnClearPassenger.classList.add('hidden');
      el.inputPassenger.focus();
      saveState();
    });

    el.btnClearSubDetails.addEventListener('click', () => {
      state.subDetails = '';
      el.inputSubDetails.value = '';
      el.btnClearSubDetails.classList.add('hidden');
      el.inputSubDetails.focus();
      saveState();
    });

    el.btnShowBoard.addEventListener('click', () => openBoard());
    el.themeBadge.addEventListener('click', () => openSettings());
    el.btnOpenSettings.addEventListener('click', () => openSettings());
    el.btnCloseSettings.addEventListener('click', () => closeSettings());

    el.settingsOverlay.addEventListener('click', (e) => {
      if (e.target === el.settingsOverlay) closeSettings();
    });

    // Double-tap / double-click on board to close
    el.boardView.addEventListener('dblclick', (e) => {
      e.preventDefault();
      closeBoard();
    });

    el.boardView.addEventListener('touchend', (e) => {
      if (e.touches.length > 0) return;
      const now = Date.now();
      if (now - lastTouchEndTime > 40 && now - lastTouchEndTime < 350) {
        e.preventDefault();
        lastTouchEndTime = 0;
        closeBoard();
      } else {
        lastTouchEndTime = now;
      }
    }, { passive: false });

    // Settings toggles
    el.toggleWakeLock.addEventListener('change', (e) => {
      state.keepScreenAwake = e.target.checked;
      saveState();
      renderUI();
    });

    el.toggleNightMode.addEventListener('change', (e) => {
      const enabled = e.target.checked;
      state.isNightMode = enabled;
      // Exact 1:1 Android behavior: turning ON Night Mode switches board theme to NIGHT_MODE
      if (enabled) {
        state.colorTheme = 'NIGHT_MODE';
      }
      saveState();
      trackEvent('night_mode_toggled', { state: enabled ? 'on' : 'off' });
      renderUI();
    });

    el.toggleAnalytics.addEventListener('change', (e) => {
      const enabled = e.target.checked;
      state.analyticsEnabled = enabled;
      saveState();
      applyWebAnalyticsConsent(enabled);
      renderUI();
    });

    el.btnUploadLogo.addEventListener('click', () => {
      el.inputLogoFile.value = '';
      el.inputLogoFile.click();
    });

    el.inputLogoFile.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) handleLogoFileUpload(file);
    });

    el.selectLanguage.addEventListener('change', (e) => {
      state.language = e.target.value;
      saveState();
      applyLocalization();
    });

    const handleShareMagic = () => {
      const magicUrl = buildMagicBoardUrl();
      const name = state.passengerName.trim() || t('demo_passenger_name');
      trackEvent('magic_link_shared', { color_theme: state.colorTheme });
      shareTextOrCopy(
        `${t('app_title')}: ${name}`,
        `${t('app_title')} – ${name}`,
        magicUrl,
        t('magic_link_copied')
      );
    };

    el.btnShareLinkTop.addEventListener('click', handleShareMagic);
    el.btnShareMagicLink.addEventListener('click', handleShareMagic);

    el.btnShareApp.addEventListener('click', () => {
      const webUrl = window.location.href.split('?')[0];
      trackEvent('app_shared', { platform: 'pwa' });
      shareTextOrCopy(
        t('app_name'),
        `${t('app_title')} – ${t('app_subtitle')}`,
        webUrl,
        t('magic_link_copied')
      );
    });

    el.linkPlayStoreCard.addEventListener('click', () => {
      trackEvent('google_play_clicked', { source: 'banner' });
    });

    if (el.linkPlayStoreSettings) {
      el.linkPlayStoreSettings.addEventListener('click', () => {
        trackEvent('google_play_clicked', { source: 'settings' });
      });
    }

    // Install PWA prompt (Chrome / Edge / Android)
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      updatePlatformCard();
    });

    el.btnInstallPwa.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      try {
        await deferredInstallPrompt.userChoice;
      } finally {
        deferredInstallPrompt = null;
        updatePlatformCard();
      }
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      trackEvent('pwa_installed', { platform: 'pwa' });
      updatePlatformCard();
    });

    // Keyboard Escape closes board or settings
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (isBoardActive) closeBoard();
        else if (isSettingsOpen) closeSettings();
      }
    });

    // Browser back button support
    window.addEventListener('popstate', () => {
      if (isBoardActive) {
        closeBoard(true);
      } else if (isSettingsOpen) {
        closeSettings(true);
      }
    });

    // Responsive reflow when rotating iPhone/iPad or resizing window
    const reflowBoard = () => {
      if (isBoardActive) renderBoardContent();
    };
    window.addEventListener('resize', reflowBoard);
    window.addEventListener('orientationchange', () => {
      setTimeout(reflowBoard, 120);
      setTimeout(reflowBoard, 320);
    });

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(reflowBoard);
      ro.observe(el.boardCenter);
    }

    // Track visible fullscreen duration & re-acquire Wake Lock across tab switches
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        if (isBoardActive) {
          flushBoardClosed('background');
        }
      } else if (document.visibilityState === 'visible' && isBoardActive) {
        if (boardOpenedAtMs === null) {
          activeBoardName = state.passengerName.trim();
          activeBoardSub = state.subDetails.trim();
          boardOpenedAtMs = Date.now();
        }
        if (state.keepScreenAwake) {
          acquireWakeLock();
        }
      }
    });

    window.addEventListener('pagehide', () => {
      if (isBoardActive) {
        flushBoardClosed('background');
      }
    });
  }

  /* ========================================================================
     Service Worker Registration (100% Offline Support)
     ======================================================================== */

  function registerServiceWorker() {
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {
          // Non-fatal if browser restricts SW
        });
      });
    }
  }

  /* ========================================================================
     Bootstrap
     ======================================================================== */

  function init() {
    const autoShowBoard = applyUrlParameters();
    bindEvents();
    applyLocalization();
    registerServiceWorker();

    if (autoShowBoard) {
      openBoard(true, true);
    } else {
      trackScreenView('InputScreen');
    }
  }

  init();
})();
