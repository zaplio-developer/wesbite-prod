import { prisma } from "@/lib/prisma";
import { toggleContactHandled, togglePraxisHandled } from "./actions";

function formatDate(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminLeadsPage() {
  const [contactSubmissions, praxisApplications] = await Promise.all([
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.praxisApplication.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-xl font-semibold text-foreground">Contact submissions</h1>
        <div className="mt-4 divide-y divide-border rounded-lg border border-border">
          {contactSubmissions.length === 0 && (
            <p className="p-6 text-sm text-muted">No submissions yet.</p>
          )}
          {contactSubmissions.map((entry) => (
            <div key={entry.id} className="flex items-start justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {entry.name} &middot; {entry.company}
                </p>
                <p className="text-xs text-muted">
                  {entry.email} &middot; {entry.serviceArea} &middot; {formatDate(entry.createdAt)}
                </p>
                <p className="mt-2 text-sm text-muted">{entry.message}</p>
              </div>
              <form action={toggleContactHandled.bind(null, entry.id, entry.handled)}>
                <button
                  type="submit"
                  className={
                    entry.handled
                      ? "rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                      : "rounded-full bg-surface-hover px-3 py-1 text-xs font-medium text-muted"
                  }
                >
                  {entry.handled ? "Handled" : "Mark handled"}
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground">PRAXIS applications</h2>
        <div className="mt-4 divide-y divide-border rounded-lg border border-border">
          {praxisApplications.length === 0 && (
            <p className="p-6 text-sm text-muted">No applications yet.</p>
          )}
          {praxisApplications.map((entry) => (
            <div key={entry.id} className="flex items-start justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {entry.name} &middot; {entry.university}
                </p>
                <p className="text-xs text-muted">
                  {entry.email} &middot; Graduating {entry.graduationYear} &middot;{" "}
                  {formatDate(entry.createdAt)}
                </p>
                {entry.message && <p className="mt-2 text-sm text-muted">{entry.message}</p>}
              </div>
              <form action={togglePraxisHandled.bind(null, entry.id, entry.handled)}>
                <button
                  type="submit"
                  className={
                    entry.handled
                      ? "rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                      : "rounded-full bg-surface-hover px-3 py-1 text-xs font-medium text-muted"
                  }
                >
                  {entry.handled ? "Handled" : "Mark handled"}
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
