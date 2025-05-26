import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EstatisticaService } from '../../services/estatistica.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-evolucao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico-evolucao.component.html',
  styleUrls: ['./grafico-evolucao.component.css'],
})
export class GraficoEvolucaoComponent implements OnInit {
  @ViewChild('evolucaoChart') chartCanvas!: ElementRef;
  chart: any;

  // Estrutura padronizada para os dados do gráfico
  public dadosGrafico: { mes: string; quantidade: number }[] = [];

  // Nomes dos meses para exibição
  mesesDoAno = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  constructor(private estatisticaService: EstatisticaService) {}

  ngOnInit(): void {
    // Inicialização inicial
  }

  ngAfterViewInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.estatisticaService.getAtendimentosPorMes().subscribe({
      next: (dadosRecebidos) => {
        console.log('Dados recebidos:', dadosRecebidos);

        // Adapta os dados para o formato padronizado
        this.dadosGrafico = dadosRecebidos.map((d) => ({
          mes: d.periodo || d.mes,
          quantidade: d.total || d.quantidade,
        }));

        const dadosProcessados = this.processarDados(this.dadosGrafico);
        this.criarGrafico(dadosProcessados);
      },
      error: (error) => {
        console.error('Erro ao carregar dados de atendimentos por mês:', error);
        this.criarGraficoSimulado();
      },
    });
  }

  processarDados(dados: { mes: string; quantidade: number }[]): {
    labels: string[];
    valores: number[];
  } {
    // Organizar os dados por mês
    const meses = Array(12).fill(0);

    dados.forEach((item) => {
      // Verifica se o mês é um número ou uma string com nome do mês
      let indiceMes;

      // Se for um número (formato "1", "2", etc.)
      if (!isNaN(Number(item.mes))) {
        indiceMes = parseInt(item.mes) - 1; // Ajustando para índice 0-11
      }
      // Se for um nome de mês (formato "Janeiro", "Fevereiro", etc.)
      else {
        indiceMes = this.mesesDoAno.findIndex(
          (m) => m.toLowerCase() === item.mes.toLowerCase()
        );
      }

      // Se encontrou um índice válido, atualiza o valor
      if (indiceMes >= 0 && indiceMes < 12) {
        meses[indiceMes] = item.quantidade;
      }
    });

    return {
      labels: this.mesesDoAno,
      valores: meses,
    };
  }

  criarGrafico(dados: { labels: string[]; valores: number[] }): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    // Criar gradiente para as barras
    const gradiente = ctx.createLinearGradient(0, 0, 0, 400);
    gradiente.addColorStop(0, '#B20000'); // Cor principal no topo
    gradiente.addColorStop(1, '#FF5252'); // Cor mais clara na base

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dados.labels,
        datasets: [
          {
            label: 'Atendimentos',
            data: dados.valores,
            backgroundColor: gradiente,
            borderColor: '#8B0000',
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false,
            hoverBackgroundColor: '#8B0000',
            hoverBorderColor: '#6B0000',
            barThickness: 'flex',
            maxBarThickness: 50,
            barPercentage: 0.8,
            categoryPercentage: 0.8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: 'easeOutQuart',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 13,
            },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              title: function (tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function (context) {
                return `${context.parsed.y} atendimentos`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
              lineWidth: 0.5,
            },
            ticks: {
              precision: 0,
              font: {
                size: 12,
              },
              color: '#555',
            },
            title: {
              display: true,
              text: 'Quantidade de atendimentos',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#333',
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 11,
              },
              color: '#555',
            },
            title: {
              display: true,
              text: 'Mês',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#333',
              padding: { top: 15 },
            },
          },
        },
        layout: {
          padding: {
            top: 10,
            right: 20,
            bottom: 10,
            left: 20,
          },
        },
      },
    });
  }

  criarGraficoSimulado(): void {
    // Dados de exemplo para demonstração
    this.dadosGrafico = this.mesesDoAno.map((mes, index) => ({
      mes: mes,
      quantidade: [12, 19, 15, 23, 28, 25, 17, 20, 24, 30, 22, 18][index],
    }));

    const dadosProcessados = {
      labels: this.mesesDoAno,
      valores: this.dadosGrafico.map((d) => d.quantidade),
    };

    this.criarGrafico(dadosProcessados);
  }
}
