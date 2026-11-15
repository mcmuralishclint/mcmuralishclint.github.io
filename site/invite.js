(function () {
  var root = document.documentElement;
  var gate = document.getElementById('gate');
  var hero = document.getElementById('hero');
  var names = document.getElementById('names');
  var musicBtn = document.getElementById('music');
  var petals = document.getElementById('petals');
  var page = document.body.dataset;
  var timer;

  /* ----- Falling petals ----- */
  function startPetals() {
    if (petals.childNodes.length) return;
    var cols = ['#F4A7B9', '#F7C6D0', '#F2C14E', '#FBE3A1', '#F08BAA'], i;
    for (i = 0; i < 14; i++) {
      var p = document.createElement('i'), s = 8 + Math.random() * 7, d = 9 + Math.random() * 8;
      p.style.left = (Math.random() * 96) + '%';
      p.style.width = s + 'px'; p.style.height = s + 'px';
      p.style.background = cols[i % cols.length];
      p.style.animationDuration = d + 's';
      p.style.animationDelay = (-Math.random() * d) + 's';
      petals.appendChild(p);
    }
  }

  /* ----- Music: a gentle plucked melody over a drone, made in the browser ----- */
  var AC, master, bus, droneBus, musicOn = false;
  var SA = 293.66, RATIOS = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2], BEAT = 0.82;
  var MELODY = [[2,1],[3,1],[4,1],[5,2],[4,1],[3,1],[2,1], [1,1],[2,1],[3,2],[2,1],[1,1],[0,2],
                [2,1],[3,1],[4,1],[5,1],[6,2],[5,1],[4,1], [3,1],[4,1],[3,1],[2,1],[1,1],[0,3]];
  var DRONE = [SA * 0.75, SA, SA, SA / 2];

  function tone(dest, type, freq, t, dur, vol, from) {
    var o = AC.createOscillator(), g = AC.createGain();
    o.type = type;
    if (from) { o.frequency.setValueAtTime(from, t); o.frequency.exponentialRampToValueAtTime(freq, t + 0.09); }
    else { o.frequency.setValueAtTime(freq, t); }
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function bell(t) {
    [1, 2, 2.76, 5.4].forEach(function (r, i) { tone(bus, 'sine', 620 * r, t, 2.8 - i * 0.5, 0.14 / (i + 1)); });
  }
  function scheduleLoop(t0) {
    if (AC.state !== 'running') { setTimeout(function () { scheduleLoop(Math.max(t0, AC.currentTime + 0.2)); }, 1000); return; }
    var t = t0, prev = null, b;
    MELODY.forEach(function (n) {
      var f = SA * RATIOS[n[0]], len = n[1] * BEAT;
      tone(bus, 'triangle', f, t, len + 1.2, 0.2, prev && n[1] > 1 ? prev : null);
      tone(bus, 'sine', f * 2, t, len * 0.7 + 0.4, 0.045);
      prev = f; t += len;
    });
    for (b = 0; b < 32; b++) { tone(droneBus, 'sawtooth', DRONE[b % 4], t0 + b * BEAT, 3.4, 0.07); }
    setTimeout(function () { scheduleLoop(t0 + 32 * BEAT); }, Math.max(200, (t0 + 32 * BEAT - AC.currentTime - 1) * 1000));
  }
  function initAudio() {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return false;
    AC = new Ctx();
    master = AC.createGain(); master.gain.value = 0.0001;
    var comp = AC.createDynamicsCompressor();
    master.connect(comp); comp.connect(AC.destination);
    bus = AC.createGain(); bus.connect(master);
    var delay = AC.createDelay(1), fb = AC.createGain(), wet = AC.createGain();
    delay.delayTime.value = 0.36; fb.gain.value = 0.3; wet.gain.value = 0.26;
    bus.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(master);
    var lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 760;
    droneBus = AC.createGain(); droneBus.connect(lp); lp.connect(bus);
    return true;
  }
  function setMusic(on, withBell) {
    if (on && !AC) {
      if (!initAudio()) { musicBtn.hidden = true; return; }
      if (withBell) bell(AC.currentTime + 0.05);
      scheduleLoop(AC.currentTime + (withBell ? 1.4 : 0.2));
    }
    musicOn = on;
    musicBtn.classList.toggle('off', !on);
    musicBtn.setAttribute('aria-pressed', String(on));
    musicBtn.setAttribute('aria-label', on ? 'Turn music off' : 'Turn music on');
    if (!AC) return;
    if (on) AC.resume();
    master.gain.cancelScheduledValues(AC.currentTime);
    master.gain.setTargetAtTime(on ? 0.55 : 0.0001, AC.currentTime, on ? 0.5 : 0.12);
  }
  musicBtn.addEventListener('click', function () { setMusic(!musicOn, false); });
  document.addEventListener('visibilitychange', function () {
    if (!AC) return;
    if (document.hidden) AC.suspend(); else AC.resume();
  });

  /* ----- Opening ----- */
  function openGate() {
    if (gate.classList.contains('is-open')) return;
    if (!musicOn) setMusic(true, true);
    gate.classList.add('is-open');
    hero.classList.remove('pre');
    startPetals();
    timer = setTimeout(function () {
      gate.hidden = true;
      musicBtn.hidden = false;
      root.classList.remove('gated');
      names.focus({ preventScroll: true });
    }, 2300);
  }
  function showGate() {
    clearTimeout(timer);
    window.scrollTo(0, 0);
    hero.classList.add('pre');
    gate.hidden = false;
    void gate.offsetWidth;
    gate.classList.remove('is-open');
    root.classList.add('gated');
  }
  if (location.hash === '#invite') { gate.hidden = true; musicBtn.hidden = false; startPetals(); }
  else { root.classList.add('gated'); hero.classList.add('pre'); }
  gate.addEventListener('click', openGate);
  document.getElementById('replay').addEventListener('click', showGate);

  /* ----- Countdown to the first event on this invitation, in Sri Lanka time ----- */
  var target = Date.parse(page.countdown);
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function tick() {
    var s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    document.getElementById('cd-d').textContent = Math.floor(s / 86400);
    document.getElementById('cd-h').textContent = pad(Math.floor(s % 86400 / 3600));
    document.getElementById('cd-m').textContent = pad(Math.floor(s % 3600 / 60));
    document.getElementById('cd-s').textContent = pad(s % 60);
  }
  tick();
  setInterval(tick, 1000);

  /* ----- Reply form: each reply is sent to the couple's Google Form ----- */
  var RSVP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeSf7_k83dWliRXXPCNr0aiDu_SR93IUtWOClDDlS98rGoxMg/formResponse';
  /* The last three are sent only once their Google Form questions exist and their ids are filled in here. */
  var FIELDS = { name: 'entry.1853683081', phone: 'entry.397292606', attending: 'entry.443300009', message: 'entry.674018825', invitation: '', events: '', party: '' };
  var form = document.getElementById('rsvp');
  var note = document.getElementById('rsvp-note');
  var sendBtn = document.getElementById('send');
  var messageLabel = document.getElementById('message-label');
  var partyField = document.getElementById('party-field');
  function picked() { return form.querySelector('input[name="attending"]:checked'); }
  function say(kind, text) { note.hidden = false; note.className = 'note ' + kind; note.textContent = text; }
  form.addEventListener('change', function () {
    var coming = picked().value !== 'no';
    if (partyField) partyField.hidden = !coming;
    messageLabel.textContent = coming ? 'Your blessings' : 'A note for the couple';
    sendBtn.textContent = coming ? 'Send blessings and RSVP' : 'Send reply';
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    if (!name) {
      say('err', 'Please enter your name so we know who is replying.');
      form.name.focus();
      return;
    }
    var answer = picked();
    var coming = answer.value !== 'no';
    var body = new URLSearchParams();
    function add(key, value) { if (FIELDS[key]) body.append(FIELDS[key], value); }
    body.append(FIELDS.name, name);
    body.append(FIELDS.phone, form.phone.value.trim() || '-');
    body.append(FIELDS.attending, coming ? 'Accepts' : 'Declines');
    body.append(FIELDS.message, form.message.value.trim() || '-');
    add('invitation', (page.guest || 'General link') + ' (' + page.invite + ')');
    add('events', answer.dataset.events);
    add('party', !coming ? '0' : partyField ? form.party.value : page.guest ? '1' : '-');
    sendBtn.disabled = true;
    say('', 'Sending your reply…');
    fetch(RSVP_URL, { method: 'POST', mode: 'no-cors', body: body }).then(function () {
      say('ok', coming
        ? 'Thank you, ' + name + '. Your reply is in, and we look forward to seeing you.'
        : 'Thank you for letting us know, ' + name + '. We will miss you.');
      form.reset();
      form.dispatchEvent(new Event('change'));
    }).catch(function () {
      say('err', 'Your reply could not be sent. Check your connection and try again.');
    }).then(function () { sendBtn.disabled = false; });
  });
})();
