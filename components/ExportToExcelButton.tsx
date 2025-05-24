"use client";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React, { useState } from "react";

import { Button } from "./ui/button"
import { toast } from "sonner";

interface ExportToExcelButtonProps {
    formId: string;
    title: string;
}

const ExportToExcelButton = ({ formId, title }: ExportToExcelButtonProps) => {
    const [loading, setLoading] = useState(false);

    const exportToExcel = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/export-excel?formId=${formId}`);
            if (!res.ok) throw new Error("Failed to fetch responses");
            const data = await res.json();
            const responses = data.responses || [];
            if (!responses.length) {
                toast.error("No responses to export.");
                setLoading(false);
                return;
            }
            // Flatten responses for Excel
            const rows = responses.map((resp: any) => ({ ...resp.answers, Submitted: resp.createdAt }));
            const ws = XLSX.utils.json_to_sheet(rows);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Responses");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), `${title || "responses"}.xlsx`);
            toast.success("Exported to Excel!");
        } catch (err: any) {
            toast.error(err.message || "Export failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button size="sm" className="font-semibold cursor-pointer hover:scale-[1.03]" style={{ backgroundColor: "#008000" }}
            onClick={exportToExcel} disabled={loading}>
            {loading ? "Exporting..." : "Export to Excel"}
        </Button>
    )
}

export default ExportToExcelButton
