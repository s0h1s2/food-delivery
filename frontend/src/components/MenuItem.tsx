import type { MenuItem } from "@/types/resturant"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface Props {
  menuItem: MenuItem
}
const MenuItem = ({ menuItem }: Props) => {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ${menuItem.price}
      </CardContent>
    </Card>
  )
}

export default MenuItem
