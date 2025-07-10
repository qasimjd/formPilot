import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { format } from 'date-fns';
import Link from 'next/link';
import ShareButton from './shareButton';
import DeleteFormButton from './DeleteFormButton';
import ExportToExcelButton from './ExportToExcelButton';
import { Edit } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const FormCard = React.memo(function FormCard({ id, title, createdAt, variant, responsesCount }: FormCardProps) {

    console.log(title)

    return (
        <Card
            className="relative w-full max-w-sm mx-auto shadow-xl rounded-2xl border border-gray-300 dark:border-gray-800 bg-gradient-to-br from-white/80 via-blue-100/80 to-blue-300/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-blue-950/80 backdrop-blur-md flex flex-col justify-between transition-transform hover:scale-[1.03] hover:shadow-2xl duration-200 group">
            {/* Delete icon button top left */}
            {variant === 'formCard' && (<DeleteFormButton formId={id} />)}

            <CardHeader className="pb-2">
                <CardTitle className="truncate text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {title}
                </CardTitle>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono tracking-wide">
                    Created: {format(new Date(createdAt), 'PPP p')}
                </p>
                {typeof responsesCount === 'number' && (
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1 font-mono tracking-wide">
                        Responses: {responsesCount}
                    </p>
                )}
            </CardHeader>
            <CardContent className="flex flex-row flex-wrap gap-2 justify-end mt-2 pb-4">
                {variant === "formCard" ? (
                    <>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="icon"
                                    className="font-semibold cursor-pointer"
                                >
                                    <Link href={`/edit-form/${id}`}>
                                        <Edit className="size-4 text-primary" />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit Form</p>
                            </TooltipContent>
                        </Tooltip>


                        <ShareButton formId={id} title={title} />
                    </>
                ) : (
                    <>

                        <ExportToExcelButton
                            formId={id}
                            title={title}
                        />
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-primary/30 bg-white/60 dark:bg-gray-900/60 hover:bg-primary/10 hover:border-primary/60 transition-colors font-semibold"
                        >
                            <Link href={`/dashboard/responses/${id}`}>View Responses</Link>
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
});

export default FormCard;
