import { LockIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <LockIcon className="w-12 h-12 mx-auto text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Unauthorized Access
        </h1>
        <p className="mt-4 text-muted-foreground">
          You do not have the necessary permissions to access this resource.
          Please contact your administrator for assistance.
        </p>
        <div className="mt-6">
          <img
            src="/placeholder.svg"
            alt="Unauthorized access illustration"
            className="mx-auto"
            width="300"
            height="300"
            style={{ aspectRatio: "300/300", objectFit: "cover" }}
          />
        </div>
        <Link to={"/dashboard"} replace>
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
