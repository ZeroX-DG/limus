import domtoimage from "dom-to-image";

export default (backgroundType?: string, background?: string) => {
  const option = {};
  if (backgroundType == "color") {
    option["bgcolor"] = background;
  } else if (backgroundType == "image") {
    option["style"] = {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover"
    };
  }
  domtoimage
    .toPng(document.querySelector(".image-display-wrapper"), option)
    .then((dataUrl: string) => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "screenshot.png";
      a.click();
    });
};
