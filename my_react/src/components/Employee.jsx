function Employee({ name, currentRole, onPromote }) {
  return (
    <div className="border p-4 rounded mb-3">
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Role:</strong> {currentRole}</p>

      <button
        onClick={() => onPromote(name)}
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
      >
        Promote
      </button>
    </div>
  );
}

export default Employee;