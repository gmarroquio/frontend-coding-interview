export function Button({
  children,
  loading,
}: {
  loading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      disabled={loading}
      className="bg-primary font-bold text-background py-3 w-full rounded-lg hover:bg-primary/90 cursor-pointer disabled:bg-gray-400"
    >
      {loading ? <div>Loading...</div> : children}
    </button>
  );
}
