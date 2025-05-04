import { ElementNode, ElementType } from "@/types/dom";
import { ChangeEvent } from "react";
import { InputField } from "../Form/InputField";
import styles from "./SettingsPanel.module.css";
import { RadioGroupField } from "../Form/RadioGroupField";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { TextareaField } from "../Form/TextAreaField";

interface SettingsPanelProps {
  selectedElement: ElementNode | null;
  updateElement: (id: string, updatedFields: Partial<ElementNode>) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ selectedElement, updateElement }) => {
  if (!selectedElement) {
    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>Select any element to edit</h3>
      </div>
    );
  }
  const { id, type } = selectedElement;

  const handleStyleChange = (styleKey: string, value: string) => {
    updateElement(id, {
      styles: { ...selectedElement.styles, [styleKey]: value },
    });
  };

  const handleAttributeChange = (attrKey: string, value: string) => {
    updateElement(id, {
      attributes: { ...selectedElement.attributes, [attrKey]: value },
    });
  };

  const handleContentChange = (value: string) => {
    updateElement(id, { content: value });
  };

  // Helper to extract numeric value from a style property (e.g., "800px" -> "800")
  const getNumericValue = (styleValue: string | undefined, defaultValue: string) => {
    return styleValue ? parseInt(styleValue, 10).toString() : defaultValue;
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{capitalizeFirstLetter(type)} settings</h3>

      <div className={styles.content}>
        {[ElementType.CONTAINER, ElementType.PAGE].includes(type) && (
          <>
            <InputField
              label="Background Color"
              type="color"
              value={selectedElement.styles?.backgroundColor || "#e0f7fa"}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("backgroundColor", e.target.value)}
            />
            <InputField
              label="Page width"
              type="range"
              value={getNumericValue(selectedElement.styles?.maxWidth as string | undefined, "100")}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("maxWidth", `${e.target.value}%`)}
              min="50"
              max="100"
            />
          </>
        )}

        {type === ElementType.HEADER && (
          <>
            <InputField
              label="Background Color"
              type="color"
              value={selectedElement.styles?.backgroundColor || "#e0f7fa"}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("backgroundColor", e.target.value)}
            />
          </>
        )}

        {[ElementType.HEADING, ElementType.PARAGRAPH].includes(type) && (
          <>
            <InputField
              label="Text color"
              type="color"
              value={selectedElement.styles?.backgroundColor || "#e0f7fa"}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("backgroundColor", e.target.value)}
            />
            <InputField
              label="Font size"
              type="range"
              value={getNumericValue(selectedElement.styles?.fontSize as string | undefined, "24")}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("fontSize", `${e.target.value}px`)}
              min={type === ElementType.PARAGRAPH ? "12" : "24"}
              max={type === ElementType.PARAGRAPH ? "24" : "48"}
            />
            <RadioGroupField
              label="Font weight"
              name="fontWeight"
              value={(selectedElement.styles?.fontWeight as string) ?? "normal"}
              onChange={(value: string) => handleStyleChange("fontWeight", value)}
              options={[
                { label: "Lighter", value: "lighter" },
                { label: "Normal", value: "normal" },
                { label: "Bold", value: "bold" },
              ]}
            />
            <TextareaField
              label="Content"
              value={selectedElement.content || ""}
              onChange={({ target: { value } }) => handleContentChange(value)}
            />
          </>
        )}

        {type === ElementType.IMAGE && (
          <>
            <InputField
              label="Image URL"
              type="text"
              value={selectedElement.attributes?.src || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleAttributeChange("src", e.target.value)}
              placeholder="Enter image URL"
            />
            <InputField
              label="Alt Text"
              type="text"
              value={selectedElement.attributes?.alt || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleAttributeChange("alt", e.target.value)}
              placeholder="Enter alt text"
            />
          </>
        )}

        {type === ElementType.BUTTON && (
          <>
            <InputField
              label="Button Text"
              type="text"
              value={selectedElement.content || ""}
              onChange={({ target: { value } }) => handleContentChange(value)}
              placeholder="Enter button text"
            />
            <InputField
              label="Background Color"
              type="color"
              value={selectedElement.styles?.backgroundColor || "#3b82f6"}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("backgroundColor", e.target.value)}
            />
          </>
        )}

        {type === ElementType.LINK && (
          <>
            <InputField
              label="Link Text"
              type="text"
              value={selectedElement.content || ""}
              onChange={({ target: { value } }) => handleContentChange(value)}
              placeholder="Enter link text"
            />
            <InputField
              label="URL"
              type="text"
              value={selectedElement.attributes?.href || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleAttributeChange("href", e.target.value)}
              placeholder="Enter URL"
            />
            <InputField
              label="Text Color"
              type="color"
              value={selectedElement.styles?.color || "#3b82f6"}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("color", e.target.value)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;
