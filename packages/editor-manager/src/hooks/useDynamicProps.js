import { useState, useEffect, useCallback } from 'react';

const useDynamicProps = ({ defaultTemplates }) => {
  const [templates, setTemplates] = useState({});

  const handleChangeKnob = useCallback(
    ({ templateId, value }) =>
      setTemplates(prevTemplates => ({
        ...prevTemplates,
        [templateId]: {
          ...prevTemplates[templateId],
          dynamicProps: value,
        },
      })),
    [],
  );

  useEffect(() => {
    setTemplates(
      defaultTemplates &&
        Object.keys(defaultTemplates).reduce(
          (prevTemplates, templateId) => ({
            ...prevTemplates,
            [templateId]: {
              ...defaultTemplates[templateId],
              dynamicProps: defaultTemplates[templateId].dynamicProps,
            },
          }),
          {},
        ),
    );
  }, [defaultTemplates]);

  return { templates, handleChangeKnob };
};

export default useDynamicProps;
