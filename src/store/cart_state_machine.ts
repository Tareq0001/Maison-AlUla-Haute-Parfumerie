/**
 * MAISON ALULA HAUTE PARFUMERIE // CART & CHECKOUT STATE MACHINE
 * ============================================================================
 * Type-safe state machine for persistent multi-page shopping bag, bespoke formula
 * serialization, currency exchange, KSA VAT computation, and order certificate
 * issuance.
 *
 * Author: Tariq Abuashi (Master Perfumer & Chief Digital Architect)
 * ============================================================================
 */

export type CartMachineState =
  | 'IDLE'
  | 'ADDING_ITEM'
  | 'ITEM_ADDED'
  | 'UPDATING_QTY'
  | 'REMOVING_ITEM'
  | 'CONFIGURING_PACKAGING'
  | 'VALIDATING_PROMO'
  | 'GENERATING_CERTIFICATE'
  | 'ORDER_CONFIRMED'
  | 'ERROR';

export interface IBespokeCustomization {
  clientName: string;
  bottleColor: string;
  capColor: string;
  concentration: string;
  topNotesFormula: Record<string, number>;
  heartNotesFormula: Record<string, number>;
  baseNotesFormula: Record<string, number>;
  harmonyScore: number;
  batchCode: string;
}

export interface ICartItem {
  id: string;
  name_en: string;
  name_ar: string;
  subtitle_en?: string;
  subtitle_ar?: string;
  price: number; // in base SAR
  size?: string;
  qty: number;
  svgColor?: string;
  svgCap?: string;
  isBespoke?: boolean;
  bespokeDetails?: IBespokeCustomization;
  addedTimestamp: number;
}

export interface IPackagingOptions {
  cottonApothecaryPouch: boolean;
  handStampedBrassWaxSeal: boolean;
  calligraphyGiftCard: boolean;
  calligraphyNote: string;
}

export interface IOrderSummary {
  subtotalSAR: number;
  discountSAR: number;
  discountCodeApplied?: string;
  vatSAR: number; // 15% KSA VAT
  shippingSAR: number; // 0 for complimentary
  grandTotalSAR: number;
  itemCount: number;
  currency: 'SAR' | 'USD' | 'EUR' | 'GBP';
  convertedGrandTotal: number;
}

export interface IArchivalCertificate {
  certificateId: string;
  issuedTo: string;
  issueDate: string;
  registeredLots: {
    lotId: string;
    lotName: string;
    lotType: string;
    quantity: number;
    subtotal: string;
  }[];
  packagingSelection: string[];
  grandTotalFormatted: string;
  masterPerfumerSignature: string;
  digitalSealHash: string;
}

export type StateChangeListener = (state: CartMachineState, cart: ICartItem[], summary: IOrderSummary) => void;

/**
 * Enterprise Cart State Machine & Store
 */
export class CartStateMachine {
  private currentState: CartMachineState = 'IDLE';
  private items: ICartItem[] = [];
  private packaging: IPackagingOptions = {
    cottonApothecaryPouch: true,
    handStampedBrassWaxSeal: true,
    calligraphyGiftCard: true,
    calligraphyNote: 'إلى صاحب الذوق الرفيع، تحية معطرة من دار العُلا.'
  };
  private appliedPromoCode: string | null = null;
  private promoDiscountRatio: number = 0;
  private activeCurrency: 'SAR' | 'USD' | 'EUR' | 'GBP' = 'SAR';
  private listeners: Set<StateChangeListener> = new Set();
  private readonly storageKey = 'maison_cart';

  // Currency Exchange Rates (Base: SAR)
  public static readonly CURRENCY_MULTIPLIERS = {
    SAR: 1.0,
    USD: 0.2667,
    EUR: 0.2455,
    GBP: 0.2105
  };

  constructor() {
    this.hydrateFromStorage();
  }

