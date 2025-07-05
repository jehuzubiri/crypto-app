import { TheAnyConst } from "@/models/General.model";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body: { path: string; params?: TheAnyConst } = await req.json();
    const { path, params } = body;

    if (!path) {
      return NextResponse.json(
        { ok: false, message: "Missing API path." },
        { status: 400 }
      );
    }

    const response = await axios.get(`${process.env.API_HOST}${path}`, {
      headers: {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": process.env.API_SECRET_KEY,
        "Content-Type": "application/json",
      },
      params,
    });

    return NextResponse.json({ ok: true, data: response?.data?.data });
  } catch (error: any) {
    console.error({ ERROR_APP_API: error });

    const message =
      error?.response?.data?.status?.error_message ||
      error?.message ||
      "CoinMarketCap API Proxy Error";

    return NextResponse.json(
      {
        ok: false,
        message,
        error: error?.response?.data,
      },
      { status: error?.status || 500 }
    );
  }
}
