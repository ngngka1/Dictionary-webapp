import React, { useState } from "react";
import Button from "./Button";

interface InputFieldProps {
  submitButtonImageSrc?: string;
  submitButtonText?: string;
  callback: (input: Map<string, string>) => void; // callback is the function to submit input
  fieldlabels: string[];
  fieldtypes: string[];
  // fieldlabels specify the number of input fields, so even if no labels are needed, empty string has to be passed
}

const InputField = ({
  submitButtonImageSrc,
  submitButtonText,
  callback,
  fieldlabels,
  fieldtypes,
}: InputFieldProps) => {
  const [input, setInput] = useState(
    new Map<string, string>(
      fieldlabels.map((fieldlabel: string) => [fieldlabel, ""])
    )
  );
  const handleSubmit = (event: any) => {
    // modify type later
    event.preventDefault();
    callback(input);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let originalData = new Map(input);
    originalData.set(name, value);
    setInput(originalData);
  };
  return (
    <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
      {fieldlabels[0] ? <label>{fieldlabels[0]}</label> : false}
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-row align-items-center justify-content-center form-inline gap-5"
      >
        <div className="d-inline-flex flex-column" style={{ flexGrow: 3 }}>
          {fieldlabels.map((fieldName: string, index: number) => (
            <div className="flex-grow-1">
              {fieldName && index !== 0 && <label>{fieldName}</label>}
              <input
                key={fieldName}
                type={fieldtypes[index]}
                className="form-control"
                placeholder="Word"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                value={input.get(fieldName)}
                name={fieldName}
              />
            </div>
          ))}
        </div>
        <div style={{ flexGrow: 1, justifyContent: "center" }}>
          {submitButtonImageSrc ? (
            <Button type="submit" imageSrc={submitButtonImageSrc} />
          ) : (
            <Button
              type="submit"
              text={submitButtonText}
              buttonWidth="100%"
              buttonHeight="100%"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default InputField;
