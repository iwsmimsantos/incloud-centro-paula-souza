import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoOrigemAlunosComponent } from './grafico-origem-alunos.component';

describe('GraficoOrigemAlunosComponent', () => {
  let component: GraficoOrigemAlunosComponent;
  let fixture: ComponentFixture<GraficoOrigemAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoOrigemAlunosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoOrigemAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
