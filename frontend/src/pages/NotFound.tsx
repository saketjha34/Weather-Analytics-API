import { Link } from "react-router-dom";
import Card from "../components/ui/Card";

const NotFound = () => {
  return (
    <Card className="space-y-4 text-center">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Page not found
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-300">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
      >
        Back to Home
      </Link>
    </Card>
  );
};

export default NotFound;
