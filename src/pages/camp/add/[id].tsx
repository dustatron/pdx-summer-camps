import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import CampEditForm from "../../../components/CampEditForm";
import RenderTree from "../../../components/RenderTree";
import { CampData } from "../../../types/camp";
import { trpc } from "../../../utils/trpc";

function AddCamp() {
  const router = useRouter();

  const { id: providerId } = router.query;
  const { data: sessionData } = useSession();

  return <CampEditForm providerId={providerId as string} />;
}

export default AddCamp;
