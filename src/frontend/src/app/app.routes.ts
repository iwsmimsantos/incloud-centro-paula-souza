import { Routes } from '@angular/router';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { HomeComponent } from './pages/home/home.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { AlunosCadastradosComponent } from './pages/alunos-cadastrados/alunos-cadastrados.component';
import { EstatisticaComponent } from './pages/estatistica/estatistica.component';
import { ProfissionaisComponent } from './pages/profissionais/profissionais.component';
import { LoginComponent } from './pages/login/login.component';
import { AddAlunoComponent } from './pages/add-aluno/add-aluno.component'; // Adicione esta linha
import { authGuard } from './pages/guards/auth.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'alunos', component: AlunosComponent, canActivate: [authGuard]},
    { path: 'alunos/:id', component: AlunosComponent, canActivate: [authGuard] },
    { path: 'historico', component: HistoricoComponent, canActivate: [authGuard]},
    { path: 'alunoscadastrados', component: AlunosCadastradosComponent, canActivate: [authGuard]},
    { path: 'estatistica', component: EstatisticaComponent, canActivate: [authGuard]},
    { path: 'profissionais', component: ProfissionaisComponent, canActivate: [authGuard]},
    { path: 'add-aluno', component: AddAlunoComponent, canActivate: [authGuard] }, // Adicione esta linha
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];

