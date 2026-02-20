import { Navbar } from "~/components/Navbar";
import type { Route } from "./+types/home";
import { Login } from "~/components/Login";
import { withAuthGuard } from "~/hoc/withAuthGuard";
const LoginGuarded = withAuthGuard(Login, "/feedbacks");

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <LoginGuarded />
    </>
  );
}
