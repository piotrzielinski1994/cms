'use client';

import { Button, FieldLabel, TextInput, useField, useForm, useFormFields } from '@payloadcms/ui';
import { TextFieldClientProps } from 'payload';
import React, { useCallback, useEffect, useMemo } from 'react';
import { formatSlug } from '../fields/slug/slug.utils';
import './index.scss';

type ComputedFieldProps = {
  fieldToUse: string;
  checkboxFieldPath?: string;
  formatter: keyof typeof formatters;
} & TextFieldClientProps;

// Cannot pass functions as clientProps
const formatters = {
  toSlug: formatSlug,
  toPath: (sourceFieldValue: string, prevValue: string) => {
    if (prevValue.split('/').at(-1) === sourceFieldValue) return prevValue;
    return prevValue.replace(/[^/]+$/, sourceFieldValue);
  },
} as const;

const ComputedField: React.FC<ComputedFieldProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  formatter,
  path,
}) => {
  const checkboxFieldPath = useMemo(() => {
    if (checkboxFieldPathFromProps === undefined) return undefined;
    return path?.includes('.')
      ? `${path}.${checkboxFieldPathFromProps}`
      : checkboxFieldPathFromProps;
  }, [checkboxFieldPathFromProps, path]);
  const { value, setValue } = useField<string>({ path: path || field.name });
  const { dispatchFields } = useForm();
  const readOnly = useFormFields(([fields]) => {
    if (checkboxFieldPath === undefined) return true;
    return fields[checkboxFieldPath]?.value as boolean;
  });
  const targetFieldValue = useFormFields(([fields]) => fields[fieldToUse]?.value as string);
  const prev = useFormFields(([fields]) => fields[path]?.value as string);
  const handleLock = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (checkboxFieldPath === undefined) return;
      dispatchFields({ type: 'UPDATE', path: checkboxFieldPath, value: !readOnly });
    },
    [readOnly, checkboxFieldPath, dispatchFields],
  );

  useEffect(() => {
    if (!readOnly) return;
    if (!targetFieldValue) return setValue('');
    if (formatter === 'toSlug') setValue(formatters[formatter](targetFieldValue));
    if (formatter === 'toPath') setValue(formatters[formatter](targetFieldValue, prev));
  }, [targetFieldValue, readOnly, setValue, value, path, prev, formatter]);

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={field.label} />
        {!!checkboxFieldPathFromProps && (
          <Button className="lock-button" buttonStyle="none" onClick={handleLock}>
            {readOnly ? 'Unlock' : 'Lock'}
          </Button>
        )}
      </div>
      <TextInput value={value} onChange={setValue} path={path || field.name} readOnly={readOnly} />
    </div>
  );
};

export { ComputedField };
