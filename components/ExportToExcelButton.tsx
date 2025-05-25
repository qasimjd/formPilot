"use client";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ExportToExcelButtonProps {
  formId: string;
  title: string;
}

interface FormResponse {
  createdAt: string;
  answers: Record<string, string | number | boolean | null>;
}

const ExportToExcelButton = ({ formId, title }: ExportToExcelButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const exportToExcel = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/export-excel?formId=${formId}`);
      if (!res.ok) throw new Error("Failed to fetch responses");

      const data: { responses: FormResponse[] } = await res.json();
      const responses = data.responses || [];

      if (responses.length === 0) {
        toast.error("No responses to export.");
        return;
      }

      const rows = responses.map((resp) => ({
        ...resp.answers,
        Submitted: resp.createdAt,
      }));

      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Responses");

      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

      saveAs(
        new Blob([wbout], { type: "application/octet-stream" }),
        `${title || "responses"}.xlsx`
      );

      toast.success("Exported to Excel!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      className="font-semibold cursor-pointer hover:scale-[1.03]"
      style={{ backgroundColor: "#008000" }}
      onClick={exportToExcel}
      disabled={loading}
    >
      {loading ? "Exporting..." : "Export to Excel"}
    </Button>
  );
};

export default ExportToExcelButton;
