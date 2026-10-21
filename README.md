# Maison AlUla | دار العُلا للعطور النادرة والمقتنيات الحسية
### Haute Parfumerie, Bespoke Scent Atelier & Cultural Editorial Magazine

[![GitHub Pages](https://img.shields.io/badge/Live%20Boutique-GitHub%20Pages-9A5B32?style=for-the-badge&logo=github)](https://tareq0001.github.io/Maison-AlUla-Haute-Parfumerie/)
[![CI Suite](https://img.shields.io/badge/CI%20Suite-Passing-3F4E3C?style=for-the-badge&logo=github-actions)](https://github.com/Tareq0001/Maison-AlUla-Haute-Parfumerie/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.12%20Optimizer-3776AB?style=for-the-badge&logo=python)](https://python.org)

> **Maison AlUla** is a tribute to the ancient Incense Highway. Inspired by **Le Labo, Aesop, Kinfolk Magazine, and Cartier**, it blends centuries-old frankincense distillation from Wadi Dawkah, rare Taif Damask rose, and aged Cambodian oud into slow-compounded, numbered apothecary flacons.
>
> **Core Aesthetic Philosophy:** Zero dashboards, zero artificial widgets, zero dark SaaS clutter. A warm, tactile, literary, multi-page luxury brand and e-commerce experience.

---

## 🏛️ Live 5-Page Architecture & Online Boutique

Explore all 5 live pages hosted on GitHub Pages with instant bidirectional Arabic (RTL) / English (LTR) language switching and a persistent slide-out shopping bag drawer:

| Page | Description | Live URL |
| :--- | :--- | :--- |
| **01. Brand Manifesto & Lookbook** | Full-viewport editorial hero, interactive Olfactory Pyramid (Wadi Dawkah Frankincense, Taif Rose, Desert Agarwood, Red Sea Ambergris), Curated Trio with instant bag integration, and heritage artisan narrative. | [Launch Manifesto](https://tareq0001.github.io/Maison-AlUla-Haute-Parfumerie/index.html) |
| **02. The Apothecary Boutique** | 13 detailed luxury lots across 4 categories (*Extrait de Parfum*, *Home Incense & Bakhoor*, *Botanical Body Oils*, *Limited Ceramic Vessels*), live faceted filtering, and Quick-View modal with size selection. | [Explore Catalog](https://tareq0001.github.io/Maison-AlUla-Haute-Parfumerie/collections.html) |
| **03. Bespoke Scent Atelier** | Interactive 4-step custom formulation creator: Top notes, Heart notes, Base notes, custom bottle engraving preview, real-time Raoult's Law volatility graph, and custom formula packaging. | [Compose Scent](https://tareq0001.github.io/Maison-AlUla-Haute-Parfumerie/atelier.html) |
| **04. The Sensory Journal** | Kinfolk-style long-form editorial magazine with 4 complete cultural essays on the Incense Road, desert petrichor chemistry, mudbrick architecture, and the art of cellar maceration. Includes interactive reader view. | [Read Journal](https://tareq0001.github.io/Maison-AlUla-Haute-Parfumerie/journal.html) |
| **05. Boutique Checkout & Wax Seal** | Review bag and custom atelier formulations, select complimentary luxury packaging (Egyptian cotton pouch, crimson & brass wax seal, calligraphy card), apply VIP codes (`ALULA15`), and issue a printable Certificate of Authenticity. | [Secure Checkout](https://tareq0001.github.io/Maison-AlUla-Haute-Parfumerie/checkout.html) |

---

## 🎨 Visual Aesthetic & Design System

The design system is implemented in `assets/styles.css` using pure, warm, tactile CSS variables:

- **Warm Alabaster / Parchment:** `#FAF7F2`
- **Tactile Desert Sand:** `#F3ECE1`
- **Deep Espresso Ink:** `#1C1917`
- **Terracotta & Aged Bronze:** `#9A5B32` / `#8E6845`
- **Botanical Olive:** `#3F4E3C`
- **Apothecary Gold:** `#C5A059`
- **Molten Wax Seal Crimson:** `#8B261D`
- **Typography:**
  - Headlines: *'Cormorant Garamond'*, *'Playfair Display'*, *'Tajawal'*
  - Body Copy: *'Plus Jakarta Sans'*, *'Tajawal'*
  - Apothecary Formula Codes: *'JetBrains Mono'*
  - Calligraphy Greetings: *'Alex Brush'*

---

## 🔬 Mathematical Olfactory Chemistry Engine

The TypeScript core (`src/core/olfactory_chemistry.ts`) and Python optimizer (`python_engine/fragrance_accord_optimizer.py`) model the physical thermodynamics of perfume volatility:

### 1. Pure Saturation Vapor Pressure (Antoine Equation)
$$\log_{10}(P_i^{\text{sat}}) = A_i - \frac{B_i}{T + C_i}$$
Where $P_i^{\text{sat}}$ is in $\text{mmHg}$ and $T$ is temperature in Celsius ($25^\circ\text{C}$).

### 2. Multi-Component Solution Vapor Pressure (Raoult's Law)
$$P_{\text{total}} = \sum_{i=1}^{N} x_i \cdot \gamma_i \cdot P_i^{\text{sat}}$$
Where $x_i$ is the mole fraction and $\gamma_i$ represents the non-ideal liquid activity coefficient.

### 3. Evaporation Kinetics (Langmuir-Knudsen Model)
$$\frac{dm_i}{dt} = - k \cdot A \cdot \sqrt{\frac{M_i}{2\pi R T}} \cdot (P_i^{\text{sat}} - P_{\text{ambient}})$$
Simulates non-steady-state dissipation of monoterpenes vs. heavy sesquiterpenes across a 24-hour cycle.

### 4. Golden Olfactory Ratio of Haute Parfumerie
$$\text{Optimal Formula} = 25\%\text{ Top Notes} + 40\%\text{ Heart Core} + 35\%\text{ Base Fixatives}$$

---

## 🐍 Python Accord Optimizer CLI

The repository includes a zero-dependency Python chemical volatility solver:

```bash
# Execute standalone chemical optimizer self-test
python python_engine/fragrance_accord_optimizer.py --self-test

# Export JSON simulation of 24-hour evaporation profile
python python_engine/fragrance_accord_optimizer.py --export-json
```

Sample CLI output:
```text
============================================================================
MAISON ALULA HAUTE PARFUMERIE // CHEMICAL OPTIMIZER SELF-TEST
Formulated in AlUla, Saudi Arabia // Master Perfumer Tariq Abuashi
============================================================================

[1] PURE VAPOR PRESSURE CALCULATIONS (25°C):
  * Linalyl Acetate (Calabrian Bergamot)       : 0.1512 mmHg (0.0202 kPa) [TOP]
  * 1,8-Cineole (Wild Green Cardamom)          : 2.4349 mmHg (0.3246 kPa) [TOP]
  * Citronellol (Taif Damask Rose Absolute)    : 0.0814 mmHg (0.0109 kPa) [HEART]
  * Agarospirol (Aged Cambodian Wild Oud)      : 0.0008 mmHg (0.0001 kPa) [BASE]

[2] ACCORD HARMONY ASSESSMENT (FLAGSHIP ACCORD):
  * Harmony Score : 89.9 / 100
  * Classification: Harmonious Eau de Parfum
```

---

## 📦 Dual-Branch Engineering Architecture

- **`gh-pages` Branch:** Hosts the standalone, zero-dependency static production bundle (`index.html`, `collections.html`, `atelier.html`, `journal.html`, `checkout.html`, and `assets/`). Operates natively in any browser with zero broken links.
- **`main` Branch:** Contains the enterprise TypeScript + Python olfactory simulation codebase, strict typing schemas, Vitest unit test suites, Vite multi-page configuration, and CI workflows.

---

## 🧪 Running Automated Tests

```bash
# Install dependencies
npm install

# Run Vitest unit tests
npm test

# Verify TypeScript compilation
npx tsc --noEmit
```

---

## 📜 Legal & Artisan Provenance

- **Maison AlUla | دار العُلا للعطور النادرة والمقتنيات الحسية**
- **Founder & Master Perfumer:** أ. طارق ابوعشي (Tariq Abuashi)
- **Atelier Location:** Al-Dira Quarter, AlUla Old Town, Kingdom of Saudi Arabia
- **Formula Certificate Code:** `AL-2026-HQ // NATURAL EXTRAIT ONLY`
- Released under the [MIT License](LICENSE).
