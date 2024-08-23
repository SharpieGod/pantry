import { redirect } from "next/navigation";
import AccountDisplay from "~/components/AccountDisplay";
import Navbar from "~/components/Navbar";
import { getServerAuthSession } from "~/server/auth";

const MyAccountPage = async () => {
  const session = await getServerAuthSession();

  if (!session) return redirect("/");

  return (
    <>
      <Navbar />
      <AccountDisplay userId={session.user.id} isSelf={true} />
    </>
  );
};

export default MyAccountPage;
