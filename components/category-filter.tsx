import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categoryLabel } from "@/lib/api";

type Props = {
    categories: readonly string[];
    value: string; // "__all__" hoặc một category
    onChange: (value: string) => void;
};

export function CategoryFilter({ categories, value, onChange }: Props) {
    return (
        <Tabs value={value} onValueChange={onChange}>
            <TabsList>
                <TabsTrigger value="__all__">Tất cả</TabsTrigger>
                {categories.map((c) => (
                    <TabsTrigger key={c} value={c}>
                        {categoryLabel(c)}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
