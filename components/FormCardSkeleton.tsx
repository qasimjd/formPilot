import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface FormCardSkeletonProps {
  variant?: 'formCard' | 'responseCard';
}

const FormCardSkeleton = ({ variant = 'formCard' }: FormCardSkeletonProps) => {
  return (
    <Card className="relative w-full max-w-sm mx-auto shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white/80 via-blue-50/80 to-blue-200/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-blue-950/80 backdrop-blur-md flex flex-col justify-between animate-pulse">
      {variant === 'formCard' && (
        <div className="absolute bottom-6 left-3 z-10">
          <Skeleton className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle>
          <Skeleton className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-800 mb-2" />
        </CardTitle>
        <Skeleton className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
      </CardHeader>
      <CardContent className="flex flex-row flex-wrap gap-2 justify-end mt-2 pb-4">
        {variant === 'formCard' ? (
          <>
            <Skeleton className="h-8 w-16 rounded-lg bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-8 w-16 rounded-lg bg-gray-200 dark:bg-gray-800" />
          </>
        ) : (
          <Skeleton className="h-8 w-32 rounded-lg bg-gray-200 dark:bg-gray-800" />
        )}
      </CardContent>
    </Card>
  );
};

export default FormCardSkeleton;
