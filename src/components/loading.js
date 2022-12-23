import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoadingComponent = ( {loading} ) => {

  return (
    <ClipLoader
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader" />
  );
}

export default LoadingComponent;