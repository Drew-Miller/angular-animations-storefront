import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories, ProductType } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  private _stateSource$ = new BehaviorSubject<UIState>({
    cartIsOpened: undefined,
    orderConfirmationIsOpened: undefined,
    searchQuery: '',
    productType: ProductType.explore,
  });
  state$ = this._stateSource$.asObservable();

  // Selects

  selectCart$(): Observable<boolean> {
    return this.state$.pipe(map((state) => state.cartIsOpened));
  }

  selectOrderConfirmation$(): Observable<boolean> {
    return this.state$.pipe(map((state) => state.orderConfirmationIsOpened));
  }

  selectSearchQuery$(): Observable<string> {
    return this.state$.pipe(map((state) => state.searchQuery));
  }

  selectProductType$(): Observable<string> {
    return this.state$.pipe(map((state) => state.productType));
  }

  // Actions

  toggleCart(isOpened: boolean): void {
    this._stateSource$.next({
      ...this._getCurrentState(),
      cartIsOpened: isOpened,
    });
  }

  toggleOrderConfirmation(isOpened: boolean): void {
    this._stateSource$.next({
      ...this._getCurrentState(),
      orderConfirmationIsOpened: isOpened,
    });
  }

  search(keyword: string): void {
    this._stateSource$.next({
      ...this._getCurrentState(),
      searchQuery: keyword,
    });
  }

  selectProductType(productType: ProductType): void {
    this._stateSource$.next({
      ...this._getCurrentState(),
      productType: productType,
    });
  }

  // Current Value

  selectCartCurrentValue(): boolean {
    return this._getCurrentState().cartIsOpened;
  }

  selectOrderConfirmationCurrentValue(): boolean {
    return this._getCurrentState().orderConfirmationIsOpened;
  }

  private _getCurrentState(): UIState {
    return this._stateSource$.value;
  }
}

export interface UIState {
  cartIsOpened: boolean;
  orderConfirmationIsOpened: boolean;
  searchQuery: string;
  productType: ProductType;
}
