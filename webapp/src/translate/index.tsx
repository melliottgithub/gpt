import React, { useState } from "react";
import Service from "../services";
import { TranslationRequest } from "../services/types";
import Button from "../widgets/button";
import Flex from "../widgets/flex";
import Multiline from "../widgets/multiline";
import Select from "../widgets/select";

const TranslateForm = () => {
  const [isRunning, setRunning] = useState(false);
  const [translatedText, setTranslatedText] = useState<Record<string,string> | null>(null);
  const [formData, setFormData] = useState<Partial<TranslationRequest>>({
      text: '',
      source_language: 'en',
      target_language: 'es',
  });

  const engines: Record<string,string> = {
    google: 'Google Translate',
    aws: 'AWS Translate',
    gpt3: 'GPT3',
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
      event.preventDefault();
      setRunning(true);
  
      const tasks = Object.keys(engines).map((engine) =>
        Service.translate({
          ...formData,
          engine,
        } as TranslationRequest).then((response) => {
          console.log(engine, response);
          const engineName = engines[engine];
          return {[engineName]: response.translated_text};
        })
      );

      Promise.all(tasks).finally(() => {
        setRunning(false)
      }).then((results) => {
        const result = results.reduce((acc, item) => ({...acc, ...item}), {});
        setTranslatedText(result);
      });
    }; 

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const fieldName = event.target.name as keyof TranslationRequest;
    const value = event.target.value;
    console.log(fieldName, value);
    setTranslatedText(null);
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSelectChange = (value: string, name?: string) => {
    if (name) {
      const fieldName = name as keyof TranslationRequest;
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));

      setTranslatedText(null);
    }
  };
  
  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
  ];

  return (
    <form>
      <Flex className="" flexDirection="column" rowGap="8px">
        <label className="font-size-small">Source</label>
        <Select name="source_language" value={formData.source_language} onItemSelect={handleSelectChange} options={languageOptions} />
        <label className="font-size-small">Target</label>
        <Select name="target_language" value={formData.target_language} onItemSelect={handleSelectChange} options={languageOptions} />

        <Multiline
          name="text"
          label="Text"
          rows={5}
          cols={50}
          value={formData.text}
          onChange={handleChange}
        />
        <Button type="submit" variant="primary" onClick={handleSubmit} busy={isRunning}>
          Translate
        </Button>
      </Flex>
      {translatedText != null && <Flex className="m-xxsmall m-xsmall-top" flexDirection="column" rowGap="12px">
        {Object.values(engines).map((engine) => (
          <div className="p-xxsmall border border-thin border-primary border-radius-small m-small-top">
            <div className="secondary-1 font-size-small font-bold">{engine}:</div>
            <div className="text-2xl">{translatedText[engine]}</div>
          </div>
          ))
        }
      </Flex>}
    </form >
  );
};

export default TranslateForm;