import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      {/* Notes grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
