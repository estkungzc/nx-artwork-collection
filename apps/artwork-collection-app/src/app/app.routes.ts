import { ExtraOptions, Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@nx-artwork-collection/artwork/feature').then(
        (esModule) => esModule.ArtworkFeatureModule
      ),
  },
];

export const APP_EXTRA_OPTIONS: ExtraOptions = {};
