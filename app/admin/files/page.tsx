"use client";
import React, { useState, useEffect } from "react";
import { apiService } from "@/app/utils";
import toast from "react-hot-toast";

interface ImageFile {
  key: string;
  url: string;
  applicationId: string;
  childName?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  uploadedAt?: string;
  size?: number;
}

export default function FilesPage() {
  const [loading, setLoading] = useState(true);
  const [studentImages, setStudentImages] = useState<ImageFile[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>("Student Images");
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadStudentImages();
  }, []);

  const loadStudentImages = async () => {
    try {
      setLoading(true);
      const res = await apiService.get("/api/admin/files/student-images");
      if (res.success && res.data) {
        setStudentImages(res.data);
      }
    } catch (error: any) {
      console.error("Error loading student images:", error);
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (image: ImageFile) => {
    if (!confirm(`Are you sure you want to delete the image for ${image.childName || image.applicationId}? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleting(image.key);
      const res = await apiService.delete(`/api/admin/files/delete-image?key=${encodeURIComponent(image.key)}&applicationId=${image.applicationId}`);
      
      if (res.success) {
        toast.success("Image deleted successfully");
        // Remove from local state
        setStudentImages(prev => prev.filter(img => img.key !== image.key));
        // Close modal if this image was selected
        if (selectedImage?.key === image.key) {
          setSelectedImage(null);
        }
      } else {
        throw new Error(res.error || "Failed to delete image");
      }
    } catch (error: any) {
      console.error("Error deleting image:", error);
      toast.error(error.message || "Failed to delete image");
    } finally {
      setDeleting(null);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h1 className="text-2xl font-bold text-slate-900">Files</h1>
        <p className="text-slate-600 mt-2">Manage and view uploaded files</p>
      </div>

      {/* Folder Structure */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Folders</h2>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedFolder("Student Images")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              selectedFolder === "Student Images"
                ? "bg-blue-50 border-2 border-blue-200"
                : "bg-slate-50 hover:bg-slate-100 border-2 border-transparent"
            }`}
          >
            <span className="text-2xl">📁</span>
            <div className="flex-1">
              <div className="font-medium text-slate-900">Student Images</div>
              <div className="text-sm text-slate-500">
                {loading ? "Loading..." : `${studentImages.length} image${studentImages.length !== 1 ? "s" : ""}`}
              </div>
            </div>
            <span className="text-slate-400">→</span>
          </button>
        </div>
      </div>

      {/* Student Images Content */}
      {selectedFolder === "Student Images" && (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Student Images</h2>
            <button
              onClick={loadStudentImages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : studentImages.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-lg">No images found</p>
              <p className="text-sm mt-2">Images uploaded through forms will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {studentImages.map((image, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-square bg-white relative group overflow-hidden">
                    <img
                      src={image.url}
                      alt={`Student image ${image.applicationId}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      loading={index < 12 ? "eager" : "lazy"}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f1f5f9' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23475569' font-family='Arial' font-size='11'%3ENo Image%3C/text%3E%3C/svg%3E";
                        target.className = "w-full h-full object-contain p-4";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2 pointer-events-none">
                      <div className="px-2 py-1 bg-white/90 text-slate-900 rounded text-xs font-medium shadow-sm">
                        View Image
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white space-y-1.5">
                    <div>
                      <div className="text-[10px] font-semibold text-slate-500 uppercase">Student Name</div>
                      <div className="text-xs font-semibold text-slate-900 truncate" title={image.childName || "-"}>
                        {image.childName || "-"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-500 uppercase">Application ID</div>
                      <div className="text-xs text-slate-700 truncate font-mono" title={image.applicationId}>
                        {image.applicationId}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-500 uppercase">Parent Name</div>
                      <div className="text-xs text-slate-700 truncate" title={image.parentName || "Unknown"}>
                        {image.parentName || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-500 uppercase">Contact</div>
                      <div className="text-xs text-slate-700 truncate" title={image.parentPhone || image.parentEmail || "N/A"}>
                        {image.parentPhone || image.parentEmail || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Preview Modal - Small and Simple */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-50 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Image Preview</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content - Just Image */}
            <div className="p-4">
              <img
                src={selectedImage.url}
                alt={`Student image ${selectedImage.applicationId}`}
                className="w-full h-auto rounded-lg border border-slate-200 max-h-[70vh] object-contain mx-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e2e8f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23475569' font-family='Arial' font-size='16'%3EImage Not Available%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="px-4 py-3 border-t border-slate-200 flex gap-2">
              <button
                onClick={() => handleDelete(selectedImage)}
                disabled={deleting === selectedImage.key}
                className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center gap-2"
              >
                {deleting === selectedImage.key ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
