import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoNecessidadesComponent } from './grafico-necessidades.component';

describe('GraficoNecessidadesComponent', () => {
  let component: GraficoNecessidadesComponent;
  let fixture: ComponentFixture<GraficoNecessidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoNecessidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoNecessidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
