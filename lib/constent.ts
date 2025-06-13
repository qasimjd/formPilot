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
  "subheading": string,       // (Optional) A subheading or instruction
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
- If "required" is true, append "*" at the end of the "label" field.

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
  { label: "Pastel", value: "bg-pink-50 text-gray-700" },
  { label: "Frosted", value: "bg-white/80 backdrop-blur text-gray-800" },
];

export const backgrounds = [
  { label: "Gradient Pink", value: "bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200" },
  { label: "Gradient Blue", value: "bg-gradient-to-r from-blue-200 via-green-200 to-teal-200" },
  { label: "Gradient Orange", value: "bg-gradient-to-r from-orange-200 via-yellow-200 to-amber-200" },
  { label: "Gradient Rose", value: "bg-gradient-to-r from-rose-200 via-rose-300 to-pink-300" },
  { label: "Gradient Emerald", value: "bg-gradient-to-br from-emerald-200 to-green-300" },
  { label: "Gradient Sky", value: "bg-gradient-to-r from-sky-200 via-blue-300 to-indigo-300" },
  { label: "Sunset", value: "bg-gradient-to-r from-yellow-300 via-red-300 to-pink-400" },
  { label: "Aurora", value: "bg-gradient-to-br from-green-300 via-blue-400 to-purple-500" },
  { label: "Lavender Dream", value: "bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100" },
  { label: "Ocean Wave", value: "bg-gradient-to-r from-cyan-100 via-blue-200 to-indigo-100" },
  { label: "Soft Gray", value: "bg-gray-100" },
  { label: "Amber", value: "bg-amber-400" },
  { label: "Light", value: "bg-white" },
  { label: "Dark", value: "bg-black" },
];

export const borders = [
  { label: "Double Slate", value: "border-double border-4 border-slate-500", previewBg: "bg-white" },
  { label: "Accent Right", value: "border-r-6 border-r-black", previewBg: "bg-white" },
  { label: "Groove Border", value: "border-4 border-gray-400 border-groove", previewBg: "bg-white" },
  { label: "Thick Blue", value: "border-4 border-blue-400", previewBg: "bg-white" },
  { label: "Dashed Amber", value: "border-2 border-amber-400 border-dashed", previewBg: "bg-white" },
  { label: "Rounded Shadow", value: "border border-gray-300 rounded-xl shadow-lg", previewBg: "bg-white" },
  { label: "Right Medium", value: "border-r-2 border-indigo-400", previewBg: "bg-white" },
  { label: "Left Medium", value: "border-l-2 border-emerald-400", previewBg: "bg-white" },
  { label: "Dotted Purple", value: "border-2 border-purple-500 border-dotted", previewBg: "bg-white" },
  { label: "Glow Border", value: "border-2 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]", previewBg: "bg-white" },
  { label: "Bottom Highlight", value: "border-b-6 border-b-yellow-400 hover:border-b-yellow-600 transition-colors", previewBg: "bg-white" },
  { label: "None", value: "border-0", previewBg: "bg-white" },
];

export const Plans = [
  {
    name: "Free",
    price: "$0.00",
    priceId: "free",
    description: "Get started with the essentials. Create up to 3 forms for free.",
    features: [
      "3 forms",
    ]
  },
  {
    link: "https://buy.stripe.com/test_aFa5kFcach0W3R6asv0sU01",
    name: "Pro Yearly",
    price: "$99.99",
    priceId: "prod_SNPQwYDZ887aDP",
    description: "Unlimited forms, responses, analytics. Best value.",
    features: [
      "Unlimited forms",
      "Unlimited responses",
      "Advanced analytics",
      "Yearly subscription (save 17%)"
    ]
  },
  {
    link: "https://buy.stripe.com/test_6oUfZjb687qmcnC8kn0sU00",
    name: "Pro Monthly",
    price: "$9.99",
    priceId: "prod_SNPPEHxU4syzyf",
    description: "Unlimited forms, responses, analytics. Monthly plan.",
    features: [
      "Unlimited forms",
      "Unlimited responses",
      "Advanced analytics",
      "Monthly subscription"
    ]
  }
]