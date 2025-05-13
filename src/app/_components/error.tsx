
export function ErrorNotification({ error }: { error: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-lg bg-red-500 px-4 py-2 text-white">
        <p>{error}</p>
      </div>
    </div>
  );
}