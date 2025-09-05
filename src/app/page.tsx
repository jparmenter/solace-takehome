"use client";

import { useState } from "react";
import { useDebounced } from "./services/useDebounce";
import { useAdvocates } from "./services/useAdvocates";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounced(searchTerm, 300);
  const { data, loading, error } = useAdvocates({
    query: debouncedSearchTerm,
    page: 1,
    perPage: 10,
  });

  const formatPhoneNumber = (phone: number) => {
    const phoneStr = phone.toString();
    return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(
      6
    )}`;
  };

  const onReset = () => {
    setSearchTerm("");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-4">
      <h1 className="text-2xl font-bold text-gray-900">Solace Advocates</h1>
      <div className="mt-2 flex items-center gap-3">
        <div className="relative w-full max-w-md">
          <span className="pointer-events-none absolute left-3 top-2.5">
            🔎
          </span>
          <input
            style={{ border: "1px solid black" }}
            value={searchTerm}
            placeholder="Search name, city, degree, specialty…"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-20 py-2.5 text-[15px] shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-600"
          />
          {searchTerm && (
            <button
              onClick={onReset}
              className="absolute right-2 top-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm hover:bg-slate-100 active:scale-[.99]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <p className="mt-2 text-sm text-[color:var(--muted)]">
        {loading
          ? "Loading…"
          : error
          ? error
          : `${data.length} result${data.length === 1 ? "" : "s"}`}

        {searchTerm && (
          <>
            {" "}
            Searching for:{" "}
            <span
              id="search-term"
              className="ml-2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-700"
            >
              {searchTerm}
            </span>
          </>
        )}
      </p>

      <div className="overflow-x-auto mt-5 max-h-[800px]">
        <table className="w-full min-w-[900px] border-collapse text-[15px]">
          <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
            <tr>
              {[
                "First Name",
                "Last Name",
                "City",
                "Degree",
                "Specialties",
                "Years of Experience",
                "Phone Number",
              ].map((header) => (
                <th key={header} className="px-4 py-2 text-left font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((advocate) => {
              return (
                <tr key={advocate.id} className="hover:bg-solace-50">
                  <td className="px-3 py-1.5">{advocate.firstName}</td>
                  <td className="px-3 py-1.5">{advocate.lastName}</td>
                  <td className="px-3 py-1.5">{advocate.city}</td>
                  <td className="px-3 py-1.5">{advocate.degree}</td>
                  <td className="px-3 py-1.5">
                    <div className="flex flex-wrap gap-2">
                      {advocate.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-1.5">{advocate.yearsOfExperience}</td>
                  <td className="px-3 py-1.5">
                    <a href={`tel:${advocate.phoneNumber}`} className="text-blue-500 hover:underline">
                      {formatPhoneNumber(advocate.phoneNumber)}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
