let ytPlayer = null, ytReady = false, shouldPlayMusic = false;
function onYouTubeIframeAPIReady() { ytPlayer = new YT.Player('ytPlayer', { height: '1', width: '1', videoId: 'oIKuyj2GQtY', playerVars: { autoplay: 0, loop: 1, playlist: 'oIKuyj2GQtY', controls: 0, showinfo: 0, modestbranding: 1, rel: 0, enablejsapi: 1, origin: window.location.origin }, events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange } }); }
function onPlayerReady(e) { ytReady = true; ytPlayer.setVolume(50); if (shouldPlayMusic) playYTMusic(); }
function onPlayerStateChange(e) { if (e.data === YT.PlayerState.ENDED) { ytPlayer.seekTo(0); ytPlayer.playVideo(); } }
function playYTMusic() { if (ytReady && ytPlayer) { ytPlayer.playVideo(); document.getElementById('musicPlayer').classList.add('visible'); document.getElementById('musicBtn').classList.remove('paused'); } else { shouldPlayMusic = true; } }
function toggleMusic() { if (!ytPlayer || !ytReady) return; const btn = document.getElementById('musicBtn'); if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) { ytPlayer.pauseVideo(); btn.classList.add('paused'); } else { ytPlayer.playVideo(); btn.classList.remove('paused'); } }
function changeVolume(v) { if (ytPlayer && ytReady) ytPlayer.setVolume(parseInt(v)); }

const AudioCtx = window.AudioContext || window.webkitAudioContext; let audioCtx;
function getAudioCtx() { if (!audioCtx) audioCtx = new AudioCtx(); return audioCtx; }
function playSealBreak() { const c = getAudioCtx(), d = 0.3, bs = c.sampleRate * d, b = c.createBuffer(1, bs, c.sampleRate), dt = b.getChannelData(0); for (let i = 0; i < bs; i++) { const t = i / c.sampleRate; dt[i] = (Math.random() * 2 - 1) * Math.exp(-t * 15) * 0.4; } const n = c.createBufferSource(); n.buffer = b; const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 3000; f.Q.value = 1.5; const g = c.createGain(); g.gain.setValueAtTime(0.5, c.currentTime); g.gain.exponentialRampToValueAtTime(0.01, c.currentTime + d); n.connect(f); f.connect(g); g.connect(c.destination); n.start(c.currentTime); n.stop(c.currentTime + d); const o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(800, c.currentTime); o.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.08); const pg = c.createGain(); pg.gain.setValueAtTime(0.3, c.currentTime); pg.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1); o.connect(pg); pg.connect(c.destination); o.start(c.currentTime); o.stop(c.currentTime + 0.1); }
function playPaperSlide() { const c = getAudioCtx(), d = 0.6, bs = c.sampleRate * d, b = c.createBuffer(1, bs, c.sampleRate), dt = b.getChannelData(0); for (let i = 0; i < bs; i++) { const t = i / c.sampleRate; dt[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t / d) * 0.15; } const s = c.createBufferSource(); s.buffer = b; const f1 = c.createBiquadFilter(); f1.type = 'highpass'; f1.frequency.value = 2000; const f2 = c.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.setValueAtTime(6000, c.currentTime); f2.frequency.linearRampToValueAtTime(3000, c.currentTime + d); const g = c.createGain(); g.gain.value = 0.3; s.connect(f1); f1.connect(f2); f2.connect(g); g.connect(c.destination); s.start(c.currentTime); s.stop(c.currentTime + d); }
function playFlapOpen() { const c = getAudioCtx(), d = 0.4, bs = c.sampleRate * d, b = c.createBuffer(1, bs, c.sampleRate), dt = b.getChannelData(0); for (let i = 0; i < bs; i++) { const t = i / c.sampleRate; dt[i] = (Math.random() * 2 - 1) * Math.exp(-t * 6) * 0.2; } const s = c.createBufferSource(); s.buffer = b; const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.setValueAtTime(1500, c.currentTime); f.frequency.linearRampToValueAtTime(4000, c.currentTime + d); f.Q.value = 0.8; const g = c.createGain(); g.gain.setValueAtTime(0.25, c.currentTime); g.gain.exponentialRampToValueAtTime(0.01, c.currentTime + d); s.connect(f); f.connect(g); g.connect(c.destination); s.start(c.currentTime); s.stop(c.currentTime + d); }
function playRevealChime() { const c = getAudioCtx();[523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((fr, i) => { const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = fr; const g = c.createGain(); const st = c.currentTime + i * 0.12; g.gain.setValueAtTime(0, st); g.gain.linearRampToValueAtTime(0.15, st + 0.05); g.gain.exponentialRampToValueAtTime(0.001, st + 0.8); o.connect(g); g.connect(c.destination); o.start(st); o.stop(st + 0.8); }); }

(function () { const c = document.getElementById('particles'); for (let i = 0; i < 30; i++) { const p = document.createElement('div'); p.classList.add('particle'); p.style.left = Math.random() * 100 + '%'; const s = (Math.random() * 4 + 2) + 'px'; p.style.width = s; p.style.height = s; p.style.animationDuration = (Math.random() * 8 + 6) + 's'; p.style.animationDelay = (Math.random() * 10) + 's'; c.appendChild(p); } })();

// function openEnvelope() { const w = document.getElementById('envelopeWrapper'), ep = document.getElementById('envelopePage'), lp = document.getElementById('landingPage'); if (w.classList.contains('opening')) return; w.classList.add('opening'); playSealBreak(); setTimeout(() => playFlapOpen(), 200); setTimeout(() => playPaperSlide(), 500); setTimeout(() => ep.classList.add('hidden'), 1000); setTimeout(() => playRevealChime(), 1200); setTimeout(() => { lp.classList.add('visible'); ep.style.display = 'none'; document.body.style.overflow = 'auto'; createPetals(); startCountdown(); observeAnimations(); initPersonalizedRSVP(); setTimeout(() => playYTMusic(), 1500); }, 1600); }

function toggleMobileNav() { const h = document.getElementById('hamburger'), mn = document.getElementById('mobileNav'), o = document.getElementById('mobileNavOverlay'); if (mn.classList.contains('active')) { closeMobileNav(); } else { h.classList.add('active'); mn.classList.add('active'); o.classList.add('active'); document.body.classList.add('nav-open'); } }
function closeMobileNav() { document.getElementById('hamburger').classList.remove('active'); document.getElementById('mobileNav').classList.remove('active'); document.getElementById('mobileNavOverlay').classList.remove('active'); document.body.classList.remove('nav-open'); }
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMobileNav(); });

