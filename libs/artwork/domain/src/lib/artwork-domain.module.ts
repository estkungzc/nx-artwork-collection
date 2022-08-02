import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromArtworks from './+state/artworks/artworks.reducer';
import { ArtworksEffects } from './+state/artworks/artworks.effects';
import { ArtworksFacade } from './application/artworks.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromArtworks.ARTWORKS_FEATURE_KEY,
      fromArtworks.artworksReducer
    ),
    EffectsModule.forFeature([ArtworksEffects]),
  ],
  providers: [ArtworksFacade],
})
export class ArtworkDomainModule {}
