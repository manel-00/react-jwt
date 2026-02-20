import { Navbar } from "~/components/Navbar";
import { Register } from "~/components/Register";
import { withAuthGuard } from "~/hoc/withAuthGuard";
const RegisterGuarded = withAuthGuard(Register, "/feedbacks");

export default function register() {
  return (
    <>
      <Navbar />
      <RegisterGuarded />
    </>
  );
}
