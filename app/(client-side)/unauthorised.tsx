import Link from "next/link";

export default function UnauthorizedPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2 text-gray-700">
          You do not have permission to view this page.
        </p>
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    );
  }
  