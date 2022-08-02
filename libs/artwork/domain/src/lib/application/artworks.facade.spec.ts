import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as ArtworksActions from '../+state/artworks/artworks.actions';
import { ArtworksEffects } from '../+state/artworks/artworks.effects';
import { ArtworksFacade } from './artworks.facade';
import { ArtworksEntity } from '../entities/artworks';
import {
  ARTWORKS_FEATURE_KEY,
  ArtworksState,
  initialArtworksState,
  artworksReducer,
} from '../+state/artworks/artworks.reducer';
import * as ArtworksSelectors from '../+state/artworks/artworks.selectors';

interface TestSchema {
  artworks: ArtworksState;
}

describe('ArtworksFacade', () => {
  let facade: ArtworksFacade;
  let store: Store<TestSchema>;
  const createArtworksEntity = (id: string, name = ''): ArtworksEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ARTWORKS_FEATURE_KEY, artworksReducer),
          EffectsModule.forFeature([ArtworksEffects]),
        ],
        providers: [ArtworksFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ArtworksFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allArtworks$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allArtworks$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadArtworksSuccess` to manually update list
     */
    it('allArtworks$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allArtworks$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ArtworksActions.loadArtworksSuccess({
          artworks: [createArtworksEntity('AAA'), createArtworksEntity('BBB')],
        })
      );

      list = await readFirst(facade.allArtworks$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
