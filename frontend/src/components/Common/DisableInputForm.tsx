import React from "react";
import styles from "./DisableInputForm.module.scss";

interface InputFormProps {
  label: string;
  value: string;
  type: string;
}

export default function DisableInputForm(props: InputFormProps) {
  return (
    <>
      <div className={styles.containers}>
        <div className={styles.description}>
          <label htmlFor="id">{props.label}</label>
        </div>
        <input
          className={styles.inputform}
          id="id"
          type={props.type}
          value={props.value}
          disabled
        />
      </div>
    </>
  );
}
