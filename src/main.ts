/**
 * MAISON ALULA HAUTE PARFUMERIE // MAIN BUNDLE ENTRY POINT
 * ============================================================================
 * Initializes all core subsystems: Olfactory Chemistry Engine,
 * Cart State Machine, Catalog Service, and Editorial DOM Renderers.
 * ============================================================================
 */

import { OlfactoryChemistryEngine, ARABIAN_BOTANICAL_DATABASE } from './core/olfactory_chemistry';
import { CartStateMachine } from './store/cart_state_machine';
import { ParfumerieCatalogService } from './catalog/parfumerie_catalog';
import { EditorialBottleRenderer, WaxSealCanvasAnimator } from './ui/editorial_renderer';

export class MaisonAlUlaApp {
  public chemistry: OlfactoryChemistryEngine;
  public cart: CartStateMachine;
  public catalog: ParfumerieCatalogService;

  constructor() {
    this.chemistry = new OlfactoryChemistryEngine(25.0, 760.0);
    this.cart = new CartStateMachine();
    this.catalog = new ParfumerieCatalogService();
    this.bootstrapSubsystems();
  }

  private bootstrapSubsystems(): void {
    console.log(
      '%c MAISON ALULA %c Haute Parfumerie & Bespoke Scent Atelier ',
      'background: #1C1917; color: #FAF7F2; font-family: serif; font-size: 14px; padding: 4px 8px;',
      'background: #9A5B32; color: #FFFFFF; font-family: sans-serif; font-size: 12px; padding: 4px 8px;'
    );

    // Subscribe cart machine to badge updates
    this.cart.subscribe((_state, _items, summary) => {
      const badges = document.querySelectorAll('.bag-count');
      badges.forEach(b => {
        b.textContent = summary.itemCount.toString();
      });
    });
  }

  public renderBespokeBottle(
    targetSelector: string,
    clientName: string,
    glassColor: string = '#9A5B32',
    capColor: string = '#C5A059'
  ): void {
    const el = document.querySelector(targetSelector);
    if (!el) return;

    el.innerHTML = EditorialBottleRenderer.renderBottleSvg({
      glassTintHex: glassColor,
      capFinishHex: capColor,
      capStyle: 'antique-brass',
      clientName,
      batchCode: 'ALULA-2026-F91',
      volumeLabel: '50 ML // 1.7 FL. OZ.',
      concentrationLabel: 'EXTRAIT ABSOLU (35%)',
      liquidFillLevelPercent: 88
    });
  }

  public renderWaxSeal(canvasElement: HTMLCanvasElement): void {
    WaxSealCanvasAnimator.drawSeal({
      sealColorHex: '#8B261D',
      monogramChar: 'A',
      radiusPixels: 36,
      canvasElement
    });
  }
}

// Global window registration for multi-page scripts
declare global {
  interface Window {
    maisonAppInstance?: MaisonAlUlaApp;
  }
}

if (typeof window !== 'undefined') {
  window.maisonAppInstance = new MaisonAlUlaApp();
}
