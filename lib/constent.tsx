import { ChartSplineIcon, HardDriveIcon, MessageCircleReplyIcon, ShieldPlusIcon } from "lucide-react";

export const menuList =[
    {
        id : 1,
        name : "My Forms",
        icon : HardDriveIcon,
        path : "/dashboard",
    },

    {
        id : 2,
        name : "Responses",
        icon : MessageCircleReplyIcon,
        path : "/dashboard/responses",
    },
    {
        id : 3,
        name : "Analytics",
        icon : ChartSplineIcon,
        path : "/dashboard/analytics",
    },
    {
        id : 4,
        name : "Upgrade",
        icon : ShieldPlusIcon,
        path : "/dashboard/upgrade",
    },

]