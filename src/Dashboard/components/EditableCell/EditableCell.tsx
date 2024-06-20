/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";

interface EditableCellProps {
  value: string;
  row: { index: number };
  column: { id: string };
  updateMyData: (index: number, id: string, value: string) => void;
}

const textAreaStyles = css`
  padding: 8px;
  border-radius: 4px;
  font-size: 18px;
  color: black;
  :focus {
    outline: none;
  }
  @media (max-width: 768px) {
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

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <textarea
      css={textAreaStyles}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default EditableCell;
