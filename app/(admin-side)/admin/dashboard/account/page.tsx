import Account from "./wrapper";
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Admin Account ',
  description: ' View profile ',
}

const page = () => {
  return (
    <div>
      <Account />
    </div>
  );
}

export default page;
