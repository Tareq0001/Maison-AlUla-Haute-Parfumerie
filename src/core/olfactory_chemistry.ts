/**
 * MAISON ALULA HAUTE PARFUMERIE // CORE OLFACTORY CHEMISTRY ENGINE
 * ============================================================================
 * Mathematical modeling of perfume evaporation kinetics, multi-component
 * Raoult's Law vapor pressures, Antoine equation constants for natural desert
 * terpenes and heavy fixative molecules, and Gaussian diffusion sillage radius.
 *
 * Formulated for Maison AlUla (Al-Dira Quarter, AlUla, Saudi Arabia)
 * Author: Tariq Abuashi (Master Perfumer & Olfactory Chemist)
 * ============================================================================
 */

export interface IMolecularCompound {
  id: string;
  chemicalName: string;
  casNumber: string;
  molecularWeight: number; // g/mol
  boilingPointCelsius: number;
  antoineA: number; // Antoine equation constant A (log10(P/mmHg))
  antoineB: number; // Antoine equation constant B
  antoineC: number; // Antoine equation constant C
  volatilityTier: 'TOP' | 'HEART' | 'BASE' | 'FIXATIVE';
  odorThresholdPpm: number; // Human olfactory detection threshold in parts-per-million
  diffusionCoefficientCm2s: number; // Air diffusion coefficient in cm^2/s at 25°C
  sensoryProfile: string[];
}

export interface IFragranceNoteComposition {
  compound: IMolecularCompound;
  moleFraction: number; // xi (0.0 to 1.0, sum = 1.0)
  activityCoefficient: number; // gamma_i (Margules or UNIFAC estimation)
  botanicalOrigin: string;
}

export interface IEvaporationTimeStep {
  hour: number;
  residualMassFraction: number;
  topNoteRemainingPct: number;
  heartNoteRemainingPct: number;
  baseNoteRemainingPct: number;
  instantaneousVaporPressureKPa: number;
  estimatedSillageRadiusMeters: number;
  dominantAccord: string;
}

export interface IAccordHarmonyResult {
  harmonyScore: number; // 0.0 - 100.0
  olfactoryChordDescription: string;
  longevityHalfLifeHours: number;
  sillageClassification: 'Intimate' | 'Radiant' | 'Expansive' | 'Majestic';
  volatilityBalanceDeviation: number;
}

/**
 * Standard Library of Key Natural Arabian Desert Fragrance Compounds
 * Grounded in peer-reviewed GC-MS analyses of Boswellia sacra, Taif Damask Rose,
 * and Aquilaria agallocha extracts.
 */
