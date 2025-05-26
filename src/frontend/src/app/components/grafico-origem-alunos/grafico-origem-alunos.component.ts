import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatisticaService } from '../../services/estatistica.service';
import { ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafico-origem-alunos',
  templateUrl: './grafico-origem-alunos.component.html',
  styleUrls: ['./grafico-origem-alunos.component.css'],
  standalone: true,
  imports: [CommonModule, NgChartsModule],
})
export class GraficoOrigemAlunosComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public dadosGrafico: { unidade: string; quantidade: number }[] = [];

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
          text: 'Unidade',
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
    this.estatisticaService.getTotalAlunosPorUnidade().subscribe({
      next: (dadosRecebidos) => {
        console.log('Dados recebidos:', dadosRecebidos);

        if (!dadosRecebidos || dadosRecebidos.length === 0) {
          console.error('Não há dados para exibir no gráfico');
          return;
        }

        // Filtra dados com unidade nula ou vazia
        const dadosFiltrados = dadosRecebidos.filter(
          (d) => d.unidade || d.nome
        );

        // Adapta os dados para o formato padronizado
        this.dadosGrafico = dadosFiltrados.map((d) => ({
          unidade: d.unidade || d.nome || d.origem || '',
          quantidade: d.total_alunos || d.total || d.quantidade || d.valor || 0,
        }));

        this.barChartData = {
          labels: this.dadosGrafico.map((d) => d.unidade),
          datasets: [
            {
              data: this.dadosGrafico.map((d) => d.quantidade),
              label: 'Quantidade de Alunos por Unidade',
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
        console.error('Erro ao buscar dados de alunos por unidade:', error);
      },
    });
  }
}
