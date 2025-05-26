import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatisticaService } from '../../services/estatistica.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-tecnologia-grafico',
  templateUrl: './tecnologia-grafico.component.html',
  styleUrls: ['./tecnologia-grafico.component.css'],
  standalone: true,
  imports: [CommonModule, NgChartsModule],
})
export class TecnologiaGraficoComponent implements OnInit {
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      title: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw as number;
            return label + ': ' + value.toFixed(1) + '%';
          },
        },
      },
    },
  };

  public dadosGrafico: { nome: string; valor: number }[] = [];

  constructor(private estatisticaService: EstatisticaService) {}

  ngOnInit(): void {
    this.estatisticaService.getTecnologiasPorTipo().subscribe({
      next: (dados) => {
        console.log('Dados recebidos:', dados);

        if (!dados || dados.length === 0) {
          console.error('Não há dados para exibir no gráfico');
          return;
        }

        // Adapta os dados para o formato desejado
        this.dadosGrafico = dados.map((d) => ({
          nome: d.tipo, // como o tipo é exibido
          valor: d.count, // número de ocorrências
        }));

        // Calculate total for percentage
        const total = dados.reduce((sum, item) => sum + item.count, 0);

        // Calculate percentages
        const percentages = dados.map((d) => (d.count / total) * 100);

        this.pieChartData = {
          labels: dados.map((d) => d.tipo),
          datasets: [
            {
              data: percentages,
              label: 'Porcentagem por Tipo',
              backgroundColor: [
                '#B20000', // vermelho base
                '#D93636', // vermelho mais claro
                '#8B0000', // vermelho mais escuro
                '#FF0000', // vermelho vibrante
                '#5C0000', // vermelho escuro, quase vinho
                '#FF5252', // vermelho claro
              ],
              hoverOffset: 4,
            },
          ],
        };
      },
      error: (error) => {
        console.error('Erro ao buscar dados:', error);
      },
    });
  }
}
