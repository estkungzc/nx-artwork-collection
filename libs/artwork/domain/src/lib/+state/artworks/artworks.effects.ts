import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ArtworksActions from './artworks.actions';
import * as ArtworksFeature from './artworks.reducer';

@Injectable()
export class ArtworksEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtworksActions.initArtworks),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ArtworksActions.loadArtworksSuccess({ artworks: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ArtworksActions.loadArtworksFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
