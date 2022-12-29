import { prisma } from "../src/server/db/client";
import tempData from "../src/temp-data.json"

async function main() {
  for (const camp of tempData) {
    await prisma.camp.create({
      data: {
        title: camp.title,
        address: camp.address,
        website: camp.website || "none",
        link: camp.link,
        facebook: camp.facebook,
        description: camp.description,
        place_id: camp.place_id,
        image: {
          create: {
            src: camp.images[0] || '/img-place-holder.png'
          }
        },
        lat: camp.location.lat,
        lng: camp.location.lng
      }
    })
  }

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });