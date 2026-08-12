"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Award } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

// Mock Data Type
export interface AwardItem {
  _id: string;
  title: string;
  issuer: string;
  year: string;
  image?: { url: string };
}

const mockAwards: AwardItem[] = [
  {
    _id: "1",
    title: "Best Real Estate Developer",
    issuer: "National Property Awards",
    year: "2023",
  },
  {
    _id: "2",
    title: "ISO 9001:2015 Certification",
    issuer: "ISO",
    year: "2021",
  },
];

export default function AdminAwardsClient() {
  const [awards, setAwards] = useState<AwardItem[]>(mockAwards);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      setTimeout(() => {
        setAwards(awards.filter((a) => a._id !== deleteTarget));
        toast.success("Award deleted successfully");
        setDeleteTarget(null);
        setIsDeleting(false);
      }, 500);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete award");
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<AwardItem>[] = [
    {
      header: "Award / Certification",
      render: (award) => (
        <div className="flex items-center gap-4 group">
          {award.image?.url ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={award.image.url}
                alt={award.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
              <Award className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-semibold text-white group-hover:text-[#CBA35E] transition-colors line-clamp-1">
              {award.title}
            </div>
            <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">
              {award.issuer} • {award.year}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (award) => (
        <>
          <button className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(award._id)}
            className="inline-flex p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Awards & Certifications
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your company's awards, recognitions, and certificates.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="glass-btn whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Add New Award
          </button>
        </div>
      </div>

      <AdminTable
        columns={columns}
        data={awards}
        isLoading={false}
        keyExtractor={(item) => item._id}
        emptyMessage="No awards found. Add one to get started."
      />

      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Remove Award"
        description="Are you sure you want to remove this award?"
      />
    </div>
  );
}
