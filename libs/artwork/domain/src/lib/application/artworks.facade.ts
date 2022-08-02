import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ArtworksActions from '../+state/artworks/artworks.actions';
import * as ArtworksFeature from '../+state/artworks/artworks.reducer';
import * as ArtworksSelectors from '../+state/artworks/artworks.selectors';

@Injectable()
export class ArtworksFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ArtworksSelectors.getArtworksLoaded));
  allArtworks$ = this.store.pipe(select(ArtworksSelectors.getAllArtworks));
  selectedArtworks$ = this.store.pipe(select(ArtworksSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ArtworksActions.initArtworks());
  }
}
