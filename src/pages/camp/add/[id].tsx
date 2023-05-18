import { useRouter } from "next/router";
import React from "react";
import CampEditForm from "../../../components/CampEditForm";
import type { CampData } from "../../../types/camp";
import { trpc } from "../../../utils/trpc";

function AddCamp() {
  const router = useRouter();

  const { id: providerId } = router.query;
  const { data } = trpc.provider.getProvider.useQuery({
    providerId: providerId as string,
  });
  if (data) {
    const campData: CampData = {
      address: data.address,
      lat: data.lat,
      lng: data.lng,
      email: data.email,
      website: data.website,
      brief: data.brief,
      ages: [],
      title: "",
      tags: data.tags,
      quadrant: [],
      status: "UNKNOWN",
      dropOff: data.dropOff,
      pickUp: data.pickUp,
      description: data.description,
      facebook: data.facebook,
      instagram: data.instagram,
      phone: data.phone,
      contactName: data.contactName,
    };

    return (
      <CampEditForm providerId={providerId as string} campData={campData} />
    );
  }
  return <CampEditForm providerId={providerId as string} />;
}

export default AddCamp;
