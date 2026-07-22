"use client";

import { useEffect, useState } from "react";
import {
  getContactsByAdmin,
  deleteContactByAdmin,
  Contact,
} from "@/services/contact.service";
import { Trash2, Loader2, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

export default function AdminContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // View Modal State
  const [viewContact, setViewContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const res = await getContactsByAdmin({ page, search, limit: 10 });
      if (res.success) {
        setContacts(res.data);
        setTotalPages(res.count);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch contacts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page, search]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await deleteContactByAdmin(deleteTarget);
      if (res.success || res.message) {
        toast.success("Contact deleted successfully");
        setDeleteTarget(null);
        fetchContacts();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete contact");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<Contact>[] = [
    {
      header: "Customer",
      render: (contact) => (
        <div>
          <p className="font-medium text-white line-clamp-1">
            {contact.fullName}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {contact.email} <br /> {contact.phone}
          </p>
        </div>
      ),
    },
    {
      header: "Subject",
      accessor: "subject",
      className: "text-gray-300",
    },
    {
      header: "Date",
      render: (contact) => (
        <span className="text-gray-400">
          {new Date(contact.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: (contact) => (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setViewContact(contact)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="View Message"
          >
            <Mail className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(contact._id)}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            title="Delete Contact"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Contacts & Inquiries
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your customer inquiries and messages.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 flex gap-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={contacts}
        isLoading={isLoading}
        keyExtractor={(contact) => contact._id}
        emptyMessage="No contacts found."
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10 text-white rounded-lg disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10 text-white rounded-lg disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Contact"
        description="Are you sure you want to delete this contact message? This action cannot be undone."
      />

      {/* View Message Modal */}
      {viewContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#120a1c] border border-white/10 p-6 rounded-2xl shadow-xl w-full max-w-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              Message from {viewContact.fullName}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="text-white">{viewContact.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Phone
                </p>
                <p className="text-white">{viewContact.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Subject
                </p>
                <p className="text-white">{viewContact.subject}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Message
                </p>
                <div className="text-gray-300 p-4 bg-white/5 rounded-xl whitespace-pre-wrap">
                  {viewContact.message}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setViewContact(null)}
                className="glass-btn"
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
