import { AvatarDemo } from "@/app/_components/Avatar";

export default function UserInfo({ showOnline }: { showOnline :boolean}) {
    return(
        <div className="flex items-center gap-2">
            <AvatarDemo showName={false} />
            <div className="flex-col">
                <p className="font-sans text-xl ">Omar</p>
                {(
                showOnline &&
                    <p className="font-sans text-green-400 ">Online</p>
                )
                }
            </div>
        </div>
    )
};
