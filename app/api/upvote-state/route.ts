import { auth } from "@/auth";
import { getUpvoteState } from "@/actions/upvote";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const universeId = searchParams.get("universeId");
  if (!universeId) return NextResponse.json({ upvoted: false });

  const session = await auth();
  const { upvoted } = await getUpvoteState(universeId, session?.user?.id);
  return NextResponse.json({ upvoted });
}
