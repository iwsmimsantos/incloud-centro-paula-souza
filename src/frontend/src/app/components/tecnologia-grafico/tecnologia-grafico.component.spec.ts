import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnologiaGraficoComponent } from './tecnologia-grafico.component';

describe('TecnologiaGraficoComponent', () => {
  let component: TecnologiaGraficoComponent;
  let fixture: ComponentFixture<TecnologiaGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnologiaGraficoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnologiaGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
