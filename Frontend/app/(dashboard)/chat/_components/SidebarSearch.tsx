import { Field } from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    
} from "@/components/ui/input-group"
import { Search } from "lucide-react"

export function SidebarSearch() {
    return (
        <Field className="mt-3 mb-3">
            <InputGroup>
                <InputGroupInput id="input-group-url" placeholder="Search..." />
                <InputGroupAddon>
                    <Search/>
                </InputGroupAddon>
            </InputGroup>
        </Field>
    )
}
