import type { MenuItem } from "@/types/resturant"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface Props {
  menuItem: MenuItem
  addToCart: (item: MenuItem) => void
}
const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={() => addToCart(menuItem)}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col font-bold">
        ${menuItem.price}
      </CardContent>
    </Card>
  )
}

export default MenuItem
