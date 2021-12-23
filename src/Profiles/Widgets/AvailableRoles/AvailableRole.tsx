import Card from '@src/containers/Card';
import cn from 'classnames';
import Link from 'next/link';
import React from 'react';
import useIconsPrefix from '@hooks/useIconsPrefix';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export interface AvailableRoleProps {
  className?: string;
  role: any;
}

const AvailableRole: React.FunctionComponent<AvailableRoleProps> = ({ role, ...props }) => {
  const { className, ...rest } = props;
  const router = useRouter();
  const projectID = router.query.id;
  return (
    <div data-test="component-available-role" className={cn(className)} {...rest}>
      <Link href={`/project/${projectID}/opportunities/${role.id}`}>
        <a>
          <Card className="w-40 h-48 rounded-3xl shadow hover:shadow-xl p-4">
            <section className="flex flex-col rounded-xl h-full pt-4">
              <div className="flex justify-center self-center items-center bg-green-500 h-20 w-20 rounded-full flex-shrink-0">
                <FontAwesomeIcon icon={[useIconsPrefix(role.icon), role.icon]} className="text-3xl text-white" />
              </div>
              <div className="flex items-center mt-3 flex-grow">
                <h3 className=" font-semibold flex-grow text-left">{role.title}</h3>
              </div>
            </section>
          </Card>
        </a>
      </Link>
    </div>
  );
};

export default AvailableRole;
