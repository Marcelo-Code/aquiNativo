import React, { useState } from "react";
import { GeneralBar } from "./GeneralBar";
import { ChipsBarContainer } from "./bars/chipsBar/ChipsBarContainer";

export const GeneralBarContainer = (generalBarContainerProps) => {
  const {
    setEditMode,
    enableSearchFilterBar = true,
    disableEditionBarButton = false,
    enableEditionBar = true,
    tooltipMessage,
    selectedRecords,
    to,
    patient,
    professionals,
    FIELDS_TO_SEARCH,
    setFilteredRecords,
    records,
    SORT_OPTIONS,
    FILTER_OPTIONS,
  } = generalBarContainerProps;

  const [activeBar, setActiveBar] = useState("searchBar");

  //Lógica de filtrado y ordenamiento
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    brand: "all",
    category: "all",
  });
  const [sortOption, setSortOption] = useState("none");

  const applyFiltersAndSort = (
    query = searchQuery,
    newFilters = filters,
    newSort = sortOption
  ) => {
    const lowerQuery = query.toLowerCase();
    const keywords = lowerQuery.split(" ").filter(Boolean);

    let result = records.filter((record) => {
      // Coincidencia con búsqueda de texto
      const matchesSearch = keywords.every((word) =>
        FIELDS_TO_SEARCH.some((getField) =>
          (getField(record) || "").toLowerCase().includes(word)
        )
      );

      // Coincidencia con filtros dinámicos
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
    return (
      FILTER_OPTIONS[key]?.find((opt) => opt.value === value)?.label || value
    );
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
    records,
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    sortOption,
    handleSortChange,
    enableEditionBar,
    SORT_OPTIONS,
    STATUS_OPTIONS_1: FILTER_OPTIONS[0],
    STATUS_OPTIONS_2: FILTER_OPTIONS[1],
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
