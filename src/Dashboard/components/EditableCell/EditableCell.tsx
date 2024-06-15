/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";

interface EditableCellProps {
  value: string;
  row: { index: number };
  column: { id: string };
  updateMyData: (index: number, id: string, value: string) => void;
}

const inputStyles = css`
  height: 45px;
  padding: 8px;
  border-radius: 4px;
  font-size: 18px;
  color: black;
  :focus {
    outline: none;
  }
  @media (max-width: 768px) {
    height: 22px;
    font-size: 10px;
  }
`;

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      css={inputStyles}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default EditableCell;
