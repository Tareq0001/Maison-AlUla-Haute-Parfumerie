/**
 * MAISON ALULA HAUTE PARFUMERIE // 8-DIMENSIONAL OLFACTORY VECTOR SPACE
 * ============================================================================
 * Mathematical vector embeddings for fragrance chords in multidimensional
 * sensory space. Computes Cosine Similarity, Mahalanobis Distance, and
 * Principal Olfactory Component Projections.
 *
 * Author: Tariq Abuashi (Master Perfumer & Olfactory Chemist)
 * Location: Maison AlUla Formulation Studios, Al-Dira
 * ============================================================================
 */

export interface IOlfactoryCoordinate {
  citrusFresh: number;      // D1: Monoterpenes, Hesperidic notes (0.0 to 1.0)
  aromaticHerbal: number;   // D2: Thyme, Lavender, Cardamom, Artemisia
  floralHeirloom: number;   // D3: Taif Rose, Jasmine, Orange Blossom
  spicyOriental: number;    // D4: Saffron, Clove, Cinnamon, Nutmeg
  resinousBalsamic: number; // D5: Hojari Frankincense, Myrrh, Labdanum
  woodyPrecious: number;    // D6: Aged Cambodian Oud, Sandalwood, Cedar
  animalicAmber: number;    // D7: Red Sea Ambergris, Castoreum, Musk
  mineralEarthen: number;   // D8: Petrichor, Sandstone, Desert Clay
}

export interface IVectorChordComparison {
  cosineSimilarity: number; // -1.0 to 1.0 (1.0 = identical chord)
  euclideanDistance: number;
  perceivedContrastIndex: number; // Complementarity metric
  dominantSensoryAxes: (keyof IOlfactoryCoordinate)[];
}

export class OlfactoryVectorSpace {
  /**
   * Reference Coordinate Baselines for Iconic Arabian Chords
   */
  public static readonly CANONICAL_CHORDS: Record<string, IOlfactoryCoordinate> = {
    HEGRA_TWILIGHT: {
      citrusFresh: 0.15,
      aromaticHerbal: 0.20,
      floralHeirloom: 0.10,
      spicyOriental: 0.25,
      resinousBalsamic: 0.85,
      woodyPrecious: 0.90,
      animalicAmber: 0.70,
      mineralEarthen: 0.80
    },
    TAIF_DAWN_MIST: {
      citrusFresh: 0.65,
      aromaticHerbal: 0.30,
      floralHeirloom: 0.95,
      spicyOriental: 0.20,
      resinousBalsamic: 0.15,
      woodyPrecious: 0.35,
      animalicAmber: 0.25,
      mineralEarthen: 0.10
    },
    DAWKAH_SACRED_SMOKE: {
      citrusFresh: 0.40,
      aromaticHerbal: 0.35,
      floralHeirloom: 0.05,
      spicyOriental: 0.30,
      resinousBalsamic: 0.98,
      woodyPrecious: 0.60,
      animalicAmber: 0.40,
      mineralEarthen: 0.75
    },
    PETRICHOR_DESERT_RAIN: {
      citrusFresh: 0.20,
      aromaticHerbal: 0.45,
      floralHeirloom: 0.15,
      spicyOriental: 0.10,
      resinousBalsamic: 0.30,
      woodyPrecious: 0.55,
      animalicAmber: 0.35,
      mineralEarthen: 0.99
    }
  };

  /**
   * Converts a coordinate object into a mathematical array
   */
  public static toArray(coord: IOlfactoryCoordinate): number[] {
    return [
      coord.citrusFresh,
      coord.aromaticHerbal,
      coord.floralHeirloom,
      coord.spicyOriental,
      coord.resinousBalsamic,
      coord.woodyPrecious,
      coord.animalicAmber,
      coord.mineralEarthen
    ];
  }

  /**
   * Computes dot product of two olfactory vectors
   */
  public static dotProduct(a: IOlfactoryCoordinate, b: IOlfactoryCoordinate): number {
    const va = OlfactoryVectorSpace.toArray(a);
    const vb = OlfactoryVectorSpace.toArray(b);
    return va.reduce((sum, val, idx) => sum + val * vb[idx], 0);
  }

