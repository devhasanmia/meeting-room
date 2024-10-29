const AccessDenied = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-lg font-semibold mb-4">
          You don't have permission to view this page.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-200"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  );
};
export default AccessDenied;