export const ARABIAN_BOTANICAL_DATABASE: Record<string, IMolecularCompound> = {
  ALPHA_PINENE: {
    id: 'PIN_ALPHA',
    chemicalName: '(1S,5S)-2,6,6-Trimethylbicyclo[3.1.1]hept-2-ene',
    casNumber: '80-56-8',
    molecularWeight: 136.23,
    boilingPointCelsius: 156.2,
    antoineA: 6.9423,
    antoineB: 1453.4,
    antoineC: 215.3,
    volatilityTier: 'TOP',
    odorThresholdPpm: 0.018,
    diffusionCoefficientCm2s: 0.062,
    sensoryProfile: ['Pine Sap', 'Resinous Citrus', 'Sharp Terpenic', 'Airy Clean']
  },
  LIMONENE: {
    id: 'LIMONENE_D',
    chemicalName: '(4R)-1-Methyl-4-(prop-1-en-2-yl)cyclohex-1-ene',
    casNumber: '5989-27-5',
    molecularWeight: 136.24,
    boilingPointCelsius: 176.0,
    antoineA: 7.0145,
    antoineB: 1542.8,
    antoineC: 210.1,
    volatilityTier: 'TOP',
    odorThresholdPpm: 0.035,
    diffusionCoefficientCm2s: 0.058,
    sensoryProfile: ['Sweet Orange Peel', 'Solar Citrus', 'Sparkling', 'Uplifting']
  },
  LINALOOL: {
    id: 'LINALOOL',
    chemicalName: '3,7-Dimethylocta-1,6-dien-3-ol',
    casNumber: '78-70-6',
    molecularWeight: 154.25,
    boilingPointCelsius: 198.0,
    antoineA: 7.214,
    antoineB: 1682.2,
    antoineC: 195.4,
    volatilityTier: 'TOP',
    odorThresholdPpm: 0.006,
    diffusionCoefficientCm2s: 0.051,
    sensoryProfile: ['Bergamot Blossom', 'Lavender Herbaceous', 'Fresh Woody', 'Floral']
  },
  CITRONELLOL: {
    id: 'CITRONELLOL',
    chemicalName: '3,7-Dimethyloct-6-en-1-ol',
    casNumber: '106-22-9',
    molecularWeight: 156.27,
    boilingPointCelsius: 225.0,
    antoineA: 7.4201,
    antoineB: 1812.5,
    antoineC: 188.0,
    volatilityTier: 'HEART',
    odorThresholdPpm: 0.012,
    diffusionCoefficientCm2s: 0.046,
    sensoryProfile: ['Taif Damask Rose', 'Sweet Petal', 'Waxy Green', 'Dewy Floral']
  },
  GERANIOL: {
    id: 'GERANIOL',
    chemicalName: '(2E)-3,7-Dimethylocta-2,6-dien-1-ol',
    casNumber: '106-24-1',
    molecularWeight: 154.25,
    boilingPointCelsius: 229.0,
    antoineA: 7.3892,
    antoineB: 1805.1,
    antoineC: 185.3,
    volatilityTier: 'HEART',
    odorThresholdPpm: 0.007,
    diffusionCoefficientCm2s: 0.047,
    sensoryProfile: ['Rose Velvet', 'Dry Geranium', 'Sweet Honeycomb', 'Crisp Floral']
  },
  INCENSOLE_OXIDE: {
    id: 'INCENSOLE_OX',
    chemicalName: '(1R,4aR,8aR,10aS)-1-Isopropyl-4a,7,10a-trimethyldodecahydrobenzo[f]chromene',
    casNumber: '22485-26-9',
    molecularWeight: 306.48,
    boilingPointCelsius: 342.0,
    antoineA: 8.1205,
    antoineB: 2450.0,
    antoineC: 140.0,
    volatilityTier: 'HEART',
    odorThresholdPpm: 0.0025,
    diffusionCoefficientCm2s: 0.034,
    sensoryProfile: ['Hojari Frankincense', 'Sacred Incense', 'Silver Smoke', 'Balsamic']
  },
  AGAROSPIROL: {
    id: 'AGAROSPIROL',
    chemicalName: '(2R,4aR,8aS)-2,8a-Dimethyl-4a-(prop-1-en-2-yl)octahydronaphthalen-2-ol',
    casNumber: '1460-73-7',
    molecularWeight: 222.37,
    boilingPointCelsius: 288.0,
    antoineA: 7.854,
    antoineB: 2190.4,
    antoineC: 165.2,
    volatilityTier: 'BASE',
    odorThresholdPpm: 0.0008,
    diffusionCoefficientCm2s: 0.038,
    sensoryProfile: ['Aged Cambodian Oud', 'Balsamic Resin', 'Dark Earthen', 'Animalic Wood']
  },
  SANTALOL_ALPHA: {
    id: 'SANTALOL_A',
    chemicalName: '(2Z)-5-[(1S,2R,4R,5S)-2,3-Dimethyltricyclo[2.2.1.02,6]hept-3-yl]-2-methylpent-2-en-1-ol',
    casNumber: '115-71-9',
    molecularWeight: 220.35,
    boilingPointCelsius: 301.0,
    antoineA: 7.921,
    antoineB: 2280.0,
    antoineC: 158.0,
    volatilityTier: 'BASE',
    odorThresholdPpm: 0.0014,
    diffusionCoefficientCm2s: 0.039,
    sensoryProfile: ['Mysore Sandalwood', 'Buttery Wood', 'Lactonic Warmth', 'Precious Cedar']
  },
  AMBROXAN: {
    id: 'AMBROXAN_PURE',
    chemicalName: '(3aR,5aS,9aS,9bR)-3a,6,6,9a-Tetramethyldodecahydronaphtho[2,1-b]furan',
    casNumber: '6790-58-5',
    molecularWeight: 236.39,
    boilingPointCelsius: 312.0,
    antoineA: 8.051,
    antoineB: 2350.2,
    antoineC: 150.0,
    volatilityTier: 'FIXATIVE',
    odorThresholdPpm: 0.0002,
    diffusionCoefficientCm2s: 0.035,
    sensoryProfile: ['Red Sea Ambergris', 'Mineral Salt Skin', 'Velvet Radiance', 'Fixative']
  },
  GEOSMIN: {
    id: 'GEOSMIN_DESERT',
    chemicalName: '(4S,4aS,8aR)-4,8a-Dimethyldecahydronaphthalen-4a-ol',
    casNumber: '19700-21-4',
    molecularWeight: 182.3,
    boilingPointCelsius: 248.0,
    antoineA: 7.620,
    antoineB: 1995.0,
    antoineC: 175.0,
    volatilityTier: 'HEART',
    odorThresholdPpm: 0.000005, // 5 parts per trillion!
    diffusionCoefficientCm2s: 0.044,
    sensoryProfile: ['Desert Petrichor', 'Sun-Baked Sandstone', 'Rain on Dry Clay', 'Mineral']
  }
};

