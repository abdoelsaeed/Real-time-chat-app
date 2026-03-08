import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarDemo({ showName }: { showName:boolean }) {
    return (
        <div className="flex w-[72px] flex-col items-center gap-2 cursor-pointer">
            <div className="relative inline-flex h-13 w-13 items-center justify-center rounded-full bg-muted p-[2px] shadow-sm">
                <Avatar className="h-full! w-full!">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Omar"
                    />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <AvatarBadge className="size-3 translate-x-0.5 translate-y-0.5 bg-green-500 ring-2 ring-background" />
            </div>
            {(showName&&
            <span className="text-xs font-medium text-muted-foreground">
                    Omar
            </span>
            )}
        </div>
    )
}
