import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ARTWORKS_FEATURE_KEY,
  ArtworksState,
  artworksAdapter,
} from './artworks.reducer';

// Lookup the 'Artworks' feature state managed by NgRx
export const getArtworksState =
  createFeatureSelector<ArtworksState>(ARTWORKS_FEATURE_KEY);

const { selectAll, selectEntities } = artworksAdapter.getSelectors();

export const getArtworksLoaded = createSelector(
  getArtworksState,
  (state: ArtworksState) => state.loaded
);

export const getArtworksError = createSelector(
  getArtworksState,
  (state: ArtworksState) => state.error
);

export const getAllArtworks = createSelector(
  getArtworksState,
  (state: ArtworksState) => selectAll(state)
);

export const getArtworksEntities = createSelector(
  getArtworksState,
  (state: ArtworksState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getArtworksState,
  (state: ArtworksState) => state.selectedId
);

export const getSelected = createSelector(
  getArtworksEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
