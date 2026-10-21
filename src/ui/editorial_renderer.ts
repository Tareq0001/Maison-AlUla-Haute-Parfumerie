/**
 * MAISON ALULA HAUTE PARFUMERIE // EDITORIAL UI & BOTTLE SVG RENDERER
 * ============================================================================
 * Procedural SVG apothecary bottle generation, molten wax seal canvas rendering,
 * Kinfolk magazine typography controllers, and accessible dialog managers.
 *
 * Author: Tariq Abuashi (Master Perfumer & Chief Digital Architect)
 * ============================================================================
 */

export interface IBottleRenderConfig {
  glassTintHex: string;
  capFinishHex: string;
  capStyle: 'antique-brass' | 'desert-basalt' | 'engraved-gold';
  clientName: string;
  batchCode: string;
  volumeLabel?: string;
  concentrationLabel?: string;
  liquidFillLevelPercent?: number; // 0 to 100
  showWaxSealStamp?: boolean;
}

export interface IWaxSealConfig {
  sealColorHex: string; // e.g. '#8B261D' (crimson) or '#9A5B32' (bronze)
  monogramChar: string; // e.g. 'A'
  radiusPixels: number;
  canvasElement: HTMLCanvasElement;
}

/**
 * Procedural SVG Apothecary Bottle Generator
 */
export class EditorialBottleRenderer {
  /**
   * Generates production-grade inline SVG for Maison AlUla flacons
   */
  public static renderBottleSvg(config: IBottleRenderConfig): string {
    const glassColor = config.glassTintHex || '#9A5B32';
    const capColor = config.capFinishHex || '#C5A059';
    const clientName = (config.clientName || 'MAISON ALULA').substring(0, 24).toUpperCase();
    const batch = (config.batchCode || 'BATCH 26-A').toUpperCase();
    const volume = config.volumeLabel || '50 ML // 1.7 FL. OZ.';
    const concentration = config.concentrationLabel || 'EXTRAIT DE PARFUM (35%)';
    const fillLevel = Math.max(20, Math.min(95, config.liquidFillLevelPercent ?? 85));

    // Unique gradient ID to prevent SVG ID collisions on multi-item pages
    const uniqueId = `flacon-${Math.abs(EditorialBottleRenderer.hashString(glassColor + capColor + clientName))}`;

    const liquidY = 250 - (fillLevel * 1.5);
    const liquidHeight = fillLevel * 1.5;

    return `
      <svg class="maison-flacon-svg" viewBox="0 0 200 280" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Apothecary Flacon ${clientName}">
        <defs>
          <!-- Glass Gradient -->
          <linearGradient id="glassGrad-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${glassColor}" stop-opacity="0.30"/>
            <stop offset="45%" stop-color="${glassColor}" stop-opacity="0.75"/>
            <stop offset="100%" stop-color="${glassColor}" stop-opacity="0.95"/>
          </linearGradient>

          <!-- Cap Gradient -->
          <linearGradient id="capGrad-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#2D2825"/>
            <stop offset="35%" stop-color="${capColor}"/>
            <stop offset="70%" stop-color="${capColor}"/>
            <stop offset="100%" stop-color="#1C1917"/>
          </linearGradient>

          <!-- Parchment Label Texture -->
          <linearGradient id="labelGrad-${uniqueId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FAF7F2"/>
            <stop offset="100%" stop-color="#F2ECE0"/>
          </linearGradient>
        </defs>

        <!-- Ambient Shadow Under Flacon -->
        <ellipse cx="100" cy="265" rx="58" ry="8" fill="rgba(28, 25, 23, 0.12)" />

        <!-- Heavy Base Bottom Rim (Solid Glass Base) -->
        <rect x="44" y="240" width="112" height="15" rx="4" fill="url(#glassGrad-${uniqueId})" stroke="#1C1917" stroke-width="1.5" />

        <!-- Main Glass Flacon Body -->
        <rect x="45" y="80" width="110" height="165" rx="8" fill="url(#glassGrad-${uniqueId})" stroke="#1C1917" stroke-width="1.5" />

        <!-- Liquid Extract Level -->
        <rect x="50" y="${liquidY}" width="100" height="${liquidHeight}" rx="4" fill="${glassColor}" opacity="0.45" />
        <path d="M50 ${liquidY} Q100 ${liquidY - 4} 150 ${liquidY} L150 245 L50 245 Z" fill="${glassColor}" opacity="0.25" />

        <!-- Flacon Shoulder Chamfer -->
        <path d="M45 88 Q45 80 55 76 L75 70 L125 70 L145 76 Q155 80 155 88 Z" fill="url(#glassGrad-${uniqueId})" opacity="0.6"/>

        <!-- Flacon Glass Neck -->
        <rect x="80" y="48" width="40" height="28" fill="url(#glassGrad-${uniqueId})" stroke="#1C1917" stroke-width="1.5" />
        <rect x="76" y="44" width="48" height="6" rx="2" fill="url(#glassGrad-${uniqueId})" stroke="#1C1917" stroke-width="1.2" />

        <!-- Cap / Stopper -->
        <rect x="74" y="12" width="52" height="34" rx="4" fill="url(#capGrad-${uniqueId})" stroke="#1C1917" stroke-width="1.5" />
        <line x1="74" y1="24" x2="126" y2="24" stroke="rgba(255,255,255,0.22)" stroke-width="1" />
        <circle cx="100" cy="29" r="3.2" fill="#D4AF37" opacity="0.85"/>

        <!-- Deckle-Edge Archival Parchment Label -->
        <rect x="55" y="115" width="90" height="105" rx="1.5" fill="url(#labelGrad-${uniqueId})" stroke="#CFC5B6" stroke-width="1" />
        <rect x="58" y="118" width="84" height="99" fill="none" stroke="#9A5B32" stroke-width="0.6" stroke-dasharray="2,1" />

        <!-- Label Typography -->
        <text x="100" y="132" font-family="'Playfair Display', serif" font-size="7" font-weight="600" fill="#1C1917" text-anchor="middle" letter-spacing="1">MAISON ALULA</text>
        <text x="100" y="141" font-family="'JetBrains Mono', monospace" font-size="4" fill="#9A5B32" text-anchor="middle" letter-spacing="0.5">${batch}</text>
        <line x1="68" y1="146" x2="132" y2="146" stroke="#E5DDD0" stroke-width="0.8" />

        <text x="100" y="159" font-family="'Playfair Display', serif" font-size="6" font-weight="600" fill="#1C1917" text-anchor="middle">${clientName}</text>
        <text x="100" y="169" font-family="'Plus Jakarta Sans', sans-serif" font-size="3.8" fill="#6B635B" text-anchor="middle">${concentration}</text>
        <text x="100" y="178" font-family="'JetBrains Mono', monospace" font-size="3.5" fill="#9C948A" text-anchor="middle">${volume}</text>
        <text x="100" y="187" font-family="'JetBrains Mono', monospace" font-size="3.2" fill="#9C948A" text-anchor="middle">COMPOUNDED IN ALULA</text>

        <!-- Crimson Monogram Wax Seal on Label -->
        <circle cx="100" cy="202" r="5.2" fill="#8B261D" stroke="#6E1A12" stroke-width="0.6"/>
        <text x="100" y="204.5" font-family="'Playfair Display', serif" font-size="5" font-weight="bold" fill="#FFF" text-anchor="middle">A</text>

        <!-- Left Longitudinal Light Specular Reflection -->
        <path d="M52 86 L52 238 Q52 242 56 242 L58 242 L58 86 Z" fill="#FFF" opacity="0.32" />
        <!-- Secondary Right Rim Highlight -->
        <path d="M144 86 L144 238 Q144 242 142 242 L141 242 L141 86 Z" fill="#FFF" opacity="0.15" />
      </svg>
    `;
  }

