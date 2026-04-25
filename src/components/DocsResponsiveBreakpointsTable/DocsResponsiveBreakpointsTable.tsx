import { useMemo } from 'react';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { buildClassName } from '@forgedevstack/aerocraft';
import { DOCS_CLASS_PREFIX, DOCS_CLASS_SEPARATOR } from '@const/docsPath.const';
import { DOCS_TABLE_MONO } from '@const/docsPageLayout.const';
import { PORTAL_GRID_TABLE, PORTAL_TABLE_WRAP } from '@const/portalShell.classes';
import type { DocsResponsiveBreakpointsTableProps } from './DocsResponsiveBreakpointsTable.types';

type Row = {
  id: string;
  name: string;
  min: string;
  example: string;
};

export function DocsResponsiveBreakpointsTable({ breakpoints, labels }: DocsResponsiveBreakpointsTableProps) {
  const data: Row[] = useMemo(
    () =>
      (Object.entries(breakpoints) as [string, string | undefined][]).map(([name, min]) => ({
        id: name,
        name,
        min: min ?? '',
        example: `${name}:${buildClassName(DOCS_CLASS_PREFIX, DOCS_CLASS_SEPARATOR, 'flex-row')}`,
      })),
    [breakpoints],
  );

  const columns: ColumnDefinition<Row>[] = useMemo(
    () => [
      {
        id: 'name',
        accessor: 'name',
        header: labels.name,
        sortable: false,
        filterable: false,
        resizable: false,
        draggable: false,
        cellClassName: DOCS_TABLE_MONO,
      },
      {
        id: 'min',
        accessor: 'min',
        header: labels.min,
        sortable: false,
        filterable: false,
        resizable: false,
        draggable: false,
      },
      {
        id: 'example',
        accessor: 'example',
        header: labels.example,
        sortable: false,
        filterable: false,
        resizable: false,
        draggable: false,
        cellClassName: DOCS_TABLE_MONO,
      },
    ],
    [labels.example, labels.min, labels.name],
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
