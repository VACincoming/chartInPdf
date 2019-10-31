import React from 'react'
import * as csv from 'csvtojson';
import CanvasJSReact from '../../assets/canvasjs.react';
import moment from 'moment'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let csvStr = 
  `2011-02-02,5
  2012-02-04,15
  2013-02-03,3
  2014-12-12,6
  2015-02-06,4
  2016-02-07,22
  2017-02-08,1
  2018-02-08,2
`


export default function Chart(){
  let points = null;
  let csvLines = null;
  
  function getDataPoints(csv){
    let dataPoints = csvLines = points = [];
    csvLines = csv.split(/[\r?\n|\r|\n]+/)
    for (var i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
            points = csvLines[i].split(",");
            dataPoints.push({ 
                x: new Date(moment(points[0]).format("YYYY,MM,DD")), 
                y: parseFloat(points[1]) 		
	    });
	}
    return dataPoints;
  }
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title:{
      text: "Chart"
    },
    axisY: {
      title: "Count",
      includeZero: false,
     
    },
    axisX: {
      title: "Date",
      interval: 2,
    },
    data: [{
      type: "line",
      toolTipContent: "Date {x}: count {y}",
      dataPoints: getDataPoints(csvStr)
    }]
  }
  const exportPdf = () => {
    let pdf = new jsPDF('p', 'pt');
    pdf.saveGraphicsState();
    //console.log(pdf)
    //pdf.save('chart.pdf')
  }
  //html2canvas(document.getElementById("capture"))
      return(
        <>
          <CanvasJSChart id='capture' options = {options}/>
          <button onClick={exportPdf}>Export pdf</button>
        </>
      )
}