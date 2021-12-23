import React from 'react';
export interface ListItemMemberProps {
  title: string;
  imageSrc: string;
  role?: string;
  classId?: number | undefined;
  date?: string;
  subtitle?: string;
}

const ListItemMember: React.FC<ListItemMemberProps> = ({ title, imageSrc, role, subtitle, date }) => {
  const dateObj = new Date(date);
  const humanDate = dateObj?.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  return (
    <div className="grid grid-cols-11 my-4 md:mr-8 rounded-xl bg-white shadow-lg p-2 pr-4">
      <div className="col-span-2 w-20">
        <div className="overflow-hidden items-center rounded-xl h-14 w-14">
          <img src={imageSrc ?? '/assets/images/UserImages/placeholder.png'} />
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-9 ml-1">
        <div className="col-span-5 mx-1">
          <div className="text-sm md:text-md font-bold text-gray-800 ">{title}</div>
          <div className="text-xs text-gray-600">{subtitle ?? humanDate}</div>
        </div>
        <div className="col-span-4 font-medium flex justify-end">{role}</div>
      </div>
    </div>
  );
};

export default ListItemMember;
