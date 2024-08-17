import { api, HydrateClient } from "@/trpc/server";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default async function Home() {
  const allCaseRecords = await api.caseRecord.getAll();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {allCaseRecords.length > 0
                ? allCaseRecords.map((caseRecord) => (
                    <p key={caseRecord.id}>{caseRecord.patientIdentifier}</p>
                  ))
                : "No case records found"}
            </p>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
