import { useState } from "react";
import {
  Table as DataTable,
  TableBody,
  TableCell as Cell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { useOutsideClick } from "@/utils/helpers/clickHandlers";
import styles from "./styles.module.sass";

type HasId = { id: string };

type Props<RowData extends HasId> = {
  columns: Column<RowData>[];
  rows: RowData[];
  rowActions?: Action<RowData>[];
  showRowCount?: boolean;
};

export type Column<RowData extends HasId> = {
  field: Extract<keyof RowData, string>;
  label: string | JSX.Element;
  headClassName?: string;
  cellClassName?: string;
  renderCell?: (d: RowData) => string | JSX.Element;
};

export type Action<RowData extends HasId> = {
  label: string | JSX.Element | ((d: RowData) => string | JSX.Element);
  onClick: (d: RowData) => void;
};

type RowActionProps<RowData extends HasId> = {
  row: RowData;
  actions: Action<RowData>[];
};

const RowAction = <RowData extends HasId>({
  row,
  actions,
}: RowActionProps<RowData>) => {
  const ref = useRef<HTMLDivElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dropDownOpen = Boolean(anchorEl);

  const handleDropdownOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  useOutsideClick(ref, handleCloseDropdown);

  const { RowActionButton } = styles;

  return (
    <div
      className={RowActionButton}
      ref={ref}
      onClick={handleDropdownOpen}
    >
      <TuneIcon />
      <Menu
        id="actions"
        anchorEl={anchorEl}
        open={dropDownOpen}
      >
        {actions.map(({ label, onClick }, i) => (
          <MenuItem
            key={i}
            onClick={() => onClick(row)}
          >
            {typeof label === "function" ? label(row) : label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const Table = <RowData extends HasId>({
  columns,
  rows,
  rowActions,
  showRowCount = false,
}: Props<RowData>) => {
  const { Table } = styles;

  return (
    <div className={Table}>
      <TableContainer>
        <DataTable>
          <TableHead>
            <TableRow>
              {showRowCount && <Cell />}
              {columns.map(({ field, label, headClassName }) => (
                <Cell
                  className={headClassName && headClassName}
                  key={field}
                >
                  {label}
                </Cell>
              ))}
              {rowActions && <Cell />}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length > 0 &&
              rows.map((row, index) => (
                <TableRow key={index}>
                  {showRowCount && <Cell>{index + 1}</Cell>}
                  {columns.map(
                    ({ field, label, headClassName, renderCell }) => (
                      <Cell
                        className={headClassName && headClassName}
                        key={`${index}-${field}`}
                      >
                        {renderCell ? renderCell(row) : label}
                      </Cell>
                    )
                  )}
                  {rowActions && (
                    <Cell>
                      <RowAction
                        row={row}
                        actions={rowActions}
                      />
                    </Cell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </DataTable>
      </TableContainer>
    </div>
  );
};

export default Table;
