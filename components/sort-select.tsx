import { SORT_OPTIONS } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = { value: string; onChange: (value: string) => void };

export function SortSelect({ value, onChange }: Props) {
    return (
        <Select value={value} items={SORT_OPTIONS} onValueChange={(v) => v && onChange(v)}>
            <SelectTrigger className="w-48" aria-label="Sắp xếp">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                        {o.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
