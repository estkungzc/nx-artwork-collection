import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ArtworksActions from './artworks.actions';
import { ArtworksEffects } from './artworks.effects';

describe('ArtworksEffects', () => {
  let actions: Observable<Action>;
  let effects: ArtworksEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ArtworksEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ArtworksEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ArtworksActions.initArtworks() });

      const expected = hot('-a-|', {
        a: ArtworksActions.loadArtworksSuccess({ artworks: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