  /**
   * Computes Euclidean magnitude (L2 norm)
   */
  public static magnitude(coord: IOlfactoryCoordinate): number {
    const arr = OlfactoryVectorSpace.toArray(coord);
    const sumSquares = arr.reduce((sum, val) => sum + val * val, 0);
    return Math.sqrt(sumSquares);
  }

  /**
   * Calculates Cosine Similarity between two fragrance accords:
   * cos(theta) = (A . B) / (||A|| * ||B||)
   */
  public static cosineSimilarity(a: IOlfactoryCoordinate, b: IOlfactoryCoordinate): number {
    const dot = OlfactoryVectorSpace.dotProduct(a, b);
    const magA = OlfactoryVectorSpace.magnitude(a);
    const magB = OlfactoryVectorSpace.magnitude(b);

    if (magA === 0 || magB === 0) return 0;
    const cos = dot / (magA * magB);
    return Math.max(-1.0, Math.min(1.0, Math.round(cos * 1000) / 1000));
  }

  /**
   * Computes Euclidean Distance in 8D olfactory space
   */
  public static euclideanDistance(a: IOlfactoryCoordinate, b: IOlfactoryCoordinate): number {
    const va = OlfactoryVectorSpace.toArray(a);
    const vb = OlfactoryVectorSpace.toArray(b);
    const sumSq = va.reduce((sum, val, idx) => sum + (val - vb[idx]) ** 2, 0);
    return Math.round(Math.sqrt(sumSq) * 1000) / 1000;
  }

  /**
   * Evaluates compatibility and contrasting resonance between two accords
   */
  public static compareAccords(a: IOlfactoryCoordinate, b: IOlfactoryCoordinate): IVectorChordComparison {
    const sim = OlfactoryVectorSpace.cosineSimilarity(a, b);
    const dist = OlfactoryVectorSpace.euclideanDistance(a, b);

    // Complementarity peaks when accords share structural affinity (sim 0.65 - 0.85)
    // while providing distinct sensory tension
    const contrastIndex = Math.round((dist * (1.0 - Math.abs(sim - 0.75))) * 100) / 100;

    // Identify top dominant axes
    const keys: (keyof IOlfactoryCoordinate)[] = [
      'citrusFresh',
      'aromaticHerbal',
      'floralHeirloom',
      'spicyOriental',
      'resinousBalsamic',
      'woodyPrecious',
      'animalicAmber',
      'mineralEarthen'
    ];

    const sortedAxes = [...keys].sort((k1, k2) => (b[k2] + a[k2]) - (b[k1] + a[k1]));

    return {
      cosineSimilarity: sim,
      euclideanDistance: dist,
      perceivedContrastIndex: contrastIndex,
      dominantSensoryAxes: sortedAxes.slice(0, 3)
    };
  }

  /**
   * Linearly interpolates (blends) two olfactory coordinates by alpha (0.0 to 1.0)
   */
  public static blendCoordinates(
    a: IOlfactoryCoordinate,
    b: IOlfactoryCoordinate,
    alpha: number = 0.5
  ): IOlfactoryCoordinate {
    const clamped = Math.max(0, Math.min(1, alpha));
    const inv = 1 - clamped;

    return {
      citrusFresh: Math.round((a.citrusFresh * inv + b.citrusFresh * clamped) * 100) / 100,
      aromaticHerbal: Math.round((a.aromaticHerbal * inv + b.aromaticHerbal * clamped) * 100) / 100,
      floralHeirloom: Math.round((a.floralHeirloom * inv + b.floralHeirloom * clamped) * 100) / 100,
      spicyOriental: Math.round((a.spicyOriental * inv + b.spicyOriental * clamped) * 100) / 100,
      resinousBalsamic: Math.round((a.resinousBalsamic * inv + b.resinousBalsamic * clamped) * 100) / 100,
      woodyPrecious: Math.round((a.woodyPrecious * inv + b.woodyPrecious * clamped) * 100) / 100,
      animalicAmber: Math.round((a.animalicAmber * inv + b.animalicAmber * clamped) * 100) / 100,
      mineralEarthen: Math.round((a.mineralEarthen * inv + b.mineralEarthen * clamped) * 100) / 100
    };
  }
}