  private static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
}

/**
 * Procedural Wax Seal Canvas Animator
 */
export class WaxSealCanvasAnimator {
  public static drawSeal(config: IWaxSealConfig): void {
    const canvas = config.canvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const r = config.radiusPixels;

    ctx.clearRect(0, 0, width, height);

    // 1. Organic irregular molten wax edge
    ctx.save();
    ctx.beginPath();
    const points = 16;
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const variation = (Math.sin(angle * 5) + Math.cos(angle * 3)) * (r * 0.08);
      const curRadius = r + variation;
      const x = centerX + Math.cos(angle) * curRadius;
      const y = centerY + Math.sin(angle) * curRadius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Wax radial lighting
    const grad = ctx.createRadialGradient(centerX - r * 0.3, centerY - r * 0.3, r * 0.1, centerX, centerY, r);
    grad.addColorStop(0, '#B3392E');
    grad.addColorStop(0.6, config.sealColorHex || '#8B261D');
    grad.addColorStop(1, '#56130E');

    ctx.fillStyle = grad;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 6;
    ctx.fill();
    ctx.restore();

    // 2. Inner Stamped Rim
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, r * 0.72, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, r * 0.68, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // 3. Monogram Letter (e.g. 'A' for AlUla)
    ctx.save();
    ctx.font = `600 ${r * 0.65}px 'Playfair Display', serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 4;
    ctx.fillText(config.monogramChar || 'A', centerX, centerY + 2);
    ctx.restore();
  }
}

/**
 * Editorial Reader Progress & Footnote Tracker
 */
export class KinfolkReadingTracker {
  private progressBarElement: HTMLElement | null;
  private contentScrollElement: HTMLElement | null;

  constructor(progressBarSelector: string, scrollableSelector: string) {
    this.progressBarElement = document.querySelector(progressBarSelector);
    this.contentScrollElement = document.querySelector(scrollableSelector);
    this.bindEvents();
  }

  private bindEvents(): void {
    if (!this.contentScrollElement || !this.progressBarElement) return;

    this.contentScrollElement.addEventListener('scroll', () => {
      const el = this.contentScrollElement!;
      const total = el.scrollHeight - el.clientHeight;
      const progress = total > 0 ? (el.scrollTop / total) * 100 : 0;
      if (this.progressBarElement) {
        this.progressBarElement.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      }
    });
  }
}
