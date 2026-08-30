"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Image as ImageIcon } from "lucide-react";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";
import {
  getInvestmentPartnersAdmin,
  createInvestmentPartnerAdmin,
  updateInvestmentPartnerAdmin,
  deleteInvestmentPartnerAdmin,
  InvestmentPartner,
} from "@/services/investment-partner.service";
import { Pagination } from "@/components/ui/Pagination";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AdminInvestmentPartnersClientProps {
  initialPartners: InvestmentPartner[];
  totalPages?: number;
  currentPage?: number;
}

export default function AdminInvestmentPartnersClient({
  initialPartners,
  totalPages = 1,
  currentPage = 1,
}: AdminInvestmentPartnersClientProps) {
  const router = useRouter();
  const [partners, setPartners] =
    useState<InvestmentPartner[]>(initialPartners);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    iconName: "Building2",
    status: "active" as "active" | "inactive",
  });

  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const data = await getInvestmentPartnersAdmin();
      if (data && data.success) {
        setPartners(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch partners");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    router.push(`/admin/investment-partners?${params.toString()}`);
  };

  const handleEdit = (partner: InvestmentPartner) => {
    setEditMode(true);
    setCurrentId(partner._id);
    setFormData({
      title: partner.title || "",
      description: partner.description || "",
      image: partner.image || "",
      iconName: partner.iconName || "Building2",
      status: partner.status || "active",
    });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditMode(false);
    setCurrentId(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      iconName: "Building2",
      status: "active",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this partner?")) {
      try {
        await deleteInvestmentPartnerAdmin(id);
        toast.success("Partner deleted successfully");
        fetchPartners();
      } catch (error) {
        toast.error("Failed to delete partner");
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const payload = { ...formData };

      if (editMode && currentId) {
        await updateInvestmentPartnerAdmin(currentId, payload);
        toast.success("Partner updated successfully");
      } else {
        await createInvestmentPartnerAdmin(payload);
        toast.success("Partner created successfully");
      }

      setIsModalOpen(false);
      fetchPartners();
    } catch (error: any) {
      toast.error(error.message || "Failed to save partner");
    }
  };

  const columns: ColumnDef<InvestmentPartner>[] = [
    {
      header: "Partner Info",
      render: (p) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 shrink-0 overflow-hidden">
            {p.image ? (
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div>
            <div className="font-semibold text-white">{p.title}</div>
            <div className="text-xs text-gray-400 truncate max-w-[250px]">
              {p.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Icon Name",
      render: (p) => <span className="text-gray-300">{p.iconName}</span>,
    },
    {
      header: "Status",
      render: (p) => (
        <span
          className={`text-xs font-bold ${p.status === "active" ? "text-green-500" : "text-gray-500"}`}
        >
          {p.status === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: (p) => (
        <div className="space-x-3">
          <button
            onClick={() => handleEdit(p)}
            className="text-gray-400 hover:text-green-400"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(p._id)}
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
          <h2 className="text-2xl font-bold text-white">Investment Partners</h2>
          <p className="text-gray-400 text-sm">
            Manage your dynamic investor partnership categories and cards.
          </p>
        </div>
        <button onClick={openCreateModal} className="glass-btn">
          <Plus className="w-4 h-4" /> Add Partner
        </button>
      </div>

      <div className="min-h-[500px]">
        <AdminTable
          columns={columns}
          data={partners}
          isLoading={isLoading}
          keyExtractor={(p) => p._id}
          emptyMessage="No investment partners found."
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
            <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0 bg-white/5">
              <h3 className="text-xl font-bold text-white tracking-wide">
                {editMode ? "Edit Partner" : "Add Partner"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <form
                id="partnerForm"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="text-sm font-semibold text-gray-200 block mb-1">
                    Partner Title *
                  </label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                    placeholder="e.g. Local Investors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-200 block mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Describe this investment partner category..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-200 block mb-1">
                      Lucide Icon Name *
                    </label>
                    <input
                      required
                      value={formData.iconName}
                      onChange={(e) =>
                        setFormData({ ...formData, iconName: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                      placeholder="e.g. Building2, Globe2, Landmark"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Must be a valid Lucide icon name.
                    </p>
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
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors [&>option]:bg-gray-900"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-200 block mb-1">
                    Card Background Image URL *
                  </label>
                  <input
                    required
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                    placeholder="e.g. https://example.com/image.jpg"
                  />
                </div>
              </form>
            </div>

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
                form="partnerForm"
                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] active:scale-95"
              >
                {editMode ? "Update Partner" : "Create Partner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
