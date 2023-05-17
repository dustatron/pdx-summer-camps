import { prisma } from "../src/server/db/client";
import tempData from "../src/temp-data.json"

const fallBakImage = "https://res.cloudinary.com/dtqlulaog/image/upload/v1684295688/camp-image/p7x7zzkmnkhovlzeakvd.png"

async function main() {
  for (const camp of tempData) {
    await prisma.camp.create({
      data: {
        title: camp.title,
        address: camp.address,
        website: camp.website || "none",
        link: camp.link,
        facebook: camp.facebook,
        description: camp.description.slice(0, 2500),
        brief: camp.description.slice(0, 150),
        place_id: camp.place_id,
        quadrant: camp.quadrant,
        image: {
          create: {
            src: camp.images[0] || fallBakImage
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
