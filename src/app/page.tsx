import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Share subscriptions. Save together.
          </h1>
          <p className="mt-4 text-[#a3a3a3] max-w-2xl mx-auto">
            StreamShare lets you create and join shared groups for OTT and other
            subscriptions. List your plan, set per-slot price, invite members,
            and manage payments easily.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/signup">
              <Button className="bg-[#a560fa] hover:bg-[#7e25eb] text-white font-semibold px-6 py-2 rounded-md">
                Get started
              </Button>
            </Link>
            <Link href="/mymemberships">
              <Button
                variant="outline"
                className="border-[#232323] bg-[#18181b] text-[#ededed] hover:bg-[#1b1b1f]"
              >
                View my memberships
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-12">
        <h2 className="text-2xl font-bold mb-6">How StreamShare works</h2>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none">
          <li className="rounded-xl border border-[#232323] bg-[#18181b] p-5">
            <div className="text-lg font-semibold">1. Create a group</div>
            <p className="text-sm text-[#a3a3a3] mt-2">
              Add your platform, plan, slots, price per slot, rules and
              features.
            </p>
          </li>
          <li className="rounded-xl border border-[#232323] bg-[#18181b] p-5">
            <div className="text-lg font-semibold">2. Invite members</div>
            <p className="text-sm text-[#a3a3a3] mt-2">
              Share the group link and let people join until all slots are
              filled.
            </p>
          </li>
          <li className="rounded-xl border border-[#232323] bg-[#18181b] p-5">
            <div className="text-lg font-semibold">3. Manage access</div>
            <p className="text-sm text-[#a3a3a3] mt-2">
              Keep credentials safe, enforce rules, and manage profiles for each
              member.
            </p>
          </li>
          <li className="rounded-xl border border-[#232323] bg-[#18181b] p-5">
            <div className="text-lg font-semibold">4. Collect payments</div>
            <p className="text-sm text-[#a3a3a3] mt-2">
              Track members and monthly dues. Automate reminders and keep the
              group active.
            </p>
          </li>
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-16">
        <div className="rounded-2xl border border-[#232323] bg-[#18181b] p-8 sm:p-10 text-center">
          <h3 className="text-2xl font-bold">Ready to start sharing?</h3>
          <p className="text-[#a3a3a3] mt-2">
            Create your first membership group in minutes.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/signup">
              <Button className="bg-[#a560fa] hover:bg-[#7e25eb] text-white font-semibold px-6 py-2 rounded-md">
                Create an account
              </Button>
            </Link>
            <Link href="/(memberships)/mymemberships">
              <Button
                variant="outline"
                className="border-[#232323] bg-[#18181b] text-[#ededed] hover:bg-[#1b1b1f]"
              >
                Manage memberships
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
