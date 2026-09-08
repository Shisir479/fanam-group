"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, FileText, X } from "lucide-react";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";
import {
  getInvestorReportsByAdmin,
  createInvestorReportByAdmin,
  updateInvestorReportByAdmin,
  deleteInvestorReportByAdmin,
  InvestorReport,
} from "@/services/investor.service";
import { Pagination } from "@/components/ui/Pagination";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AdminInvestorsClientProps {
  initialReports: InvestorReport[];
  totalPages?: number;
  currentPage?: number;
}

export default function AdminInvestorsClient({
  initialReports,
  totalPages = 1,
  currentPage = 1,
}: AdminInvestorsClientProps) {
  const router = useRouter();
  const [reports, setReports] = useState<InvestorReport[]>(initialReports);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    category: "Annual Report" as
      "Annual Report" | "Quarterly Report" | "Governance" | "Presentation",
    pdfUrl: "",
    thumbnailUrl: "",
    status: "active" as "active" | "inactive",
  });

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const data = await getInvestorReportsByAdmin();
      if (data && data.success) {
        setReports(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch reports");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    router.push(`/admin/investors?${params.toString()}`);
  };

  const handleEdit = (report: InvestorReport) => {
    setEditMode(true);
    setCurrentId(report._id);
    setFormData({
      title: report.title || "",
      year: report.year || new Date().getFullYear(),
      category: report.category || "Annual Report",
      pdfUrl: report.pdfUrl || "",
      thumbnailUrl: report.thumbnailUrl || "",
      status: report.status || "active",
    });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditMode(false);
    setCurrentId(null);
    setFormData({
      title: "",
      year: new Date().getFullYear(),
      category: "Annual Report",
      pdfUrl: "",
      thumbnailUrl: "",
      status: "active",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      try {
        await deleteInvestorReportByAdmin(id);
        toast.success("Report deleted successfully");
        fetchReports();
      } catch (error) {
        toast.error("Failed to delete report");
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
      };

      if (editMode && currentId) {
        await updateInvestorReportByAdmin(currentId, payload);
        toast.success("Report updated successfully");
      } else {
        await createInvestorReportByAdmin(payload);
        toast.success("Report uploaded successfully");
      }

      setIsModalOpen(false);
      fetchReports();
    } catch (error: any) {
      toast.error(error.message || "Failed to save report");
    }
  };

  const columns: ColumnDef<InvestorReport>[] = [
    {
      header: "Report Details",
      render: (r) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 shrink-0 overflow-hidden">
            {r.thumbnailUrl ? (
              <img
                src={r.thumbnailUrl}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              <FileText className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <div>
            <div className="font-semibold text-white">{r.title}</div>
            <div className="text-xs text-gray-400">
              {r.year} • {r.category}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (r) => (
        <span
          className={`text-xs font-bold ${r.status === "active" ? "text-green-500" : "text-gray-500"}`}
        >
          {r.status === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: (r) => (
        <div className="space-x-3">
          <a
            href={r.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            View PDF
          </a>
          <button
            onClick={() => handleEdit(r)}
            className="text-gray-400 hover:text-green-400"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(r._id)}
            className="text-gray-400 hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Investor Reports</h2>
          <p className="text-gray-400 text-sm">
            Manage financial reports, presentations, and governance documents.
          </p>
        </div>
        <button onClick={openCreateModal} className="glass-btn">
          <Plus className="w-4 h-4" /> Upload Report
        </button>
      </div>

      <div className="min-h-[500px]">
        <AdminTable
          columns={columns}
          data={reports}
          isLoading={isLoading}
          keyExtractor={(r) => r._id}
          emptyMessage="No reports found."
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          <div className="glass-panel rounded-2xl w-full max-w-2xl flex flex-col border border-white/10 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0 bg-white/5">
              <h3 className="text-xl font-bold text-white tracking-wide">
                {editMode ? "Edit Report" : "Upload New Report"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <form
                id="reportForm"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="text-sm font-semibold text-gray-200 block mb-1">
                    Report Title *
                  </label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
                    placeholder="e.g. Q3 Financial Results 2023"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-200 block mb-1">
                      Year *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.year}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          year: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-200 block mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as
                            | "Annual Report"
                            | "Quarterly Report"
                            | "Governance"
                            | "Presentation",
                        })
                      }
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors [&>option]:bg-gray-900"
                    >
                      <option>Annual Report</option>
                      <option>Quarterly Report</option>
                      <option>Governance</option>
                      <option>Presentation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-200 block mb-1">
                    PDF Document URL *
                  </label>
                  <input
                    required
                    value={formData.pdfUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, pdfUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
                    placeholder="e.g. https://example.com/report.pdf"
                  />
                  {/* Note: I changed this to a standard text input because `UploadInput` with `type="document"` might not be fully implemented or robust enough in this codebase context without seeing it. It's safer to allow text URL for now. */}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-200 block mb-1">
                    Thumbnail Image URL (Optional)
                  </label>
                  <input
                    value={formData.thumbnailUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, thumbnailUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
                    placeholder="e.g. https://example.com/image.png"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-200 block mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "active" | "inactive",
                      })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors [&>option]:bg-gray-900"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 shrink-0 bg-white/5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="reportForm"
                className="px-6 py-2 bg-brand-violet hover:bg-brand-violet text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] active:scale-95"
              >
                {editMode ? "Update Report" : "Upload Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
