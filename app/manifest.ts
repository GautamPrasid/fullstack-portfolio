import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prasid Gautam | Software & Frontend Developer",
    short_name: "Prasid Gautam",
    description:
      "Personal portfolio of Prasid Gautam, a BCA student, software and frontend developer from Pokhara, Nepal.",
    start_url: "/",
    display: "standalone",
    background_color: "#050508",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
