import { ChartSplineIcon, HardDriveIcon, MessageCircleReplyIcon, ShieldPlusIcon } from "lucide-react";

export const menuList = [
    {
        id: 1,
        name: "My Forms",
        icon: HardDriveIcon,
        path: "/dashboard",
    },

    {
        id: 2,
        name: "Responses",
        icon: MessageCircleReplyIcon,
        path: "/dashboard/responses",
    },
    {
        id: 3,
        name: "Analytics",
        icon: ChartSplineIcon,
        path: "/dashboard/analytics",
    },
    {
        id: 4,
        name: "Upgrade",
        icon: ShieldPlusIcon,
        path: "/dashboard/upgrade",
    },

]

export const SYSTEM_PROMPT = `
You are a JSON form schema generator. Given a description of a form, return a valid JSON object with the following structure:

{
  "title": string,             // The title of the form
  "fields": Field[],           // A flat array of all form inputs (REQUIRED)
  "layout": object|string      // (Optional) Layout preferences or hints
}

Field: {
  "id": string,                // Unique identifier (e.g., UUID or short id)
  "name": string,              // Form field name (e.g., "email", "phone")
  "label": string,             // Label displayed above the input
  "type": string,              // One of: "text", "email", "textarea", "dropdown", "radio", "date", "number", "tel"
  "placeholder": string,       // Placeholder text for the input
  "required": boolean,         // Whether the field is mandatory
  "options": string[],         // Only if type is "dropdown" or "radio"
  "validation": object         // (Optional) Additional rules (e.g., regex, min, max)
}

⚠️ Important:
- DO NOT include a "sections" field.
- DO NOT nest fields inside anything other than the top-level "fields" array.
- Always include an "id" field on each Field object.
- Return only valid JSON. No markdown, code blocks, or comments.
- Always include at least one item in the "fields" array.

🎯 Example:
{
  "title": "Contact Form",
  "fields": [
    {
      "id": "fld_1",
      "name": "email",
      "label": "Email Address",
      "type": "email",
      "placeholder": "Enter your email",
      "required": true
    },
    {
      "id": "fld_2",
      "name": "message",
      "label": "Message",
      "type": "textarea",
      "placeholder": "Write your message",
      "required": false
    }
  ]
}
`;

export const themes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Slate", value: "bg-slate-900 text-white" },
];

export const backgrounds = [
  {
    label: "Gradient Pink",
    value: "bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200",
  },
  {
    label: "Gradient Blue",
    value: "bg-gradient-to-r from-blue-200 via-green-200 to-teal-200",
  },
  {
    label: "Gradient Orange",
    value: "bg-gradient-to-r from-orange-200 via-yellow-200 to-amber-200",
  },
  {
    label: "Gradient Rose",
    value: "bg-gradient-to-r from-rose-200 via-rose-300 to-pink-300",
  },
  { label: "Amber", value: "bg-amber-400" },
  { label: "Dark", value: "bg-black"},
  { label: "Light", value: "bg-white" },
];

export const borders = [
  { label: "Thin Gray", value: "border border-gray-300", previewBg: "bg-white" },
  { label: "Thick Blue", value: "border-4 border-blue-400", previewBg: "bg-white" },
  { label: "Dashed Amber", value: "border-2 border-amber-400 border-dashed", previewBg: "bg-white" },
  { label: "Double Slate", value: "border-double border-4 border-slate-500", previewBg: "bg-white" },
  { label: "Rounded Shadow", value: "border border-gray-300 rounded-xl shadow-lg", previewBg: "bg-white" },
  { label: "None", value: "border-0", previewBg: "bg-white" },
];

