import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { TokenInterceptorService } from './interceptors/http.token.interceptor';
import { AuthService } from './services/auth.service';
import { JwtHandlerService } from './services/jwt-handler.service';

@NgModule({
  providers: [JwtHandlerService, AuthService, HttpClientModule,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}