type ChatMessage = {
    id: number;
    sender: string;
    text: string;
    time: string;
    isCurrentUser: boolean;
    status?: "Seen" | "Delivered";
};

export const messages: ChatMessage[] = [
    {
        id: 1,
        sender: "Omar",
        text: "Morning. I pushed the latest chat layout update and the empty state is much cleaner now.",
        time: "09:12 AM",
        isCurrentUser: false,
    },
    {
        id: 2,
        sender: "You",
        text: "Looks good. I also want the messages area to feel more polished on mobile screens.",
        time: "09:14 AM",
        isCurrentUser: true,
        status: "Seen",
    },
    {
        id: 3,
        sender: "Sara",
        text: "Then we should keep the bubbles compact and make the spacing scale gradually across breakpoints.",
        time: "09:16 AM",
        isCurrentUser: false,
    },
    {
        id: 4,
        sender: "You",
        text: "Agreed. Add a few realistic sample messages too so the screen does not look empty during development.",
        time: "09:18 AM",
        isCurrentUser: true,
        status: "Delivered",
    },
    {
        id: 5,
        sender: "Omar",
        text: "Done. I am using a mix of short and longer messages so we can test wrapping and alignment properly.",
        time: "09:19 AM",
        isCurrentUser: false,
    },
    {
        id: 6,
        sender: "Mariam",
        text: "Perfect. Keep one message slightly longer than the rest so we can spot any awkward line breaks immediately.",
        time: "09:21 AM",
        isCurrentUser: false,
    },
    {
        id: 7,
        sender: "You",
        text: "That will help a lot. Once this looks stable, we can wire it to real backend data.",
        time: "09:23 AM",
        isCurrentUser: true,
        status: "Seen",
    },
    {
        id: 8,
        sender: "Omar",
        text: "Sounds good. For now these mock messages should be enough to shape the final UI.",
        time: "09:24 AM",
        isCurrentUser: false,
    },
];

export default function Messages() {
    return (
        <div className="flex-1 min-h-0 space-y-4 overflow-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent p-4 sm:p-6">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className={`flex max-w-[92%] flex-col gap-2 sm:max-w-[78%] ${
                            message.isCurrentUser ? "items-end" : "items-start"
                        }`}
                    >
                        <div
                            className={`flex items-center gap-2 text-xs text-muted-foreground ${
                                message.isCurrentUser ? "flex-row-reverse" : ""
                            }`}
                        >
                            {!message.isCurrentUser && (
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F0FC] font-semibold text-[#4F5BD5] dark:bg-[#10192f] dark:text-[#9fb6ff]">
                                    {message.sender.charAt(0)}
                                </span>
                            )}
                            <span className="font-semibold text-foreground">{message.sender}</span>
                            <span>{message.time}</span>
                        </div>

                        <div
                            className={`rounded-[24px] px-4 py-3 text-sm leading-6 shadow-sm ${
                                message.isCurrentUser
                                    ? "rounded-br-md bg-[linear-gradient(135deg,#4F5BD5,#D62976)] text-white shadow-[0_12px_34px_rgba(79,91,213,0.24)]"
                                    : "rounded-bl-md border border-border/60 bg-card text-foreground"
                            }`}
                        >
                            {message.text}
                        </div>

                        {message.isCurrentUser && message.status && (
                            <span className="text-xs text-muted-foreground">{message.status}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
