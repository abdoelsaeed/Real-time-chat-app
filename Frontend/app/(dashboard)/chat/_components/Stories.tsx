import AddStory from "./AddStory";
import { AvatarDemo } from "../../../_components/Avatar";

export default function Stories() {
    return (
        <div className="border-b max-w-full">
            <p className="font-sans text-xl text-offline mb-2 ">Stories</p>
            <div className="flex items-start justify-center gap-2">
            <AddStory />
                <AvatarDemo showName />
                <AvatarDemo showName />
                <AvatarDemo showName />
                <AvatarDemo showName />
            </div>
        </div>
    )
};
