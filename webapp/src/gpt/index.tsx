import React, { useState } from "react";
import Service from "../services";
import { GptRequest } from "../services/types";
import Button from "../widgets/button";
import Flex from "../widgets/flex";
import Multiline from "../widgets/multiline";
import Select from "../widgets/select";

const GptForm = () => {
  const [isRunning, setRunning] = useState(false);
  const [responseText, setResponseText] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<GptRequest>>({
    text: "",
    action: "fix",
  });

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    setRunning(true);

    const task = Service.gpt({
      ...formData,
    } as GptRequest);
    task
      .finally(() => {
        setRunning(false);
      })
      .then((results) => {
        setResponseText(results.response);
      });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const fieldName = event.target.name as keyof GptRequest;
    const value = event.target.value;
    setResponseText(null);
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSelectChange = (value: string, name?: string) => {
    if (name) {
      const fieldName = name as keyof GptRequest;
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));

      setResponseText(null);
    }
  };

  const featureOptions = [
    { label: "Fix Grammar", value: "fix" },
    { label: "Expand Text", value: "expand" },
    { label: "Summarize", value: "summarize" },
    { label: "Sentiment Analysis", value: "sentiment" },
    { label: "Classify Text", value: "classify" },
    { label: "Extract Keywords", value: "keywords" },
  ];

  return (
    <form>
      <Flex className="" flexDirection="column" rowGap="8px">
        <label className="font-size-small">Action</label>
        <Select
          name="action"
          value={formData.action}
          onItemSelect={handleSelectChange}
          options={featureOptions}
        />

        <Multiline
          name="text"
          label="Text"
          rows={5}
          cols={50}
          value={formData.text}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="primary"
          onClick={handleSubmit}
          busy={isRunning}
        >
          Send
        </Button>
      </Flex>
      {responseText != null && (
        <Flex
          className="m-xxsmall m-xsmall-top"
          flexDirection="column"
          rowGap="12px"
        >
          <div className="p-xxsmall border border-thin border-primary border-radius-small m-small-top">
            <div className="text-2xl">{responseText}</div>
          </div>
        </Flex>
      )}
    </form>
  );
};

export default GptForm;
