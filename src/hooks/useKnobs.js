import { useState, useEffect, useCallback } from 'react';

const useKnobs = ({ defaultTemplates }) => {
  const [templates, setTemplates] = useState({});

  const handleChangeKnob = useCallback(
    ({ templateId, value }) =>
      setTemplates(prevTemplates => ({
        ...prevTemplates,
        [templateId]: {
          ...prevTemplates[templateId],
          knobs: value,
        },
      })),
    [],
  );

  useEffect(() => {
    setTemplates(
      Object.keys(defaultTemplates).reduce(
        (prevTemplates, templateId) => ({
          ...prevTemplates,
          [templateId]: {
            ...defaultTemplates[templateId],
            knobs: {
              to: 'test@muil.io',
              subject: defaultTemplates[templateId].name,
              props: defaultTemplates[templateId].knobs,
            },
          },
        }),
        {},
      ),
    );
  }, [defaultTemplates]);

  return { templates, handleChangeKnob };
};

export default useKnobs;
