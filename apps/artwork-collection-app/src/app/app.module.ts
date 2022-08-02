import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ArtworkFeatureModule } from '@nx-artwork-collection/artwork/feature';
import { RouterModule } from '@angular/router';
import { APP_EXTRA_OPTIONS, APP_ROUTES } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RouterModule.forRoot([...APP_ROUTES], { ...APP_EXTRA_OPTIONS }),
    ArtworkFeatureModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
