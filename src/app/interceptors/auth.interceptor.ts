import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const access_token = localStorage.getItem('access_token');

  if (access_token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + access_token),
    });

    return next(cloned);
  } else {
    return next(req);
  }
};
