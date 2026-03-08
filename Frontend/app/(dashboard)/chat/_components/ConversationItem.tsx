import { AvatarDemo } from "@/app/_components/Avatar";

export default function ConversationItem() {
    return (
        <div className="border-b max-w-full mt-3 p-1.5 hover:bg-accent rounded-2xl cursor-pointer">
            <div className="mb-3 flex justify-between items-center">
                <div className="flex justify-center items-center">
                    <AvatarDemo showName={false} />
                    <div className="flex-col">
                        <p>Name</p>
                        <p className="font-sans  text-gray-400 ">Message</p>                    
                    </div>
                </div>
                <p className="font-sans  text-gray-400 mb-2">2:15 PM</p>
            </div>
        </div>
    )
};
