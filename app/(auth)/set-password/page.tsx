"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SetPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/login";
    } else {
      setMessage("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Set a Password</h1>
      <p>for account: {email}</p>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <button type="submit">Save Password</button>
      {message && <p>{message}</p>}
    </form>
  );
}
