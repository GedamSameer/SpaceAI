'use client';

import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
    }
  }
`;

export default function EmployeeDetailPage() {
  const params = useParams();
  const id = params.id;

  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id },
    skip: !id
  });

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-600">{error.message}</p>
          <Link href="/" className="inline-block mt-4 text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const employee = data?.getEmployeeDetails;

  if (!employee) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Employee not found</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        ← Back to Employee Directory
      </Link>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <h1 className="text-3xl font-bold text-white">{employee.name}</h1>
          <p className="text-blue-100 text-lg mt-2">{employee.position}</p>
        </div>

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">Employee ID</h3>
              <p className="text-lg text-gray-900 font-mono">{employee.id}</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">Department</h3>
              <p className="text-lg text-gray-900">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {employee.department}
                </span>
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">Position</h3>
              <p className="text-lg text-gray-900">{employee.position}</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">Salary</h3>
              <p className="text-lg text-gray-900 font-semibold">
                ${employee.salary?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}