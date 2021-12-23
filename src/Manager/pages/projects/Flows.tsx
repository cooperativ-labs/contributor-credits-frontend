import LoadingModal from '@src/Manager/components/ModalLoading';
import React, { FC, useContext } from 'react';

import Card from '@src/containers/Card';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

const Flows: FC = () => {
  const { userId, loading: loadingUser } = useContext(UserContext);
  const { loading: userLoading, data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;
  if (!user) {
    return <LoadingModal />;
  }

  return (
    <div>
      <div className="uppercase font-bold text-cLightBlue text-sm mb-4">Payment flows</div>
      <Card className="bg-white rounded-xl shadow-md ">
        <div className="p-6">
          <div className="mb-3">
            Coming soon: The ability promise parts of your revenue flow to holders of different classes of tokens. Once
            you commit to a payment order, you must follow a procedure - agreed upon in advance - in order to change it.
          </div>
          <div className="font-bold">
            Using Cooperativ, you can eliminate the need for contracts by ensuring money flows to users exactly as
            promised.
          </div>
        </div>
        <div>
          <img src="/assets/images/flow-changer.png" />
        </div>
      </Card>
    </div>
  );
};

export default Flows;
