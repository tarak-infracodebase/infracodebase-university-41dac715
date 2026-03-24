import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <ClerkSignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl="/training"
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "hsl(260, 70%, 58%)",
            colorBackground: "hsl(228, 30%, 10%)",
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

export default SignInPage;
