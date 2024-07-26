/**
 * Title: Pie Chart
 * Author: Mackenzie Lubben-Ortiz
 * Date: 18 July 2024
 * Updated: 07/26/2024 by Brock Hemsouvanh
 * Description: Purchase by service pie graph
 */

'use strict';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/invoices/purchases-graph').subscribe(data => {
      const labels = [...new Set(data.map(item => item.serviceName))]; // Unique labels
      const amounts = labels.map(label => data.filter(item => item.serviceName === label).reduce((sum, item) => sum + item.totalAmount, 0)); // Sum amounts per label

      const myPie = new Chart('myPieChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: amounts,
            backgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#6B3FA0',
              '#AF593E',
              '#6CDAE7'
            ],
            hoverBackgroundColor: [
              '#946B2D', // Bronze
              '#946B2D', // Bronze
              '#946B2D', // Bronze
              '#946B2D', // Bronze
              '#946B2D', // Bronze
              '#946B2D', // Bronze
              '#946B2D'  // Bronze
            ]
          }]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: '#0F1D4A', // Dark Blue
                font: {
                  size: 25
                },
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }, error => {
      console.error('Error fetching data', error);
    });
  }
}
