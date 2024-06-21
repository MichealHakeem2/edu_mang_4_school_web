Vue.component('donutChart', {
    template: '#donutTemplate',
    props: ["initialValues"],
    data() {
      return {
        angleOffset: -90,
        chartData: [],
        colors: ["#6495ED", "goldenrod", "#cd5c5c", "thistle", "lightgray"],
        cx: 80,
        cy: 80,         
        radius: 40,
        sortedValues: [],
        strokeWidth: 20,
      }
    },
    computed: {
      // adjust the circumference to add small white gaps
      adjustedCircumference() {
        return this.circumference - 2
      },
      circumference() {
        return 2 * Math.PI * this.radius
      },
      dataTotal() {
        return this.sortedValues.reduce((acc, val) => acc + val)
      },
      calculateChartData() {
        this.sortedValues.forEach((dataVal, index) => {
          const { x, y } = this.calculateTextCoords(dataVal, this.angleOffset)
          // start at -90deg so that the largest segment is perpendicular to top
          const data = {
            degrees: this.angleOffset,
            textX: x,
            textY: y
          }
          this.chartData.push(data)
          this.angleOffset = this.dataPercentage(dataVal) * 360 + this.angleOffset        
        })
      },
      sortInitialValues() {
        return this.sortedValues = this.initialValues.sort((a,b) => b-a)
      }
    },
    methods: {
      calculateStrokeDashOffset(dataVal, circumference) {
        const strokeDiff = this.dataPercentage(dataVal) * circumference      
        return circumference - strokeDiff
      },
      calculateTextCoords(dataVal, angleOffset) {
        // t must be radians
        // x(t) = r cos(t) + j
        // y(t) = r sin(t) + j
  
        const angle = (this.dataPercentage(dataVal) * 360) / 2 + angleOffset      
        const radians = this.degreesToRadians(angle)
  
        const textCoords = {
          x: this.radius * Math.cos(radians) + this.cx,
          y: this.radius * Math.sin(radians) + this.cy
        }
        return textCoords
      },
      degreesToRadians(angle) {
        return angle * (Math.PI / 180)
      },
      dataPercentage(dataVal) {
        return dataVal / this.dataTotal
      },
      percentageString(dataVal) {
        return `${Math.round(this.dataPercentage(dataVal) * 100)}%`
      },
      returnCircleTransformValue(index) {
        return `rotate(${this.chartData[index].degrees}, ${this.cx}, ${this.cy})`
      },
      segmentBigEnough(dataVal) {
        return Math.round(this.dataPercentage(dataVal) * 100) > 5
      }    
    },
    mounted() {
      this.sortInitialValues
      this.calculateChartData
    }
  })
  new Vue({
    el: "#app",
    data() {
      return {
        values: [230, 308, 520, 7.5 , 200]
      }
    },
  });

  


  var ctx = document.getElementById("barChart").getContext('2d');
var barChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["JAN", "FEB", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    datasets: [{
      label: 'data-1',
      data: [12, 19, 3, 17, 28, 24, 7, 24, 24, 24, 24],
      backgroundColor: "rgba(255,0,0,1)"
    }, {
      label: 'data-2',
      data: [30, 29, 5, 5, 20, 3, 10, 24, 24, 24, 24],
      backgroundColor: "rgba(0,0,255,1)"
    }]
  }
});


google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawCharts);
function drawCharts() {
  // BEGIN BAR CHART
  // actual bar chart data
  var barData = google.visualization.arrayToDataTable([
    ['month', 'test', 'exam'],
    ['Jan',  15,      40],
    ['Feb',  25,      45],
    ['Mar',  20,       15],
    ['Apr',  36,      16],
    ['May',  15,      35],
    ['Jun',  13,      25],
    ['Jul',  48,      55],
    ['Aug',  34,      15],
    ['Sep',  15,      34],
    ['Oct',  60,      54],
    ['Nov',  36,      25],
    ['Dec',  35,      43]
  ]);
  // set bar chart options
  var barOptions = {
    focusTarget: 'category',
    backgroundColor: 'transparent',
    colors: ['cornflowerblue', 'tomato'],
    fontName: 'Open Sans',
    chartArea: {
      left: 50,
      top: 10,
      width: '100%',
      height: '70%',
    },
    bar: {
      groupWidth: '80%'
    },
    hAxis: {
      textStyle: {
        fontSize: 11,
        color: 'white'
      }
    },
    vAxis: {
      minValue: 0,
      maxValue: 60,
      baselineColor: 'white',
      gridlines: {
        color: 'white',
        count: 4
      },
      textStyle: {
        fontSize: 11,
        color: 'white'
      }
    },
    legend: {
      position: 'bottom',
      textStyle: {
        fontSize: 12,
        color: 'white'
      }
    },
    animation: {
      duration: 1200,
      easing: 'out',
			startup: true
    }
  };
  // draw bar chart twice so it animates
  var barChart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
  //barChart.draw(barZeroData, barOptions);
  barChart.draw(barData, barOptions);
  // BEGIN PIE CHART
  // pie chart data
  var pieData = google.visualization.arrayToDataTable([
    ['Country', 'Page Hits'],
    ['USA',      7242],
    ['Canada',   4563],
    ['Mexico',   1345],
    ['Sweden',    946],
    ['Germany',  2150]
  ]);
  // pie chart options
  var pieOptions = {
    backgroundColor: 'transparent',
    pieHole: 0.4,

    pieSliceText: 'value',
    tooltip: {
      text: 'percentage',
      color: 'white'
    },
    fontName: 'Open Sans',
    chartArea: {
      width: '100%',
      height: '94%'
    },
    legend: {
      textStyle: {
        fontSize: 13,
        color: 'white'
      }
    }
  };
  // draw pie chart
  var pieChart = new google.visualization.PieChart(document.getElementById('pie-chart'));
  pieChart.draw(pieData, pieOptions);
}