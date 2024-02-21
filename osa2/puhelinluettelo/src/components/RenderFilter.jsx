const RenderFilter = ({filters, handleFilterChange}) => {
    return (
      <form>
          <div>
            Filter name<input
            value={filters}
            onChange={handleFilterChange}
            />
          </div>
        </form>
    )
  }
export default RenderFilter