import { getBusiness } from "@/data-access";
import { getUserIdFromSession } from "@/modules/auth/utils/getUserFromSession";
import { NextResponse } from "next/server";

const handler = async () => {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const business = await getBusiness(userId);
    if (!business) {
      return NextResponse.json(
        { message: "Business not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(business);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 },
    );
  }
};

export { handler as GET };
