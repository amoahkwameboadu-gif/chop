import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { cmsAdminUsers } from "@/lib/db/schema";
import type { CmsAdminAccess } from "@/lib/cms/types";

export class CmsAccessError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 401 | 403 | 404 | 409 = 403,
  ) {
    super(message);
    this.name = "CmsAccessError";
  }
}

export class CmsRequestError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 404 | 409 = 400,
  ) {
    super(message);
    this.name = "CmsRequestError";
  }
}

export async function getCmsAdminAccess(): Promise<CmsAdminAccess> {
  const { data: session } = await auth.getSession();
  const sessionUser = session?.user;

  if (!sessionUser?.email) {
    return { user: null, admin: null };
  }

  const [admin] = await db
    .select({
      userId: cmsAdminUsers.userId,
      email: cmsAdminUsers.email,
      displayName: cmsAdminUsers.displayName,
      active: cmsAdminUsers.active,
    })
    .from(cmsAdminUsers)
    .where(eq(cmsAdminUsers.userId, sessionUser.id))
    .limit(1);

  const emailMatches = admin?.email.toLowerCase() === sessionUser.email.toLowerCase();
  const authorized = admin?.active && emailMatches ? admin : null;

  return {
    user: {
      id: sessionUser.id,
      email: sessionUser.email,
      name: sessionUser.name || sessionUser.email,
    },
    admin: authorized,
  };
}

export async function requireCmsAdmin() {
  const access = await getCmsAdminAccess();
  if (!access.user) throw new CmsAccessError("Please sign in to continue.", 401);
  if (!access.admin) throw new CmsAccessError("This account is not authorized for the CHOP CMS.", 403);
  return { user: access.user, admin: access.admin };
}

export function requireSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const requestOrigin = new URL(request.url).origin;
  if (!origin || origin !== requestOrigin) {
    throw new CmsAccessError("This request is not allowed.", 403);
  }
}

export function cmsErrorResponse(error: unknown) {
  if (error instanceof CmsAccessError || error instanceof CmsRequestError) {
    return Response.json({ error: error.message }, { status: error.status });
  }

  if (error && typeof error === "object" && "code" in error && error.code === "23505") {
    return Response.json({ error: "An item with this name or address already exists." }, { status: 409 });
  }

  if (error instanceof SyntaxError) {
    return Response.json({ error: "The request body is invalid." }, { status: 400 });
  }

  console.error("[cms] Request failed", error);
  return Response.json({ error: "Unable to complete this request. Please try again." }, { status: 500 });
}

export function validationError(error: { issues: Array<{ message: string }> }) {
  return Response.json(
    { error: error.issues[0]?.message ?? "Please check the submitted information." },
    { status: 400 },
  );
}
