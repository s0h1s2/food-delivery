import { CUISINES_LIST } from "@/constants"
import { Label } from "./ui/label"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { ChangeEvent } from "react"
import { Button } from "./ui/button"

interface Props {
  onChange: (cuisines: string[]) => void
  selectedCuisines: string[]
  expanded: boolean
  onExpandedClick: () => void
}

const CuisineFilter = ({ onChange, onExpandedClick, expanded, selectedCuisines }: Props) => {
  const handleCuisinesReset = () => {
    onChange([]);
  }
  const handleCuisinesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value
    const isChecked = e.target.checked
    const newCuisinesList = isChecked ? [...selectedCuisines, clickedCuisine] : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine)
    onChange(newCuisinesList)
  }
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div onClick={handleCuisinesReset} className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500">
          Reset Filters
        </div>

      </div>
      <div className="space-y-2 flex flex-col">
        {CUISINES_LIST.slice(0, expanded ? CUISINES_LIST.length : 7).map((cuisine) => {
          const isSelected = selectedCuisines.includes(cuisine)
          return (
            <div className="flex">
              <input id={`cuisine_${cuisine}`} type="checkbox" className="hidden" value={cuisine} checked={isSelected} onChange={handleCuisinesChange} />
              <Label className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected ? "border border-green-600 text-green-600" : "border border-slate-300"}`} htmlFor={`cuisine_${cuisine}`}>
                {isSelected && <Check size={20} strokeWidth={3} />}
                {cuisine}
              </Label>
            </div>
          )
        })}
        <Button onClick={onExpandedClick} variant="link" className="mt-4 flex-1">
          <span className="flex flex-row items-center">
            {expanded ? (
              <>
                View less <ChevronUp />
              </>
            ) : (
              <>
                View more <ChevronDown />
              </>
            )
            }
          </span>
        </Button>
      </div>
    </>
  )
}

export default CuisineFilter
