import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfissionaisComponent } from './profissionais.component';

describe('ProfissionaisComponent', () => {
  let component: ProfissionaisComponent;
  let fixture: ComponentFixture<ProfissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfissionaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfissionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load mock data on init', () => {
    expect(component.profissionaisTotais.length).toBeGreaterThan(0);
  });

  it('should filter professionals based on search term', () => {
    component.aoMudarBusca('Jose');
    expect(component.profissionaisFiltrados.length).toBeGreaterThan(0);
  });

  it('should sort professionals', () => {
    component.ordenarPor('nome');
    expect(component.colunaOrdenacao).toBe('nome');
  });
});