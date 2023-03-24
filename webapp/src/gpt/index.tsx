import React, { useState, useEffect } from "react";
import Service from "../services";
import { GptRequest } from "../services/types";
import Button from "../widgets/button";
import Flex from "../widgets/flex";
import Multiline from "../widgets/multiline";
import Select from "../widgets/select";
import "./index.css";

const GptForm = () => {
  const [isRunning, setRunning] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
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

  const copyText = () => {
    if (responseText) {
      navigator.clipboard.writeText(responseText).then(
        () => {
          setHasCopied(true);
        },
        (error) => {
          console.error("Could not copy text: ", error);
        }
      );
    }
  };

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const featureOptions = [
    { label: "Classify Text", value: "classify" },
    { label: "Expand Text", value: "expand" },
    { label: "Extract Keywords", value: "keywords" },
    { label: "Fix Grammar", value: "fix" },
    { label: "Sentiment Analysis", value: "sentiment" },
    { label: "Summarize", value: "summarize" },
  ];

  return (
    <form className="gpt-form">
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
          <Button type="button" variant="secondary" onClick={copyText}>
            Copy
          </Button>
          {hasCopied && (
            <div className="text-success">Text has been copied!</div>
          )}
        </Flex>
      )}
    </form>
  );
};

export default GptForm;