function createPetals() { const c = document.getElementById('petalsContainer'); const colors = ['#A7C7E7', '#C8D8E8', '#D4E2F0', '#B8D0E8', '#E0EBF5', '#d5dce5', '#c5d5e8']; function spawn() { const p = document.createElement('div'); p.classList.add('petal'); const sz = Math.random() * 10 + 6; p.style.width = sz + 'px'; p.style.height = sz + 'px'; p.style.left = Math.random() * 100 + '%'; p.style.background = colors[Math.floor(Math.random() * colors.length)]; p.style.borderRadius = '50% 0 50% 50%'; p.style.animationDuration = (Math.random() * 5 + 6) + 's'; p.style.opacity = Math.random() * 0.4 + 0.2; c.appendChild(p); setTimeout(() => p.remove(), 12000); } for (let i = 0; i < 15; i++)setTimeout(() => spawn(), i * 200); setInterval(spawn, 800); }

function startCountdown() { const t = new Date('2028-02-02T15:00:00'); function u() { const d = t - new Date(); if (d <= 0) { ['days', 'hours', 'minutes', 'seconds'].forEach(id => document.getElementById(id).textContent = '0'); return; } document.getElementById('days').textContent = Math.floor(d / (1e3 * 60 * 60 * 24)); document.getElementById('hours').textContent = String(Math.floor((d % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60))).padStart(2, '0'); document.getElementById('minutes').textContent = String(Math.floor((d % (1e3 * 60 * 60)) / (1e3 * 60))).padStart(2, '0'); document.getElementById('seconds').textContent = String(Math.floor((d % (1e3 * 60)) / 1e3)).padStart(2, '0'); } u(); setInterval(u, 1000); }

//function observeAnimations() { const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.12 }); document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el)); }

