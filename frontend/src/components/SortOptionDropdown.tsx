import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface Props {
  onChange: (value: string) => void;
  sortOption: string
}
type SortOption = {
  label: string
  value: string
}
const SORT_OPTIONS: SortOption[] = [
  {
    label: "Best Match",
    value: "bestMatch"

  },
  {
    label: "Delivery Price",
    value: "deliveryPrice"
  },
  {
    label: "Estimated Delivery Time",
    value: "estimateDeliveryTime"
  }
]
const SortOptionDropdown = ({ sortOption, onChange }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          Sort By: {sortOption}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem className="cursor-pointer" onClick={() => onChange(option.value)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortOptionDropdown
