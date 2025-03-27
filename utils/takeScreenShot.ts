import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const takeScreenshot = async (
  bandName: string,
  format: "pdf" | "png",
  setOpen: any,
  isPortrait: boolean
) => {
  const fileName = bandName.trim() === "" ? "Stage Plot" : bandName;

  // FIXING THE HEADER
  const {
    input,
    span,
    channelCells,
    editDate,
    outputLabel,
    preElement,
    descriptionTextarea,
  } = preConversionStyling();

  // NOW WE CONVERT THE FUCKING THIGN
  const element = document.querySelector(
    !isPortrait ? ".stage-plot-graphic" : ".mt-8"
  );
  const inputWrapper = document.querySelector(".input-wrapper");

  if (
    !(element instanceof HTMLElement) ||
    !(inputWrapper instanceof HTMLElement)
  ) {
    console.error("Element or input wrapper not found.");
    return;
  }
  // IS IT LANDSCAPE
  let elementToConvert;
  if (!isPortrait) {
    elementToConvert = landscapify(element);
  } else {
    elementToConvert = element;
  }

  try {
    const canvas = await html2canvas(elementToConvert, {
      ignoreElements: (el) => el.classList.contains("ignore-me"),
    });

    const secondPage = await html2canvas(inputWrapper, {
      ignoreElements: (el) => el.classList.contains("ignore-me"),
    });

    const imgData = canvas.toDataURL("image/png");
    const imgData2 = secondPage.toDataURL("image/png");

    if (format === "pdf") {
      generatePDF(imgData, imgData2, fileName, canvas, isPortrait);
    } else if (format === "png") {
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${fileName.replace(/\s+/g, "-")}.png`;
      link.click();
    }
  } catch (error) {
    console.error("Error capturing screenshot:", error);
  } finally {
    resetTheStyling(
      span,
      input,
      channelCells,
      outputLabel,
      elementToConvert,
      editDate,
      setOpen,
      isPortrait,
      preElement,
      descriptionTextarea
    );
  }
};

const preConversionStyling = () => {
  // ALTER TITLE OF PAGE
  const input = document.getElementById("name") as HTMLInputElement;
  const inputValue = input ? input.value : "";
  // ADD DATA AT BOTTOM
  const editDate = document.querySelector(".editDate") as HTMLElement;
  if (editDate) {
    editDate.style.display = "block";
  }
  //   TITLE OF OUTPUT TABLE
  const outputLabel = document.querySelector(
    ".output-label"
  ) as HTMLElement | null;
  if (outputLabel) {
    outputLabel.style.transform = "translateY(-7px)";
  }
  //   MOVE THE TABLE CHANNEL CELLS A BIT
  const channelCells = document.querySelectorAll<HTMLElement>(".channel-cell");

  channelCells.forEach((cell) => {
    cell.style.transform = "translateY(-6px)";
  });

  //   REPLACE THE INPUT TITLE WITH THE TEXT
  const span = document.createElement("span");
  span.textContent = inputValue;
  span.style.fontSize = "4rem";
  span.style.textAlign = "center";
  span.style.display = "flex";
  span.style.justifyContent = "center";
  span.style.alignItems = "center";
  span.style.width = "100%";
  span.style.height = "100%";
  span.style.fontFamily = "urbanist";
  span.style.transform = "translateY(-44px)";

  const descriptionTextarea = document.getElementById(
    "description"
  ) as HTMLTextAreaElement;

  const preElement = document.createElement("pre");
  preElement.textContent = descriptionTextarea.value;
  preElement.style.whiteSpace = "pre-wrap";
  preElement.style.fontFamily = "urbanist";
  preElement.style.fontSize = "1.1rem";
  preElement.style.textAlign = "center";
  preElement.style.margin = "0";
  preElement.style.padding = "0";
  preElement.style.border = "none";
  preElement.style.background = "transparent";
  preElement.style.minHeight = "200px";

  // Replace the textarea with the pre element
  descriptionTextarea.parentNode?.replaceChild(preElement, descriptionTextarea);

  if (input.parentNode) {
    input.parentNode.replaceChild(span, input);
  }
  return {
    input,
    span,
    channelCells,
    editDate,
    outputLabel,
    preElement,
    descriptionTextarea,
  };
};

const landscapify = (element: any) => {
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.transform = "rotate(90deg)";
  clone.style.transformOrigin = "top left";
  clone.style.position = "absolute";
  clone.style.top = "0";
  clone.style.left = "0";
  const title = clone.querySelector(".hidden-landscape-title") as HTMLElement;
  if (title) {
    title.classList.remove("hidden");
    title.classList.add("flex");
  }

  document.body.appendChild(clone);
  return clone;
};

const generatePDF = (
  imgData: string,
  imgData2: string,
  fileName: string,
  canvas: HTMLCanvasElement,
  isPortrait: boolean
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const aspectRatio = canvasWidth / canvasHeight;

  let imgWidth = pageWidth;
  let imgHeight = pageWidth / aspectRatio;

  if (imgHeight > pageHeight) {
    imgHeight = pageHeight;
    imgWidth = pageHeight * aspectRatio;
  }
  if (!isPortrait) {
    imgHeight = pageHeight * 0.9;
  }

  const xPosition = (pageWidth - imgWidth) / 2;
  const yPosition = !isPortrait ? 14.8 : 0;
  doc.addImage(imgData, "PNG", xPosition, yPosition, imgWidth, imgHeight);

  if (!isPortrait) {
    doc.addPage();

    const img = new Image();
    img.src = imgData2;

    img.onload = () => {
      const img2AspectRatio = img.width / img.height;

      let img2Width = pageWidth * 1.05;
      let img2Height = pageWidth / img2AspectRatio;

      if (img2Height > pageHeight) {
        img2Height = pageHeight;
        img2Width = pageHeight * img2AspectRatio;
      }

      img2Width = img2Height * img2AspectRatio;

      const x2Position = (pageWidth - img2Width) / 2;

      console.log(img2Height, "what the height");
      doc.addImage(
        imgData2,
        "PNG",
        x2Position,
        yPosition,
        img2Width,
        img2Height
      );
      doc.save(`${fileName.replace(/\s+/g, "-")}.pdf`);
    };

    return;
  }
  doc.save(`${fileName.replace(/\s+/g, "-")}.pdf`);
};

const resetTheStyling = (
  span: HTMLElement,
  input: HTMLInputElement,
  channelCells: NodeListOf<HTMLElement>,
  outputLabel: HTMLElement | null,
  elementToConvert: HTMLElement,
  editDate: HTMLElement,
  setOpen: any,
  isPortrait: boolean,
  preElement: any,
  descriptionTextarea: any
) => {
  // UNDO THE THINGS WE DID
  const spanParent = span.parentNode;
  if (spanParent && spanParent instanceof HTMLElement) {
    spanParent.replaceChild(input, span);
  }
  channelCells.forEach((cell) => {
    cell.style.transform = "translateY(6px)";
  });
  preElement.parentNode?.replaceChild(descriptionTextarea, preElement);

  if (outputLabel) {
    outputLabel.style.transform = "translateY(2px)";
  }
  if (!isPortrait) {
    document.body.removeChild(elementToConvert);
  }
  editDate.style.display = "none";
  setOpen(false);
};
