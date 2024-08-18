import { HydrateClient, api } from "@/trpc/server"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import NewCaseRecordForm from "./_components/NewCaseRecordForm/NewCaseRecordForm"

export default async function Home() {
    const allCaseRecords = await api.caseRecord.getAll()

    return (
        <HydrateClient>
            <main className="flex min-h-screen flex-col items-center justify-center">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                        Create{" "}
                        <span className="text-[hsl(280,100%,70%)]">T3</span> App
                    </h1>

                    <NewCaseRecordForm />

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-2xl text-white">
                            {allCaseRecords.length > 0
                                ? allCaseRecords.map((caseRecord) => (
                                      <p key={caseRecord.id}>
                                          {caseRecord.patientIdentifier}
                                      </p>
                                  ))
                                : "No case records found"}
                        </p>
                    </div>
                </div>
            </main>
        </HydrateClient>
    )
}
