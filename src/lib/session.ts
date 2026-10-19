// Shared, dependency-free session constants.
// Kept in their own module so the request proxy can import them without
// pulling in the database client or any Node-only crypto at bundle time.
export const SESSION_COOKIE = "rbx_admin_session";
export const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "rbx-dev-session-secret-change-me";
