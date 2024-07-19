/**
 * Title: Purchases By Service Graph
 * Author: Mackenzie Lubben-Ortiz
 * Date: 18 July 2024
 * Description: BCRS purchase by service graph
 */

import { Component, OnInit} from '@angular/core';
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
      // create a new pie chart instance 
      // pass in the id of the canvas element and type of chart
      // pass in the data and options objects to chart constructor

      const myPie = new Chart("myPieChart", {
        type: 'pie',
        data: {
          labels: ['Password Reset', 'Spyware Removal', 'RAM upgrade', 'PC Tune-up', 'Keyboard Cleaning', 'Disk Clean-up'], // labels for data
          datasets: [{
            data: [12, 19, 3, 5, 2, 3, 30], // data for the dataset
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
