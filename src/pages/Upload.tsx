import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, ArrowRight, ChevronDown } from "lucide-react";
import TopNavbar from "@/components/TopNavbar";

const CATEGORIES = [
  "Reserve Fund Study",
  "Financial Statements",
  "Budget",
  "Engineering Report",
  "Other",
];

interface UploadedFile {
  id: string;
  file: File;
  category: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const additions: UploadedFile[] = Array.from(newFiles).map((f) => ({
        id: crypto.randomUUID(),
        file: f,
        category: "Other",
      }));
      setFiles((prev) => [...prev, ...additions]);
    },
    []
  );

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const updateCategory = (id: string, category: string) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, category } : f)));

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  return (
    <div className="min-h-screen" style={{ background: "#F7F8FA" }}>
      <TopNavbar />

      <div className="max-w-[640px] mx-auto px-5 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Headline */}
          <h1
            className="text-[32px] tracking-tight leading-tight mb-2"
            style={{ fontWeight: 600, color: "#0F1729", letterSpacing: "-0.025em" }}
          >
            Upload your documents.
          </h1>
          <p className="mb-10" style={{ fontSize: "15px", color: "#5A6178" }}>
            Drop in anything you have. We'll handle the rest.
          </p>

          {/* Drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-3 cursor-pointer"
            style={{
              height: "220px",
              background: isDragOver ? "rgba(255,255,255,0.9)" : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1.5px dashed ${isDragOver ? "#0F1729" : "rgba(0, 0, 0, 0.1)"}`,
              borderRadius: "16px",
              transition: "all 150ms",
            }}
          >
            <Upload className="w-5 h-5" style={{ color: "#9CA3B8" }} strokeWidth={1.5} />
            <p style={{ fontSize: "15px", fontWeight: 500, color: "#0F1729" }}>
              Drag files here or click to browse
            </p>
            <p style={{ fontSize: "13px", color: "#9CA3B8" }}>
              Reserve studies, budgets, engineering reports, financial statements. Any format.
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files);
              e.target.value = "";
            }}
          />

          {/* File list */}
          {files.length > 0 && (
            <div className="mt-8 space-y-2">
              <AnimatePresence>
                {files.map((f) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      background: "rgba(0,0,0,0.02)",
                      borderRadius: "12px",
                    }}
                  >
                    <FileText className="w-5 h-5 flex-shrink-0" style={{ color: "#9CA3B8" }} strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <p className="truncate" style={{ fontSize: "14px", color: "#0F1729" }}>{f.file.name}</p>
                      <p style={{ fontSize: "12px", color: "#9CA3B8" }}>{formatSize(f.file.size)}</p>
                    </div>
                    <div className="relative flex-shrink-0">
                      <select
                        value={f.category}
                        onChange={(e) => updateCategory(f.id, e.target.value)}
                        className="appearance-none bg-transparent pr-5 cursor-pointer focus:outline-none"
                        style={{ fontSize: "13px", color: "#9CA3B8" }}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "#9CA3B8" }} />
                    </div>
                    <button
                      onClick={() => removeFile(f.id)}
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                      style={{ color: "#9CA3B8" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#0F1729"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#9CA3B8"; }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Bottom actions */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              onClick={() => navigate("/buildings")}
              className="flex items-center justify-center gap-2"
              style={{
                height: "48px",
                padding: "0 32px",
                background: "#0F1729",
                color: "white",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                transition: "background 150ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1a2640"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#0F1729"; }}
            >
              Go to my buildings
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/buildings")}
              className="transition-colors"
              style={{ fontSize: "14px", color: "#9CA3B8", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#0F1729"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#9CA3B8"; }}
            >
              Skip for now &rarr;
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