function observeAnimations() {
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Small delay to ensure smooth start
                requestAnimationFrame(function() {
                    entry.target.classList.add('section-animate');
                });
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    const sections = document.querySelectorAll(
        '.story-section, .details-section, .dresscode-section, ' +
        '.entourage-section, .prenup-section, .snapshare-section, ' +
        '.countdown-section, .rsvp-section'
    );

    sections.forEach(function(section) {
        sectionObserver.observe(section);
    });

    // Fallback observer for [data-animate] elements
    const elementObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-animate]').forEach(function(el) {
        elementObserver.observe(el);
    });
}

window.addEventListener('scroll', () => { const n = document.getElementById('mainNav'); if (n) n.classList.toggle('scrolled', window.scrollY > 80); });
document.querySelectorAll('.nav-links a').forEach(a => { a.addEventListener('click', function (e) { e.preventDefault(); const t = document.querySelector(this.getAttribute('href')); if (t) t.scrollIntoView({ behavior: 'smooth' }); }); });


// ===== HERO ENVELOPE REVEAL =====
function triggerHeroEnvelopeReveal() {
    var reveal = document.getElementById('heroEnvelopeReveal');
    var heroContent = document.getElementById('heroContent');
    var hero = document.getElementById('hero');

    if (!reveal || !heroContent) return;

    // Start the reveal — CSS animations auto-play
    // After animations complete, reveal the content
    setTimeout(function() {
        heroContent.classList.add('revealed');
        hero.classList.add('envelope-opened');
    }, 800);

    // Remove the overlay completely after all animations done
    setTimeout(function() {
        reveal.classList.add('done');
    }, 2500);
}

// ===== ENCRYPTED ONE-TIME-USE RSVP SYSTEM =====

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjwf00e1l_e6Q06CgMXRZguaLOmAtEbF11EzFLZqZRS6OZlAJkqlweJyquWmTpIhVI/exec';
const SECRET_KEY = 'RS2028WEDDING';

let maxExtraGuests = 0;
let currentGuestCount = 0;
let inviteCode = '';
let prefilledName = '';
let isValidInvite = false;
let inviteHash = '';

// ===== HASH & DECRYPTION =====

function generateHash(data, key) {
    let hash = 0;
    const str = data + '|' + key;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash + char) | 0;
        hash = Math.abs(hash);
    }
    let hash2 = hash;
    for (let i = 0; i < str.length; i++) {
        hash2 = ((hash2 << 3) + hash2 + str.charCodeAt(i)) | 0;
        hash2 = Math.abs(hash2);
    }
    return hash.toString(36) + hash2.toString(36);
}

function generateInviteHash(encodedData) {
    let hash = 0;
    const str = encodedData + '|INVITE_ID|' + SECRET_KEY;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 7) - hash + str.charCodeAt(i)) | 0;
        hash = Math.abs(hash);
    }
    let hash2 = hash;
    for (let i = 0; i < str.length; i++) {
        hash2 = ((hash2 << 4) + hash2 + str.charCodeAt(i) * 3) | 0;
        hash2 = Math.abs(hash2);
    }
    let hash3 = hash2;
    for (let i = 0; i < str.length; i++) {
        hash3 = ((hash3 << 5) + hash3 + str.charCodeAt(i) * 7) | 0;
        hash3 = Math.abs(hash3);
    }
    return 'INV' + hash.toString(36) + hash2.toString(36) + hash3.toString(36);
}

function decryptInviteData(encodedData, verificationHash) {
    try {
        const expectedHash = generateHash(encodedData, SECRET_KEY);
        if (expectedHash !== verificationHash) {
            return null;
        }
        const jsonStr = decodeURIComponent(escape(atob(encodedData)));
        const data = JSON.parse(jsonStr);
        return {
            guest: data.g || '',
            extra: parseInt(data.e) || 0,
            code: data.c || '',
            timestamp: data.t || 0
        };
    } catch (error) {
        return null;
    }
}

// ===== PAGE DISPLAY FUNCTIONS =====

function showCheckingOverlay() {
    var overlay = document.getElementById('checkingOverlay');
    if (overlay) overlay.style.display = 'flex';
}

function hideCheckingOverlay() {
    var overlay = document.getElementById('checkingOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
        setTimeout(function() { overlay.style.display = 'none'; }, 500);
    }
}

