"use client";
import { ENQUIRY_SOURCE_KEYS, type EnquirySource } from "@/lib/enquiry-source";

export type HeardAboutLabels = { label: string; placeholder: string } & Record<EnquirySource, string>;

interface Props {
  id: string;
  value: string;
  onChange: (value: string) => void;
  labels: HeardAboutLabels;
  labelClassName: string;
  selectClassName: string;
}

/** The optional "How did you hear about us?" select. See lib/enquiry-source.ts. */
export default function HeardAboutSelect({ id, value, onChange, labels, labelClassName, selectClassName }: Props) {
  return (
    <div>
      <label htmlFor={id} className={labelClassName}>{labels.label}</label>
      <select id={id} name="heard" value={value} onChange={(e) => onChange(e.target.value)} className={selectClassName}>
        <option value="">{labels.placeholder}</option>
        {ENQUIRY_SOURCE_KEYS.map((k) => (
          <option key={k} value={k}>{labels[k]}</option>
        ))}
      </select>
    </div>
  );
}
