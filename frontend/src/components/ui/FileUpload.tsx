import React, { useRef, useState } from 'react';
import { UploadIcon, FileIcon, TrashIcon } from './Icon';

interface Props {
  label?: string;
  onChange: (file: File | null) => void;
}

export const FileUpload: React.FC<Props> = ({ label, onChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      onChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      onChange(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-slate-600">{label}</label>}
      
      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-150
            ${dragActive ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50 bg-white'}`}
        >
          <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <UploadIcon size={20} />
          </div>
          <p className="text-sm font-medium text-slate-700">
            <span className="text-blue-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-500 mt-1">PDF, DOCX, JPG, PNG up to 10MB</p>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 border border-slate-200 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0">
              <FileIcon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button type="button" onClick={clearFile} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
            <TrashIcon size={16} />
          </button>
        </div>
      )}
    </div>
  );
};