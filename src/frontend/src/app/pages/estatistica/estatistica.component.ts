import { Component, OnInit, ViewChild } from '@angular/core';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { GraficoNecessidadesComponent } from '../../components/grafico-necessidades/grafico-necessidades.component';
import { GraficoOrigemAlunosComponent } from '../../components/grafico-origem-alunos/grafico-origem-alunos.component';
import { TecnologiaGraficoComponent } from '../../components/tecnologia-grafico/tecnologia-grafico.component';
import { EstatisticaService } from '../../services/estatistica.service';
import { GraficoEvolucaoComponent } from '../../components/grafico-evolucao/grafico-evolucao.component';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-estatistica',
  standalone: true,
  imports: [
    CommonModule,
    BackButtonComponent,
    GraficoNecessidadesComponent,
    GraficoOrigemAlunosComponent,
    GraficoEvolucaoComponent,
    TecnologiaGraficoComponent,
  ],
  templateUrl: './estatistica.component.html',
  styleUrls: ['./estatistica.component.css'],
})
export class EstatisticaComponent implements OnInit {
  // Acessando os componentes de gráfico usando ViewChild
  @ViewChild(GraficoNecessidadesComponent)
  graficoNecessidades!: GraficoNecessidadesComponent;
  @ViewChild(GraficoEvolucaoComponent)
  graficoEvolucao!: GraficoEvolucaoComponent;
  @ViewChild(GraficoOrigemAlunosComponent)
  graficoOrigemAlunos!: GraficoOrigemAlunosComponent;
  @ViewChild(TecnologiaGraficoComponent)
  graficoTecnologias!: TecnologiaGraficoComponent;

  totalAtendimentos: number = 0;
  totalAtendimentosGeral: number = 0;
  totalTecnologiasAssistivas: number = 0;
  totalAcompanhamentos: number = 0;
  carregando: boolean = true;
  erro: boolean = false;

  constructor(private estatisticaService: EstatisticaService) {}

  ngOnInit(): void {
    this.carregarTotalAtendimentos();
    this.carregarTotalAtendimentosGeral();
    this.carregarTotalTecnologiasAssistivas();
    this.carregarTotalAcompanhamentos();
  }

