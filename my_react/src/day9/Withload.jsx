function Withload(Page) {
  return function WrappedPage(props) {
    function showLoading(isWaiting) {
      if (isWaiting) {
        return <p>Loading...</p>;
      }
      return null;
    }

    return <Page {...props} showLoading={showLoading} />;
  };
}

export default Withload;
