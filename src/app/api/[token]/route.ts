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
  return NextResponse.json({
    name: metadata.name,
    description: metadata.description,
    image: `thix`,
    attributes,
    external_url: `THIX`,
  });
}
