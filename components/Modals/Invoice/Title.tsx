import React, { useState } from "react";

import { Icon } from "components/Common/Icon";
import Button from "components/Common/Button";
import Input from "components/Common/Input";


type TitleProps = {
  data: string;
  onUpdate: (data: string) => void;
};

const Title: React.FC<TitleProps> = (props) => {
  const { data, onUpdate } = props;

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");

  const onChangeTitle = (title) => {
    if (title.trim()) {
      onUpdate(title);
    }
    setEdit((prev) => !prev);
  };

  if (edit) {
    return (
      <div className="w-full">
        <Input
          placeholder="title"
          defaultValue={data}
          className="w-full h-12 placeholder:capitalize"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex flex-row justify-end items-center w-full">
          <Button
            className="text-sm text-blue-600 underline"
            onClick={() => onChangeTitle(title)}
          >
            save
          </Button>
          <Icon as="Point" className="h-3 w-3" />
          <Button
            className="text-sm text-blue-600 underline"
            onClick={() => setEdit((prev) => !prev)}
          >
            cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button className="" onClick={() => setEdit((prev) => !prev)}>
      <div className="flex flex-row items-baseline cursor-pointer hover:underline group">
        <p className="text-3xl font-semibold mr-2">{data}</p>
        <Icon as="Pencil" className="h-5 w-5 invisible group-hover:visible" />
      </div>
    </Button>
  );
};

export default Title;
