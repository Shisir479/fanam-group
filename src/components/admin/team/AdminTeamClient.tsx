"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, User } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

// Mock Data Type
export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image?: { url: string };
  status: "active" | "inactive";
  order: number;
}

const mockTeam: TeamMember[] = [
  {
    _id: "1",
    name: "John Doe",
    position: "Managing Director",
    status: "active",
    order: 1,
  },
  {
    _id: "2",
    name: "Jane Smith",
    position: "Chief Executive Officer",
    status: "active",
    order: 2,
  },
];

export default function AdminTeamClient() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeam);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      // Mock Delete Logic
      setTimeout(() => {
        setTeamMembers(teamMembers.filter((m) => m._id !== deleteTarget));
        toast.success("Team member deleted successfully");
        setDeleteTarget(null);
        setIsDeleting(false);
      }, 500);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete team member");
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<TeamMember>[] = [
    {
      header: "Team Member",
      render: (member) => (
        <div className="flex items-center gap-4 group">
          {member.image?.url ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={member.image.url}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
              <User className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-semibold text-white group-hover:text-[#CBA35E] transition-colors line-clamp-1">
              {member.name}
            </div>
            <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">
              {member.position}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (member) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold w-fit bg-[#f7f8fa] border border-transparent shadow-[2px_2px_5px_rgba(180,185,195,0.4),-2px_-2px_5px_rgba(255,255,255,0.9)] ${
            member.status === "active" ? "text-green-600" : "text-red-500"
          }`}
        >
          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (member) => (
        <>
          <button
            title="Edit Member"
            className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(member._id)}
            className="inline-flex p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
            title="Delete Member"
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
          <h2 className="text-2xl font-bold text-white">Leadership Team</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your board of directors and executive leadership.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="glass-btn whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Add New Member
          </button>
        </div>
      </div>

      <AdminTable
        columns={columns}
        data={teamMembers}
        isLoading={false}
        keyExtractor={(member) => member._id}
        emptyMessage="No team members found. Add one to get started."
      />

      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Remove Team Member"
        description="Are you sure you want to remove this team member? This action cannot be undone."
      />
    </div>
  );
}
