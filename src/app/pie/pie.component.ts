/**
 * Title: Pie Chart
 * Author: Mackenzie Lubben-Ortiz
 * Date: 18 July 2024
 * Description: purchase by service pie graph
 */
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  constructor () {} 
  
  ngOnInit(): void {
    const myPie = new Chart("myPieChart", {
      type: 'pie',
      data: {
        labels: ['Password Reset', 'Spyware Removal', 'RAM Upgrade', 'Software Installation', 'PC Tune-up', 'Keyboard Cleaning', 'Disk Clean-up'], // labels for data
        datasets: [{
          data: [12, 19, 3, 5, 2, 3, 30], // data for dataset
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
            '#ED0A3F',
            '#FF8833',
            '#5FA777',
            '#0066CC',
            '#6B3FA0',
            '#AF593E',
            '#6CDAE7'
          ],
        }]
      }
    })
  }

}
