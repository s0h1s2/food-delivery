import { useSearchResturants } from "@/api/ResturantApi"
import CuisineFilter from "@/components/CuisineFilter"
import LoadingSpinner from "@/components/LoadingSpinner"
import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultCard from "@/components/SearchResultCard"
import SearchResultInfo from "@/components/SearchResultInfo"
import SortOptionDropdown from "@/components/SortOptionDropdown"
import { SearchState } from "@/types/search"
import { useState } from "react"
import { useParams } from "react-router-dom"
const SearchPage = () => {
  const { city } = useParams()
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch"
  })
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const { results, isLoading } = useSearchResturants(searchState, city)
  if (isLoading) {
    return <LoadingSpinner />
  }
  if (!results || !city) {
    return <span>No results found</span>
  }
  const onSelectedCuisinesChange = (cuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines: cuisines,
      page: 1
    }))
  }
  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption,
      page: 1
    }))
  }
  const setPage = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page: page
    }))
  }
  const onSearch = (data: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: data.searchQuery,
      page: 1
    }))

  }
  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1
    }))
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cusinies-list">
        <CuisineFilter selectedCuisines={searchState.selectedCuisines} onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)} expanded={isExpanded} onChange={onSelectedCuisinesChange} />
      </div>
      <div id="main-content" className="flex flex-col gap-4">
        <SearchBar searchQuery={searchState.searchQuery} placeholder="Search by cuisine or resturant name" onSubmit={onSearch} onReset={resetSearch} />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.data.length} city={city} />
          <SortOptionDropdown sortOption={searchState.sortOption} onChange={setSortOption} />
        </div>
        {results.data.map((resturant) => (
          <SearchResultCard key={resturant._id} resturant={resturant} />
        ))}

        <PaginationSelector onPageChange={setPage} pages={results.totalPages} page={results.currentPage} />
      </div>
    </div>
  )
}

export default SearchPage
