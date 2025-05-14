import { useState } from "react";
import { GeneralBar } from "./GeneralBar";
import { ChipsBarContainer } from "./bars/chipsBar/ChipsBarContainer";

export const GeneralBarContainer = (generalBarContainerProps) => {
  const {
    enableSearchFilterBar = true,
    disableEditionBarButton = false,
    enableEditionBar = true,
    tooltipMessage,
    selectedRecords,
    patient,
    professionals,
    FIELDS_TO_SEARCH,
    setFilteredRecords,
    records,
    SORT_OPTIONS,
    FILTER_OPTIONS = [],
    initialActiveBar = "searchBar",
  } = generalBarContainerProps;

  const [activeBar, setActiveBar] = useState(initialActiveBar);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState("none");

  // Configura dinámicamente FILTER_CONFIGS en base a FILTER_OPTIONS
  const FILTER_CONFIGS = FILTER_OPTIONS.map((options) => ({
    ...options,
    value: filters[options.name] || "all",
  }));

  const applyFiltersAndSort = (
    query = searchQuery,
    newFilters = filters,
    newSort = sortOption
  ) => {
    const lowerQuery = query.toLowerCase();
    const keywords = lowerQuery.split(" ").filter(Boolean);

    let result = records.filter((record) => {
      // Búsqueda
      const matchesSearch = keywords.every((word) =>
        FIELDS_TO_SEARCH.some((getField) =>
          (getField(record) || "").toLowerCase().includes(word)
        )
      );

      // Filtros
      const matchesAllFilters = Object.entries(newFilters).every(
        ([key, value]) => {
          const path = key.split(".");
          const recordValue = path.reduce((acc, k) => acc?.[k], record);
          return value === "all" || recordValue == value;
        }
      );

      return matchesSearch && matchesAllFilters;
    });

    // Ordenamiento
    if (newSort !== "none") {
      const sortConfig = SORT_OPTIONS.find((opt) => opt.value === newSort);
      if (sortConfig) {
        const [type, direction] = newSort.split("-");
        const fieldPath = sortConfig.name.split(".");

        const getValue = (obj, path) =>
          path.reduce(
            (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
            obj
          );

        result = [...result].sort((a, b) => {
          const aValue = getValue(a, fieldPath);
          const bValue = getValue(b, fieldPath);

          if (aValue === "" || aValue == null) return 1;
          if (bValue === "" || bValue == null) return -1;

          if (type === "alphabetical") {
            return direction === "asc"
              ? String(aValue).localeCompare(String(bValue))
              : String(bValue).localeCompare(String(aValue));
          }

          if (type === "date") {
            return direction === "asc"
              ? new Date(aValue) - new Date(bValue)
              : new Date(bValue) - new Date(aValue);
          }

          if (type === "number") {
            const numA = Number(aValue);
            const numB = Number(bValue);
            if (isNaN(numA)) return 1;
            if (isNaN(numB)) return -1;
            return direction === "asc" ? numA - numB : numB - numA;
          }

          return 0;
        });
      }
    }

    setFilteredRecords(result);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFiltersAndSort(query, filters, sortOption);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFiltersAndSort(searchQuery, newFilters, sortOption);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortOption(newSort);
    applyFiltersAndSort(searchQuery, filters, newSort);
  };

  const getFilterLabel = (key, value) => {
    const config = FILTER_CONFIGS.find((f) => f.name === key);
    return config?.options?.find((opt) => opt.value === value)?.label || value;
  };

  const generalBarProps = {
    ...generalBarContainerProps,
    activeBar,
    setActiveBar,
    enableSearchFilterBar,
    disableEditionBarButton,
    tooltipMessage,
    selectedRecords,
    patient,
    professionals,
    setFilteredRecords,
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    sortOption,
    handleSortChange,
    enableEditionBar,
    SORT_OPTIONS,
    FILTER_CONFIGS,
  };

  const chipsBarContainerProps = {
    filters,
    handleFilterChange,
    handleSortChange,
    sortOption,
    getFilterLabel,
    SORT_OPTIONS,
  };

  return (
    <>
      <GeneralBar {...generalBarProps} />
      <ChipsBarContainer {...chipsBarContainerProps} />
    </>
  );
};
