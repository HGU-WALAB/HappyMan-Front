import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Col, Row, Table, Button } from "react-bootstrap";
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";
import moment from "moment";
import axios from "axios";

const ReadyProgramTable = ({ readyProgram }) => {
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        // console.log(readyProgram);
    }, [readyProgram]);

    const applicationCancel = async (rowId) => {
        console.log("취소버튼", rowId);
        if (window.confirm("정말 신청을 취소하시겠습니까?")) {
            const response = await axios.delete(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/participants/${rowId}`, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            });
            alert("신청이 취소되었습니다.");
            window.location.reload();
        }
    };

    const columns = useMemo(
        () => [
            { accessor: "id", Header: "ID", show: false },
            {
                Header: "번호",
                Cell: ({ value, row }) => {
                    const index = Number(row.id) + 1;
                    return (
                        <h5 className="mb-0">
                            <Link to="#" className="text-inherit">
                                {index}
                            </Link>
                        </h5>
                    );
                },
            },
            {
                accessor: "programName",
                Header: "프로그램명",
                Cell: ({ value, row }) => {
                    const id = "/program/" + row.original.programId.toString();
                    return (
                        <h5 className="mb-0">
                            <Link className="text-inherit" to={id}>
                                {value}
                            </Link>
                        </h5>
                    );
                },
            },
            {
                accessor: "startDate",
                Header: "시작일자",
                Cell: ({ value }) => {
                    return (
                        <Link to="#" className="text-inherit">
                            {moment(value).format("YY-MM-DD HH:mm")}
                        </Link>
                    );
                },
            },
            {
                accessor: "endDate",
                Header: "종료일자",
                Cell: ({ value }) => {
                    return (
                        <Link to="#" className="text-inherit">
                            {moment(value).format("YY-MM-DD HH:mm")}
                        </Link>
                    );
                },
            },
            {
                accessor: "status",
                Header: "상태",
                Cell: ({ value }) => {
                    value = value.toLowerCase();
                    return (
                        <Fragment>
                            <DotBadge
                                bg={
                                    value === "참여보류"
                                        ? "warning"
                                        : value === "참여승인"
                                        ? "success"
                                        : value === "수료"
                                        ? "info"
                                        : value === "미수료"
                                        ? "danger"
                                        : value === "참여불가"
                                        ? "danger"
                                        : ""
                                }
                            ></DotBadge>
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                        </Fragment>
                    );
                },
            },
            {
                accessor: "a",
                Header: "비고",
                Cell: ({ value, row }) => {
                    return (
                        <div className="d-grid d-md-block">
                            <Link to="#">
                                <Button variant="outline-danger" className="me-1" onClick={() => applicationCancel(row.original.id)}>
                                    신청취소
                                </Button>
                            </Link>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const data = useMemo(() => readyProgram, [readyProgram]);

    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, state, gotoPage, pageCount, prepareRow, setGlobalFilter } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: 10,
                hiddenColumns: columns.map((column) => {
                    if (column.show === false) return column.accessor || column.id;
                    else return false;
                }),
            },
        },
        useFilters,
        useGlobalFilter,
        usePagination,
        useRowSelect
    );

    const { pageIndex, globalFilter } = state;

    return (
        <Fragment>
            <div className="overflow-hidden">
                <Row>
                    <Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 py-4 px-5 ">
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="Search Course" />
                    </Col>
                </Row>
            </div>

            <div className="table-responsive border-0 overflow-y-hidden">
                <Table {...getTableProps()} className="text-nowrap">
                    <thead className="table-light">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

            {/* Pagination @ Footer */}
            <Pagination previousPage={previousPage} pageCount={pageCount} pageIndex={pageIndex} gotoPage={gotoPage} nextPage={nextPage} />
        </Fragment>
    );
};

export default ReadyProgramTable;
