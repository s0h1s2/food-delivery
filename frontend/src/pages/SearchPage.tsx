import { useSearchResturants } from "@/api/ResturantApi"
import LoadingSpinner from "@/components/LoadingSpinner"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultCard from "@/components/SearchResultCard"
import SearchResultInfo from "@/components/SearchResultInfo"
import { SearchState } from "@/types/search"
import { useState } from "react"
import { useParams } from "react-router-dom"
const SearchPage = () => {
  const { city } = useParams()
  const [searchState, setSearchState] = useState<SearchState>({ searchQuery: "" })
  const { results, isLoading } = useSearchResturants(searchState, city)
  console.log(results, city)
  if (isLoading) {
    return <LoadingSpinner />
  }
  if (!results || !city) {
    return <span>No results found</span>
  }
  const onSearch = (data: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: data.searchQuery
    }))

  }
  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: ""
    }))
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cusinies-list">
        Cuisine List
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar searchQuery={searchState.searchQuery} placeholder="Search by cuisine or resturant name" onSubmit={onSearch} onReset={resetSearch} />
        <SearchResultInfo total={results.length} city={city} />
        {results.map((resturant) => (
          <SearchResultCard resturant={resturant} />
        ))}
      </div>
    </div>
  )
}

export default SearchPage