function showInvalidInvitePage() {
    isValidInvite = false;
    hideCheckingOverlay();

    var ep = document.getElementById('envelopePage');
    var lp = document.getElementById('landingPage');
    if (ep) ep.style.display = 'none';
    if (lp) lp.style.display = 'none';

    var page = document.getElementById('invalidInvitePage');
    if (page) {
        page.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        createBlockedPageParticles('invalidParticles');
    }
}

function showAlreadyUsedPage(usedBy, usedAt) {
    hideCheckingOverlay();

    // Don't block the entire site — just swap the RSVP card
    // The envelope and landing page should still work

    isValidInvite = true; // Allow viewing the site

    // Store info for when RSVP section loads
    window._rsvpAlreadyUsed = true;
    window._rsvpUsedBy = usedBy || '';
    window._rsvpUsedAt = usedAt || '';

    // Show envelope page normally
    showEnvelopePage();
    createParticles();
}

function showEnvelopePage() {
    hideCheckingOverlay();
    var ep = document.getElementById('envelopePage');
    if (ep) ep.style.display = 'flex';
}

function createBlockedPageParticles(containerId) {
    var container = document.getElementById(containerId);
    if (!container || container.children.length > 0) return;

    for (var i = 0; i < 20; i++) {
        var p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + '%';
        var s = (Math.random() * 3 + 1) + 'px';
        p.style.width = s;
        p.style.height = s;
        p.style.animationDuration = (Math.random() * 8 + 6) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(p);
    }
}

// ===== SERVER CHECK =====

function checkServerStatus(hash) {
    return new Promise(function(resolve) {
        var checkUrl = GOOGLE_SCRIPT_URL + '?check=' + encodeURIComponent(hash);
        var timeout = setTimeout(function() {
            resolve({ status: 'not_used' });
        }, 10000);

        fetch(checkUrl, { method: 'GET', redirect: 'follow' })
            .then(function(response) {
                clearTimeout(timeout);
                return response.text();
            })
            .then(function(text) {
                try {
                    var data = JSON.parse(text);
                    resolve(data);
                } catch (e) {
                    resolve({ status: 'not_used' });
                }
            })
            .catch(function() {
                clearTimeout(timeout);
                resolve({ status: 'not_used' });
            });
    });
}

// ===== VALIDATE INVITE =====

async function validateInvite() {
    var params = new URLSearchParams(window.location.search);
    var encodedData = params.get('d');
    var verificationHash = params.get('v');

    if (!encodedData || !verificationHash) {
        showInvalidInvitePage();
        return false;
    }

    var inviteData = decryptInviteData(encodedData, verificationHash);

    if (!inviteData || !inviteData.guest) {
        showInvalidInvitePage();
        return false;
    }

    prefilledName = inviteData.guest;
    maxExtraGuests = inviteData.extra;
    inviteCode = inviteData.code;
    inviteHash = generateInviteHash(encodedData);

    // Check Google Sheet
    try {
        var result = await checkServerStatus(inviteHash);

        if (result.status === 'already_used') {
            // Don't block entire site — just mark as used
            // The RSVP section will show the already-used card
            showAlreadyUsedPage(
                result.usedBy || prefilledName,
                result.usedAt || ''
            );
            return true; // Still allow site access
        }
    } catch (error) {
        console.warn('Server check error:', error);
    }

    isValidInvite = true;
    showEnvelopePage();
    createParticles();
    return true;
}

// ===== INIT RSVP =====

function initPersonalizedRSVP() {
    if (!isValidInvite) return;

    // Check if RSVP was already used
    if (window._rsvpAlreadyUsed) {
        var formCard = document.getElementById('rsvpCard');
        var usedCard = document.getElementById('rsvpAlreadyUsed');

        if (formCard) formCard.style.display = 'none';
        if (usedCard) {
            usedCard.style.display = 'block';
            document.getElementById('usedByName').textContent = window._rsvpUsedBy || '—';
            document.getElementById('usedAtTime').textContent = window._rsvpUsedAt || '—';

            // Force reflow before adding animation class
            void usedCard.offsetWidth;

            // Trigger animation
            requestAnimationFrame(function() {
                usedCard.classList.add('animate-in');
            });
        }

        var subtitle = document.querySelector('.rsvp-section .section-subtitle');
        if (subtitle && prefilledName) {
            subtitle.textContent = prefilledName + "'s Invitation";
        }

        return;
    }

    // Normal RSVP init
    var nameInput = document.getElementById('fullName');

    if (prefilledName) {
        nameInput.value = prefilledName;
        nameInput.setAttribute('readonly', 'true');
        nameInput.setAttribute('tabindex', '-1');
        nameInput.style.pointerEvents = 'none';
        nameInput.style.userSelect = 'none';

        nameInput.addEventListener('keydown', function(e) { e.preventDefault(); });
        nameInput.addEventListener('paste', function(e) { e.preventDefault(); });
        nameInput.addEventListener('cut', function(e) { e.preventDefault(); });
        nameInput.addEventListener('contextmenu', function(e) { e.preventDefault(); });

        document.getElementById('rsvpGreeting').style.display = 'block';
        document.getElementById('greetingName').textContent = prefilledName;

        var lockBadge = document.getElementById('nameLockBadge');
        if (lockBadge) lockBadge.style.display = 'inline-flex';
    }

    if (maxExtraGuests > 0) {
        document.getElementById('guestAllowance').style.display = 'block';
        document.getElementById('allowedCount').textContent = maxExtraGuests;
        document.getElementById('maxGuestsNote').textContent =
            'You can add up to ' + maxExtraGuests + ' additional guest(s)';
    }

    updateGuestCounter();
}
// ===== ENVELOPE OPEN =====

function openEnvelope() {
    if (!isValidInvite) {
        showInvalidInvitePage();
        return;
    }

    var w = document.getElementById('envelopeWrapper');
    var ep = document.getElementById('envelopePage');
    var lp = document.getElementById('landingPage');

    if (w.classList.contains('opening')) return;
    w.classList.add('opening');

    playSealBreak();
    setTimeout(function() { playFlapOpen(); }, 200);
    setTimeout(function() { playPaperSlide(); }, 500);
    setTimeout(function() { ep.classList.add('hidden'); }, 1000);
    setTimeout(function() { playRevealChime(); }, 1200);

    setTimeout(function() {
        lp.classList.add('visible');
        ep.style.display = 'none';
        document.body.style.overflow = 'auto';
        createPetals();
        startCountdown();
        observeAnimations();
        initPersonalizedRSVP();
        triggerHeroEnvelopeReveal();
        setTimeout(function() { playYTMusic(); }, 1500);
    }, 1600);
}

// ===== GUEST MANAGEMENT =====

function toggleGuestSection() {
    var attendance = document.querySelector('input[name="attendance"]:checked');
    var section = document.getElementById('additionalGuestsSection');

    if (attendance && attendance.value === 'Joyfully Accept' && maxExtraGuests > 0) {
        section.style.display = 'block';
        section.style.animation = 'guestSlideIn 0.4s ease forwards';
    } else {
        section.style.display = 'none';
        document.getElementById('guestEntriesContainer').innerHTML = '';
        currentGuestCount = 0;
        updateGuestCounter();
        updateAddButton();
    }
}

function addGuestEntry() {
    if (currentGuestCount >= maxExtraGuests) return;

    currentGuestCount++;
    var container = document.getElementById('guestEntriesContainer');
    var entryId = 'guest-entry-' + Date.now();
    var entryNum = currentGuestCount;

    var entry = document.createElement('div');
    entry.className = 'guest-entry';
    entry.id = entryId;
    entry.setAttribute('data-guest-num', entryNum);
    entry.innerHTML =
        '<div class="guest-entry-header">' +
            '<div class="guest-entry-number">' +
                '<span class="number-badge">' + entryNum + '</span>' +
                ' Additional Guest ' + entryNum +
            '</div>' +
            '<button type="button" class="remove-guest-btn" onclick="removeGuestEntry(\'' + entryId + '\')" title="Remove guest">×</button>' +
        '</div>' +
        '<div class="guest-entry-fields">' +
            '<div class="guest-field">' +
                '<label>Full Name</label>' +
                '<input type="text" class="extra-guest-name" placeholder="Guest\'s full name" required>' +
            '</div>' +
            '<div class="guest-field">' +
                '<label>Contact (Optional)</label>' +
                '<input type="tel" class="extra-guest-contact" placeholder="Guest\'s contact number">' +
            '</div>' +
        '</div>';

    container.appendChild(entry);

    requestAnimationFrame(function() {
        entry.classList.add('visible');
    });

    updateGuestCounter();
    updateAddButton();

    setTimeout(function() {
        entry.querySelector('.extra-guest-name').focus();
    }, 100);
}

