import Login from "@/components/Login";
import { getSession } from "next-auth/react";

export default function Index() {

  return (
    <Login />
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return { redirect: { destination: '/home', permanent: false } }
  }
  return { props: {} }

}