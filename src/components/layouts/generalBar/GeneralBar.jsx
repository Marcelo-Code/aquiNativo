import { Box } from "@mui/material";
import { EditionBar } from "./bars/EditionBar";
import "./generalBar.css";
import { SearchFilterBarContainer } from "./bars/searchFilterBar/SearchFilterBarContainer";
export const GeneralBar = (generalBarProps) => {
  const {
    editMode,
    setEditMode,
    buttonText,
    buttonIcon,
    to,
    activeBar,
    setActiveBar,
    professionalsList = [],
    enableSearchFilterBar,
    disableEditionBarButton,
    tooltipMessage,
    selectedRecords,
    patient,
    professionals,
    setFilteredRecords,
    records,
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    sortOption,
    handleSortChange,
    enableEditionBar,
    SORT_OPTIONS,
    STATUS_OPTIONS_1,
    STATUS_OPTIONS_2,
  } = generalBarProps;

  const searchFilterBarContainerProps = {
    activeBar,
    setActiveBar,
    setFilteredRecords,
    records,
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    sortOption,
    handleSortChange,
    enableEditionBar,
    SORT_OPTIONS,
    STATUS_OPTIONS_1,
    STATUS_OPTIONS_2,
  };

  const editionBarProps = {
    activeBar,
    setActiveBar,
    buttonText,
    buttonIcon,
    editMode,
    setEditMode,
    to,
    enableSearchFilterBar,
    disableEditionBarButton,
    tooltipMessage,
  };

  return (
    <Box className="barContainer">
      <Box className="barInner">
        <EditionBar {...editionBarProps} />
        {enableSearchFilterBar && (
          <SearchFilterBarContainer {...searchFilterBarContainerProps} />
        )}
      </Box>
    </Box>
  );
};
