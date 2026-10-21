#!/usr/bin/env python3
"""
MAISON ALULA HAUTE PARFUMERIE // CELLAR MACERATION KINETICS SIMULATOR
================================================================================
Models the 540-day (18-month) subterranean cellar esterification kinetics and
turbidity cryo-sedimentation for natural botanical perfume extracts.

Author: Tariq Abuashi (Master Perfumer & Olfactory Chemist)
Location: AlUla Old Town Cellars, Saudi Arabia
================================================================================
"""

import math
import argparse
from typing import List, Dict, Any

class CellarMacerationSimulator:
    """
    Simulates chemical reaction kinetics of natural acid-alcohol esterification
    during subterranean cellar aging at controlled 14°C - 16°C temperatures.
    """

    def __init__(self, temp_c: float = 15.0, days: int = 540):
        self.temp_c = temp_c
        self.temp_k = temp_c + 273.15
        self.days = days
        self.activation_energy = 58500.0  # J/mol for organic esterification
        self.gas_constant = 8.314

    def arrhenius_rate_constant(self) -> float:
        """Computes rate constant k using the Arrhenius equation: k = A * exp(-Ea / RT)"""
        pre_exponential = 1.2e6
        return pre_exponential * math.exp(-self.activation_energy / (self.gas_constant * self.temp_k))

    def simulate_maturation(self) -> List[Dict[str, Any]]:
        """Simulates maturation checkpoints across 540 days."""
        k = self.arrhenius_rate_constant()
        milestones = [0, 14, 30, 60, 90, 180, 270, 360, 450, 540]
        results = []

        for d in milestones:
            time_factor = d * 24.0 * 3600.0 * 0.0000000045
            ester_conversion = min(98.5, max(0.0, (1.0 - math.exp(-k * time_factor * 1e7)) * 100.0))
            attenuation = (1.0 - math.exp(-d / 45.0)) * 100.0
            polymer_index = min(1.0, (d / 540.0) ** 0.65)
            smoothness = round(2.0 + (ester_conversion * 0.055) + (polymer_index * 2.5), 1)

            classification = "Turbulent"
            if d >= 360:
                classification = "Vintage Grand Cru"
            elif d >= 90:
                classification = "Macerated Extrait"
            elif d >= 30:
                classification = "Forming Accord"

            results.append({
                "day": d,
                "ester_conversion_pct": round(ester_conversion, 1),
                "harshness_reduction_pct": round(attenuation, 1),
                "smoothness_score_10": smoothness,
                "grade": classification
            })

        return results

    def print_report(self):
        print("=" * 72)
        print("MAISON ALULA // CELLAR MACERATION KINETICS (540-DAY MATURATION)")
        print(f"Cellar Ambient: {self.temp_c}°C // Arrhenius Rate: {self.arrhenius_rate_constant():.6e}")
        print("=" * 72)
        print(" Day | Ester Yield % | Harshness Reduced | Smoothness (0-10) | Status")
        print("-----+---------------+-------------------+-------------------+------------------")
        for m in self.simulate_maturation():
            print(f" {m['day']:3d} |     {m['ester_conversion_pct']:5.1f}%    |       {m['harshness_reduction_pct']:5.1f}%       |        {m['smoothness_score_10']:4.1f}       | {m['grade']}")
        print("=" * 72)


def main():
    parser = argparse.ArgumentParser(description="Maison AlUla Maceration Simulator")
    parser.add_argument("--temp", type=float, default=15.0, help="Cellar temperature in Celsius")
    args = parser.parse_args()
    sim = CellarMacerationSimulator(temp_c=args.temp)
    sim.print_report()


if __name__ == "__main__":
    main()
