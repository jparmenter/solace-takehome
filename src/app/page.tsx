"use client";

import { useEffect, useMemo, useState } from "react";
import { IAdvocates } from "./types/IAdvocates";
import { useDebounced } from "./services/useDebounce";

export default function Home() {
  const [advocates, setAdvocates] = useState<IAdvocates[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounced(searchTerm, 300);

  useEffect(() => {
    console.log("fetching advocates...");
    const fetchAdvocates = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/advocates");
        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
      } catch (error) {
        setError("Failed to fetch advocates");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates();
  }, []);

  const filteredAdvocates = useMemo(() => {
    console.log("filtering advocates...");

    const sanitizedQuery = debouncedSearchTerm.trim().toLocaleLowerCase();

    return advocates.filter((advocate) => {
      const group = [
        advocate.firstName,
        advocate.lastName,
        advocate.city,
        advocate.degree,
        advocate.specialties.join(" "),
        String(advocate.yearsOfExperience),
        advocate.phoneNumber,
      ]
        .join(" ")
        .toLowerCase();

      return group.includes(sanitizedQuery);
    });
  }, [advocates, debouncedSearchTerm]);

  const onReset = () => {
    setSearchTerm("");
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <p id="results-status" style={{ marginBottom: 16 }}>
        {loading
          ? "Loading…"
          : error
          ? error
          : `${filteredAdvocates.length} result${
              filteredAdvocates.length === 1 ? "" : "s"
            }`}
      </p>
      <div>
        <label htmlFor="search-input">Search</label>
        <input
          id="search-input"
          style={{ border: "1px solid black" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && <button onClick={onReset}>Reset Search</button>}

        {searchTerm && (
          <p>
            Searching for: <span id="search-term">{searchTerm}</span>
          </p>
        )}
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((specialty) => (
                    <div key={specialty}>{specialty}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
