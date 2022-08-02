import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ArtworksActions from './artworks.actions';
import { ArtworksEntity } from '../../entities/artworks';

export const ARTWORKS_FEATURE_KEY = 'artworks';

export interface ArtworksState extends EntityState<ArtworksEntity> {
  selectedId?: string | number; // which Artworks record has been selected
  loaded: boolean; // has the Artworks list been loaded
  error?: string | null; // last known error (if any)
}

export interface ArtworksPartialState {
  readonly [ARTWORKS_FEATURE_KEY]: ArtworksState;
}

export const artworksAdapter: EntityAdapter<ArtworksEntity> =
  createEntityAdapter<ArtworksEntity>();

export const initialArtworksState: ArtworksState =
  artworksAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialArtworksState,
  on(ArtworksActions.initArtworks, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ArtworksActions.loadArtworksSuccess, (state, { artworks }) =>
    artworksAdapter.setAll(artworks, { ...state, loaded: true })
  ),
  on(ArtworksActions.loadArtworksFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function artworksReducer(
  state: ArtworksState | undefined,
  action: Action
) {
  return reducer(state, action);
}
