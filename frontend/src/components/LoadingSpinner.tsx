import { ClipLoader } from "react-spinners"
const LoadingSpinner = () => {
  return (
    <div className="h-screen mb-1 flex items-center justify-center">
      <ClipLoader size={50} />
    </div>
  )
}

export default LoadingSpinner
