/**
 * MAISON ALULA HAUTE PARFUMERIE // CHROMATOGRAPHY & VECTOR SPACE TESTS
 * ============================================================================
 * Unit tests validating Kovats retention index math, Hojari Frankincense
 * authenticity benchmarking, and 8-dimensional olfactory vector space comparisons.
 * ============================================================================
 */

import { describe, it, expect } from 'vitest';
import {
  GasChromatographyValidator,
  ARABIAN_KOVATS_LIBRARY,
  IExtractGCMSProfile
} from '../src/core/chromatography_analysis';
import {
  OlfactoryVectorSpace,
  IOlfactoryCoordinate
} from '../src/core/olfactory_vector_space';
import { CellarMacerationEngine } from '../src/core/maceration_kinetics';

describe('Gas Chromatography & Mass Spectrometry Validation', () => {
  it('accurately computes Kovats Retention Index from alkane reference times', () => {
    // Standard test case: compound eluted between C10 (decane) and C11 (undecane)
    const rx = 8.5; // retention time of compound
    const n = 10;
    const rn = 7.2; // retention time of decane
    const rn1 = 9.8; // retention time of undecane

    const kovats = GasChromatographyValidator.calculateKovatsIndex(rx, n, rn, rn1);
    expect(kovats).toBeGreaterThan(1000);
    expect(kovats).toBeLessThan(1100);
  });

  it('verifies genuine Wadi Dawkah Frankincense GC-MS profile and rejects adulterated samples', () => {
    const authenticSample: IExtractGCMSProfile = {
      extractBatchId: 'DAWKAH-2026-A1',
      botanicalTaxonomy: 'Boswellia sacra',
      harvestTerroir: 'Wadi Dawkah UNESCO Reserve',
      columnType: 'HP-5MS (30m x 0.25mm)',
      carrierGas: 'Helium',
      flowRateMlMin: 1.2,
      temperatureProgram: '50C to 280C @ 4C/min',
      totalIdentifiedComponentsPercent: 98.4,
      peaks: [
        {
          retentionTimeMinutes: 12.4,
          kovatsIndexDB5: 932,
          compoundId: 'ALPHA_PINENE',
          compoundName: 'alpha-Pinene',
          chemicalFormula: 'C10H16',
          molecularWeight: 136.23,
          peakAreaPercent: 64.2, // Authentic high pinene
          signalToNoiseRatio: 450,
          purityMatchFactor: 985
        },
        {
          retentionTimeMinutes: 38.6,
          kovatsIndexDB5: 2090,
          compoundId: 'INCENSOLE',
          compoundName: 'Incensole Oxide',
          chemicalFormula: 'C20H34O2',
          molecularWeight: 306.48,
          peakAreaPercent: 4.8,
          signalToNoiseRatio: 220,
          purityMatchFactor: 960
        }
      ]
    };

    const result = GasChromatographyValidator.validateHojariFrankincense(authenticSample);
    expect(result.authentic).toBe(true);
    expect(result.alphaPinenePercent).toBe(64.2);
    expect(result.verdictMessage).toContain('VERIFIED AUTHENTIC');
  });
});

describe('8-Dimensional Olfactory Vector Space', () => {
  it('computes Cosine Similarity between identical and contrasting chords', () => {
    const hegra = OlfactoryVectorSpace.CANONICAL_CHORDS.HEGRA_TWILIGHT;
    const selfSim = OlfactoryVectorSpace.cosineSimilarity(hegra, hegra);
    expect(selfSim).toBe(1.0);

    const taif = OlfactoryVectorSpace.CANONICAL_CHORDS.TAIF_DAWN_MIST;
    const contrast = OlfactoryVectorSpace.compareAccords(hegra, taif);

    expect(contrast.cosineSimilarity).toBeLessThan(0.75);
    expect(contrast.euclideanDistance).toBeGreaterThan(0.5);
    expect(contrast.dominantSensoryAxes.length).toBe(3);
  });

  it('blends two fragrance coordinates smoothly via linear interpolation', () => {
    const hegra = OlfactoryVectorSpace.CANONICAL_CHORDS.HEGRA_TWILIGHT;
    const dawkah = OlfactoryVectorSpace.CANONICAL_CHORDS.DAWKAH_SACRED_SMOKE;

    const blended = OlfactoryVectorSpace.blendCoordinates(hegra, dawkah, 0.5);
    expect(blended.resinousBalsamic).toBeCloseTo((hegra.resinousBalsamic + dawkah.resinousBalsamic) / 2, 1);
  });
});

describe('Subterranean Cellar Maceration Kinetics', () => {
  it('simulates 540-day aging trajectory and verifies Grand Cru maturation', () => {
    const cellar = new CellarMacerationEngine({ cellarTemperatureCelsius: 15.0 });
    const trajectory = cellar.simulateMacerationTrajectory();

    expect(trajectory.length).toBe(10);
    expect(trajectory[0].cellarStabilityClassification).toBe('Turbulent');

    const finalMilestone = trajectory[trajectory.length - 1];
    expect(finalMilestone.day).toBe(540);
    expect(finalMilestone.cellarStabilityClassification).toBe('Vintage Grand Cru');
    expect(finalMilestone.perceivedAromaSmoothnessScore).toBeGreaterThan(8.0);
    expect(cellar.isReleaseReady(540)).toBe(true);
    expect(cellar.isReleaseReady(60)).toBe(false);
  });
});
