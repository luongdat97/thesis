import { jsPDF } from "jspdf";
import CreateCv from "../CreateCv"
import html2canvas from "html2canvas"
import "./MoviePosterPersonalUse-axyeE-normal"
import printJS from 'print-js'
import {Button} from "antd"


let generate = function () {
    html2canvas(document.getElementById("html2canvas"), { quality: 4 }).then(function (canvas) {
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        var doc = new jsPDF('p', 'mm');
        var position = 10; // give some top padding to first page

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position += heightLeft - imgHeight; // top padding for other pages
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        window.open(doc.output('bloburl'), '_self');
        //doc.output('dataurlnewwindow');

        //doc.save('file.pdf');
    });

    // html2canvas(document.body, {
    //     scale: 5,
    //     onrendered: function (canvas) {
    //         document.body.appendChild(canvas);
    //         // var img = canvas.toDataURL("png");

    //         // var doc = new jsPDF("p", "mm", "a4");

    //         // var width = doc.internal.pageSize.getWidth();
    //         // var height = doc.internal.pageSize.getHeight();

    //         // doc.addImage(img, 'PNG', 0, 0, width, height);
    //         // doc.save('testing.pdf');
    //     }
    // })



    // 	var doc = new jsPDF('p', 'pt', 'a4');
    //     doc.setFontSize(28);

    // // doc.text("This is times italic.", 20, 40);
    // // doc.output("dataurlnewwindow")

    // doc.html(document.body, {
    //    callback: function (doc) {
    //      doc.output("dataurlnewwindow")
    //    },

    // });
};


const CvPreview = () => {
    return (
        <>
            <button onClick={() => generate()}>Generate PDF</button>
            <div>
                <Button color="primary" onClick={() => {
                    printJS({
                        printable: 'html2canvas',
                        type: 'html',
                        targetStyles: ['*'],
                        style: `@page {
                                size: A4;
                              }`,
                        header: null,
                        footer: null,
                    });
                }}>Tạo phiếu in</Button>
                <CreateCv></CreateCv>
                <p></p>

            </div>
        </>
    )
}

export default CvPreview