function removeGuestEntry(entryId) {
    var entry = document.getElementById(entryId);
    if (!entry) return;

    entry.style.opacity = '0';
    entry.style.transform = 'translateY(-10px) scale(0.95)';
    entry.style.transition = 'all 0.3s ease';

    setTimeout(function() {
        entry.remove();
        currentGuestCount--;
        renumberGuests();
        updateGuestCounter();
        updateAddButton();
    }, 300);
}

function renumberGuests() {
    var entries = document.querySelectorAll('.guest-entry');
    entries.forEach(function(entry, index) {
        var num = index + 1;
        entry.setAttribute('data-guest-num', num);
        var badge = entry.querySelector('.number-badge');
        var label = entry.querySelector('.guest-entry-number');
        if (badge) badge.textContent = num;
        if (label) label.innerHTML =
            '<span class="number-badge">' + num + '</span> Additional Guest ' + num;
    });
}

function updateGuestCounter() {
    var display = document.getElementById('guestCounterDisplay');
    if (display) {
        display.textContent = currentGuestCount + ' / ' + maxExtraGuests + ' added';
    }
}

function updateAddButton() {
    var btn = document.getElementById('addGuestBtn');
    if (!btn) return;

    if (currentGuestCount >= maxExtraGuests) {
        btn.disabled = true;
        btn.innerHTML = '<span class="plus-icon">✓</span> Maximum guests added';
    } else {
        btn.disabled = false;
        var remaining = maxExtraGuests - currentGuestCount;
        btn.innerHTML = '<span class="plus-icon">+</span> Add a Guest (' + remaining + ' remaining)';
    }
}

// ===== DISABLE FORM AFTER SUBMIT =====

function disableFormAfterSubmit() {
    var form = document.getElementById('rsvpForm');
    var inputs = form.querySelectorAll('input, textarea, button');
    inputs.forEach(function(input) {
        input.disabled = true;
        input.style.opacity = '0.5';
    });

    var addBtn = document.getElementById('addGuestBtn');
    if (addBtn) {
        addBtn.disabled = true;
        addBtn.style.opacity = '0.5';
    }

    var removeButtons = document.querySelectorAll('.remove-guest-btn');
    removeButtons.forEach(function(btn) {
        btn.disabled = true;
        btn.style.opacity = '0.5';
    });

    var submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.textContent = '✓ RSVP Submitted';
        submitBtn.style.background = '#8E8E8E';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.style.opacity = '1';
    }
}

// ===== SUBMIT =====

