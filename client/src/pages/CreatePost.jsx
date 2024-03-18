import React from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create A Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select A Category</option>
            <option value="javascript">JavaScript</option>
            <option value="ReactJs">React Js</option>
            <option value="NodeJs">Node Js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type='file' accept="image/*" />
          <Button type="button" gradientDuoTone='purpleToBlue' size='sm' outline>Upload Image </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
