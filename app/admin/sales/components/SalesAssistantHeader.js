import { MessageSquareText } from "lucide-react";
import LogoutButton from "../LogoutButton";
import SalesPwaControls from "./SalesPwaControls";

export default function SalesAssistantHeader({ session }) {
  return (
    <header className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Sales Assistant
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                Internal Tool
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Enter customer details, select products from the catalog, and
              prepare WhatsApp enquiry responses.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
          <div className="text-left sm:text-right">
            <p className="text-xs font-semibold text-slate-800">
              {session.name}
            </p>
            {session.email && (
              <p className="text-[11px] text-slate-500">{session.email}</p>
            )}
          </div>
          <LogoutButton />
        </div>
      </div>

      <SalesPwaControls />
    </header>
  );
}
