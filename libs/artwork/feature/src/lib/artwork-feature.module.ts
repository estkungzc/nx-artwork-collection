import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtworkDomainModule } from '@nx-artwork-collection/artwork/domain';
import { ArtworkComponent } from './artwork.component';
import { ARTWORK_ROUTES } from './artwork.routes';
import { RouterModule } from '@angular/router';
import { ArtworkSearchComponent } from './artwork-search/artwork-search.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ARTWORK_ROUTES),
    ArtworkDomainModule,
  ],
  declarations: [ArtworkComponent, ArtworkSearchComponent],
  providers: [],
  exports: [ArtworkComponent],
})
export class ArtworkFeatureModule {}
