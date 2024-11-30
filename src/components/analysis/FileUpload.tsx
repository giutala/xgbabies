import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  onChange: (file: File | null) => void;
  error?: string;
  value?: File | null;
}

export function FileUpload({ id, label, accept, onChange, error, value }: FileUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {value ? value.name : 'Drag and drop or click to upload'}
        </p>
        <input
          type="file"
          id={id}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}