export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 text-blue-400">
      <p className="text-lg">😕 {message}</p>
    </div>
  );
}