/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import {
  useTable,
  useRowSelect,
  useGlobalFilter,
  Column,
  CellProps,
} from "react-table";
import { supabase } from "../util/supabase/supabas";
import { EditableCell } from "./components/EditableCell";

import { Translation } from "../type";
import { Helmet } from "react-helmet-async";
import { css } from "@emotion/react";
import { TABLE_MESSAGES } from "../constants";
import Loader from "../Loader";

const defaultColumn = {
  Cell: EditableCell,
};

const Dashboard: React.FC = () => {
  const [tableMessage, setTableMessage] = useState<string>("");
  // 유저가 편집 가능한 데이터
  const [data, setData] = useState<Translation[]>([]);
  // supabase에서 가져온 원본 데이터
  // @ts-ignore
  const [originalData, setOriginalData] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);

  // 초기 번역 데이터 가져오기
  const fetchTranslations = async () => {
    const { data, error } = await supabase.from("translations").select("*");
    if (error) {
      console.error(error);
    } else {
      // 마지막 행에 추가할 빈 행 추가
      setData([...data, { id: "", ko: "", en: "" }]);
      setOriginalData(data);
      setLoading(false);
    }
  };

  // 셀 업데이트
  const updateMyData = (rowIndex: number, columnId: string, value: string) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  };

  // '저장하기' & '추가하기'
  const upsertRow = async (rowIndex: number) => {
    const row = data[rowIndex];
    const { id, ko, en } = row;

    if (!ko || !en) {
      alert("Please fill out all fields");
      return;
    }

    const { data: upsertedData, error } = await supabase
      .from("translations")
      .upsert({ id, ko, en })
      .select("*");

    if (error) {
      alert("Error updating row");
    } else {
      const newData = [...data];
      newData[rowIndex] = upsertedData[0];
      if (rowIndex === data.length - 1) {
        setData([...newData, { id: "", ko: "", en: "" }]);
      } else {
        setData(newData);
      }
      setOriginalData(newData);
    }

    setTableMessage(TABLE_MESSAGES.UPSERT);
    console.log("upsertedData", upsertedData);
  };

  // '삭제하기'
  const deleteRow = async (rowIndex: number) => {
    const row = data[rowIndex];
    const { id } = row;

    if (!id) {
      alert("Error deleting row");
      return;
    }

    const { error } = await supabase.from("translations").delete().eq("id", id);

    if (error) {
      alert("Error deleting row");
    } else {
      const newData = [...data];
      newData.splice(rowIndex, 1);
      setData(newData);
      setOriginalData(newData);
    }

    setTableMessage(TABLE_MESSAGES.DELETE);
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  useEffect(() => {
    // 메시지가 변경될 때마다 타이머 설정
    if (tableMessage) {
      const timer = setTimeout(() => {
        setTableMessage("");
      }, 3000);

      // Clean-up 함수: 컴포넌트가 unmount 되거나 tableMessage가 변경될 때 타이머 해제
      return () => clearTimeout(timer);
    }
  }, [tableMessage]);

  const columns: Column<Translation>[] = React.useMemo(
    () => [
      {
        Header: "Key",
        accessor: "id",
      },
      {
        Header: "Korean",
        accessor: "ko",
      },
      {
        Header: "English",
        accessor: "en",
      },
      {
        id: "actions",
        Cell: ({ row }: CellProps<Translation>) => (
          <div style={{ display: "flex", gap: "3px" }}>
            {row.index === data.length - 1 ? (
              <button onClick={() => upsertRow(row.index)} css={ButtonStyles}>
                추가하기
              </button>
            ) : (
              <>
                <button onClick={() => upsertRow(row.index)} css={ButtonStyles}>
                  저장하기
                </button>
                <button onClick={() => deleteRow(row.index)} css={ButtonStyles}>
                  삭제하기
                </button>
              </>
            )}
          </div>
        ),
      },
    ],
    [data],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        // @ts-ignore
        defaultColumn,
        updateMyData,
      },
      useGlobalFilter,
      useRowSelect,
    );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div css={TableStyles}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {tableMessage && (
          <p style={{ color: "white", margin: "10px 0px" }}>{tableMessage}</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;

const TableStyles = css`
  table {
    th,
    td {
      margin: 0;
      padding: 10px;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      background-color: white;
      color: black;
      font-size: 18px;
      font-weight: 800;

      :last-child {
        border-right: 0;
      }
    }

    tr:last-of-type {
      td {
        border-bottom: 0;
        background-color: rgba(2, 247, 152, 0.5);
      }
    }
  }
  @media (max-width: 768px) {
    th,
    td {
      padding: 5px;
      font-size: 14px;
    }
  }
`;

const ButtonStyles = css`
  width: 100%;
  height: 60px;
  padding: 10px;
  background-color: var(--bg-primary);
  color: var(--text-tertiary);
  font-size: 16px;
  font-weight: 800;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 768px) {
    height: 30px;
    font-size: 10px;
  }
`;
