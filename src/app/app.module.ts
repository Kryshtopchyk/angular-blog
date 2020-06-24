import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './shared/components/home-page/home-page.component';
import {PostPageComponent} from './shared/components/post-page/post-page.component';
import {PostComponent} from './shared/components/post-card/post.component';
import {SharedModule} from './shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './services/auth.interceptor';

const INTERCEPTORS_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [INTERCEPTORS_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
