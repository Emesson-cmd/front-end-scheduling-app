import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent you a confirmation link to verify your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">
              Please check your email and click the confirmation link to activate your account. 
              This may take a few minutes to arrive.
            </p>
            <Link href="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
