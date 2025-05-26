import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatisticaService } from '../../services/estatistica.service';
import { ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafico-necessidades',
  templateUrl: './grafico-necessidades.component.html',
  styleUrls: ['./grafico-necessidades.component.css'],
  standalone: true,
  imports: [CommonModule, NgChartsModule],
})
export class GraficoNecessidadesComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartData!: ChartData<'bar'>;
  public dadosGrafico: { nome: string; valor: number }[] = [];

  public barChartOptions: ChartConfiguration['options'] = {
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
          label: function (context) {
            return `${context.parsed.y} alunos`;
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
          text: 'Quantidade de alunos',
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
          text: 'Necessidades',
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
  };

  constructor(private estatisticaService: EstatisticaService) {}

  ngOnInit(): void {
    this.estatisticaService.getEstatisticas().subscribe({
      next: (dadosRecebidos) => {
        console.log('Dados recebidos:', dadosRecebidos);

        if (!dadosRecebidos || dadosRecebidos.length === 0) {
          console.error('Não há dados para exibir no gráfico');
          return;
        }

        // Usando os nomes de campos corretos que vêm da API: 'tipo_necessidade' e 'total'
        this.dadosGrafico = dadosRecebidos.map((d: any) => ({
          nome: d.tipo_necessidade,
          valor: d.total,
        }));

        this.barChartData = {
          labels: this.dadosGrafico.map((d) => d.nome),
          datasets: [
            {
              data: this.dadosGrafico.map((d) => d.valor),
              label: 'Quantidade de Alunos',
              backgroundColor: function (context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) {
                  return '#B20000';
                }
                const gradiente = ctx.createLinearGradient(0, 0, 0, 400);
                gradiente.addColorStop(0, '#B20000');
                gradiente.addColorStop(1, '#FF5252');
                return gradiente;
              },
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
        };
      },
      error: (error) => {
        console.error('Erro ao buscar estatísticas:', error);
      },
    });
  }
}
