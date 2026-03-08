import Image from "next/image";
import {
    ArrowRight,
    BellRing,
    MessageSquareText,
    ShieldCheck,
    Sparkles,
    Zap,
} from "lucide-react";
import { getCurrentUser } from "@/lib/services/auth.service";

const highlights = [
    {
        icon: Zap,
        title: "Instant Sync",
        description: "Messages, replies, and updates stay aligned across your workspace.",
    },
    {
        icon: ShieldCheck,
        title: "Focused Threads",
        description: "Keep conversations organized so nothing important gets buried.",
    },
    {
        icon: BellRing,
        title: "Live Activity",
        description: "Jump back in and catch the latest context in a few seconds.",
    },
];

export default async function EmptyChat() {
    const user = await getCurrentUser()

    return (
        <div className="relative flex h-full min-h-[70vh] w-full items-center justify-center overflow-hidden px-4 py-6 sm:px-6 sm:py-8 xl:px-8 xl:py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,91,213,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(214,41,118,0.12),transparent_36%)]" />
            <div className="absolute -left-20 top-0 h-40 w-40 rounded-full bg-[#4F5BD5]/12 blur-3xl sm:-left-16 sm:top-8 sm:h-56 sm:w-56" />
            <div className="absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-[#D62976]/10 blur-3xl sm:-right-12 sm:h-64 sm:w-64" />

            <div className="relative grid w-full max-w-6xl gap-6 overflow-hidden rounded-[28px] border border-border/60 bg-background/85 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:rounded-[32px] sm:p-6 lg:gap-8 lg:p-8 xl:grid-cols-[1.15fr_0.85fr] xl:p-10">
                <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[linear-gradient(180deg,rgba(232,240,252,0.65),rgba(255,255,255,0))] xl:block dark:bg-[linear-gradient(180deg,rgba(15,22,38,0.55),rgba(15,22,38,0))]" />

                <div className="relative flex flex-col justify-center text-center xl:text-left">
                    <div className="mb-4 inline-flex max-w-full items-center justify-center gap-2 self-center rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-sm sm:mb-5 sm:text-[11px] sm:tracking-[0.24em] xl:self-start">
                        <Sparkles className="h-3.5 w-3.5 text-[#D62976]" />
                        Realtime Workspace
                    </div>

                    <div className="mb-5 flex justify-center xl:justify-start">
                        <div className="relative inline-flex rounded-[24px] bg-[conic-gradient(from_210deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5,#FEDA75)] p-[2px] shadow-[0_18px_44px_rgba(214,41,118,0.18)] sm:rounded-[28px]">
                            <div className="absolute inset-3 rounded-[22px] bg-[conic-gradient(from_210deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5,#FEDA75)] opacity-20 blur-xl" />
                            <div className="relative rounded-[22px] bg-background/95 p-3 sm:rounded-[26px] sm:p-5">
                                <Image
                                    src="/logo3.png"
                                    alt="NEXORA"
                                    width={92}
                                    height={92}
                                    sizes="(max-width: 640px) 64px, 92px"
                                    className="h-16 w-16 opacity-95 sm:h-[92px] sm:w-[92px]"
                                />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Welcome {" "}
                        <span className="bg-[linear-gradient(135deg,#4F5BD5,#D62976)] bg-clip-text text-transparent">
                            {user?.name ||'NEXORA'}
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 xl:mx-0">
                        Select a conversation from the sidebar to open your workspace feed,
                        continue team discussions, and keep every important update in one place.
                    </p>

                    <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap xl:justify-start">
                        <div className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg shadow-foreground/10 sm:w-auto">
                            <MessageSquareText className="h-4 w-4" />
                            Your messages start here
                        </div>
                        <div className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm text-muted-foreground sm:w-auto">
                            <ArrowRight className="h-4 w-4 text-[#4F5BD5]" />
                            Choose any chat to begin
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3 text-left sm:mt-8 sm:grid-cols-2 xl:grid-cols-3">
                        {highlights.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-border/60 bg-background/70 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                            >
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E8F0FC] text-[#4F5BD5] dark:bg-[#10192d] dark:text-[#9fb6ff]">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative flex items-center">
                    <div className="w-full rounded-[24px] border border-border/60 bg-background/80 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-[30px] sm:p-5">
                        <div className="relative overflow-hidden rounded-[20px] border border-border/60 bg-card/90 p-4 sm:rounded-[24px] sm:p-5">
                            <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(79,91,213,0.22),transparent_70%)]" />

                            <div className="relative flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        Conversation Preview
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        A clean space for team updates, decisions, and quick replies.
                                    </p>
                                </div>
                                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                    Live
                                </span>
                            </div>

                            <div className="relative mt-6 space-y-3">
                                <div className="max-w-[92%] rounded-[20px] rounded-bl-md bg-[#F3F7FF] px-3.5 py-3 text-left shadow-sm sm:max-w-[85%] sm:rounded-[24px] sm:px-4 dark:bg-[#10192d]">
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4F5BD5]">
                                        Product Design
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-foreground">
                                        Can we align the handoff notes before today&apos;s review?
                                    </p>
                                </div>

                                <div className="ml-auto max-w-[92%] rounded-[20px] rounded-br-md bg-[linear-gradient(135deg,#4F5BD5,#D62976)] px-3.5 py-3 text-left text-white shadow-[0_12px_34px_rgba(79,91,213,0.3)] sm:max-w-[85%] sm:rounded-[24px] sm:px-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                                        You
                                    </p>
                                    <p className="mt-2 text-sm leading-6">
                                        Yes. Open any conversation and your latest messages will appear here instantly.
                                    </p>
                                </div>
                            </div>

                            <div className="relative mt-5 rounded-2xl border border-dashed border-border/70 bg-background/75 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    Quick Tip
                                </p>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Recent replies, shared updates, and ongoing team discussions will
                                    populate this area as soon as you select a conversation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
