import moment from "moment"
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"

export default class Util {

    constructor() { }

    static toSalaryString = ({from, to}) => {
        if (!from && to == 1000000) return "Thỏa thuận"
        if (!from) return `Lên đến ${to} triệu` 
        if (to == 1000000) return `Từ ${from} triệu`
        return `${from} - ${to} triệu`
    }

    static isOutDate = (date) => {
       return moment() > moment(date)
    }

    static generate = function () {
        html2canvas(document.getElementById("html2canvas"), {
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight,
            logging: true, letterRendering: 1, allowTaint: true, useCORS: true
        }).then(function (canvas) {
            var imgData = canvas.toDataURL('image/png');
            var imgWidth = 210;
            var pageHeight = 300;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var doc = new jsPDF('p', 'mm');
            var position = 0; // give some top padding to first page
    
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
    
            while (heightLeft >= 0) {
                position += heightLeft - imgHeight; // top padding for other pages
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            window.open(doc.output('bloburl'), '_blank');
            //doc.output('dataurlnewwindow');
    
            //doc.save('file.pdf');
        });
    }
}