  carregarTotalAtendimentos(): void {
    this.carregando = true;
    this.estatisticaService.getTotalAtendimentos().subscribe({
      next: (response) => {
        this.totalAtendimentos = response.total;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar total de atendimentos:', error);
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  carregarTotalAtendimentosGeral(): void {
    this.carregando = true;
    this.estatisticaService.getTotalAtendimentosGeral().subscribe({
      next: (response) => {
        this.totalAtendimentosGeral = response.totalAtendimentos;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar total geral de atendimentos:', error);
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  carregarTotalTecnologiasAssistivas(): void {
    this.carregando = true;
    this.estatisticaService.getTotalTecnologiasAssistivas().subscribe({
      next: (response) => {
        this.totalTecnologiasAssistivas = response.totalTecnologias;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar total de tecnologias assistivas:', error);
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  carregarTotalAcompanhamentos(): void {
    this.carregando = true;
    this.estatisticaService.getTotalAcompanhamentos().subscribe({
      next: (response) => {
        console.log('Resposta da API (acompanhamentos):', response); // Debug
        this.totalAcompanhamentos = response.totalAcompanhamentos;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar total de acompanhamentos:', error);
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  recarregar(): void {
    this.erro = false;
    this.carregarTotalAtendimentos();
    this.carregarTotalAtendimentosGeral();
    this.carregarTotalTecnologiasAssistivas();
    this.carregarTotalAcompanhamentos();
  }

  // Método para exportar o relatório em PDF, implementado conforme o tutorial
  exportarRelatorio(): void {
    alert('Gerando relatório. Por favor, aguarde...');
    const pdf = new jsPDF();
    let posicaoY = 15;

    // Cabeçalho do Relatório
    pdf.setFontSize(20);
    pdf.setTextColor(180, 0, 0);
    pdf.text(
      'Estatísticas de Atendimento',
      pdf.internal.pageSize.getWidth() / 2,
      posicaoY,
      { align: 'center' }
    );
    posicaoY += 10;

    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const horaAtual = new Date().toLocaleTimeString('pt-BR');
    pdf.text(
      `Relatório gerado em: ${dataAtual} às ${horaAtual}`,
      pdf.internal.pageSize.getWidth() / 2,
      posicaoY,
      { align: 'center' }
    );
    posicaoY += 15;

    // Resumo dos Indicadores
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Resumo de Indicadores', 14, posicaoY);
    posicaoY += 8;

    const dadosResumo = [
      ['Alunos atendidos', this.totalAtendimentos.toString()],
      ['Atendimentos no período', this.totalAtendimentosGeral.toString()],
      [
        'Uso de tecnologia assistiva',
        this.totalTecnologiasAssistivas.toString(),
      ],
      ['Acompanhamento profissional', this.totalAcompanhamentos.toString()],
    ];
    autoTable(pdf, {
      startY: posicaoY,
      head: [['Indicador', 'Quantidade']],
      body: dadosResumo,
      theme: 'striped',
      headStyles: { fillColor: [180, 0, 0] },
    });
    posicaoY = (pdf as any).lastAutoTable.finalY + 15;

    try {
      // Seção: Necessidades Especiais
      if (this.graficoNecessidades?.dadosGrafico?.length) {
        pdf.setFontSize(14);
        pdf.text('Necessidades Especiais dos Alunos', 14, posicaoY);
        posicaoY += 8;
        const dadosTabelaNecessidades =
          this.graficoNecessidades.dadosGrafico.map((item) => [
            item.nome,
            item.valor.toString(),
          ]);
        autoTable(pdf, {
          startY: posicaoY,
          head: [['Necessidade', 'Quantidade de Alunos']],
          body: dadosTabelaNecessidades,
          theme: 'striped',
          headStyles: { fillColor: [180, 0, 0] },
        });
        posicaoY = (pdf as any).lastAutoTable.finalY + 15;
      }

      if (posicaoY > 250) {
        pdf.addPage();
        posicaoY = 15;
      }

      // Seção: Evolução de Atendimentos
      if (this.graficoEvolucao?.dadosGrafico?.length) {
        pdf.setFontSize(14);
        pdf.text('Evolução de Atendimentos', 14, posicaoY);
        posicaoY += 8;
        const dadosTabelaEvolucao = this.graficoEvolucao.dadosGrafico.map(
          (item) => [item.mes, item.quantidade.toString()]
        );
        autoTable(pdf, {
          startY: posicaoY,
          head: [['Mês', 'Quantidade de Atendimentos']],
          body: dadosTabelaEvolucao,
          theme: 'striped',
          headStyles: { fillColor: [180, 0, 0] },
        });
        posicaoY = (pdf as any).lastAutoTable.finalY + 15;
      }

      if (posicaoY > 250) {
        pdf.addPage();
        posicaoY = 15;
      }

      // Seção: Origem dos Alunos
      if (this.graficoOrigemAlunos?.dadosGrafico?.length) {
        pdf.setFontSize(14);
        pdf.text('Origem dos Alunos', 14, posicaoY);
        posicaoY += 8;
        const dadosTabelaOrigem = this.graficoOrigemAlunos.dadosGrafico.map(
          (item) => [item.unidade, item.quantidade.toString()]
        );
        autoTable(pdf, {
          startY: posicaoY,
          head: [['Unidade', 'Quantidade de Alunos']],
          body: dadosTabelaOrigem,
          theme: 'striped',
          headStyles: { fillColor: [180, 0, 0] },
        });
        posicaoY = (pdf as any).lastAutoTable.finalY + 15;
      }

      if (posicaoY > 250) {
        pdf.addPage();
        posicaoY = 15;
      }

      // Seção: Tecnologias Assistivas
      if (this.graficoTecnologias?.dadosGrafico?.length) {
        pdf.setFontSize(14);
        pdf.text('Distribuição de Tecnologias Assistivas', 14, posicaoY);
        posicaoY += 8;
        const totalTec = this.graficoTecnologias.dadosGrafico.reduce(
          (acc, item) => acc + item.valor,
          0
        );
        const dadosTabelaTecnologias = this.graficoTecnologias.dadosGrafico.map(
          (item) => {
            const percentual =
              totalTec > 0 ? ((item.valor / totalTec) * 100).toFixed(1) : '0.0';
            return [item.nome, item.valor.toString(), `${percentual}%`];
          }
        );
        autoTable(pdf, {
          startY: posicaoY,
          head: [['Tecnologia', 'Quantidade', 'Percentual']],
          body: dadosTabelaTecnologias,
          theme: 'striped',
          headStyles: { fillColor: [180, 0, 0] },
        });
      }

      // Rodapé: Paginação
      const totalPaginas = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPaginas; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          `Página ${i} de ${totalPaginas}`,
          pdf.internal.pageSize.getWidth() - 20,
          pdf.internal.pageSize.getHeight() - 10,
          { align: 'right' }
        );
      }

      // Salva o PDF
      pdf.save('relatorio_estatisticas_atendimento.pdf');
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      alert(
        'Ocorreu um erro ao gerar o relatório. Por favor, tente novamente.'
      );
    }
  }
}
