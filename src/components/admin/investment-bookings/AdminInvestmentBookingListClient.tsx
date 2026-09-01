"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  InvestmentBookingPayload,
  deleteInvestmentBookingAdmin,
  updateInvestmentBookingAdmin,
} from "@/services/investment-booking.service";
import { DeleteModal } from "@/components/ui/DeleteModal";
import {
  Trash2,
  Search,
  FileText,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  FileSearch,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

export interface InvestmentBooking extends InvestmentBookingPayload {
  _id: string;
  createdAt: string;
}

export interface AdminInvestmentBookingListClientProps {
  initialBookings: InvestmentBooking[];
  totalPages: number;
  currentPage: number;
  currentSearch: string;
  currentStatus: string;
}

export default function AdminInvestmentBookingListClient({
  initialBookings,
  totalPages,
  currentPage,
  currentSearch,
  currentStatus,
}: AdminInvestmentBookingListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch);
  const [status, setStatus] = useState(currentStatus);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<InvestmentBooking | null>(null);

  const confirmDelete = (id: string) => {
    setBookingToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!bookingToDelete) return;
    setIsDeleting(true);
    try {
      const res: any = await deleteInvestmentBookingAdmin(bookingToDelete);
      if (res.success !== false) {
        // Handle potential different response structure
        toast.success("Booking deleted successfully");
        setDeleteModalOpen(false);
        setBookingToDelete(null);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete booking.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res: any = await updateInvestmentBookingAdmin(id, {
        status: newStatus as any,
      });
      if (res.success !== false) {
        toast.success("Status updated successfully");
        router.refresh();
        if (selectedBooking?._id === id) {
          setSelectedBooking({ ...selectedBooking, status: newStatus as any });
        }
      } else {
        toast.error(res.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const columns: ColumnDef<InvestmentBooking>[] = [
    {
      header: "Applicant Details",
      render: (booking) => (
        <div className="flex flex-col gap-1">
          <div
            className="font-semibold text-white truncate max-w-[200px]"
            title={booking.fullName}
          >
            {booking.fullName}
          </div>
          <div className="text-xs text-gray-400">{booking.phone}</div>
          <div
            className="text-[10px] text-gray-500 truncate max-w-[200px]"
            title={booking.email}
          >
            {booking.email || "N/A"}
          </div>
        </div>
      ),
    },
    {
      header: "Inquiry Info",
      render: (booking) => (
        <div className="flex flex-col gap-1">
          {booking.subject && (
            <div className="text-sm text-brand-blue">
              Subject: <span className="font-semibold">{booking.subject}</span>
            </div>
          )}
          {booking.message && (
            <div className="text-sm text-gray-400">
              Details: {booking.message}
            </div>
          )}
          {!booking.subject && !booking.message && (
            <div className="text-sm text-gray-400 italic">General Inquiry</div>
          )}
        </div>
      ),
    },
    {
      header: "Date",
      render: (booking) => (
        <div className="text-sm text-gray-300">
          {booking.createdAt
            ? new Date(booking.createdAt).toLocaleDateString()
            : "N/A"}
        </div>
      ),
    },
    {
      header: "Status",
      render: (booking) => (
        <Select
          value={booking.status || "pending"}
          onValueChange={(val) => {
            if (val) handleUpdateStatus(booking._id, val);
          }}
        >
          <SelectTrigger
            className={`w-[120px] h-8 text-xs bg-white/5 border border-white/10 ${
              booking.status === "approved"
                ? "text-green-400"
                : booking.status === "rejected"
                  ? "text-red-400"
                  : booking.status === "contacted"
                    ? "text-blue-400"
                    : "text-yellow-400"
            }`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-2 text-yellow-400" /> Pending
              </div>
            </SelectItem>
            <SelectItem value="contacted">
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-2 text-blue-400" /> Contacted
              </div>
            </SelectItem>
            <SelectItem value="approved">
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-2 text-green-400" /> Approved
              </div>
            </SelectItem>
            <SelectItem value="rejected">
              <div className="flex items-center">
                <XCircle className="w-3 h-3 mr-2 text-red-400" /> Rejected
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (booking) => (
        <>
          <button
            onClick={() => {
              setSelectedBooking(booking);
              setViewModalOpen(true);
            }}
            className="inline-flex p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => confirmDelete(booking._id)}
            className="inline-flex p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Investment Bookings (Inquiries)
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage public inquiries and investment booking applications.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name, phone or email..."
          value={search}
          onChange={(e) => {
            const val = e.target.value;
            setSearch(val);
            const params = new URLSearchParams();
            if (val) params.set("search", val);
            if (status) params.set("status", status);
            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
          className="w-full md:w-1/3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
        />

        <div className="w-full md:w-48">
          <Select
            value={status}
            onValueChange={(val) => {
              const newStatus = val === "all" || val === null ? "" : val;
              setStatus(newStatus);
              const params = new URLSearchParams();
              if (search) params.set("search", search);
              if (newStatus) params.set("status", newStatus);
              params.set("page", "1");
              router.push(`?${params.toString()}`);
            }}
          >
            <SelectTrigger className="w-full bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={initialBookings}
        isLoading={false}
        keyExtractor={(row) => row._id}
        emptyMessage="No inquiries found."
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const params = new URLSearchParams();
                if (search) params.set("search", search);
                if (status) params.set("status", status);
                params.set("page", (idx + 1).toString());
                router.push(`?${params.toString()}`);
              }}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                currentPage === idx + 1
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* View Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent
          showCloseButton={false}
          className="!bg-transparent !p-0 border-none shadow-none text-white w-full sm:max-w-[700px] md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="glass-panel relative bg-[#120a1c]/80 w-full h-full p-6 border border-white/10 rounded-xl">
            <button
              onClick={() => setViewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </button>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-brand-blue" />
                Booking Application Details
              </DialogTitle>
            </DialogHeader>

            {selectedBooking && (
              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Applicant Info
                    </h3>
                    <div className="space-y-2 text-sm break-all md:break-words">
                      <p>
                        <span className="text-gray-500">Name:</span>{" "}
                        {selectedBooking.fullName}
                      </p>
                      <p>
                        <span className="text-gray-500">Phone:</span>{" "}
                        {selectedBooking.phone}
                      </p>
                      <p>
                        <span className="text-gray-500">Email:</span>{" "}
                        {selectedBooking.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 overflow-hidden">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Inquiry Details
                    </h3>
                    <div className="space-y-2 text-sm break-all md:break-words">
                      {selectedBooking.subject && (
                        <p>
                          <span className="text-gray-500">Subject:</span>{" "}
                          {selectedBooking.subject || "General Inquiry"}
                        </p>
                      )}
                      {selectedBooking.message && (
                        <p>
                          <span className="text-gray-500">
                            Message / Details:
                          </span>{" "}
                          {selectedBooking.message}
                        </p>
                      )}
                      <p>
                        <span className="text-gray-500">Date:</span>{" "}
                        {selectedBooking.createdAt
                          ? new Date(
                              selectedBooking.createdAt,
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p>
                        <span className="text-gray-500">Status:</span>
                        <span
                          className={`ml-2 px-2 py-0.5 rounded text-xs uppercase font-bold ${
                            selectedBooking.status === "approved"
                              ? "text-green-400 bg-green-500/10"
                              : selectedBooking.status === "rejected"
                                ? "text-red-400 bg-red-500/10"
                                : selectedBooking.status === "contacted"
                                  ? "text-blue-400 bg-blue-500/10"
                                  : "text-yellow-400 bg-yellow-500/10"
                          }`}
                        >
                          {selectedBooking.status || "Pending"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address, Nominee, Signature blocks removed because the form was simplified to just Name, Phone, Location, and Email */}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Booking Request"
        description="Are you sure you want to delete this investment booking request? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
}
