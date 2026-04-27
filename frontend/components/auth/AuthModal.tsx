"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useShell } from "@/components/providers/ShellProvider";

export function AuthModal() {
  const { authMode, authOpen, closeAuth, openAuth } = useShell();

  return (
    <Dialog open={authOpen} onClose={closeAuth} className="relative z-[70]">
      <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl border border-ivory/12 bg-black/80 p-6 shadow-[0_0_0_1px_rgba(245,240,232,0.08)] backdrop-blur-2xl">
          <div className="mb-6 flex items-start justify-between gap-6">
            <div className="space-y-3">
              <p className="label-mono text-gold">Member Access</p>
              <h2 className="font-display text-4xl text-ivory">
                {authMode === "sign-in" ? "Enter The Archive" : "Create Your Reader Profile"}
              </h2>
            </div>
            <button
              type="button"
              onClick={closeAuth}
              className="flex h-11 w-11 items-center justify-center border border-ivory/12 text-ivory transition-colors hover:border-gold hover:text-gold"
              aria-label="Close auth dialog"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-6 flex gap-3">
            <button
              type="button"
              onClick={() => openAuth("sign-in")}
              className={`border px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] transition-colors ${
                authMode === "sign-in"
                  ? "border-gold text-gold"
                  : "border-ivory/12 text-ivory/60 hover:border-ivory/30"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => openAuth("sign-up")}
              className={`border px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] transition-colors ${
                authMode === "sign-up"
                  ? "border-gold text-gold"
                  : "border-ivory/12 text-ivory/60 hover:border-ivory/30"
              }`}
            >
              Sign Up
            </button>
          </div>

          <AuthForm mode={authMode} />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
