import { Routes } from '@angular/router';
import { ArtworkSearchComponent } from './artwork-search/artwork-search.component';
import { ArtworkComponent } from './artwork.component';

export const ARTWORK_ROUTES: Routes = [
  {
    path: '',
    component: ArtworkComponent,
    children: [
      { path: '', pathMatch: 'full', component: ArtworkSearchComponent },
    ],
  },
];
