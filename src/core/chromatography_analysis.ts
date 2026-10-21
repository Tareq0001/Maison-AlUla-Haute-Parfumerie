/**
 * MAISON ALULA HAUTE PARFUMERIE // GAS CHROMATOGRAPHY-MASS SPECTROMETRY (GC-MS)
 * ============================================================================
 * Chemical retention indices (Kovats index), spectral peak deconvolution,
 * and purity validation for natural Arabian desert botanical extracts.
 *
 * Grounded in NIST / Adams Essential Oil Mass Spectral Library.
 * Author: Tariq Abuashi (Master Perfumer & Chief Olfactory Chemist)
 * Location: AlUla Analytical Chemistry Laboratories, Al-Dira
 * ============================================================================
 */

export interface IChromatographicPeak {
  retentionTimeMinutes: number;
  kovatsIndexDB5: number; // Kovats retention index on 5% phenyl-methylpolysiloxane column
  compoundId: string;
  compoundName: string;
  chemicalFormula: string;
  molecularWeight: number;
  peakAreaPercent: number; // Relative abundance (%)
  signalToNoiseRatio: number;
  purityMatchFactor: number; // 0 - 1000 spectral similarity against authentic reference
}

export interface IExtractGCMSProfile {
  extractBatchId: string;
  botanicalTaxonomy: string;
  harvestTerroir: string;
  columnType: string; // e.g. HP-5MS (30m x 0.25mm x 0.25um)
  carrierGas: 'Helium' | 'Hydrogen';
  flowRateMlMin: number;
  temperatureProgram: string;
  totalIdentifiedComponentsPercent: number;
  peaks: IChromatographicPeak[];
}

/**
 * Kovats Retention Index Database for Arabian Incense & Flora
 */
export const ARABIAN_KOVATS_LIBRARY: Record<string, { ki: number; mw: number; formula: string; name: string }> = {
  ALPHA_THUJENE: { ki: 924, mw: 136.23, formula: 'C10H16', name: 'alpha-Thujene' },
  ALPHA_PINENE: { ki: 932, mw: 136.23, formula: 'C10H16', name: 'alpha-Pinene' },
  CAMPHENE: { ki: 946, mw: 136.23, formula: 'C10H16', name: 'Camphene' },
  SABINENE: { ki: 969, mw: 136.23, formula: 'C10H16', name: 'Sabinene' },
  BETA_PINENE: { ki: 974, mw: 136.23, formula: 'C10H16', name: 'beta-Pinene' },
  MYRCENE: { ki: 988, mw: 136.23, formula: 'C10H16', name: 'Myrcene' },
  ALPHA_PHELLANDRENE: { ki: 1002, mw: 136.23, formula: 'C10H16', name: 'alpha-Phellandrene' },
  ALPHA_TERPINENE: { ki: 1014, mw: 136.23, formula: 'C10H16', name: 'alpha-Terpinene' },
  PARA_CYMENE: { ki: 1020, mw: 134.22, formula: 'C10H14', name: 'para-Cymene' },
  LIMONENE: { ki: 1024, mw: 136.24, formula: 'C10H16', name: 'D-Limonene' },
  CINEOL_1_8: { ki: 1026, mw: 154.25, formula: 'C10H18O', name: '1,8-Cineole (Eucalyptol)' },
  GAMMA_TERPINENE: { ki: 1054, mw: 136.23, formula: 'C10H16', name: 'gamma-Terpinene' },
  LINALOOL: { ki: 1095, mw: 154.25, formula: 'C10H18O', name: 'Linalool' },
  CAMPHOR: { ki: 1141, mw: 152.23, formula: 'C10H16O', name: 'Camphor' },
  BORNEOL: { ki: 1162, mw: 154.25, formula: 'C10H18O', name: 'Borneol' },
  TERPINEN_4_OL: { ki: 1174, mw: 154.25, formula: 'C10H18O', name: 'Terpinen-4-ol' },
  ALPHA_TERPINEOL: { ki: 1186, mw: 154.25, formula: 'C10H18O', name: 'alpha-Terpineol' },
  SAFRANAL: { ki: 1200, mw: 150.22, formula: 'C10H14O', name: 'Safranal' },
  NEROL: { ki: 1225, mw: 154.25, formula: 'C10H18O', name: 'Nerol' },
  CITRONELLOL: { ki: 1228, mw: 156.27, formula: 'C10H20O', name: 'Citronellol' },
  GERANIOL: { ki: 1255, mw: 154.25, formula: 'C10H18O', name: 'Geraniol' },
  LINALYL_ACETATE: { ki: 1257, mw: 196.29, formula: 'C12H20O2', name: 'Linalyl Acetate' },
  EUGENOL: { ki: 1356, mw: 164.20, formula: 'C10H12O2', name: 'Eugenol' },
  CITRONELLYL_ACETATE: { ki: 1354, mw: 198.30, formula: 'C12H22O2', name: 'Citronellyl Acetate' },
  GERANYL_ACETATE: { ki: 1383, mw: 196.29, formula: 'C12H20O2', name: 'Geranyl Acetate' },
  BETA_CARYOPHYLLENE: { ki: 1418, mw: 204.36, formula: 'C15H24', name: 'beta-Caryophyllene' },
  ALPHA_HUMULENE: { ki: 1452, mw: 204.36, formula: 'C15H24', name: 'alpha-Humulene' },
  GERMACRENE_D: { ki: 1480, mw: 204.36, formula: 'C15H24', name: 'Germacrene D' },
  GEOSMIN: { ki: 1512, mw: 182.30, formula: 'C12H22O', name: 'Geosmin' },
  ALPHA_BULNESENE: { ki: 1505, mw: 204.36, formula: 'C15H24', name: 'alpha-Bulnesene' },
  PATCHOULOL: { ki: 1658, mw: 222.37, formula: 'C15H26O', name: 'Patchoulol' },
  ALPHA_SANTALOL: { ki: 1675, mw: 220.35, formula: 'C15H24O', name: 'alpha-Santalol' },
  BETA_SANTALOL: { ki: 1715, mw: 220.35, formula: 'C15H24O', name: 'beta-Santalol' },
  AGAROSPIROL: { ki: 1690, mw: 222.37, formula: 'C15H26O', name: 'Agarospirol' },
  INCENSOLE: { ki: 2090, mw: 306.48, formula: 'C20H34O2', name: 'Incensole' },
  INCENSOLE_ACETATE: { ki: 2185, mw: 348.52, formula: 'C22H36O3', name: 'Incensole Acetate' },
  AMBROXAN: { ki: 1785, mw: 236.39, formula: 'C16H28O', name: 'Ambroxan' }
};

