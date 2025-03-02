export const getImage = (
  methods: any,
  takeScreenshot: any,
  setIsModalOpen: (open: boolean) => void,
  containerWidth: number
) => {
  const formData = methods.getValues();
  const stageElementsWithoutId = formData.stage_elements.map(
    ({ id, stage_plot_id, ...rest }: { id: any; stage_plot_id: any }) => rest
  );
  const inputsWithoutProperties = formData.inputs.map(
    ({
      stage_plot_id,
      notes,
      channel,
      ...rest
    }: {
      stage_plot_id: any;
      notes: any;
      channel: any;
    }) => rest
  );
  const screenshotWindow = window.open(
    `/screenshot?plotData=${encodeURIComponent(
      JSON.stringify({
        ...formData,
        stage_elements: stageElementsWithoutId,
        inputs: inputsWithoutProperties,
      })
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
