import { useMemo } from 'react';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { ComponentShortcutRow } from '@const/componentsPageTable.const';
import { COMPONENT_SHORTCUT_TABLE_ROWS } from '@const/componentsPageTable.const';
import { PORTAL_GRID_TABLE, PORTAL_TABLE_WRAP } from '@const/portalShell.classes';

type ComponentShortcutsGridTableProps = {
  columnLabels: {
    name: string;
    purpose: string;
    config: string;
  };
};

type Row = ComponentShortcutRow & { id: string };

export function ComponentShortcutsGridTable({ columnLabels }: ComponentShortcutsGridTableProps) {
  const data: Row[] = useMemo(
    () => COMPONENT_SHORTCUT_TABLE_ROWS.map((r) => ({ ...r, id: r.id })),
    [],
  );
  const columns: ColumnDefinition<Row>[] = useMemo(
    () => [
      {
        id: 'name',
        accessor: 'name',
        header: columnLabels.name,
        sortable: false,
        filterable: false,
        resizable: false,
        draggable: false,
      },
      {
        id: 'purpose',
        accessor: 'purpose',
        header: columnLabels.purpose,
        sortable: false,
        filterable: false,
        resizable: false,
        draggable: false,
      },
      {
        id: 'configKey',
        accessor: 'configKey',
        header: columnLabels.config,
        sortable: false,
        filterable: false,
        resizable: false,
        draggable: false,
      },
    ],
    [columnLabels.config, columnLabels.name, columnLabels.purpose],
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
