import { TestBed, async, inject } from '@angular/core/testing';

import { AuthUserGuard } from './auth-user.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthUserGuard]
    });
  });

  it('should ...', inject([AuthUserGuard], (guard: AuthUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