/**
 * Olfactory Chemistry Calculation Engine
 */
export class OlfactoryChemistryEngine {
  private ambientTemperatureCelsius: number;
  private ambientPressureMmHg: number;
  private airExchangeRatePerHour: number;

  constructor(
    ambientTemperatureCelsius: number = 25.0,
    ambientPressureMmHg: number = 760.0,
    airExchangeRatePerHour: number = 0.8
  ) {
    this.ambientTemperatureCelsius = ambientTemperatureCelsius;
    this.ambientPressureMmHg = ambientPressureMmHg;
    this.airExchangeRatePerHour = airExchangeRatePerHour;
  }

  /**
   * Calculates saturation vapor pressure of a pure compound at given temperature
   * using the Antoine Equation:
   * log10(P [mmHg]) = A - (B / (T [°C] + C))
   */
  public calculatePureVaporPressureMmHg(compound: IMolecularCompound, tempC?: number): number {
    const t = tempC !== undefined ? tempC : this.ambientTemperatureCelsius;
    const exponent = compound.antoineA - (compound.antoineB / (t + compound.antoineC));
    const pressureMmHg = Math.pow(10, exponent);
    return Math.max(0.000001, pressureMmHg);
  }

  /**
   * Converts mmHg to kiloPascals (1 mmHg = 0.133322 kPa)
   */
  public mmHgToKPa(mmHg: number): number {
    return mmHg * 0.133322368;
  }

  /**
   * Multi-Component Raoult's Law Partial Vapor Pressures:
   * P_i = x_i * gamma_i * P_i*
   */
  public calculateMixtureVaporPressures(
    formula: IFragranceNoteComposition[],
    tempC?: number
  ): Map<string, number> {
    const t = tempC !== undefined ? tempC : this.ambientTemperatureCelsius;
    const partialPressures = new Map<string, number>();

    // Normalize mole fractions
    const totalMoles = formula.reduce((sum, item) => sum + item.moleFraction, 0);
    const safeTotal = totalMoles > 0 ? totalMoles : 1.0;

    formula.forEach(item => {
      const normalizedX = item.moleFraction / safeTotal;
      const pureP = this.calculatePureVaporPressureMmHg(item.compound, t);
      const partialP = normalizedX * item.activityCoefficient * pureP;
      partialPressures.set(item.compound.id, partialP);
    });

    return partialPressures;
  }

  /**
   * Simulates non-steady state evaporation kinetics over a 24-hour cycle
   * according to Langmuir-Knudsen evaporation model:
   * dm/dt = - k * A * (M / 2*pi*R*T)^0.5 * (P_sat - P_ambient)
   */
  public simulateEvaporationTrajectory(
    formula: IFragranceNoteComposition[],
    durationHours: number = 24,
    exposedAreaCm2: number = 12.0
  ): IEvaporationTimeStep[] {
    const steps: IEvaporationTimeStep[] = [];
    
    // Initial masses based on normalized fractions
    const currentMasses = new Map<string, number>();
    const initialMasses = new Map<string, number>();
    const totalMoles = formula.reduce((sum, item) => sum + item.moleFraction, 0);
    const safeTotal = totalMoles > 0 ? totalMoles : 1.0;

    formula.forEach(item => {
      const normMol = item.moleFraction / safeTotal;
      const massGrams = normMol * (item.compound.molecularWeight / 100.0);
      currentMasses.set(item.compound.id, massGrams);
      initialMasses.set(item.compound.id, massGrams);
    });

    const initialTotalMass = Array.from(initialMasses.values()).reduce((a, b) => a + b, 0);

    for (let h = 0; h <= durationHours; h++) {
      // Calculate current tier totals
      let topCurrent = 0, topInit = 0;
      let heartCurrent = 0, heartInit = 0;
      let baseCurrent = 0, baseInit = 0;
      let totalCurrent = 0;
      let totalVaporPressureMmHg = 0;

      formula.forEach(item => {
        const id = item.compound.id;
        const curM = currentMasses.get(id) || 0;
        const initM = initialMasses.get(id) || 0.001;
        totalCurrent += curM;

        if (item.compound.volatilityTier === 'TOP') {
          topCurrent += curM;
          topInit += initM;
        } else if (item.compound.volatilityTier === 'HEART') {
          heartCurrent += curM;
          heartInit += initM;
        } else {
          baseCurrent += curM;
          baseInit += initM;
        }

        // Add vapor pressure contribution
        const pureP = this.calculatePureVaporPressureMmHg(item.compound);
        const moleEst = curM / item.compound.molecularWeight;
        totalVaporPressureMmHg += (moleEst * pureP * item.activityCoefficient);
      });

      // Gaussian diffusion sillage radius estimation (meters)
      // Radius ~ sqrt(2 * D * t) scaled by log vapor pressure
      const effectiveD = 0.045; // average diffusion coefficient
      const sillageRadius = Math.min(
        4.5,
        Math.max(0.3, Math.sqrt(2 * effectiveD * (h + 0.1) * 3600) * (totalVaporPressureMmHg / 2.0))
      );

      // Determine dominant accord
      let dominant = 'Sacred Sandstone & Resins';
      if (topCurrent / (topInit || 1) > 0.45 && h < 2) {
        dominant = 'Sparkling Taif Bergamot & Citrus Terpenes';
      } else if (heartCurrent / (heartInit || 1) > 0.35 && h < 8) {
        dominant = 'Taif Damask Rose & Hojari Frankincense';
      } else {
        dominant = 'Aged Cambodian Oud & Red Sea Ambergris';
      }

      steps.push({
        hour: h,
        residualMassFraction: totalCurrent / (initialTotalMass || 1),
        topNoteRemainingPct: Math.round(((topCurrent / (topInit || 1)) * 100) * 10) / 10,
        heartNoteRemainingPct: Math.round(((heartCurrent / (heartInit || 1)) * 100) * 10) / 10,
        baseNoteRemainingPct: Math.round(((baseCurrent / (baseInit || 1)) * 100) * 10) / 10,
        instantaneousVaporPressureKPa: Math.round(this.mmHgToKPa(totalVaporPressureMmHg) * 1000) / 1000,
        estimatedSillageRadiusMeters: Math.round(sillageRadius * 100) / 100,
        dominantAccord: dominant
      });

      // Apply Langmuir evaporation step for next hour (dt = 3600s)
      formula.forEach(item => {
        const id = item.compound.id;
        const curM = currentMasses.get(id) || 0;
        const pMmHg = this.calculatePureVaporPressureMmHg(item.compound);
        
        // Evaporation rate constant (g / cm^2 * s)
        const rateK = 0.00000028 * Math.sqrt(item.compound.molecularWeight) * pMmHg;
        const evaporatedGrams = rateK * exposedAreaCm2 * 3600 * 0.15; // attenuated by skin lipid layer
        const remaining = Math.max(0, curM - evaporatedGrams);
        currentMasses.set(id, remaining);
      });
    }

    return steps;
  }

