/**
 * MAISON ALULA HAUTE PARFUMERIE // CELLAR MACERATION & ESTERIFICATION KINETICS
 * ============================================================================
 * Mathematical modeling of carboxylic acid esterification, polyphenol oxidation,
 * and cryo-sedimentation during 540-day subterranean cellar maturation.
 *
 * Author: Tariq Abuashi (Master Perfumer & Olfactory Chemist)
 * Location: AlUla Old Town Cellars, Saudi Arabia
 * ============================================================================
 */

export interface IMacerationConditions {
  cellarTemperatureCelsius: number; // 14°C - 16°C subterranean ambient
  relativeHumidityPercent: number; // 45% - 55%
  amphoraPorosityPermeability: number; // Clay diffusion barrier rate
  initialAcidNumberMgKOHPerG: number; // Initial unesterified free fatty acids
  macerationDurationDays: number; // Standard 540 days (18 months)
}

export interface IMacerationMilestone {
  day: number;
  esterYieldPercent: number; // Conversion rate of free acids into aromatic esters
  harshTopNoteAttenuation: number; // Softening factor of initial sharp monoterpenes
  fixativePolymerizationIndex: number; // Binding of resinoids to floral absolutes
  perceivedAromaSmoothnessScore: number; // 0.0 - 10.0 sensory maturity
  cellarStabilityClassification: 'Turbulent' | 'Forming' | 'Macerated' | 'Vintage Grand Cru';
}

export class CellarMacerationEngine {
  private conditions: IMacerationConditions;

  constructor(customConditions?: Partial<IMacerationConditions>) {
    this.conditions = {
      cellarTemperatureCelsius: 15.0,
      relativeHumidityPercent: 50.0,
      amphoraPorosityPermeability: 0.012,
      initialAcidNumberMgKOHPerG: 4.8,
      macerationDurationDays: 540,
      ...customConditions
    };
  }

  /**
   * Arrhenius reaction rate constant for natural acid-alcohol esterification:
   * k = A * exp(-Ea / (R * T))
   */
  public calculateEsterificationRateConstant(): number {
    const activationEnergyJPerMol = 58500.0; // Typical esterification of botanical acids
    const gasConstantR = 8.314;
    const tempKelvin = this.conditions.cellarTemperatureCelsius + 273.15;
    const preExponentialFactorA = 1.2e6;

    return preExponentialFactorA * Math.exp(-activationEnergyJPerMol / (gasConstantR * tempKelvin));
  }

  /**
   * Computes maturation milestones over the 540-day aging trajectory
   */
  public simulateMacerationTrajectory(): IMacerationMilestone[] {
    const k = this.calculateEsterificationRateConstant();
    const milestones: IMacerationMilestone[] = [];
    const checkpoints = [0, 14, 30, 60, 90, 180, 270, 360, 450, 540];

    checkpoints.forEach(day => {
      // First-order esterification kinetics: Conversion = 1 - exp(-k * t_effective)
      // Scaled by micro-aeration through porous earthenware amphora
      const timeFactor = day * 24.0 * 3600.0 * 0.0000000045;
      const esterYield = (1.0 - Math.exp(-k * timeFactor * 1e7)) * 100.0;
      const boundedYield = Math.min(98.5, Math.max(0.0, esterYield));

      // Harshness attenuation follows inverse exponential decay
      const attenuation = (1.0 - Math.exp(-day / 45.0)) * 100.0;

      // Heavy resin polymerization (Oud & Frankincense bonding with Rose ketones)
      const polymerIndex = Math.min(1.0, (day / 540.0) ** 0.65);

      // Sensory smoothness rating (0 - 10)
      const smoothness = 2.0 + (boundedYield * 0.055) + (polymerIndex * 2.5);

      let classification: 'Turbulent' | 'Forming' | 'Macerated' | 'Vintage Grand Cru' = 'Turbulent';
      if (day >= 360) classification = 'Vintage Grand Cru';
      else if (day >= 90) classification = 'Macerated';
      else if (day >= 30) classification = 'Forming';

      milestones.push({
        day,
        esterYieldPercent: Math.round(boundedYield * 10) / 10,
        harshTopNoteAttenuation: Math.round(attenuation * 10) / 10,
        fixativePolymerizationIndex: Math.round(polymerIndex * 100) / 100,
        perceivedAromaSmoothnessScore: Math.round(smoothness * 10) / 10,
        cellarStabilityClassification: classification
      });
    });

    return milestones;
  }

  /**
   * Validates if a perfume batch has reached release maturity
   */
  public isReleaseReady(elapsedDays: number): boolean {
    return elapsedDays >= 180 && this.conditions.cellarTemperatureCelsius <= 18.0;
  }
}
