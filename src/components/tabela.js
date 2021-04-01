import React from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider
} from "react-bootstrap-table2-paginator";

// Link: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=EmptyTableOverlay&selectedStory=Empty%20Table%20Overlay&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
const NoDataIndication = () => (
  <div className="spinner">
    <div className="rect1" />
    <div className="rect2" />
    <div className="rect3" />
    <div className="rect4" />
    <div className="rect5" />
  </div>
);

const col = (columns = []) => {
  columns = columns.map((obj) => {
    obj.attrs = {
      'data-title': obj.text
    }
    return obj;
  });
  return columns;
}

const RemotePagination = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  keyField,
  columns,
  selectRow
}) => (
  <div>
    <PaginationProvider
      pagination={paginationFactory({
        custom: false,
        page,
        sizePerPage,
        totalSize
      })} >
      {({ paginationProps, paginationTableProps }) => (
        <div>
          <div>
            <p>
              Página atual: {paginationProps.page <= 0 ? 1 : paginationProps.page} Registros por página:
              {paginationProps.sizePerPage}
            </p>
          </div>
          {/* <PaginationTotalStandalone {...paginationProps} /> */}
          <BootstrapTable
            bootstrap4
            striped
            bodyStyle={{ wordBreak: 'break-all' }}
            remote
            keyField={keyField}
            data={data}
            columns={col(columns)}
            onTableChange={onTableChange}
            wrapperClasses="table-responsive"
            loading={true} //only loading is true, react-bootstrap-table will render overlay
            noDataIndication={() => <NoDataIndication />}
            selectRow={selectRow}
            {...paginationTableProps} />
          {/*  <PaginationListStandalone {...paginationProps} /><SizePerPageDropdownStandalone {...paginationProps} /> */}
        </div>
      )}
    </PaginationProvider>
  </div>
);

export default RemotePagination;