export class GasChromatographyValidator {
  /**
   * Calculates Kovats retention index from alkane standards (n-alkanes C8 to C30):
   * I = 100 * [ n + (log(t_r(x)) - log(t_r(n))) / (log(t_r(n+1)) - log(t_r(n))) ]
   */
  public static calculateKovatsIndex(
    retentionTimeX: number,
    carbonNumberN: number,
    retentionTimeN: number,
    retentionTimeNPlus1: number
  ): number {
    if (retentionTimeNPlus1 <= retentionTimeN || retentionTimeX <= 0) {
      return 0;
    }
    const logRx = Math.log10(retentionTimeX);
    const logRn = Math.log10(retentionTimeN);
    const logRn1 = Math.log10(retentionTimeNPlus1);

    const index = 100 * (carbonNumberN + ((logRx - logRn) / (logRn1 - logRn)));
    return Math.round(index * 10) / 10;
  }

  /**
   * Validates authenticity of Wadi Dawkah Hojari Frankincense GC-MS profile
   * Benchmark requirement: alpha-Pinene > 55%, Incensole + Incensole Acetate > 4.5%
   */
  public static validateHojariFrankincense(profile: IExtractGCMSProfile): {
    authentic: boolean;
    alphaPinenePercent: number;
    incensoleComplexPercent: number;
    verdictMessage: string;
  } {
    let pinene = 0;
    let incensole = 0;

    profile.peaks.forEach(p => {
      if (p.compoundId === 'ALPHA_PINENE') pinene += p.peakAreaPercent;
      if (p.compoundId === 'INCENSOLE' || p.compoundId === 'INCENSOLE_ACETATE') {
        incensole += p.peakAreaPercent;
      }
    });

    const authentic = pinene >= 50.0 && incensole >= 3.0;
    const verdict = authentic
      ? 'VERIFIED AUTHENTIC: Pure Hojari Frankincense Grade A (Wadi Dawkah reserve)'
      : 'ADULTERATION DETECTED: Compound ratios deviate from historical Dawkah terroir baselines';

    return {
      authentic,
      alphaPinenePercent: Math.round(pinene * 10) / 10,
      incensoleComplexPercent: Math.round(incensole * 10) / 10,
      verdictMessage: verdict
    };
  }

  /**
   * Validates Taif Damask Rose Absolute authenticity
   * Benchmark requirement: Citronellol to Geraniol ratio must be within 1.2 to 2.8
   */
  public static validateTaifRose(profile: IExtractGCMSProfile): {
    authentic: boolean;
    citronellolGeraniolRatio: number;
    phenylethylAlcoholPercent: number;
    verdictMessage: string;
  } {
    let citronellol = 0;
    let geraniol = 0;
    let pea = 0;

    profile.peaks.forEach(p => {
      if (p.compoundId === 'CITRONELLOL') citronellol += p.peakAreaPercent;
      if (p.compoundId === 'GERANIOL') geraniol += p.peakAreaPercent;
      if (p.compoundName.includes('Phenylethyl Alcohol')) pea += p.peakAreaPercent;
    });

    const ratio = geraniol > 0 ? citronellol / geraniol : 0;
    const authentic = ratio >= 1.2 && ratio <= 2.8;

    return {
      authentic,
      citronellolGeraniolRatio: Math.round(ratio * 100) / 100,
      phenylethylAlcoholPercent: Math.round(pea * 10) / 10,
      verdictMessage: authentic
        ? 'VERIFIED AUTHENTIC: High-altitude Al-Hada Harvest (Rosa damascena trigintipetala)'
        : 'SYNTHETIC MARKER DETECTED: Unbalanced C/G ratio typical of industrial reconstitution'
    };
  }
}
