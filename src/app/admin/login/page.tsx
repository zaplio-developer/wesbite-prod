import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        action={login}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-border bg-surface p-6"
      >
        <h1 className="text-lg font-semibold text-foreground">Admin sign in</h1>
        <input type="hidden" name="from" value={from ?? "/admin"} />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        {error && (
          <p className="text-sm text-red-400" role="alert">
            Incorrect password.
          </p>
        )}
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
