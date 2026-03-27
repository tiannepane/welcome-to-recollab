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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const additions: UploadedFile[] = Array.from(newFiles).map((f) => ({
        id: crypto.randomUUID(),
        file: f,
        category: selectedCategory || "Other",
      }));
      setFiles((prev) => [...prev, ...additions]);
    },
    [selectedCategory]
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
    <div className="min-h-screen onboarding-bg">
      <TopNavbar />

      <div className="max-w-[680px] mx-auto px-5 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="heading-lg mb-2">Upload your documents.</h1>
          <p className="text-muted-foreground mb-10">
            Drop in anything you have — we'll handle the rest.
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
            className={`rounded-2xl border border-dashed cursor-pointer transition-all py-16 flex flex-col items-center justify-center gap-3 ${
              isDragOver
                ? "border-foreground bg-[hsl(0,0%,98%)]"
                : "border-[hsl(0,0%,88%)] hover:border-foreground"
            }`}
          >
            <Upload className="w-7 h-7 text-foreground" strokeWidth={1.5} />
            <p className="text-[15px] text-foreground font-medium">
              Drag files here or click to browse
            </p>
            <p className="text-[13px] text-muted-foreground">
              PDFs, spreadsheets, Word docs — any format
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

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`h-9 px-4 rounded-full text-[13px] font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-foreground text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                }`}
                style={
                  selectedCategory !== cat
                    ? { border: "1px solid hsl(0 0% 88%)" }
                    : undefined
                }
              >
                {cat}
              </button>
            ))}
          </div>

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
                    className="flex items-center gap-3 rounded-xl bg-[hsl(0,0%,98%)] px-4 py-3"
                  >
                    <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-foreground truncate">{f.file.name}</p>
                      <p className="text-[12px] text-muted-foreground">{formatSize(f.file.size)}</p>
                    </div>
                    <div className="relative flex-shrink-0">
                      <select
                        value={f.category}
                        onChange={(e) => updateCategory(f.id, e.target.value)}
                        className="appearance-none bg-transparent text-[13px] text-muted-foreground pr-5 cursor-pointer focus:outline-none"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    </div>
                    <button
                      onClick={() => removeFile(f.id)}
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
              className="w-full max-w-[320px] h-12 rounded-full bg-foreground text-primary-foreground text-[15px] font-medium hover:opacity-[0.88] transition-opacity flex items-center justify-center gap-2"
            >
              Go to my buildings
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/buildings")}
              className="text-[14px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
