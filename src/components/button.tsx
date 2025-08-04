export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-primary font-bold text-background py-4 w-full rounded-lg">
      {children}
    </button>
  );
}
