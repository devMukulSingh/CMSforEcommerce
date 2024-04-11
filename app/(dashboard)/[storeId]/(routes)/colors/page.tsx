import ColorClientComp from "@/components/color/ColorClientComp";

const ColorPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <ColorClientComp storeId={params.storeId} />
    </>
  );
};

export default ColorPage;
