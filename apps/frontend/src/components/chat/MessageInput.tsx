// import { useState } from "react";
// import { LoaderCircle, SendHorizontal } from "lucide-react";

// interface Props {
//   onSend: (message: string) => void;
//   loading?: boolean;
// }

// export default function MessageInput({ onSend, loading = false }: Props) {
//   const [message, setMessage] = useState("");

//   function submit() {
//     const value = message.trim();

//     if (!value || loading) return;

//     onSend(value);

//     setMessage("");
//   }

//   return (
//     <div className="border-t border-slate-800 bg-slate-950 px-6 py-5">
//       <div className="mx-auto flex max-w-5xl items-end gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-lg">
//         <textarea
//           rows={2}
//           value={message}
//           disabled={loading}
//           placeholder="Describe your dream trip... (Example: Plan a 5 day bike trip from Delhi to Spiti for 2 people under ₹60,000)"
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               submit();
//             }
//           }}
//           className="max-h-40 min-h-14 flex-1 resize-none bg-transparent text-base text-white outline-none placeholder:text-slate-500"
//         />

//         <button
//           disabled={loading}
//           onClick={submit}
//           className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {loading ? (
//             <LoaderCircle className="animate-spin text-white" size={20} />
//           ) : (
//             <SendHorizontal size={20} className="text-white" />
//           )}
//         </button>
//       </div>

//       <p className="mt-3 text-center text-xs text-slate-500">
//         Press <span className="font-medium">Enter</span> to send ·{" "}
//         <span className="font-medium">Shift + Enter</span> for a new line
//       </p>
//     </div>
//   );
// }

import { useState } from "react";
import { LoaderCircle, SendHorizontal } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  loading?: boolean;
}

export default function MessageInput({ onSend, loading = false }: Props) {
  const [message, setMessage] = useState("");

  function submit() {
    const value = message.trim();

    if (!value || loading) return;

    onSend(value);
    setMessage("");
  }

  const disabled = loading || !message.trim();

  return (
    <div className="border-t border-slate-800 bg-slate-950 px-3 py-3 md:px-6 md:py-5">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-lg sm:flex-row sm:items-end sm:gap-4 sm:p-4">
        <textarea
          rows={2}
          value={message}
          disabled={loading}
          placeholder="Describe your trip... (e.g. 5-day bike trip from Delhi to Spiti for 2 people under ₹60,000)"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          className="min-h-14 max-h-40 flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500 md:text-base"
        />

        <button
          onClick={submit}
          disabled={disabled}
          className={`flex h-12 items-center justify-center rounded-xl transition sm:w-12 ${
            disabled
              ? "cursor-not-allowed bg-blue-500 opacity-60"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <LoaderCircle className="animate-spin text-white" size={20} />
          ) : (
            <>
              <SendHorizontal size={20} className="text-white sm:hidden" />

              <SendHorizontal
                size={20}
                className="hidden text-white sm:block"
              />
            </>
          )}
        </button>
      </div>

      <p className="mt-3 text-center text-[11px] text-slate-500 md:text-xs">
        Press <span className="font-medium">Enter</span> to send ·{" "}
        <span className="font-medium">Shift + Enter</span> for a new line
      </p>
    </div>
  );
}
