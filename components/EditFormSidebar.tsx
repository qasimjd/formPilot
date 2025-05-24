"use client";

import { useState } from "react";
import { useFormStore } from "@/store/formStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { backgrounds, themes, borders } from "@/lib/constent";
import { updateFormStyles } from "@/db/actions/form.action";
import { Loader2 } from "lucide-react";

export default function EditFormSidebar({ formId }: { formId: string }) {
	const theme = useFormStore((state) => state.theme);
	const setTheme = useFormStore((state) => state.setTheme);
	const formBackground = useFormStore((state) => state.formBackground);
	const setFormBackground = useFormStore((state) => state.setFormBackground);
	const borderStyle = useFormStore((state) => state.borderStyle);
	const setBorderStyle = useFormStore((state) => state.setBorderStyle);
	const [saving, setSaving] = useState(false);

	const handleUpdate = async (key: "theme" | "formBackground" | "borderStyle", value: string) => {
		if (!formId) return;
		setSaving(true);
		try {
			await updateFormStyles({
				formId,
				theme: key === "theme" ? value : theme,
				formBackground: key === "formBackground" ? value : formBackground,
				borderStyle: key === "borderStyle" ? value : borderStyle,
			});
		} finally {
			setSaving(false);
		}
	};

	return (
		<aside className="z-30 sticky top-4 border border-primary rounded-2xl p-4 space-y-8 bg-background shadow-2xl  w-fit max-w-xs md:max-w-sm lg:max-w-xs min-w-[220px] m-3 transition-all duration-300 backdrop-blur-md">
			<div>
				<h3 className="font-bold mb-4 text-lg tracking-wide text-primary/90 border-b border-muted pb-2 uppercase">
					Theme
				</h3>
				<RadioGroup
					value={theme}
					onValueChange={(val) => {
						setTheme(val);
						handleUpdate("theme", val);
					}}
					className="flex flex-wrap gap-3"
				>
					{themes.map((t) => (
						<label
							key={t.value}
							htmlFor={`theme-${t.value}`}
							className={cn(
								"flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all border border-transparent hover:border-primary/40 hover:bg-primary/5",
								theme === t.value && "border-primary bg-primary/10 shadow"
							)}
						>
							<RadioGroupItem value={t.value} id={`theme-${t.value}`} />
							<span className="font-medium text-sm">{t.label}</span>
						</label>
					))}
				</RadioGroup>
			</div>
			<div>
				<h3 className="font-bold mb-4 text-lg tracking-wide text-primary/90 border-b border-muted pb-2 uppercase">
					Background
				</h3>
				<div className="max-h-52 overflow-y-auto pr-1 custom-scrollbar">
					<RadioGroup
						value={formBackground}
						onValueChange={(val) => {
							setFormBackground(val);
							handleUpdate("formBackground", val);
						}}
						className="space-y-2"
					>
						{backgrounds.map((bg) => (
							<label
								key={bg.value}
								htmlFor={bg.value}
								className={cn(
									"flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all border border-transparent hover:border-primary/40 hover:bg-primary/5",
									formBackground === bg.value && "border-primary bg-primary/10 shadow"
								)}
							>
								<RadioGroupItem value={bg.value} id={bg.value} />
								<span
									className={cn(
										"w-8 h-8 rounded-lg border-2 mr-2 transition-all duration-200",
										bg.value,
										formBackground === bg.value ? "ring-2 ring-primary scale-110" : ""
									)}
								></span>
								<span className="font-medium text-sm">{bg.label}</span>
							</label>
						))}
					</RadioGroup>
				</div>
			</div>
			<div>
				<h3 className="font-bold mb-4 text-lg tracking-wide text-primary/90 border-b border-muted pb-2 uppercase">
					Border
				</h3>
				<div className="max-h-48 overflow-y-auto pr-1 custom-scrollbar">
					<RadioGroup
						value={borderStyle}
						onValueChange={(val) => {
							setBorderStyle(val);
							handleUpdate("borderStyle", val);
						}}
						className="space-y-2"
					>
						{borders.map((b) => (
							<label
								key={b.value}
								htmlFor={b.value}
								className={cn(
									"flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all border border-transparent hover:border-primary/40 hover:bg-primary/5",
									borderStyle === b.value && "border-primary bg-primary/10 shadow"
								)}
							>
								<RadioGroupItem value={b.value} id={b.value} />
								<span className={cn("w-8 h-8 mr-2 border rounded-lg", b.value, b.previewBg)}></span>
								<span className="font-medium text-sm">{b.label}</span>
							</label>
						))}
					</RadioGroup>
				</div>
			</div>
			{saving && (
				<div className="flex items-center gap-2 text-primary text-sm pt-2">
					<Loader2 className="animate-spin size-4" /> Saving...
				</div>
			)}
		</aside>
	);
}
