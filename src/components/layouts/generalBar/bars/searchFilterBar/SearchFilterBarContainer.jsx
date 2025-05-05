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
  enableEditionBar,
  STATUS_OPTIONS_1 = [],
  STATUS_OPTIONS_2 = [],
  DEFAULT_TYPE_OPTIONS = [],
  SORT_OPTIONS = [],
}) => {
  const searhFilterBarProps = {
    activeBar,
    setActiveBar,
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    sortOption,
    handleSortChange,
    enableEditionBar,
    STATUS_OPTIONS_1,
    STATUS_OPTIONS_2,
    DEFAULT_TYPE_OPTIONS,
    SORT_OPTIONS,
  };
  return <SearchFilterBar {...searhFilterBarProps} />;
};
