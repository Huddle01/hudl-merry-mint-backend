import { config } from "@/config";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  // Get the
  const response = await fetch(
    `https://locksmith.unlock-protocol.com/v2/api/metadata/${config.network}/locks/${config.lock}/keys/${params.token}`
  );
  const metadata = await response.json();
  const attributes: any[] = [];
  Object.keys(metadata.userMetadata?.public).forEach((key) => {
    attributes.push({
      trait_type: key,
      value: metadata.userMetadata?.public[key],
    });
  });
  return NextResponse.json({
    name: metadata.name,
    description: metadata.description,
    image: `${config.siteUrl}/images/${params.token}`,
    attributes,
    external_url: config.siteUrl,
  });
}
