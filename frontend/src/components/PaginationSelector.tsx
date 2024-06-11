import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

interface Props {
  page: number
  pages: number
  onPageChange: (page: number) => void
}
const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className={page <= 1 ? "pointer-events-none opacity-50" : ""} tabIndex={page <= 1 ? -1 : undefined} aria-disabled={page <= 1} href="#" onClick={() => onPageChange(page - 1)} />
        </PaginationItem>
        {pageNumbers.map((number) => (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => onPageChange(number)} isActive={page === number}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page !== pageNumbers.length && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationSelector
