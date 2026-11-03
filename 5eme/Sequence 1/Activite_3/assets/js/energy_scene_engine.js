(() => {
  "use strict";

  const ASSETS = {
    solarBg: "assets/images/solar_background.png",
    plane: "assets/images/solar_plane_panels.png",
    propeller: "assets/images/solar_propeller.png",
    tramBg: "assets/images/tram_background.png",
    tram: "assets/images/tram.png",
    motor: "assets/images/electric_motor_cutaway.png",
    sea: "assets/images/sea_background.png",
    sailboatStates: "assets/images/sailboat_states.png",
    kayakStates: "assets/images/kayak_4frames_fixed.png",
    steamBg: "assets/images/steam_background.png",
    locomotive: "assets/images/steam_locomotive.png",
    steamEngine: "assets/images/steam_engine_cutaway.png",
    steamFirebox: "assets/images/steam_firebox.png",
    slopeBg: "assets/images/slope_background_v2.png",
    car: "assets/images/orange_car.png",
    radiatorScene: "assets/images/radiator_scene.png",
    lampScene: "assets/images/lamp_scene.png",
    generator: "assets/images/hand_generator_4frames_fixed.png"
  };

  const COLORS = {
    electric: "#1683ff",
    kinetic: "#12a85a",
    motion: "#ff9f1c",
    light: "#ffd51f",
    heat: "#ef3f35",
    potential: "#9b5de5",
    wind: "#e8fbff",
    ink: "#07154d"
  };

  const cache = new Map();
  function loadImage(src) {
    if (cache.has(src)) return cache.get(src);
    const promise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Image introuvable : " + src));
      image.src = src;
    });
    cache.set(src, promise);
    return promise;
  }

  function clamp(value, min = 0, max = 1) { return Math.max(min, Math.min(max, value)); }
  function ease(value) { const t = clamp(value); return t * t * (3 - 2 * t); }
  function phase(time, start, duration) { return clamp((time - start) / duration); }

  class EnergyScene {
    constructor(canvas, scene, phaseName) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.scene = scene;
      this.phaseName = phaseName;
      this.images = {};
      this.running = false;
      this.frameCounter = 0;
      this.raf = 0;
      this.startTime = 0;
      this.duration = scene === "sail" && phaseName === "transfer" ? 7200 : 6800;
      this.ready = this.prepare();
    }

    async prepare() {
      const keys = {
        solar: ["solarBg", "plane", "propeller", "motor"],
        tram: ["tramBg", "tram", "motor"],
        sail: ["sea", "sailboatStates"],
        kayak: ["sea", "kayakStates"],
        steam: ["steamBg", "locomotive", "steamEngine", "steamFirebox"],
        slope: ["slopeBg", "car"],
        radiator: ["radiatorScene"],
        lamp: ["lampScene"],
        generator: ["generator"]
      }[this.scene] || [];
      await Promise.all(keys.map(async (key) => { this.images[key] = await loadImage(ASSETS[key]); }));
      this.draw(0);
    }

    async play() {
      await this.ready;
      cancelAnimationFrame(this.raf);
      this.running = true;
      this.canvas.dataset.running = "true";
      this.startTime = performance.now();
      const tick = (now) => {
        const elapsed = now - this.startTime;
        this.frameCounter += 1;
        this.canvas.dataset.frame = String(this.frameCounter);
        this.draw(elapsed);
        if (elapsed < this.duration) this.raf = requestAnimationFrame(tick);
        else {
          this.running = false;
          this.canvas.dataset.running = "false";
          this.draw(this.duration);
        }
      };
      this.raf = requestAnimationFrame(tick);
    }

    destroy() { cancelAnimationFrame(this.raf); this.running = false; }

    clear(fill = "#eaf1ff") {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = fill;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    cover(image) {
      const scale = Math.max(this.canvas.width / image.width, this.canvas.height / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      this.ctx.drawImage(image, (this.canvas.width - width) / 2, (this.canvas.height - height) / 2, width, height);
    }

    fit(image, x, y, width, height) {
      const scale = Math.min(width / image.width, height / image.height);
      const w = image.width * scale;
      const h = image.height * scale;
      return { x: x + (width - w) / 2, y: y + (height - h) / 2, w, h };
    }

    contain(image, x, y, width, height, rotation = 0, alpha = 1, flipX = false) {
      const box = this.fit(image, x, y, width, height);
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.translate(box.x + box.w / 2, box.y + box.h / 2);
      this.ctx.rotate(rotation);
      this.ctx.scale(flipX ? -1 : 1, 1);
      this.ctx.drawImage(image, -box.w / 2, -box.h / 2, box.w, box.h);
      this.ctx.restore();
      return box;
    }

    frame(image, columns, rows, index, x, y, width, height, dx = 0, dy = 0) {
      const cellWidth = image.width / columns;
      const cellHeight = image.height / rows;
      const column = index % columns;
      const row = Math.floor(index / columns);
      this.ctx.drawImage(image, column * cellWidth, row * cellHeight, cellWidth, cellHeight, x + dx, y + dy, width, height);
    }

    roundedPanel(x, y, width, height, title) {
      const ctx = this.ctx;
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,.30)";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "rgba(255,255,255,.97)";
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, 16);
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.strokeStyle = "#1735bd";
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = "#1735bd";
      ctx.beginPath();
      ctx.roundRect(x, y, width, 38, [14, 14, 0, 0]);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "700 18px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(title, x + width / 2, y + 19);
      ctx.restore();
    }

    label(text, x, y, color, align = "left", fontSize = 18) {
      const ctx = this.ctx;
      ctx.save();
      ctx.font = "700 " + fontSize + "px Arial";
      const width = ctx.measureText(text).width + 28;
      const left = align === "right" ? x - width : align === "center" ? x - width / 2 : x;
      ctx.fillStyle = "rgba(255,255,255,.96)";
      ctx.beginPath();
      ctx.roundRect(left, y, width, 34, 12);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = COLORS.ink;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, left + width / 2, y + 17);
      ctx.restore();
    }

    dot(x, y, color, radius = 7, alpha = 1) {
      const ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    flow(points, progress, color, count = 8, radius = 6) {
      const segments = [];
      let total = 0;
      for (let index = 1; index < points.length; index += 1) {
        const length = Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y);
        segments.push({ a: points[index - 1], b: points[index], length, start: total });
        total += length;
      }
      if (!segments.length || total <= 0) return;
      for (let index = 0; index < count; index += 1) {
        const distance = (((progress * 1.2) - index / count) % 1 + 1) % 1 * total;
        const segment = segments.find((item) => distance <= item.start + item.length) || segments[segments.length - 1];
        const local = (distance - segment.start) / segment.length;
        this.dot(segment.a.x + (segment.b.x - segment.a.x) * local, segment.a.y + (segment.b.y - segment.a.y) * local, color, radius);
      }
    }

    arrow(x1, y1, x2, y2, color, width = 9, head = 24) {
      const ctx = this.ctx;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - head * Math.cos(angle - .55), y2 - head * Math.sin(angle - .55));
      ctx.lineTo(x2 - head * Math.cos(angle + .55), y2 - head * Math.sin(angle + .55));
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    heatWaves(x, baseY, amount, time) {
      const ctx = this.ctx;
      for (let index = 0; index < amount; index += 1) {
        const p = ((time / 1450) + index / amount) % 1;
        const yy = baseY - p * 125;
        const xx = x + index * 48 + Math.sin(p * Math.PI * 4 + index) * 10;
        ctx.save();
        ctx.globalAlpha = Math.sin(p * Math.PI) * .92;
        ctx.strokeStyle = COLORS.heat;
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(xx, yy + 30);
        ctx.bezierCurveTo(xx - 14, yy + 18, xx + 14, yy + 7, xx, yy - 7);
        ctx.stroke();
        ctx.restore();
      }
    }

    lightRays(x, y, time) {
      const ctx = this.ctx;
      const pulse = .55 + .35 * Math.sin(time / 280);
      ctx.save();
      ctx.globalAlpha = pulse;
      ctx.fillStyle = "rgba(255,220,30,.22)";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 170, y + 155);
      ctx.lineTo(x + 170, y + 155);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = COLORS.light;
      ctx.lineWidth = 7;
      for (let index = -2; index <= 2; index += 1) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + index * 42, y + 138);
        ctx.stroke();
      }
      ctx.restore();
    }

    windStreams(time, xEnd, yTop = 80, yBottom = 330) {
      const ctx = this.ctx;
      for (let index = 0; index < 7; index += 1) {
        const start = ((time / 4 + index * 145) % (xEnd + 260)) - 230;
        const y = yTop + index * (yBottom - yTop) / 6;
        const end = Math.min(start + 190, xEnd);
        if (end <= start) continue;
        ctx.save();
        ctx.globalAlpha = .94;
        ctx.strokeStyle = index % 2 ? "#d6f7ff" : "#ffffff";
        ctx.shadowColor = "#338dbb";
        ctx.shadowBlur = 4;
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(start, y);
        ctx.bezierCurveTo(start + 55, y - 12, start + 105, y + 12, end, y);
        ctx.stroke();
        ctx.restore();
      }
    }

    smoke(x, y, time) {
      const ctx = this.ctx;
      for (let index = 0; index < 6; index += 1) {
        const p = ((time / 2300) + index / 6) % 1;
        ctx.save();
        ctx.globalAlpha = Math.sin(p * Math.PI) * .55;
        ctx.fillStyle = "#4c5057";
        ctx.beginPath();
        ctx.arc(x + p * 48, y - p * 135, 12 + p * 27, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    fireZoom(x, y, width, height, time) {
      this.roundedPanel(x, y, width, height, "Foyer : charbon brûlé");
      const inner = { x: x + 6, y: y + 42, w: width - 12, h: height - 48 };
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.roundRect(inner.x, inner.y, inner.w, inner.h, 10);
      this.ctx.clip();
      this.ctx.drawImage(this.images.steamFirebox, inner.x, inner.y, inner.w, inner.h);
      this.ctx.globalAlpha = .12 + .06 * Math.sin(time / 120);
      this.ctx.fillStyle = "#ff7a18";
      this.ctx.fillRect(inner.x, inner.y, inner.w, inner.h);
      this.ctx.restore();
      this.label("Énergie thermique", x + width - 12, y + height - 38, COLORS.heat, "right", 15);
    }

    panelZoom(time, x, y, width, height) {
      const ctx = this.ctx;
      this.roundedPanel(x, y, width, height, "Zoom : panneau photovoltaïque");
      const px = x + 42;
      const py = y + 72;
      const pw = 148;
      const ph = 88;
      ctx.save();
      ctx.fillStyle = "#153f90";
      ctx.fillRect(px, py, pw, ph);
      ctx.strokeStyle = "#a4d5ff";
      ctx.lineWidth = 2;
      for (let index = 1; index < 5; index += 1) {
        ctx.beginPath(); ctx.moveTo(px + index * pw / 5, py); ctx.lineTo(px + index * pw / 5, py + ph); ctx.stroke();
      }
      for (let index = 1; index < 3; index += 1) {
        ctx.beginPath(); ctx.moveTo(px, py + index * ph / 3); ctx.lineTo(px + pw, py + index * ph / 3); ctx.stroke();
      }
      ctx.strokeStyle = "#20242b";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(px + pw, py + ph - 8);
      ctx.lineTo(x + width - 24, py + ph - 8);
      ctx.stroke();
      ctx.restore();
      this.flow([{ x: x + 20, y: y + 56 }, { x: px + 70, y: py + 14 }], time / 1250, COLORS.light, 4);
      this.flow([{ x: px + pw - 4, y: py + ph - 8 }, { x: x + width - 25, y: py + ph - 8 }], time / 1050, COLORS.electric, 5);
      this.label("Énergie électrique", x + width - 18, y + height - 42, COLORS.electric, "right", 16);
    }

    motorZoom(time, x, y, width, height) {
      this.roundedPanel(x, y, width, height, "Zoom : moteur électrique");
      this.contain(this.images.motor, x + 16, y + 43, width - 32, height - 52);
      const cableY = y + height * .55;
      this.ctx.save();
      this.ctx.lineCap = "round";
      this.ctx.lineWidth = 6;
      this.ctx.strokeStyle = "#20242b";
      this.ctx.beginPath();
      this.ctx.moveTo(x + 8, cableY - 9);
      this.ctx.bezierCurveTo(x + 48, cableY - 12, x + 78, cableY - 3, x + width * .28, cableY - 2);
      this.ctx.stroke();
      this.ctx.strokeStyle = "#b42c2c";
      this.ctx.beginPath();
      this.ctx.moveTo(x + 8, cableY + 9);
      this.ctx.bezierCurveTo(x + 48, cableY + 12, x + 78, cableY + 3, x + width * .28, cableY + 2);
      this.ctx.stroke();
      this.ctx.restore();
      this.flow([
        { x: x + 10, y: cableY },
        { x: x + width * .28, y: cableY },
        { x: x + width * .43, y: cableY }
      ], time / 1050, COLORS.electric, 6, 5);
      const cx = x + width * .83;
      const cy = y + height * .59;
      for (let index = 0; index < 8; index += 1) {
        const angle = time / 240 + index * Math.PI / 4;
        const depth = (Math.sin(angle) + 1) / 2;
        this.dot(cx + Math.cos(angle) * 7, cy + Math.sin(angle) * 27, COLORS.kinetic, 4 + depth * 3, .5 + depth * .5);
      }
    }

    pistonZoom(time, x, y, width, height) {
      this.roundedPanel(x, y, width, height, "Zoom : vapeur, piston et roue");
      const innerX = x + 10;
      const innerY = y + 43;
      const innerW = width - 20;
      const innerH = height - 50;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.roundRect(innerX, innerY, innerW, innerH, 10);
      this.ctx.clip();
      this.ctx.globalAlpha = .88;
      const mechanismBox = this.fit(this.images.steamEngine, innerX, innerY, innerW, innerH);
      this.ctx.drawImage(this.images.steamEngine, mechanismBox.x, mechanismBox.y, mechanismBox.w, mechanismBox.h);
      this.ctx.globalAlpha = 1;
      const angle = time / 245;
      const wheelX = mechanismBox.x + mechanismBox.w * .82;
      const wheelY = mechanismBox.y + mechanismBox.h * .505;
      const radius = Math.min(mechanismBox.h * .31, 58);
      this.ctx.fillStyle = "rgba(35,20,12,.72)";
      this.ctx.beginPath();
      this.ctx.arc(wheelX, wheelY, radius + 13, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = "#d7ad58";
      this.ctx.lineWidth = 9;
      this.ctx.beginPath();
      this.ctx.arc(wheelX, wheelY, radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.strokeStyle = "#b91f28";
      this.ctx.lineWidth = 8;
      for (let index = 0; index < 8; index += 1) {
        const spoke = angle + index * Math.PI / 4;
        this.ctx.beginPath();
        this.ctx.moveTo(wheelX, wheelY);
        this.ctx.lineTo(wheelX + Math.cos(spoke) * (radius - 8), wheelY + Math.sin(spoke) * (radius - 8));
        this.ctx.stroke();
      }
      const crankRadius = radius * .52;
      const crankX = wheelX + Math.cos(angle) * crankRadius;
      const crankY = wheelY + Math.sin(angle) * crankRadius;
      const rodLength = Math.min(mechanismBox.w * .43, 150);
      const verticalOffset = crankY - wheelY;
      const pistonX = crankX - Math.sqrt(Math.max(1, rodLength * rodLength - verticalOffset * verticalOffset));
      const pistonY = wheelY;
      this.ctx.fillStyle = "#d9dfe4";
      this.ctx.strokeStyle = "#30363d";
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.roundRect(pistonX - 24, pistonY - 19, 48, 38, 6);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.strokeStyle = "#d4d9df";
      this.ctx.lineWidth = 11;
      this.ctx.beginPath();
      this.ctx.moveTo(pistonX + 22, pistonY);
      this.ctx.lineTo(crankX, crankY);
      this.ctx.stroke();
      this.ctx.fillStyle = "#c59a3d";
      this.ctx.beginPath();
      this.ctx.arc(crankX, crankY, 8, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
      this.label("Piston : énergie cinétique", x + 12, y + height - 38, COLORS.kinetic, "left", 16);
    }

    draw(time) {
      if (!Object.keys(this.images).length) return;
      const method = this["draw_" + this.scene] || this.draw_slope;
      method.call(this, time);
    }

    drawSolarPlane(x, y, width, height, time, spinning) {
      const box = this.contain(this.images.plane, x, y, width, height);
      const noseX = box.x + box.w * .815;
      const noseY = box.y + box.h * .615;
      const size = Math.max(92, box.h * .29);
      if (spinning) {
        this.ctx.save();
        this.ctx.translate(noseX, noseY);
        this.ctx.rotate(time / 95);
        this.ctx.drawImage(this.images.propeller, -size * .34, -size / 2, size * .68, size);
        this.ctx.restore();
      } else {
        this.ctx.save();
        this.ctx.translate(noseX, noseY);
        this.ctx.drawImage(this.images.propeller, -size * .34, -size / 2, size * .68, size);
        this.ctx.restore();
      }
      return { box, noseX, noseY };
    }

    draw_solar(time) {
      this.clear();
      this.cover(this.images.solarBg);
      const showPanel = this.phaseName !== "sunlight" && time > 0;
      const showMotor = this.phaseName === "full" && time >= 2800;
      const motion = this.phaseName === "full" ? ease(phase(time, 4100, 2200)) : 0;
      const planeX = 120 + motion * 145;
      const planeY = -10 - motion * 10;
      const plane = this.drawSolarPlane(planeX, planeY, 800, 360, time, showMotor);
      if (time <= 0) return;
      this.flow([{ x: 85, y: 50 }, { x: 265, y: 130 }, { x: plane.box.x + plane.box.w * .42, y: plane.box.y + plane.box.h * .58 }], time / 1500, COLORS.light, 8);
      this.label("Soleil : énergie lumineuse", 165, 18, COLORS.light);
      if (showPanel) {
        this.panelZoom(time, 18, 292, 328, 202);
      }
      if (showMotor) this.motorZoom(time, 660, 292, 320, 202);
      if (motion > 0) {
        this.label("Déplacement : énergie cinétique", 650, 18, COLORS.motion, "left", 17);
        this.arrow(715, 68, 905, 68, COLORS.motion, 10, 28);
      }
    }

    draw_tram(time) {
      this.clear();
      this.cover(this.images.tramBg);
      const motion = time > 0 ? ease(phase(time, 3200, 2500)) : 0;
      const x = 15 + motion * 95;
      const tramBox = this.contain(this.images.tram, x, 65, 970, 320);
      const contactX = tramBox.x + tramBox.w * .82;
      const contactY = tramBox.y + tramBox.h * .02;
      if (time <= 0) return;
      this.flow([
        { x: 25, y: 70 },
        { x: 865, y: 70 },
        { x: contactX + 18, y: 82 },
        { x: contactX, y: contactY + 4 },
        { x: contactX - 34, y: tramBox.y + tramBox.h * .25 }
      ], time / 1750, COLORS.electric, 12);
      this.label("Caténaire : énergie électrique", 22, 18, COLORS.electric);
      this.motorZoom(time, 18, 275, 325, 220);
      if (motion > .08) {
        this.arrow(420, 454, 610, 454, COLORS.motion, 10, 28);
        this.label("Déplacement : énergie cinétique", 635, 437, COLORS.motion, "left", 17);
      }
    }

    draw_sail(time) {
      this.clear();
      this.cover(this.images.sea);
      const filled = time > 900;
      const frame = filled ? 1 : 0;
      const motion = this.phaseName === "transfer" ? ease(phase(time, 1700, 4900)) : 0;
      const x = 300 + motion * 860;
      this.frame(this.images.sailboatStates, 2, 1, frame, x, 48, 340, 452);
      if (time <= 0) return;
      const sailEnd = Math.min(x + 235, 965);
      this.windStreams(time, sailEnd, 95, 315);
      this.label("Vent : énergie cinétique", 24, 18, COLORS.kinetic);
      if (motion > 0 && x < 960) {
        this.arrow(Math.max(50, x - 210), 465, Math.max(220, x - 20), 465, "#ffd21f", 12, 34);
        this.label("Mouvement du voilier", 420, 438, "#ffd21f", "left", 17);
      }
    }

    draw_kayak(time) {
      this.clear();
      this.cover(this.images.sea);
      const sequence = [0, 1, 2, 3, 2, 1];
      const frameDuration = 680;
      const framePosition = time > 0 ? time / frameDuration : 0;
      const sequenceIndex = Math.floor(framePosition) % sequence.length;
      const frameIndex = sequence[sequenceIndex];
      this.frame(this.images.kayakStates, 2, 2, frameIndex, 96, 0, 768, 512);
      if (time <= 0) return;
      this.label("Mouvement de la pagaie : énergie cinétique", 24, 18, COLORS.kinetic);
    }

    draw_steam(time) {
      this.clear();
      this.cover(this.images.steamBg);
      const motion = this.phaseName === "full" ? ease(phase(time, 4300, 2100)) : 0;
      const x = 120 + motion * 145;
      const box = this.contain(this.images.locomotive, x, 95, 360, 240, 0, 1, true);
      const chimneyX = box.x + box.w * .805;
      const chimneyY = box.y + box.h * .075;
      if (time <= 0) return;
      this.label(this.phaseName === "fire" ? "Charbon brûlé : énergie thermique" : "Vapeur chauffée : énergie thermique", 22, 18, COLORS.heat);
      this.smoke(chimneyX, chimneyY, time);
      if (this.phaseName === "fire") {
        this.fireZoom(660, 275, 320, 220, time);
        return;
      }
      this.fireZoom(660, 12, 320, 208, time);
      this.pistonZoom(time, 610, 238, 370, 257);
      if (motion > 0) {
        this.arrow(80, 460, 300, 460, COLORS.motion, 11, 30);
        this.label("Déplacement de la locomotive", 325, 442, COLORS.motion, "left", 16);
      }
    }

    draw_slope(time) {
      this.clear();
      this.cover(this.images.slopeBg);
      const motion = time > 0 ? ease(phase(time, 800, 4800)) : 0;
      const x = 65 + motion * 700;
      const y = 105 + motion * 255;
      this.contain(this.images.car, x, y, 260, 125, .35);
      if (time <= 0) return;
      const remainingHeight = 310 * (1 - motion);
      this.ctx.save();
      this.ctx.strokeStyle = COLORS.potential;
      this.ctx.lineWidth = 8;
      this.ctx.beginPath();
      this.ctx.moveTo(75, 420);
      this.ctx.lineTo(75, 420 - remainingHeight);
      this.ctx.stroke();
      this.arrow(75, 420 - remainingHeight, 75, 420, COLORS.potential, 7, 22);
      this.ctx.restore();
      this.label("Pente et hauteur : énergie potentielle", 24, 18, COLORS.potential);
      if (motion > .1) {
        for (let index = 0; index < 4; index += 1) {
          this.arrow(x - 15 - index * 45, y + 92 - index * 16, x + 15 - index * 45, y + 104 - index * 16, COLORS.motion, 6, 17);
        }
        this.label("Vitesse : énergie cinétique", 655, 445, COLORS.motion, "left", 17);
      }
    }

    draw_radiator(time) {
      this.clear();
      this.cover(this.images.radiatorScene);
      if (time <= 0) return;
      const heatStage = time >= 1700;
      const wavesStage = time >= 3400;
      {
        this.label("Prise : énergie électrique", 24, 245, COLORS.electric);
        this.flow([
          { x: 145, y: 320 }, { x: 154, y: 385 }, { x: 185, y: 445 },
          { x: 255, y: 475 }, { x: 325, y: 464 }, { x: 355, y: 405 }, { x: 356, y: 378 }
        ], time / 1450, COLORS.electric, 10);
      }
      if (heatStage) {
        this.ctx.save();
        this.ctx.globalAlpha = .10 + .035 * Math.sin(time / 230);
        this.ctx.fillStyle = COLORS.heat;
        this.ctx.beginPath();
        this.ctx.roundRect(355, 94, 499, 329, 26);
        this.ctx.fill();
        this.ctx.restore();
        this.label("Radiateur : énergie thermique", 630, 18, COLORS.heat);
      }
      if (wavesStage) this.heatWaves(390, 105, 9, time);
    }

    draw_lamp(time) {
      this.clear();
      this.cover(this.images.lampScene);
      if (time <= 0) return;
      const lightStage = time >= 1850;
      {
        this.label("Prise : énergie électrique", 24, 225, COLORS.electric);
        this.flow([
          { x: 137, y: 285 }, { x: 137, y: 405 }, { x: 170, y: 452 },
          { x: 300, y: 470 }, { x: 480, y: 470 }, { x: 575, y: 440 },
          { x: 632, y: 435 }, { x: 632, y: 330 }, { x: 632, y: 205 }, { x: 652, y: 112 }
        ], time / 1550, COLORS.electric, 12);
      }
      if (lightStage) {
        this.lightRays(810, 210, time);
        this.label("Lumière : énergie lumineuse", 650, 18, COLORS.light);
      }
    }

    drawGeneratorFrame(time) {
      const index = time > 0 ? Math.floor(time / 520) % 4 : 0;
      this.frame(this.images.generator, 2, 2, index, 0, 0, 768, 512);
    }

    draw_generator(time) {
      this.clear("#ffffff");
      this.drawGeneratorFrame(time);
      if (time <= 0) return;
      this.label("Manivelle : énergie cinétique", 20, 18, COLORS.kinetic);
      if (this.phaseName === "crank") return;
      const electrical = time >= 1600;
      const luminous = this.phaseName === "full" && time >= 3300;
      if (electrical) {
        this.flow([
          { x: 628, y: 305 },
          { x: 654, y: 328 },
          { x: 665, y: 362 },
          { x: 646, y: 392 },
          { x: 607, y: 394 }
        ], time / 1100, COLORS.electric, 7);
        this.label("Génératrice : énergie électrique", 670, 244, COLORS.electric, "left", 16);
      }
      if (luminous) {
        const pulse = .45 + .40 * Math.sin(time / 190);
        this.ctx.save();
        this.ctx.globalAlpha = pulse;
        this.ctx.fillStyle = COLORS.light;
        this.ctx.shadowColor = COLORS.light;
        this.ctx.shadowBlur = 38;
        this.ctx.beginPath();
        this.ctx.arc(600, 384, 18, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = "#ffd51f";
        this.ctx.strokeStyle = "#a66a00";
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(600, 384, 9, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
        this.label("DEL : énergie lumineuse", 525, 438, COLORS.light, "left", 16);
      }
    }
  }

  window.EnergyScene = EnergyScene;
})();
