/**
 * MAISON ALULA HAUTE PARFUMERIE // AUTOMATED TEST SUITE
 * ============================================================================
 * Vitest / Jest unit tests verifying olfactory physical chemistry, Antoine
 * vapor pressure equations, Raoult's law mixtures, cart state machine transitions,
 * VIP promo discount arithmetic, and catalog fuzzy search index.
 * ============================================================================
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  OlfactoryChemistryEngine,
  ARABIAN_BOTANICAL_DATABASE,
  IFragranceNoteComposition
} from '../src/core/olfactory_chemistry';
import { CartStateMachine } from '../src/store/cart_state_machine';
import {
  ParfumerieCatalogService,
  MASTER_CATALOG_DATABASE
} from '../src/catalog/parfumerie_catalog';

describe('Olfactory Physical Chemistry Engine', () => {
  let engine: OlfactoryChemistryEngine;

  beforeEach(() => {
    engine = new OlfactoryChemistryEngine(25.0, 760.0);
  });

  it('correctly calculates pure saturation vapor pressure using Antoine equation', () => {
    const pinene = ARABIAN_BOTANICAL_DATABASE.ALPHA_PINENE;
    const ambroxan = ARABIAN_BOTANICAL_DATABASE.AMBROXAN;

    const pPinene = engine.calculatePureVaporPressureMmHg(pinene, 25.0);
    const pAmbroxan = engine.calculatePureVaporPressureMmHg(ambroxan, 25.0);

    // Alpha-pinene is a volatile top-note terpene (bp 156°C), vapor pressure must be > 1.0 mmHg
    expect(pPinene).toBeGreaterThan(1.0);
    expect(pPinene).toBeLessThan(10.0);

    // Ambroxan is a heavy fixative (bp 312°C), vapor pressure must be very low (< 0.01 mmHg)
    expect(pAmbroxan).toBeLessThan(0.01);
    expect(pAmbroxan).toBeGreaterThan(0.00001);

    // Top notes evaporate orders of magnitude faster than fixatives
    expect(pPinene / pAmbroxan).toBeGreaterThan(100);
  });

  it('models multi-component Raoult’s law vapor pressures accurately', () => {
    const formula: IFragranceNoteComposition[] = [
      {
        compound: ARABIAN_BOTANICAL_DATABASE.LIMONENE,
        moleFraction: 0.3,
        activityCoefficient: 1.0,
        botanicalOrigin: 'Desert Citrus Terroir'
      },
      {
        compound: ARABIAN_BOTANICAL_DATABASE.CITRONELLOL,
        moleFraction: 0.4,
        activityCoefficient: 1.05,
        botanicalOrigin: 'Taif Mist Highlands'
      },
      {
        compound: ARABIAN_BOTANICAL_DATABASE.AGAROSPIROL,
        moleFraction: 0.3,
        activityCoefficient: 1.1,
        botanicalOrigin: 'Cellar Aged Oud'
      }
    ];

    const partials = engine.calculateMixtureVaporPressures(formula);
    expect(partials.size).toBe(3);

    const pLimonene = partials.get('LIMONENE_D')!;
    const pCitronellol = partials.get('CITRONELLOL')!;
    const pAgarospirol = partials.get('AGAROSPIROL')!;

    expect(pLimonene).toBeGreaterThan(pCitronellol);
    expect(pCitronellol).toBeGreaterThan(pAgarospirol);
  });

  it('simulates 24-hour evaporation kinetics and verifies monotonic mass dissipation', () => {
    const formula: IFragranceNoteComposition[] = [
      {
        compound: ARABIAN_BOTANICAL_DATABASE.ALPHA_PINENE,
        moleFraction: 0.25,
        activityCoefficient: 1.0,
        botanicalOrigin: 'Wadi Dawkah'
      },
      {
        compound: ARABIAN_BOTANICAL_DATABASE.CITRONELLOL,
        moleFraction: 0.40,
        activityCoefficient: 1.0,
        botanicalOrigin: 'Taif Plateau'
      },
      {
        compound: ARABIAN_BOTANICAL_DATABASE.AGAROSPIROL,
        moleFraction: 0.35,
        activityCoefficient: 1.0,
        botanicalOrigin: 'AlUla Earthen Amphora'
      }
    ];

    const trajectory = engine.simulateEvaporationTrajectory(formula, 24);
    expect(trajectory.length).toBe(25); // 0h to 24h inclusive

    // Initial state check
    expect(trajectory[0].hour).toBe(0);
    expect(trajectory[0].topNoteRemainingPct).toBe(100);
    expect(trajectory[0].baseNoteRemainingPct).toBe(100);

    // 24-hour residual state check
    const finalStep = trajectory[24];
    expect(finalStep.residualMassFraction).toBeLessThan(1.0);
    expect(finalStep.residualMassFraction).toBeGreaterThan(0.5); // Extrait retains high base mass
    expect(finalStep.topNoteRemainingPct).toBeLessThan(finalStep.baseNoteRemainingPct);
  });

  it('evaluates accord harmony score against golden ratio (25/40/35)', () => {
    // Perfectly balanced Haute Parfumerie accord
    const idealFormula: IFragranceNoteComposition[] = [
      { compound: ARABIAN_BOTANICAL_DATABASE.LIMONENE, moleFraction: 0.25, activityCoefficient: 1.0, botanicalOrigin: 'Origin' },
      { compound: ARABIAN_BOTANICAL_DATABASE.CITRONELLOL, moleFraction: 0.40, activityCoefficient: 1.0, botanicalOrigin: 'Origin' },
      { compound: ARABIAN_BOTANICAL_DATABASE.SANTALOL_ALPHA, moleFraction: 0.35, activityCoefficient: 1.0, botanicalOrigin: 'Origin' }
    ];

    const harmony = engine.evaluateAccordHarmony(idealFormula);
    expect(harmony.harmonyScore).toBeGreaterThanOrEqual(95);
    expect(harmony.volatilityBalanceDeviation).toBeLessThan(2.0);
    expect(harmony.sillageClassification).toBe('Majestic');
  });
});

describe('Cart State Machine & Financial Transactions', () => {
  let cartMachine: CartStateMachine;

  beforeEach(() => {
    cartMachine = new CartStateMachine();
    cartMachine.clearCart();
  });

  it('correctly tracks items, aggregates quantities, and computes KSA 15% VAT', () => {
    cartMachine.addItem({
      id: 'ombre-elephant',
      name_en: "L'Ombre d'Éléphant",
      name_ar: 'ظل صخرة الفيل',
      price: 920,
      size: '50ml Flacon',
      qty: 2
    });

    const summary = cartMachine.computeSummary();
    expect(summary.itemCount).toBe(2);
    expect(summary.subtotalSAR).toBe(1840);
    expect(summary.vatSAR).toBe(Math.round(1840 * 0.15));
    expect(summary.shippingSAR).toBe(0); // Free worldwide courier
    expect(summary.grandTotalSAR).toBe(1840);
  });

  it('applies VIP coupon ALULA15 for exactly 15% discount', () => {
    cartMachine.addItem({
      id: 'dedicace-nabateenne',
      name_en: 'Dédicace Nabatéenne',
      name_ar: 'النذور النبطية',
      price: 1000,
      size: '50ml Flacon',
      qty: 1
    });

    const result = cartMachine.applyPromoCode('ALULA15');
    expect(result.success).toBe(true);
    expect(result.discountPercent).toBe(15);

    const summary = cartMachine.computeSummary();
    expect(summary.discountSAR).toBe(150);
    expect(summary.grandTotalSAR).toBe(850);
  });

  it('rejects fraudulent or invalid promo codes gracefully', () => {
    const result = cartMachine.applyPromoCode('INVALID_CODE_999');
    expect(result.success).toBe(false);
    expect(result.discountPercent).toBe(0);
  });

  it('generates an authentic numbered Certificate with cryptographic digital seal', () => {
    cartMachine.addItem({
      id: 'petales-taif',
      name_en: 'Pétales de Taïf',
      name_ar: 'بتلات الطائف النادرة',
      price: 860,
      size: '50ml Flacon',
      qty: 1
    });

    const cert = cartMachine.generateArchivalCertificate('أ. طارق ابوعشي');
    expect(cert.certificateId).toMatch(/^AL-\d{4}-\d{4}$/);
    expect(cert.issuedTo).toBe('أ. طارق ابوعشي');
    expect(cert.masterPerfumerSignature).toBe('Tariq Abuashi');
    expect(cert.digitalSealHash).toMatch(/^0x[0-9A-F]{8}$/);
    expect(cert.registeredLots.length).toBe(1);
  });
});

describe('Parfumerie Catalog & Multi-Facet Search', () => {
  let catalogService: ParfumerieCatalogService;

  beforeEach(() => {
    catalogService = new ParfumerieCatalogService();
  });

  it('contains exactly 13 artisanal master lots across 4 luxury categories', () => {
    const all = catalogService.query();
    expect(all.length).toBe(13);

    const facets = catalogService.getFacets();
    expect(facets.totalCount).toBe(13);
    expect(facets.byCategory.parfum).toBe(4);
    expect(facets.byCategory.incense).toBe(3);
    expect(facets.byCategory.oils).toBe(3);
    expect(facets.byCategory.ceramics).toBe(3);
  });

  it('filters accurately by category and olfactory family', () => {
    const extraits = catalogService.query({ category: 'parfum' });
    expect(extraits.length).toBe(4);
    expect(extraits.every(e => e.category === 'parfum')).toBe(true);

    const woody = catalogService.query({ family: 'woody' });
    expect(woody.length).toBeGreaterThan(0);
    expect(woody.every(w => w.family === 'woody')).toBe(true);
  });

  it('performs bilingual fuzzy search with Levenshtein tolerance', () => {
    // English search
    const elephant = catalogService.query({ searchQuery: 'Elephant' });
    expect(elephant.length).toBe(1);
    expect(elephant[0].id).toBe('ombre-elephant');

    // Arabic search
    const taif = catalogService.query({ searchQuery: 'الطائف' });
    expect(taif.length).toBeGreaterThan(0);
    expect(taif.some(t => t.id === 'petales-taif')).toBe(true);

    // Ingredient search
    const frankincense = catalogService.query({ searchQuery: 'Frankincense' });
    expect(frankincense.length).toBeGreaterThan(0);
  });
});
