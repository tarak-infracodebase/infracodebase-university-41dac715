import { SignUp as ClerkSignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <ClerkSignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/dashboard"
        appearance={{
          variables: {
            colorPrimary: "hsl(260, 70%, 58%)",
            colorBackground: "hsl(228, 30%, 10%)",
            colorText: "hsl(0, 0%, 95%)",
            colorTextSecondary: "hsl(0, 0%, 60%)",
            colorInputBackground: "hsl(228, 20%, 14%)",
            colorInputText: "hsl(0, 0%, 95%)",
            borderRadius: "0.75rem",
          },
          elements: {
            card: "shadow-xl border border-border/50",
            formButtonPrimary: "bg-primary hover:bg-primary/90 shadow-glow",
          },
        }}
      />
    </div>
  );
};

export default SignUpPage;
