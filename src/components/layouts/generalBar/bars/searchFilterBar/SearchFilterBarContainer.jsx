import { SearchFilterBar } from "./SearchFilterBar";

export const SearchFilterBarContainer = ({
  activeBar = "editionBar",
  setActiveBar,

  searchQuery,
  handleSearchChange,
  filters,
  handleFilterChange,
  sortOption,
  handleSortChange,
  STATUS_OPTIONS_1 = [],
  STATUS_OPTIONS_2 = [],
  DEFAULT_TYPE_OPTIONS = [],
  SORT_OPTIONS = [],
}) => {
  return (
    <SearchFilterBar
      activeBar={activeBar}
      setActiveBar={setActiveBar}
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
      filters={filters}
      handleFilterChange={handleFilterChange}
      sortOption={sortOption}
      handleSortChange={handleSortChange}
      STATUS_OPTIONS_1={STATUS_OPTIONS_1}
      STATUS_OPTIONS_2={STATUS_OPTIONS_2}
      DEFAULT_TYPE_OPTIONS={DEFAULT_TYPE_OPTIONS}
      SORT_OPTIONS={SORT_OPTIONS}
    />
  );
};
