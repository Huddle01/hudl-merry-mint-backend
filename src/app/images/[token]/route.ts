import { config } from "@/config";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  // Get the
  const response = await fetch(
    `https://locksmith.unlock-protocol.com/v2/api/metadata/137/locks/0xbcc2533501bef44c2c050df0419c85ce30f928cb/keys/${params.token}`
  );
  const metadata = await response.json();
  const attributes: any[] = [];
  Object.keys(metadata.userMetadata?.public).forEach((key) => {
    attributes.push({
      trait_type: key,
      value: metadata.userMetadata?.public[key],
    });
  });
  const size = 300;
  return new NextResponse(
    `<svg height="${size}" width="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    ${new Array(9)
      .fill(0)
      .map((x, i) => {
        if (metadata.userMetadata?.public[`hudl_${i}`]) {
          return `<text y="${size / 6 + (size / 3) * Math.floor(i / 3)}" x="${
            size / 6 + (size / 3) * (i % 3)
          }" fill="green">${i}</text>`;
        } else {
          return `<text y="${size / 6 + (size / 3) * Math.floor(i / 3)}" x="${
            size / 6 + (size / 3) * (i % 3)
          }" fill="red">${i}</text>`;
        }
      })
      .join(`\n`)}
</svg> `,
    {
      status: 200,
      headers: {
        "content-type": "image/svg+xml",
      },
    }
  );
}
