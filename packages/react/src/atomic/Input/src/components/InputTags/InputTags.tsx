import React, { useState, useRef, KeyboardEvent, useCallback } from "react";
import { Chip } from "@nimbus-ds/chip";
import { input } from "@nimbus-ds/styles";
import { useRefObjectAsForwardedRef } from "@nimbus-ds/typings";
import type { InputTagsProps } from "./inputTags.types";

export const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
  (
    {
      className: _className,
      style: _style,
      appearance = "neutral",
      maxTags = 30,
      value,
      onChange,
      onTagsChange,
      tags = [],
      ...rest
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    useRefObjectAsForwardedRef(ref, inputRef);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        if (tags.length < maxTags) {
          const newTags = [...tags, inputValue.trim()];
          onTagsChange?.(newTags);
          setInputValue("");
        }
      } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
        const newTags = tags.slice(0, -1);
        onTagsChange?.(newTags);
      }
    };

    const handleRemoveTag = useCallback(
      (indexToRemove: number) => {
        const newTags = tags.filter(
          (_: string, index: number) => index !== indexToRemove
        );
        onTagsChange?.(newTags);
      },
      [tags, onTagsChange]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div
        className={
          input.classnames.appearance[
            appearance as keyof typeof input.classnames.appearance
          ]
        }
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            padding: "0 8px",
            alignItems: "center",
          }}
        >
          {tags.map((tag: string, index: number) => (
            <Chip
              key={tag}
              text={tag}
              removable
              onClick={() => handleRemoveTag(index)}
            />
          ))}
          <input
            {...rest}
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={input.classnames.input}
            style={{
              border: "none",
              outline: "none",
              padding: 0,
              margin: 0,
              minWidth: "240px",
              flex: "1",
              background: "transparent",
            }}
            placeholder={rest.placeholder}
            disabled={rest.disabled}
          />
        </div>
      </div>
    );
  }
);
