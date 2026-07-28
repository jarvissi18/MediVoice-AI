import { useEffect, useRef, useState } from "react";
import { Search, User, Phone, MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../../services/patientApi";
import type { Patient } from "../../types/patient";

export default function SearchBar() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      setFiltered([]);
      setOpen(false);
      return;
    }

    const results = patients.filter((patient) => {
      return (
        patient.name.toLowerCase().includes(value) ||
        patient.mobile.includes(value) ||
        patient.village.toLowerCase().includes(value)
      );
    });

    setFiltered(results.slice(0, 6));
    setOpen(true);
  }, [query, patients]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handlePatientClick = () => {
    setOpen(false);
    setQuery("");
    navigate("/patients");
  };

  return (
    <div
      ref={containerRef}
      className="relative w-80"
    >
      <Search
        size={17}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search patient..."
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
      />

      {query && (
        <button
          onClick={() => {
            setQuery("");
            setOpen(false);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X
            size={16}
            className="text-slate-400 hover:text-slate-700"
          />
        </button>
      )}

      {open && (
        <div className="absolute mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {loading && (
            <div className="p-4 text-center text-sm text-slate-500">
              Loading...
            </div>
          )}

          {!loading &&
            filtered.length === 0 && (
              <div className="p-5 text-center text-sm text-slate-500">
                No patients found
              </div>
            )}

          {!loading &&
            filtered.map((patient) => (
              <button
                key={patient.id}
                onClick={handlePatientClick}
                className="flex w-full items-center gap-3 border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 last:border-none"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <User
                    size={18}
                    className="text-blue-600"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">
                    {patient.name}
                  </h3>

                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Phone size={12} />
                      {patient.mobile}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {patient.village}
                    </span>
                  </div>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}