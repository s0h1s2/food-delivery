import { useSearchResturants } from "@/api/ResturantApi"
import LoadingSpinner from "@/components/LoadingSpinner"
import SearchResultInfo from "@/components/SearchResultInfo"
import { useParams } from "react-router-dom"

const SearchPage = () => {
  const { city } = useParams()
  const { results, isLoading } = useSearchResturants(city)
  if (isLoading) {
    return <LoadingSpinner />
  }
  console.log(results)
  if (!results || !city) {
    return <span>No results found</span>
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cusinies-list">
        Cuisine List
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultInfo total={results.length} city={city} />
      </div>
    </div>
  )
}

export default SearchPage
