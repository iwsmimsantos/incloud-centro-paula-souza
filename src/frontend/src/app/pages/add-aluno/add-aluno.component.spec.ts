import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlunoComponent } from './add-aluno.component';

describe('AddAlunoComponent', () => {
  let component: AddAlunoComponent;
  let fixture: ComponentFixture<AddAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
