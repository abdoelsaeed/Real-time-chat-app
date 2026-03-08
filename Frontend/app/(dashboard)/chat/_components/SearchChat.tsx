import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SearchChat() {
    return (
        <Field className="w-fit">
            <ButtonGroup>
                <Input id="input-button-group" placeholder="Type to search..." />
                <Button variant="outline">Search</Button>
            </ButtonGroup>
        </Field>
    )
}