  /**
   * Subscribe to state machine updates
   */
  public subscribe(listener: StateChangeListener): () => void {
    this.listeners.add(listener);
    // Initial emit
    listener(this.currentState, [...this.items], this.computeSummary());
    return () => this.listeners.delete(listener);
  }

  private transitionTo(newState: CartMachineState): void {
    this.currentState = newState;
    this.persistToStorage();
    const summary = this.computeSummary();
    this.listeners.forEach(fn => fn(this.currentState, [...this.items], summary));
  }

  /**
   * Hydrates state from browser localStorage with schema validation
   */
  private hydrateFromStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(this.storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            this.items = parsed.filter(item => item && item.id && typeof item.price === 'number');
          }
        }
      }
    } catch (err) {
      console.warn('[CartStateMachine] Storage hydration failed; falling back to empty memory cart', err);
      this.items = [];
    }
  }

  /**
   * Persists items to localStorage
   */
  private persistToStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(this.storageKey, JSON.stringify(this.items));
      }
    } catch (err) {
      console.error('[CartStateMachine] Storage persistence failed', err);
    }
  }

  /**
   * Adds an item or merges quantities
   */
  public addItem(item: Omit<ICartItem, 'addedTimestamp'>): void {
    this.transitionTo('ADDING_ITEM');

    const timestamp = Date.now();
    const newItem: ICartItem = { ...item, addedTimestamp: timestamp };

    if (!newItem.isBespoke) {
      const existing = this.items.find(i => i.id === newItem.id && i.size === newItem.size);
      if (existing) {
        existing.qty += newItem.qty;
      } else {
        this.items.push(newItem);
      }
    } else {
      // Bespoke items are always unique formulations
      this.items.push(newItem);
    }

    this.transitionTo('ITEM_ADDED');
    // Return to IDLE
    setTimeout(() => {
      if (this.currentState === 'ITEM_ADDED') {
        this.transitionTo('IDLE');
      }
    }, 500);
  }

  /**
   * Removes item by index
   */
  public removeItem(index: number): boolean {
    if (index >= 0 && index < this.items.length) {
      this.transitionTo('REMOVING_ITEM');
      this.items.splice(index, 1);
      this.transitionTo('IDLE');
      return true;
    }
    return false;
  }

  /**
   * Updates quantity of an item
   */
  public updateQuantity(index: number, newQty: number): boolean {
    if (index >= 0 && index < this.items.length) {
      this.transitionTo('UPDATING_QTY');
      if (newQty <= 0) {
        this.items.splice(index, 1);
      } else {
        this.items[index].qty = Math.min(99, Math.floor(newQty));
      }
      this.transitionTo('IDLE');
      return true;
    }
    return false;
  }

  /**
   * Applies promotional VIP coupon codes
   */
  public applyPromoCode(code: string): { success: boolean; discountPercent: number; message: string } {
    this.transitionTo('VALIDATING_PROMO');
    const clean = code.trim().toUpperCase();

    if (clean === 'ALULA15') {
      this.appliedPromoCode = 'ALULA15';
      this.promoDiscountRatio = 0.15;
      this.transitionTo('IDLE');
      return { success: true, discountPercent: 15, message: 'VIP Maison AlUla 15% Privilege Applied' };
    } else if (clean === 'NOOR20') {
      this.appliedPromoCode = 'NOOR20';
      this.promoDiscountRatio = 0.20;
      this.transitionTo('IDLE');
      return { success: true, discountPercent: 20, message: 'Exclusive Collector 20% Privilege Applied' };
    } else if (clean === 'ATELIER10') {
      this.appliedPromoCode = 'ATELIER10';
      this.promoDiscountRatio = 0.10;
      this.transitionTo('IDLE');
      return { success: true, discountPercent: 10, message: 'Bespoke Scent Formulation 10% Courtesy' };
    } else {
      this.appliedPromoCode = null;
      this.promoDiscountRatio = 0;
      this.transitionTo('IDLE');
      return { success: false, discountPercent: 0, message: 'Invalid or expired boutique voucher' };
    }
  }

  /**
   * Updates complimentary gift packaging choices
   */
  public setPackagingOptions(options: Partial<IPackagingOptions>): void {
    this.transitionTo('CONFIGURING_PACKAGING');
    this.packaging = { ...this.packaging, ...options };
    this.transitionTo('IDLE');
  }

  /**
   * Sets active currency
   */
  public setCurrency(currency: 'SAR' | 'USD' | 'EUR' | 'GBP'): void {
    this.activeCurrency = currency;
    const summary = this.computeSummary();
    this.listeners.forEach(fn => fn(this.currentState, [...this.items], summary));
  }

  /**
   * Calculates financial breakdown including KSA VAT & currency conversion
   */
  public computeSummary(): IOrderSummary {
    const subtotalSAR = this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discountSAR = Math.round(subtotalSAR * this.promoDiscountRatio);
    const afterDiscount = subtotalSAR - discountSAR;
    const vatSAR = Math.round(afterDiscount * 0.15); // 15% KSA VAT
    const grandTotalSAR = afterDiscount;
    const itemCount = this.items.reduce((sum, item) => sum + item.qty, 0);

    const rate = CartStateMachine.CURRENCY_MULTIPLIERS[this.activeCurrency] || 1.0;
    const convertedGrandTotal = Math.round(grandTotalSAR * rate);

    return {
      subtotalSAR,
      discountSAR,
      discountCodeApplied: this.appliedPromoCode || undefined,
      vatSAR,
      shippingSAR: 0, // Complimentary Royal Express Courier
      grandTotalSAR,
      itemCount,
      currency: this.activeCurrency,
      convertedGrandTotal
    };
  }

  /**
   * Generates a numbered Archival Certificate of Authenticity & Invoice
   */
  public generateArchivalCertificate(clientName: string): IArchivalCertificate {
    this.transitionTo('GENERATING_CERTIFICATE');

    const summary = this.computeSummary();
    const certNumber = `AL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateFormatted = `${now.getDate()} / ${now.getMonth() + 1} / ${now.getFullYear()}`;

    const registeredLots = this.items.map(item => ({
      lotId: item.id,
      lotName: item.name_ar ? `${item.name_en} (${item.name_ar})` : item.name_en,
      lotType: item.isBespoke ? 'Bespoke Atelier Formulation' : (item.size || 'Artisanal Flacon'),
      quantity: item.qty,
      subtotal: `${(item.price * item.qty).toLocaleString()} SAR`
    }));

    const packagingSelected: string[] = [];
    if (this.packaging.cottonApothecaryPouch) packagingSelected.push('Unbleached Egyptian Cotton Pouch');
    if (this.packaging.handStampedBrassWaxSeal) packagingSelected.push('Hand-Stamped Brass Wax Seal');
    if (this.packaging.calligraphyGiftCard) packagingSelected.push('Calligraphy Parchment Gift Card');

    // Generate cryptographic hash signature
    const payload = `${certNumber}|${clientName}|${summary.grandTotalSAR}|${now.toISOString()}`;
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      hash = ((hash << 5) - hash) + payload.charCodeAt(i);
      hash |= 0;
    }
    const digitalSealHash = `0x${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;

    const cert: IArchivalCertificate = {
      certificateId: certNumber,
      issuedTo: clientName,
      issueDate: dateFormatted,
      registeredLots,
      packagingSelection: packagingSelected,
      grandTotalFormatted: `${summary.grandTotalSAR.toLocaleString()} SAR`,
      masterPerfumerSignature: 'Tariq Abuashi',
      digitalSealHash
    };

    this.transitionTo('ORDER_CONFIRMED');
    return cert;
  }

  public getItems(): ICartItem[] {
    return [...this.items];
  }

  public getCurrentState(): CartMachineState {
    return this.currentState;
  }

  public clearCart(): void {
    this.items = [];
    this.transitionTo('IDLE');
  }
}
