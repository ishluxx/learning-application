export default function NotificationSkeleton() {
  return (
    <div className="glass-card rounded-xl p-4 mb-3 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-gray-700 mt-1" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-gray-700 rounded" />
          <div className="h-3 w-full bg-gray-700 rounded" />
          <div className="h-3 w-1/2 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}