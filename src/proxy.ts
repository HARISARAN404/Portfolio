import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/lib/dictionaries";

// French is the default landing language for everyone; visitors can switch
// to English with the FR/EN toggle.
const DEFAULT_LOCALE = "fr";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
