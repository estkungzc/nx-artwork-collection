import { createAction, props } from '@ngrx/store';
import { ArtworksEntity } from '../../entities/artworks';

export const initArtworks = createAction('[Artworks Page] Init');

export const loadArtworksSuccess = createAction(
  '[Artworks/API] Load Artworks Success',
  props<{ artworks: ArtworksEntity[] }>()
);

export const loadArtworksFailure = createAction(
  '[Artworks/API] Load Artworks Failure',
  props<{ error: any }>()
);
