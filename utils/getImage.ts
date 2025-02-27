export const getImage = (
  methods: any,
  takeScreenshot: any,
  setIsModalOpen: (open: boolean) => void,
  containerWidth: number
) => {
  const formData = methods.getValues();
  const screenshotWindow = window.open(
    `/screenshot?plotData=${encodeURIComponent(
      JSON.stringify(formData)
    )}&containerWidth=${containerWidth}`,
    "Screenshot"
  );

  window.addEventListener("message", async (event) => {
    if (event.data.type === "READY_FOR_SCREENSHOT") {
      setTimeout(async () => {
        const element = screenshotWindow?.document.querySelector(
          "#previewRef"
        ) as HTMLElement | null;

        const screenshot = await takeScreenshot(element);

        screenshotWindow?.close();

        setIsModalOpen(true);
      }, 400);
    }
  });
};
