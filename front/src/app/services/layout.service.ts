import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private BreakpointObserver: BreakpointObserver,
  ) { }

  public isMobile$(): Observable<Boolean> {
    return this.BreakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(result => result.matches))
  }
}
