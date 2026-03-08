import { Plus } from "lucide-react";

export default function AddStory() {
    return(
        <button
            type="button"
            aria-label="Add story"
            className="group flex w-[72px] flex-col items-center gap-2 cursor-pointer"
        >
            <span className="relative inline-flex h-13 w-13 items-center justify-center rounded-full bg-[conic-gradient(from_210deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5,#FEDA75)] p-[2px] shadow-[0_12px_26px_rgba(214,41,118,0.22)] transition-transform duration-300 group-hover:scale-[1.03]">
                <span className="absolute inset-2 rounded-full bg-[conic-gradient(from_210deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5,#FEDA75)] opacity-25 blur-md" />
                <span className="relative flex h-full w-full items-center justify-center rounded-full bg-background">
                    <Plus
                        className="h-7 w-7 text-[#D62976] transition-transform duration-300 group-hover:rotate-90"
                        strokeWidth={2.4}
                    />
                </span>
            </span>
            <span className="text-xs font-medium text-muted-foreground mb-1" >
                Add Story
            </span>
        </button>
    )
};
