import { UserFormSection } from '@/components/userForm';
import { ResponseModal } from '@/components/response-modal';

export default async function IndexPage() {

  return (
    <>
      <ResponseModal />
      <UserFormSection />
    </>
  );
}
