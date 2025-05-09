import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Drawer,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Select,
  MenuItem,
  Badge,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Edit as EditIcon,
  Height,
} from "@mui/icons-material";
import { useState } from "react";
import { Icons } from "../../../../../assets/Icons";
import "../../generalBar.css";
import { generalBackGroundColor } from "../../../../../utils/helpers";

export const SearchFilterBar = ({
  activeBar,
  setActiveBar,
  handleSearchChange,
  searchQuery,
  sortOption,
  handleSortChange,
  SORT_OPTIONS,
  STATUS_OPTIONS_1,
  STATUS_OPTIONS_2,
  filters,
  handleFilterChange,
  enableEditionBar,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        className={`searchBar ${
          activeBar === "searchBar" ? "showedSearchBar" : "hiddenSearchBar"
        }`}
      >
        <TextField
          placeholder="Buscar..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "white",
            maxWidth: "250px",
            width: "50%",
            "& .MuiInputBase-root": {
              height: 35, // Ajustá a la altura deseada
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: generalBackGroundColor,
              },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Tooltip title="Filtros" placement="top-end" arrow>
          <IconButton onClick={() => setDrawerOpen(true)} size="small">
            <FilterIcon />
          </IconButton>
        </Tooltip>

        {enableEditionBar && (
          <Tooltip title="Barra edición" placement="top-end" arrow>
            <IconButton onClick={() => setActiveBar("editionBar")} size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: generalBackGroundColor,
            color: "white",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            px: 2,
          }}
        >
          <Tooltip title="Cerrar" placement="top-start" arrow>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Icons.CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ width: 300, p: 1 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "black",
              borderBottom: "1px solid white",
              paddingBottom: "10px",
            }}
          >
            Filtros
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography sx={{ color: "black", mb: 1, textAlign: "center" }}>
              Marca
            </Typography>
            <Select
              value={filters.brand}
              onChange={(e) =>
                handleFilterChange("brands.name", e.target.value)
              }
              sx={{
                color: "black",
                backgroundColor: "white",
                "& .MuiSelect-select": {
                  padding: "6px 14px", // controlás el alto aquí
                },
              }}
            >
              {STATUS_OPTIONS_1.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography
              sx={{
                color: "black",
                mb: 1,
                textAlign: "center",
              }}
            >
              Categoría
            </Typography>
            <Select
              value={filters.category}
              onChange={(e) =>
                handleFilterChange("categories.name", e.target.value)
              }
              sx={{
                color: "black",
                backgroundColor: "white",
                "& .MuiSelect-select": {
                  padding: "6px 14px", // controlás el alto aquí
                },
              }}
            >
              {STATUS_OPTIONS_2.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                color: "black",
                margin: "10px 0",
              }}
            >
              <SortIcon fontSize="small" /> Ordenar por
            </Typography>

            <RadioGroup value={sortOption} onChange={handleSortChange}>
              {SORT_OPTIONS.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  sx={{ color: "black" }}
                  control={
                    <Radio
                      sx={{
                        color: "black",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Drawer>
    </>
  );
};