async function submitRSVP(e) {
    e.preventDefault();

    if (!isValidInvite) return;

    var btn = document.getElementById('submitBtn');
    var btnText = document.getElementById('btnText');
    var btnLoading = document.getElementById('btnLoading');

    var fullName = prefilledName || document.getElementById('fullName').value.trim();
    var contactNumber = document.getElementById('contactNumber').value.trim();
    var attendanceEl = document.querySelector('input[name="attendance"]:checked');
    var message = document.getElementById('message').value.trim();

    if (!fullName || !contactNumber || !attendanceEl) {
        alert('Please fill in all required fields.');
        return;
    }

    var attendance = attendanceEl.value;

    var additionalGuests = [];
    var guestNames = document.querySelectorAll('.extra-guest-name');
    var guestContacts = document.querySelectorAll('.extra-guest-contact');
    var hasEmptyGuest = false;

    guestNames.forEach(function(nameInput, index) {
        var name = nameInput.value.trim();
        if (name) {
            additionalGuests.push({
                name: name,
                contact: guestContacts[index] ? guestContacts[index].value.trim() : ''
            });
        } else if (attendance === 'Joyfully Accept') {
            nameInput.style.borderBottomColor = '#c86464';
            hasEmptyGuest = true;
        }
    });

    if (hasEmptyGuest) {
        alert('Please fill in all guest names or remove empty entries.');
        return;
    }

    var cappedGuests = additionalGuests.slice(0, maxExtraGuests);
    var totalGuests = 1 + cappedGuests.length;

    var formData = {
        fullName: fullName,
        contactNumber: contactNumber,
        attendance: attendance,
        message: message,
        totalGuests: totalGuests,
        additionalGuests: cappedGuests,
        inviteCode: inviteCode,
        inviteHash: inviteHash
    };

    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    try {
        // Check server one more time before submitting
        var preCheck = await checkServerStatus(inviteHash);

        if (preCheck.status === 'already_used') {
            var formCard = document.getElementById('rsvpCard');
            var usedCard = document.getElementById('rsvpAlreadyUsed');

            if (formCard) {
                // Fade out form first
                formCard.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                formCard.style.opacity = '0';
                formCard.style.transform = 'translateY(-20px)';

                setTimeout(function() {
                    formCard.style.display = 'none';

                    if (usedCard) {
                        usedCard.style.display = 'block';
                        document.getElementById('usedByName').textContent = preCheck.usedBy || fullName;
                        document.getElementById('usedAtTime').textContent = preCheck.usedAt || '';

                        // Trigger animation
                        void usedCard.offsetWidth;
                        requestAnimationFrame(function() {
                            usedCard.classList.add('animate-in');
                        });
                    }

                    document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' });
                }, 400);
            }

            btn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            return;
        }

        // Submit
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(formData)
        });

        // Show thank you modal
        document.getElementById('thankYouModal').classList.add('active');

        // After modal closes, show the already-used card
        window._rsvpAlreadyUsed = true;
        window._rsvpUsedBy = fullName;
        window._rsvpUsedAt = new Date().toLocaleString();

        // After successful submission, swap the cards with animation
        setTimeout(function() {
            var formCard = document.getElementById('rsvpCard');
            var usedCard = document.getElementById('rsvpAlreadyUsed');

            if (formCard) {
                formCard.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                formCard.style.opacity = '0';
                formCard.style.transform = 'translateY(-20px)';

                setTimeout(function() {
                    formCard.style.display = 'none';

                    if (usedCard) {
                        usedCard.style.display = 'block';
                        document.getElementById('usedByName').textContent = fullName;
                        document.getElementById('usedAtTime').textContent = new Date().toLocaleString();

                        // Force reflow and trigger animation
                        void usedCard.offsetWidth;
                        requestAnimationFrame(function() {
                            usedCard.classList.add('animate-in');
                        });
                    }
                }, 400);
            }
        }, 500);

        isValidInvite = false;

    } catch (error) {
        console.error('RSVP submit error:', error);
        document.getElementById('thankYouModal').classList.add('active');

        setTimeout(function() {
            var formCard = document.getElementById('rsvpCard');
            var usedCard = document.getElementById('rsvpAlreadyUsed');
            if (formCard) formCard.style.display = 'none';
            if (usedCard) {
                usedCard.style.display = 'block';
                document.getElementById('usedByName').textContent = fullName;
                document.getElementById('usedAtTime').textContent = new Date().toLocaleString();
            }
        }, 500);

        isValidInvite = false;
    } finally {
        btn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}
// ===== INIT ON PAGE LOAD =====

document.addEventListener('DOMContentLoaded', function() {
    showCheckingOverlay();
    validateInvite();
});


function closeModal() { document.getElementById('thankYouModal').classList.remove('active'); }
document.getElementById('thankYouModal').addEventListener('click', function (e) { if (e.target === this) closeModal(); });

function copyHashtag() { navigator.clipboard.writeText('#KasamaShaiRalphAtGinhawa').then(() => { const m = document.getElementById('copiedMsg'); m.classList.add('show'); setTimeout(() => m.classList.remove('show'), 2000); }).catch(() => { const ta = document.createElement('textarea'); ta.value = '#KasamaShaiRalphAtGinhawa'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); const m = document.getElementById('copiedMsg'); m.classList.add('show'); setTimeout(() => m.classList.remove('show'), 2000); }); }

function openLightbox(item) { const lb = document.getElementById('lightbox'); const content = document.getElementById('lightboxContent'); const imgDiv = item.querySelector('.prenup-img'); content.innerHTML = '<div class="prenup-img" style="min-width:500px;min-height:400px;font-size:2rem;">' + imgDiv.textContent + '</div>'; lb.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeLightbox(e) { if (e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox-close')) { document.getElementById('lightbox').classList.remove('active'); document.body.style.overflow = 'auto'; } }