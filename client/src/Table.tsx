import { useState } from 'react';
import { MoreInfo } from './MoreInfo';
import { Trial } from './types';

const TableHeadCell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <th className="px-4 py-2">{children}</th>;
};

const TableRowCell: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <td className={`px-4 py-3 ${className || ''}`}>{children}</td>;
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 inline-flex text-xs leading-5 text-center font-semibold rounded-full capitalize ${
        status === 'RECRUITING'
          ? 'bg-green-100 text-green-800'
          : status === 'NOT_YET_RECRUITING'
          ? 'bg-orange-100 text-orange-800'
          : status === 'COMPLETED'
          ? 'bg-blue-100 text-blue-800'
          : 'bg-gray-100 text-gray-800'
      }`}
    >
      {status.replace(/_/g, ' ').toLowerCase()}
    </span>
  );
};

export const Table: React.FC<{ rows: Trial[] }> = ({ rows }) => {
  const [focusedTrial, setFocusedTrial] = useState<Trial | null>(null);
  return (
    <>
      <MoreInfo
        trial={focusedTrial}
        open={Boolean(focusedTrial)}
        onClose={() => setFocusedTrial(null)}
      />
      <table className="table-auto">
        <thead className="bg-gray-50">
          <tr>
            <TableHeadCell>Organization</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Start Date</TableHeadCell>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row) => (
            <tr
              key={row.protocolSection.identificationModule.nctId}
              onClick={() => setFocusedTrial(row)}
              className="hover:bg-gray-50 cursor-pointer transition"
            >
              <TableRowCell className="truncate">
                {row.protocolSection.identificationModule.organization.fullName}
              </TableRowCell>
              <TableRowCell className="truncate">
                {row.protocolSection.identificationModule.briefTitle}
              </TableRowCell>
              <TableRowCell className="whitespace-nowrap">
                <StatusBadge
                  status={row.protocolSection.statusModule.overallStatus}
                />
              </TableRowCell>
              <TableRowCell className="whitespace-nowrap">
                {row.protocolSection.statusModule.startDateStruct.date}
              </TableRowCell>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
