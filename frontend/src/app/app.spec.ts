import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render the application navigation', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('.sidebar-logo strong')?.textContent?.trim(),
    ).toBe('noestoque');

    expect(
      Array.from(compiled.querySelectorAll('.sidebar-nav a')).some(
        (link) => link.textContent?.includes('Produtos'),
      ),
    ).toBe(true);

    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});
