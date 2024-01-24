import ColorForm from "@/components/color/ColorForm"
import { prisma } from "@/lib/prisma";

const SingleColorPage = async(
  {params} : { params : {colorId : string} }
) => {

  const { colorId } = params;

  const colors = await prisma.color.findUnique({
    where : {
      id : colorId,
    }
  });

  return (
    <main>
        <ColorForm
          initialValues={colors}
        />
    </main>
  )
}

export default SingleColorPage