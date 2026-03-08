import { AvatarDemo } from "@/app/_components/Avatar";

export default function Message() {
    return(
            <div className="flex items-center gap-2">
                <AvatarDemo showName={false} />
                <div className="flex-col">
                    <p className="font-sans text-xl ">Omar</p>
                    <div>
                        
                    </div>
                </div>
            </div>
    )
};
