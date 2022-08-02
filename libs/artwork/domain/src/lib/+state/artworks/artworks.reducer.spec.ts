import { Action } from '@ngrx/store';

import * as ArtworksActions from './artworks.actions';
import { ArtworksEntity } from '../../entities/artworks';
import {
  ArtworksState,
  initialArtworksState,
  artworksReducer,
} from './artworks.reducer';

describe('Artworks Reducer', () => {
  const createArtworksEntity = (id: string, name = ''): ArtworksEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Artworks actions', () => {
    it('loadArtworksSuccess should return the list of known Artworks', () => {
      const artworks = [
        createArtworksEntity('PRODUCT-AAA'),
        createArtworksEntity('PRODUCT-zzz'),
      ];
      const action = ArtworksActions.loadArtworksSuccess({ artworks });

      const result: ArtworksState = artworksReducer(
        initialArtworksState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = artworksReducer(initialArtworksState, action);

      expect(result).toBe(initialArtworksState);
    });
  });
});