  /**
   * Evaluates the Olfactory Harmony Score (0 - 100) and stability index
   * based on the golden ratio of evaporation kinetics:
   * Ideal Extrait ratio: 20-30% Top, 35-45% Heart, 30-40% Base.
   */
  public evaluateAccordHarmony(formula: IFragranceNoteComposition[]): IAccordHarmonyResult {
    let topWeight = 0;
    let heartWeight = 0;
    let baseWeight = 0;

    formula.forEach(f => {
      if (f.compound.volatilityTier === 'TOP') topWeight += f.moleFraction;
      else if (f.compound.volatilityTier === 'HEART') heartWeight += f.moleFraction;
      else baseWeight += f.moleFraction;
    });

    const sum = topWeight + heartWeight + baseWeight;
    const safeSum = sum > 0 ? sum : 1.0;
    const tPct = (topWeight / safeSum) * 100;
    const hPct = (heartWeight / safeSum) * 100;
    const bPct = (baseWeight / safeSum) * 100;

    // Ideal targets for Haute Parfumerie Extrait:
    // Top = 25%, Heart = 40%, Base = 35%
    const devTop = Math.abs(tPct - 25);
    const devHeart = Math.abs(hPct - 40);
    const devBase = Math.abs(bPct - 35);
    const totalDeviation = (devTop + devHeart + devBase) / 3;

    // Harmony score penalizes extreme deviations from balanced sillage
    const rawScore = 100 - (totalDeviation * 1.6);
    const harmonyScore = Math.max(50, Math.min(99, Math.round(rawScore)));

    // Longevity half-life calculation
    const baseMultiplier = (bPct / 35.0);
    const longevityHalfLifeHours = Math.round((14.0 * baseMultiplier) * 10) / 10;

    let sillageClass: 'Intimate' | 'Radiant' | 'Expansive' | 'Majestic' = 'Radiant';
    if (bPct > 50) sillageClass = 'Intimate';
    else if (tPct > 45) sillageClass = 'Expansive';
    else if (harmonyScore >= 90) sillageClass = 'Majestic';

    return {
      harmonyScore,
      olfactoryChordDescription: `Nabatéenne Resonance (${Math.round(tPct)}% Volatile / ${Math.round(hPct)}% Floral Soul / ${Math.round(bPct)}% Resinous Base)`,
      longevityHalfLifeHours,
      sillageClassification: sillageClass,
      volatilityBalanceDeviation: Math.round(totalDeviation * 10) / 10
    };
  }
}
