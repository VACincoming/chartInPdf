import React from 'react'
import './chart.css'
import CanvasJSReact from '../../assets/canvasjs.react';
import moment from 'moment'
import { PDFExport } from '@progress/kendo-react-pdf';
import ReactFileReader from 'react-file-reader';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart(){
  let points = null;
  let csvLines = null;
  const [isDownloadElement, setIsDownloadElement] = React.useState(false);
  const [csvStr, setCsvStr] = React.useState(null)
  function getDataPoints(csv){
    let dataPoints = csvLines = points = [];
    csvLines = csv.split(/[\r?\n|\r|\n]+/)
    csvLines.sort();
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
    theme: "light1",
    title:{
      text: "Chart"
    },
    axisY: {
      title: "Count",
      includeZero: false,
    },
    axisX: {
      includeZero: true,
      title: "Date",
      interval: 2,
    },
    data: [{
      type: "line",
      toolTipContent: "Date {x}: count {y}",
      dataPoints: csvStr
    }]
  }

let pdfExportComponent;
const exportPDFWithComponent = () => {
  pdfExportComponent.save();
  setIsDownloadElement(true);
}
function handleFile(files){
  var reader = new FileReader();
  reader.onload = function(e) {
    setCsvStr(getDataPoints(reader.result))
  }
  reader.readAsText(files[0]);
}
  return(
    <>
    {
      isDownloadElement ? <div id='downloadElement'></div> : null
    }
      <ReactFileReader handleFiles={handleFile} fileTypes={'.csv'}>
        <button id='uploadBtn'> Upload file </button>
      </ReactFileReader>
      { csvStr === null ? null :
        <>
          <div className='wrapperMain' id='wrapperMain'>
            <button onClick={exportPDFWithComponent} id='exportBtn'>Export with PDF</button>
            <PDFExport ref={(component) => pdfExportComponent = component} paperSize="A4" landscape={true}>
              <CanvasJSChart options = {options} />
            </PDFExport>
          </div>
        </>
      }
    </>
  )
}