import { useMemo, useState } from 'react';
import {
  Table as DataTable,
  TableBody,
  TableCell as Cell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  TablePagination,
  TextField,
  Stack,
  Button,
} from '@mui/material';
import { useRef } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { useOutsideClick } from '@/utils/helpers/clickHandlers';
import styles from './styles.module.sass';
import classNames from 'classnames';

type HasId = { id: string };

type Props<RowData extends HasId> = {
  columns: Column<RowData>[];
  rows: RowData[];
  rowActions?: Action<RowData>[];
  showRowCount?: boolean;
  searchFieldPlaceholder?: string;
  rowCount?: number;
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
    <div className={RowActionButton} ref={ref} onClick={handleDropdownOpen}>
      <TuneIcon />
      <Menu id="actions" anchorEl={anchorEl} open={dropDownOpen}>
        {actions.map(({ label, onClick }, i) => (
          <MenuItem key={i} onClick={() => onClick(row)}>
            {typeof label === 'function' ? label(row) : label}
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
  searchFieldPlaceholder,
  rowCount = 10,
}: Props<RowData>) => {
  const {
    Table,
    TableHeadCell,
    FooterPagination,
    TableBodyCell,
    CellId,
    TableBodyRow,
  } = styles;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowCount);
  const [filterResults, setFilterResults] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(() => {
    if (rows && rows.length) {
      if (filterResults && filterResults !== '') {
        return rows.filter((row) => {
          return Object.values(row).some((t) =>
            t
              .toString()
              .toLowerCase()
              .includes(filterResults.toString().toLowerCase()),
          );
        });
      }
      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    } else return [];
  }, [page, rowsPerPage, rows, filterResults]);

  return (
    <div className={Table}>
      <Stack>
        <TextField
          variant="outlined"
          size="small"
          fullWidth={false}
          placeholder={searchFieldPlaceholder || 'placeholder'}
          onChange={(e) => setFilterResults(e.currentTarget.value)}
          value={filterResults}
          InputProps={{
            endAdornment: (
              <Button
                variant="outlined"
                onClick={() => {
                  setFilterResults('');
                }}
                sx={{ position: 'absolute', right: 0, border: 0 }}
              >
                X
              </Button>
            ),
          }}
        />
      </Stack>
      <TableContainer>
        <DataTable>
          <TableHead>
            <TableRow>
              {showRowCount && <Cell className={classNames([TableHeadCell])} />}
              {columns.map(({ field, label, headClassName }) => (
                <Cell
                  className={classNames([TableHeadCell], { headClassName })}
                  key={field}
                >
                  {label}
                </Cell>
              ))}
              {rowActions && <Cell className={classNames([TableHeadCell])} />}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows &&
              visibleRows?.map((row, index) => (
                <TableRow key={index} className={TableBodyRow}>
                  {showRowCount && (
                    <Cell className={classNames([TableBodyCell, CellId])}>
                      {index + 1}
                    </Cell>
                  )}
                  {columns.map(
                    ({ field, label, cellClassName, renderCell }) => (
                      <Cell
                        className={classNames([TableBodyCell], {
                          cellClassName,
                        })}
                        key={`${index}-${field}`}
                      >
                        {renderCell ? renderCell(row) : label}
                      </Cell>
                    ),
                  )}
                  {rowActions && (
                    <Cell className={classNames([TableBodyCell])}>
                      <RowAction row={row} actions={rowActions} />
                    </Cell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </DataTable>
      </TableContainer>
      {rows.length && (
        <TablePagination
          sx={{ display: 'flex' }}
          className={FooterPagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};

export default Table;

/* TODO
Component for displaying clickable button pages. Needs more work
const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const { count, page, rowsPerPage, onPageChange } = props;
  const { ActionsComponent, ActionsButton } = styles;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Grid className={ActionsComponent}>
      <Grid item className={ActionsButton}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          <KeyboardArrowLeft /> Previous
        </IconButton>
      </Grid>
      <Grid item className={ActionsButton}>
        {[...Array(Math.ceil(count / rowsPerPage))]
          .filter((pages) => page === pages + 1 || page === pages - 1)
          .map((x, i) => {
            if (i < 5) {
              return <ButtonPage key={i} value={i} />;
            }
          })}
        <ButtonPage value={rowsPerPage} />
        <ButtonPage value={count} />
      </Grid>
      <Grid item>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          Next <KeyboardArrowRight />
        </IconButton>
      </Grid>
    </Grid>
  );
};

type ButtonPageProps = {
  value: number | string;
  onClick?: () => void;
};
const ButtonPage = ({ value, onClick }: ButtonPageProps) => {
  const { ButtonPage } = styles;
  return <button className={ButtonPage}>{value}</button>;
};
*/
