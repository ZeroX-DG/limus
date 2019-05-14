import html2canvas from "html2canvas";
export default () => {
  html2canvas(document.getElementById("export-region")).then(canvas => {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "somefilename.png";
    a.click();
  });
}
