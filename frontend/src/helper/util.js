import moment from "moment"
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"
import domtoimage from 'dom-to-image';

export default class Util {

    constructor() { }

    static normalString = (str) => {

        return str.toLowerCase().normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
    }
    static toSalaryString = ({ from, to }) => {
        if (!from && to == 1000000) return "Thỏa thuận"
        if (!from) return `Lên đến ${to} triệu`
        if (to == 1000000) return `Từ ${from} triệu`
        return `${from} - ${to} triệu`
    }

    static toSalaryStringWithoutDefault = ({ from, to }) => {
        if (!from && !to) return "Thỏa thuận"
        if (!from) return `Lên đến ${to} triệu`
        if (!to) return `Từ ${from} triệu`
        return `${from} - ${to} triệu`
    }

    static isOutDate = (date) => {
        return moment() > moment(date)
    }

    static generate = function (scrollP) {
        var scale = 2;
        var domNode = document.getElementById("html2canvas")
        domtoimage.toPng(domNode, {
            width: domNode.clientWidth * scale,
            height: domNode.clientHeight * scale,
            style: {
                transform: 'scale(' + scale + ')',
                transformOrigin: 'top left'
            }
        }).then(function (dataUrl) {
            var imgData = dataUrl
            var img = new Image();
            img.src = dataUrl;
            var imgWidth = 210;
            var pageHeight = 300;
            var imgHeight = domNode.clientHeight * imgWidth / domNode.clientWidth;
            var heightLeft = imgHeight;
            var doc = new jsPDF('p', 'mm','a4');
            //var doc = new jsPDF('p', 'pt','a4',true);
            var position = 0; // give some top padding to first page

            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight,'','FAST');
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position += heightLeft - imgHeight; // top padding for other pages
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            window.open(doc.output('bloburl'), '_blank');
        })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

        // let oldTextAreas = document.getElementsByTagName("textarea")

        // for (let oldTextArea of oldTextAreas) {
        //     console.log(oldTextArea.value)
        //     oldTextArea.replaceWith("<div id='divForTA' class='divTextArea'>" + oldTextArea.value.replace(/\n/g, "<br>") + "</div>")
        //   }

        // console.log(scrollP)
        // html2canvas(document.getElementById("html2canvas"), {
        //     scrollX: -scrollP?.x || -window.scrollX,
        //     scrollY: -scrollP?.y || -window.scrollY,
        //     windowWidth: document.documentElement.offsetWidth,
        //     windowHeight: document.documentElement.offsetHeight,
        //     logging: true, letterRendering: 1, allowTaint: true, useCORS: true
        // }).then(function (canvas) {
        //     var imgData = canvas.toDataURL('image/png');
        //     var imgWidth = 210;
        //     var pageHeight = 300;
        //     var imgHeight = canvas.height * imgWidth / canvas.width;
        //     var heightLeft = imgHeight;
        //     var doc = new jsPDF('p', 'mm');
        //     var position = 0; // give some top padding to first page

        //     doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        //     heightLeft -= pageHeight;

        //     while (heightLeft >= 0) {
        //         position += heightLeft - imgHeight; // top padding for other pages
        //         doc.addPage();
        //         doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        //         heightLeft -= pageHeight;
        //     }
        //     window.open(doc.output('bloburl'), '_blank');
        //     //doc.output('dataurlnewwindow');

        //     //doc.save('file.pdf');
        // });
    }
}