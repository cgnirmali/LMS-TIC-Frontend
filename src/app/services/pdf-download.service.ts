import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';



@Injectable({
  providedIn: 'root'

})
export class PdfDownloadService {


  constructor() { }

 
  downloadElementAsPDF(elementId: string, pdfFileName: string = 'download.pdf'): void {
    const dataElement = document.getElementById(elementId);
    
    if (!dataElement) {
      console.error(`Element with id ${elementId} not found`);
      return;
    }
    
    
    html2canvas(dataElement, {
      useCORS: true,                           
      scrollY: -window.scrollY,             
      scrollX: -window.scrollX,
      width: dataElement.scrollWidth,         
      height: dataElement.scrollHeight,       
      scale: 2                                
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      
    
      const pdf = new jsPDF('l', 'mm', 'a4');
      
   
      const pageWidth = 297; 
      const imgWidth = pageWidth; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width; 
      
     
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
    
      pdf.save(pdfFileName);
    }).catch(error => console.error('Error generating PDF:', error));
  }
}