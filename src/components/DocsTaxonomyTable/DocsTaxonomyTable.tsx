import { useMemo } from 'react';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { PORTAL_GRID_TABLE, PORTAL_TABLE_WRAP } from '@const/portalShell.classes';
import type { DocsTaxonomyTableProps } from './DocsTaxonomyTable.types';

type Row = {
  id: string;
  area: string;
  note: string;
};

export function DocsTaxonomyTable({ rows, columnArea, columnNote }: DocsTaxonomyTableProps) {
  const data: Row[] = useMemo(
    () => rows.map((r, i) => ({ id: `tax-${i}`, area: r.area, note: r.note })),
    [rows],
  );

  const columns: ColumnDefinition<Row>[] = useMemo(
    () => [
      {
        id: 'area',
        accessor: 'area',
        header: columnArea,
        sortable: false,
        filterable: false,
        resizable: false,
        draggable: false,
        align: 'left',
      },
      {
        id: 'note',
        accessor: 'note',
        header: columnNote,
        sortable: false,
        filterable: false,
        resizable: false,
        draggable: false,
      },
    ],
    [columnArea, columnNote],
  );

  return (
    <div className={PORTAL_TABLE_WRAP}>
      <GridTable<Row>
        data={data}
        columns={columns}
        showPagination={false}
        showFilter={false}
        showGlobalFilter={false}
        showColumnToggle={false}
        enableColumnResize={false}
        enableDragDrop={false}
        enableRowSelection={false}
        getRowId={(row) => row.id}
        className={PORTAL_GRID_TABLE}
        themeMode="dark"
      />
    </div>
  );
}
