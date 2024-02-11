import BillboardForm from "@/components/billboard/BillboardForm"
import { prisma } from "@/lib/prisma";

 

const SingleBillBoardPage = async(
  {params} : { params : {billboardId : string} }
) => {

  const { billboardId } = params;

  const billboard = await prisma.billboard.findUnique({
    where : {
      id : billboardId,
    },
    include:{
      images:true,
    },
  });
  
  return (
    <main>
        <BillboardForm
          initialValues={billboard}
        />
    </main>
  )
}

export default SingleBillBoardPage