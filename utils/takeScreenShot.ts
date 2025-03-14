import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const takeScreenshot = async (
  bandName: string,
  format: "pdf" | "png",
  setOpen: any
) => {
  // FIXING THE HEADER
  const landscape = true;
  const { input, span, channelCells, editDate, outputLabel } =
    preConversionStyling();
  // NOW WE CONVERT THE FUCKING THIGN
  const element = document.querySelector(
    landscape ? ".stage-plot-graphic" : ".mt-8"
  );
  const inputWrapper = document.querySelector(".input-wrapper");

  if (
    !(element instanceof HTMLElement) ||
    !(inputWrapper instanceof HTMLElement)
  ) {
    console.error("Element or input wrapper not found.");
    return;
  }
  let elementToConvert;
  if (landscape) {
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
      generatePDF(imgData, imgData2, bandName, canvas, landscape);
    } else if (format === "png") {
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${bandName.replace(/\s+/g, "-")}.png`;
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
      landscape
    );
  }
};

const preConversionStyling = () => {
  // ALTER TITLE OF PAGE
  const input = document.getElementById("name") as HTMLInputElement;
  const inputValue = input.value;
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

  if (input.parentNode) {
    input.parentNode.replaceChild(span, input);
  }
  return {
    input,
    span,
    channelCells,
    editDate,
    outputLabel,
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
  bandName: string,
  canvas: HTMLCanvasElement,
  landscape: any
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
  if (landscape) {
    imgHeight = pageHeight * 0.9;
  }

  const xPosition = (pageWidth - imgWidth) / 2;
  const yPosition = landscape ? 14.8 : 0;
  doc.addImage(imgData, "PNG", xPosition, yPosition, imgWidth, imgHeight);

  if (landscape) {
    doc.addPage();

    const img = new Image();
    img.src = imgData2;

    img.onload = () => {
      const img2AspectRatio = img.width / img.height;

      let img2Width = pageWidth;
      let img2Height = pageWidth / img2AspectRatio;

      if (img2Height > pageHeight) {
        console.log("are we ever in here");
        img2Height = pageHeight;
        img2Width = pageHeight * img2AspectRatio;
      }

      img2Width = img2Height * img2AspectRatio;

      const x2Position = (pageWidth - img2Width) / 2;

      doc.addImage(
        imgData2,
        "PNG",
        x2Position,
        yPosition,
        img2Width,
        img2Height
      );
      doc.save(`${bandName.replace(/\s+/g, "-")}.pdf`);
    };

    return;
  }
  doc.save(`${bandName.replace(/\s+/g, "-")}.pdf`);
};

const resetTheStyling = (
  span: HTMLElement,
  input: HTMLInputElement,
  channelCells: NodeListOf<HTMLElement>,
  outputLabel: HTMLElement | null,
  elementToConvert: HTMLElement,
  editDate: HTMLElement,
  setOpen: any,
  landscape: boolean
) => {
  // UNDO THE THINGS WE DID
  const spanParent = span.parentNode;
  if (spanParent && spanParent instanceof HTMLElement) {
    spanParent.replaceChild(input, span);
  }
  channelCells.forEach((cell) => {
    cell.style.transform = "translateY(6px)";
  });
  if (outputLabel) {
    outputLabel.style.transform = "translateY(2px)";
  }
  if (landscape) {
    document.body.removeChild(elementToConvert);
  }
  editDate.style.display = "none";
  setOpen(false);
};
