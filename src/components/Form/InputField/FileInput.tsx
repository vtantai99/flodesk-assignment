import React, { ChangeEvent, useState } from 'react';
import styles from './InputField.module.css';

interface FileInputProps {
  label: string;
  onChange: (file: File | null) => void;
  value?: string;
}

const FileInput: React.FC<FileInputProps> = ({ label, onChange, value }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    if (file) {
      // Create a preview URL for the image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Copy file to public directory
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const fileName = `uploads/${Date.now()}-${file.name}`;
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fileName,
              fileData: e.target.result,
            }),
          });
          
          if (response.ok) {
            onChange(file);
          }
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      onChange(null);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.input}
      />
      {previewUrl && (
        <div style={{ marginTop: 'var(--space-xs)' }}>
          <img 
            src={previewUrl} 
            alt="Preview" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '200px',
              borderRadius: 'var(--border-radius-sm)'
            }} 
          />
        </div>
      )}
    </div>
  );
};

export default FileInput; 