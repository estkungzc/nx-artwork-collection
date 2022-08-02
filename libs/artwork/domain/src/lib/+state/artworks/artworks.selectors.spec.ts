import { ArtworksEntity } from '../../entities/artworks';
import {
  artworksAdapter,
  ArtworksPartialState,
  initialArtworksState,
} from './artworks.reducer';
import * as ArtworksSelectors from './artworks.selectors';

describe('Artworks Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getArtworksId = (it: ArtworksEntity) => it.id;
  const createArtworksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ArtworksEntity);

  let state: ArtworksPartialState;

  beforeEach(() => {
    state = {
      artworks: artworksAdapter.setAll(
        [
          createArtworksEntity('PRODUCT-AAA'),
          createArtworksEntity('PRODUCT-BBB'),
          createArtworksEntity('PRODUCT-CCC'),
        ],
        {
          ...initialArtworksState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Artworks Selectors', () => {
    it('getAllArtworks() should return the list of Artworks', () => {
      const results = ArtworksSelectors.getAllArtworks(state);
      const selId = getArtworksId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ArtworksSelectors.getSelected(state) as ArtworksEntity;
      const selId = getArtworksId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getArtworksLoaded() should return the current "loaded" status', () => {
      const result = ArtworksSelectors.getArtworksLoaded(state);

      expect(result).toBe(true);
    });

    it('getArtworksError() should return the current "error" state', () => {
      const result = ArtworksSelectors.getArtworksError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
